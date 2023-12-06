//@ts-nocheck
import { DisplayError } from '@/app/(auth)/error-handling/function'
import { CharityLog } from '@/app/admin/audit-log/function'
import supabase from '@/app/utils/supabase'
import { GetUID } from '@/app/utils/user_id'
import { Button } from '@/components/Button'
import { Message } from '@/components/Feedback'
import { TextField, SelectField } from '@/components/Fields'
import SlideOver from '@/components/SlideOverButton'
import { TableContainer, TableHeaderButton, TableContent, Table, Thead, Tr, Td, Tbody, TableHeader, Th, } from '@/components/Table'
import { revalidatePath } from 'next/cache'
import { ExportTest } from '@/components/SlideOverButton'

export const revalidate = 0


async function getInventoryData(column: any, order: any, charity_id: number) {
  var data
  console.log(`RESULTS ARE SORTED BY ${column}, ORDERED BY ${order}, FROM CHARITY NUMBER ${charity_id}`)
  if ((column != null || column != undefined) || (order != null || order != undefined)) {
      const { data: inventory, error: error_2 } = await supabase
          .from('inventory_item')
          .select('*, items_donation_transaction!inner(*) ')
          .eq('items_donation_transaction.charity_id', charity_id)
          .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
      data = inventory
  }
  else {
      const { data: inventory, error: error_2 } = await supabase
          .from('inventory_item')
          .select('*, items_donation_transaction!inner(*) ')
          .eq('items_donation_transaction.charity_id', charity_id)
          .order("id", { ascending: true })
      data = inventory
  }

  return data
}

var message = ""
var messageType = ""
var heading = ""

export default async function Page({ searchParams }: any) {

  // Function to format the timestamp as 'mm/dd/yyy'
  const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
      const day = date.getDate().toString().padStart(2, '0');
      return `${month}/${day}/${year}`;
  };

  console.log('DOES IT WORK???? MAYBE: ' + (await GetUID()))
  const uid = await GetUID()
  const { data: charity_member, error: idk } = await supabase
    .from('decrypted_charity_member')
    .select('*, charity ( id, name )')
    .eq('user_uuid', uid)
  const charity_id = charity_member?.map((member) => member.charity?.id)
  const charityId = charity_id![0]

  const column = searchParams?.column
  const order = searchParams?.order
  var orderby = "" //checks if order is true or false, then returns a string of ascending and descending respectively
  if (order === 'true') {
      orderby = "ascending"
  }
  else {
      orderby = "descending"
  }
  const inventory = await getInventoryData(column, order, charityId)

  const rows = inventory?.map(row => ({
    RECORD_ID: row.id,
    ITEM_NAME: row.name,
    ITEM_QUANTITY: row.quantity,
    UNIT_OF_MEASUREMENTT: row.unit_of_measurement,
    ITEM_EXPIRY: (row.expiry != null || row.expiry != undefined) ? formatDate(row.expiry) : "N/A",
    ITEM_PERISHABILITY: row.perishable ? "PERISHABLE" : "NON-PERISHABLE"
  }))

  const saveChanges = async (formData: FormData) => {
    'use server'
    const itemId = formData.get('id')
    const item = {
      name: formData.get('item'),
      unit_of_measurement: formData.get('measurement'),
      quantity: formData.get('quantity'),
      perishable: Boolean(formData.get('perishable')),
      expiry: formData.get('expiry'),
    }

    const { data: update_item, error: update_error } = await supabase
      .from('inventory_item')
      .update(item)
      .eq('id', itemId)
      .select()

    if (update_error) {
      const error = update_error
      message = `Failed to Update Record. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
      messageType = "ERROR"
      heading = "Record not Updated."
    }
    else {
      message = "Record Updated Successfully."
      messageType = "SUCCESS"
      heading = "Record Updated."
      await CharityLog('UPDATED INVENTORY ITEM ' + update_item![0].name, update_error)
    }

    revalidatePath('/')
  }

  const deleteEvent = async (formData: FormData) => {
    'use server'
    const itemId = formData.get('id')

    const { data: delete_item, error: delete_error } = await supabase
      .from('inventory_item')
      .delete()
      .eq('id', itemId)
      .select()

    if (delete_error) {
      const error = delete_error
      message = `Failed to Delete Record. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
      messageType = "ERROR"
      heading = "Record not Deleted."
    }
    else {
      message = "Record Deleted Successfully."
      messageType = "SUCCESS"
      heading = "Record Deleted."
      await CharityLog('DELETED INVENTORY ITEM ' + delete_item![0].name, delete_error)
    }

    revalidatePath('/')
  }

  const getMinExpiryDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1) // Set minimum date to tomorrow

    const minDate = today.toISOString().split('T')[0]
    return minDate
  }

  return (
    <>
      <div className="py-9 sm:flex sm:items-center">
        <div className="sm:flex-auto"></div>
      </div>

      <TableContainer>
        <TableHeader header={'Inventory'} />
        <br/>
         <SlideOver title="Filter & Sort Data" buttontext="Filter & Sort Data" variant="solid" color="yellow">
           <div className="flex-col">
               <form className='flex flex-col w-full gap-y-6' action="/dashboard/donations/inventory" method="GET">
                   <div className="flex flex-col"> {/* Flex container for the first column */}
                       <label className="block text-sm font-medium text-gray-700">Sort by:</label>
                       <br />
                       <SelectField
                           name="column"
                           required
                       >
                           <option value={"id"}>id</option>
                           <option value={"name"}>name</option>
                           <option value={"quantity"}>quantity</option>
                           <option value={"expiry"}>expiry date</option>
                       </SelectField>
                   </div>
                   <div className="flex mt-4 gap-x-5 items-center"> {/* Flex container for the second column */}
                       <label className="block text-sm font-medium text-gray-700">Order as:</label>
                       <div className="flex gap-x-4 items-center">
                           <div className="flex items-center">
                               <input
                                   id="option1"
                                   name="order"
                                   type="radio"
                                   value={true}
                                   checked
                                   className="h-4 w-4 border-gray-300 text-green-700 focus:ring-green-700"
                               />
                               <label htmlFor="option1" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                   Ascending
                               </label>
                           </div>
                           <div className="flex items-center">
                               <input
                                   id="option2"
                                   name="order"
                                   type="radio"
                                   value={false}
                                   className="h-4 w-4 border-gray-300 text-green-700 focus:ring-green-700"
                               />
                               <label htmlFor="option2" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                   Descending
                               </label>
                           </div>
                       </div>
                   </div>
                   <div className='flex flex-col items-center mt-4'> {/* Flex container for the third column */}
                       <Button type='submit' variant='solid' color='green' className='w-64'>
                           <span>
                               Apply Changes <span aria-hidden="true">&rarr;</span>
                           </span>
                       </Button>
                   </div>
               </form>
           </div>
        </SlideOver>
        <div className="font-bold mt-4 mb-4">
          {column && order ? (
                <>
                    <p className="text-green-700 inline">Current Filters: </p>
                    <span>Sorted by: {column} <span className="text-green-700">::</span> Ordered by: {orderby}</span>
                </>
            ) : (
                <p className="text-gray-600 italic">No filters currently active</p>
           )}
        </div>
          <ExportTest rows={rows} fileName={"INVENTORY"} sheetName={"INVENTORY"} />
        <TableContent>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Quantity</Th>
                <Th>Unit of Measurement</Th>
                <Th>Perishable?</Th>
                <Th>Expiry Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {inventory?.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>{item.unit_of_measurement}</Td>
                  <>{item.perishable ? <Td>Yes</Td> : <Td>No</Td>}</>
                  <>{item.perishable ? <Td>{formatDate(item.expiry)}</Td> : <Td>N/A</Td>}</>
                  <Td>
                    <SlideOver
                      title="Item Details"
                      variant="solid"
                      color="blue"
                      buttontext="View Details"
                    >
                      <form
                        className="space-y-6"
                        action={saveChanges}
                        method="PUT"
                      >
                        <TextField
                          label=""
                          name="id"
                          type="hidden"
                          defaultValue={item.id}
                          required
                        />

                        <TextField
                          label="Item Name"
                          name="item"
                          type="text"
                          defaultValue={item.name}
                          required
                        />

                        <TextField
                          label="Unit of Measurement"
                          name="measurement"
                          type="text"
                          defaultValue={item.unit_of_measurement}
                          required
                        />

                        <TextField
                          label="Quantity"
                          name="quantity"
                          type="number"
                          defaultValue={item.quantity}
                          min={1}
                          max={10000}
                          required
                        />

                        <>
                          {item.perishable ? (
                            <SelectField
                              label="Perishable?"
                              name="perishable"
                              required
                            >
                              <option value={'true'} selected>
                                Yes
                              </option>
                              <option value={'false'}>No</option>
                            </SelectField>
                          ) : (
                            <SelectField
                              label="Perishable?"
                              name="perishable"
                              required
                            >
                              <option value={'true'}>Yes</option>
                              <option value={'false'} selected>
                                No
                              </option>
                            </SelectField>
                          )}
                        </>

                        <TextField
                          label="Expiry Date (if perishable)"
                          name="expiry"
                          type="date"
                          defaultValue={item.expiry as string}
                          min={getMinExpiryDate()}
                        />

                        <div className="grid grid-cols-3 gap-4">
                          <Button
                            type="submit"
                            variant="solid"
                            color="green"
                            className="w-full"
                          >
                            <span>
                              Save Changes{' '}
                              <span aria-hidden="true">&rarr;</span>
                            </span>
                          </Button>
                          <Button
                            formAction={deleteEvent}
                            type="submit"
                            variant="solid"
                            color="red"
                            className="w-full"
                          >
                            <span>
                              Delete Item <span aria-hidden="true">&rarr;</span>
                            </span>
                          </Button>
                          {/* <Button href={"#"} variant="solid" color="red" className="w-full">
                                                        <span>
                                                            Cancel <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </Button> */}
                        </div>
                      </form>
                      <Message content={message} type={messageType} heading={heading} />
                    </SlideOver>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContent>
      </TableContainer>
    </>
  )
}
