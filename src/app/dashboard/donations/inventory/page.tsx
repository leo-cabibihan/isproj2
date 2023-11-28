// @ts-nocheck
import { DisplayError } from '@/app/(auth)/error-handling/function'
import { CharityLog } from '@/app/admin/audit-log/function'
import supabase from '@/app/utils/supabase'
import { GetUID } from '@/app/utils/user_id'
import { Button } from '@/components/Button'
import { TextField, SelectField } from '@/components/Fields'
import SlideOver from '@/components/SlideOverButton'
import {
  TableContainer,
  TableHeaderButton,
  TableContent,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  TableHeader,
  Th,
} from '@/components/Table'
import { revalidatePath } from 'next/cache'

export const revalidate = 0

export default async function Page() {
  console.log('DOES IT WORK???? MAYBE: ' + (await GetUID()))
  const uid = await GetUID()
  const { data: charity_member, error: idk } = await supabase
    .from('decrypted_charity_member')
    .select('*, charity ( id, name )')
    .eq('user_uuid', uid)
  const charity_id = charity_member?.map((member) => member.charity?.id)

  const { data: inventory, error: error_2 } = await supabase
    .from('inventory_item')
    .select('*, items_donation_transaction!inner(*) ')
    .eq('items_donation_transaction.charity_id', charity_id)
    .order('expiry', { ascending: false })

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
    CharityLog('UPDATED INVENTORY ITEM ' + update_item![0].name, update_error)
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
    CharityLog('DELETED INVENTORY ITEM ' + delete_item![0].name, delete_error)
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
        <TableContent>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Quantity</Th>
                <Th>Unit of Measurement</Th>
                <Th>Perishable?</Th>
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
