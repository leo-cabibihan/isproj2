//@ts-nocheck
import { Button } from "@/components/Button";
import { SelectField, TextField } from "@/components/Fields";
import SlideOver, { ExportTest } from "@/components/SlideOverButton";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, TableHeaderButton, TableContent } from "@/components/Table";
import { TableHeader } from "@/components/table/Table";
import { DisplayError } from '@/app/(auth)/error-handling/function';
import supabase from '@/app/utils/supabase';
import { GetUID } from '@/app/utils/user_id';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CharityLog } from "@/app/admin/audit-log/function";
import Alert from "@/components/Alert";
import { Message } from "@/components/Feedback";

export const revalidate = 0;

async function getGivenItemsData(column: any, order: any, charity_id: number) {
    var data
    console.log(`RESULTS ARE SORTED BY ${column}, ORDERED BY ${order}, FROM CHARITY NUMBER ${charity_id}`)
    if ((column != null || column != undefined) || (order != null || order != undefined)) {
        const { data: beneficiary_items, error: ben_error } = await supabase
            .from('beneficiary_items')
            .select('*, inventory_item ( id, name ), charity ( id, name ), event (id, name)')
            .eq('charity_id', charity_id)
            .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        data = beneficiary_items
    }
    else {
        const { data: beneficiary_items, error: ben_error } = await supabase
            .from('beneficiary_items')
            .select('*, inventory_item ( id, name ), charity ( id, name ), event (id, name)')
            .eq('charity_id', charity_id)
            .order('id', { ascending: true }) //if order is true, then true, otherwise false.
        data = beneficiary_items
    }

    return data
}

var message = ""
var messageType = ""
var heading = ""

export default async function beneficiaryitem({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) {

    // Function to format the timestamp as 'mm/dd/yyy'
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}/${day}/${year}`;
    };

    // Function to format the time as 'h:mm a' (e.g., '2:30 PM')
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };

    console.log("DOES IT WORK???? MAYBE: " + await GetUID())
    const uid = await GetUID()
    const { data: charity_member, error: error_2 } = await supabase.from('decrypted_charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity?.id)

    console.log("CHARITY ID " + charity_id)

    const { data: events, error: events_error } = await supabase
        .from('event')
        .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
        .eq('charity_id', charity_id).eq('is_ongoing', true).eq('approval_status', "APPROVED")
        .order('start_date', { ascending: false })

    console.log("EVENTS ERROR", events_error)

    const { data: inventory, error: error_3 } = await supabase.from('inventory_item').select('*, items_donation_transaction!inner(*) ')
        .eq('items_donation_transaction.charity_id', charity_id)
        .order('expiry', { ascending: false })

    const column = searchParams?.column
    const order = searchParams?.order

    console.log(`HERE ARE THE ORDERING SETTINGS: ${column} & ${order}`)

    const charityId = charity_id![0]
    const beneficiary_items = await getGivenItemsData(column, order, charityId)

    const rows = beneficiary_items?.map(row => ({
        ID: row.id,
        ITEM_NAME: row.inventory_item?.name,
        EVENT: row.event?.name,
        QUANTITY: row.quantity,
        DESCRIPTION: row.description,
        DATE: formatDate(row.date) + ' ' + formatTime(row.date)
    }))

    var orderby = "" //checks if order is true or false, then returns a string of ascending and descending respectively
    if (order === 'true') {
        orderby = "ascending"
    }
    else {
        orderby = "descending"
    }
    //console.log("hello I am in pain. ", ben_error)

    const handleSubmit = async (formData: FormData) => {
        'use server'

        const current_item_id = formData.get("item_id")

        const { data: item_to_add, error: error_3 } = await supabase.from('inventory_item').select('*, items_donation_transaction!inner(*) ').eq('items_donation_transaction.charity_id', charity_id).eq("id", current_item_id).single()

        const inventoryQuantity = item_to_add?.quantity as number - parseInt(formData.get("amount") as string)

        const { error: idk } = await supabase.from('inventory_item').update({ quantity: inventoryQuantity }).eq("id", current_item_id)

        const item = {
            item_id: current_item_id,
            charity_id: parseInt(charity_id),
            event_id: formData.get("event_id"),
            quantity: formData.get('amount'),
            description: formData.get("desc")
        };

        const { data, error } = await supabase.from('beneficiary_items').insert(item).select();
        const errors = [error_3, idk, error]

        if (error) {
            message = `Failed to Add Item. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
            messageType = "ERROR"
            heading = "Item not Added."
        }
        else {
            message = "Your Item has been added."
            messageType = "SUCCESS"
            heading = "Item Added."
            CharityLog("ADDED GIVEN-ITEM " + item_to_add?.name + ".", error)
        }

        revalidatePath('/');
        
        console.log("I am tired. ", error_3, idk, error)

    };

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>
            <TableContainer>
                <TableHeaderButton header="Given Items">
                    <SlideOver title="Add Item Details" buttontext="Add Item" variant="solid" color="blue">
                        <form className="space-y-6" action={handleSubmit} method="POST">
                            {searchParams.err && <Alert message={searchParams.err as string} />}

                            <TextField
                                label=""
                                name="charity_id"
                                type="hidden"
                                defaultValue={charity_id}
                            />

                            <TextField
                                label="Quantity"
                                name="amount"
                                type="number"
                                min={1}
                                max={100000}
                                autoComplete="number"
                                required
                            />

                            <div className="sm:col-span-4 py-5">
                                <div className="col-span-full">
                                    <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="desc"
                                            name="desc"
                                            rows={3}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            placeholder="Enter a description for the given item..."
                                        />
                                    </div>
                                </div>

                                {/* This will display the list of events linked to charity_id, and all beneficiaries available */}


                                <SelectField
                                    className="col-span-full py-5"
                                    label="Assign Event"
                                    name="event_id"
                                >
                                    {events?.map(event => (
                                        <option key={event.id} value={event.id}>{event.name}</option>
                                    ))}
                                </SelectField>

                                <SelectField
                                    className="col-span-full py-5"
                                    label="Assign Item"
                                    name="item_id"
                                >
                                    {inventory?.map(item => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </SelectField>


                                {/* <ImageUpload folderName="expenses" charityID={charity_id} recordID={expense_id![0] + 1} /> */}

                                <div className="mt-6 col-span-full">
                                    <div className="col-span-full">
                                        <Button type="submit" variant="solid" color="blue" className="w-full">
                                            <span>
                                                Save Item <span aria-hidden="true">&rarr;</span>
                                            </span>
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </form>
                        <Message content={message} type={messageType} heading={heading} />
                    </SlideOver>
                </TableHeaderButton>
                <TableContent>
                    <SlideOver title="Filter & Sort Data" buttontext="Filter & Sort Data" variant="solid" color="yellow">
                        <div className="flex-col">
                            <form className='flex flex-col w-full gap-y-6' action="/dashboard/beneficiaries/given-items" method="GET">
                                <div className="flex flex-col"> {/* Flex container for the first column */}
                                    <label className="block text-sm font-medium text-gray-700">Sort by:</label>
                                    <br />
                                    <SelectField
                                        name="column"
                                        required
                                    >
                                        <option value={"id"}>id</option>
                                        <option value={"quantity"}>quantity</option>
                                        <option value={"date"}>date</option>
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
                    <ExportTest rows={rows} fileName={`GIVEN ITEMS`} sheetName={"ITEMS"} />
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Event</Th>
                                <Th>Item Name</Th>
                                <Th>Quantity</Th>
                                <Th>Date</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {beneficiary_items?.map(item =>

                                <Tr key={item.id}>
                                    <Td>{item.event.name}</Td>
                                    <Td>{item.inventory_item?.name}</Td>
                                    <Td>{item.quantity}</Td>
                                    <Td>{formatDate(item.date) + ' ' + formatTime(item.date)}</Td>
                                    <Td>
                                        <SlideOver title="Item Details" buttontext="View Details" variant="solid" color="blue">
                                            <TextField
                                                label=""
                                                name="charity_id"
                                                type="hidden"
                                                defaultValue={item.id}
                                                readOnly
                                                required
                                            />
                                            <br />
                                            <TextField
                                                label="Event"
                                                name="event_name"
                                                type="text"
                                                defaultValue={item.event.name}
                                                readOnly
                                                required
                                            />
                                            <br />
                                            <TextField
                                                label="Item Name"
                                                name="name"
                                                type="text"
                                                defaultValue={item.inventory_item?.name}
                                                readOnly
                                                required
                                            />
                                            <br />
                                            <TextField
                                                label="Quantity"
                                                name="amount"
                                                type="text"
                                                defaultValue={item.quantity}
                                                readOnly
                                                required
                                            />
                                            <br />
                                            <TextField
                                                label="Date"
                                                name="date"
                                                type="text"
                                                defaultValue={formatDate(item.date) + ' ' + formatTime(item.date)}
                                                readOnly
                                                required
                                            />
                                        </SlideOver>
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>
        </>

    )
}