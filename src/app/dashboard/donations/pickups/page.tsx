//@ts-nocheck
import { Button } from "@/components/Button";
import { SelectField, TextField } from "@/components/Fields";
import SlideOver, { ExportTest } from "@/components/SlideOverButton";
import { TableContainer, TableHeader, TableContent, Table, Thead, Tr, Td, Tbody, TableHeaderButton, Th } from "@/components/Table";
import { PickupForm } from "./form";
import supabase from "@/app/utils/supabase";
import { GetUID } from "@/app/utils/user_id";

async function getPickupsData(column: any, order: any, charity_id: number) {
    var data
    console.log(`RESULTS ARE SORTED BY ${column}, ORDERED BY ${order}, FROM CHARITY NUMBER ${charity_id}`)
    if ((column != null || column != undefined) || (order != null || order != undefined)) {
        const { data: items, error } = await supabase.from('items_donation_transaction')
            .select('*, charity ( id, name ), address ( * ), decrypted_donor ( id, decrypted_name )')
            .eq('verify', false).eq('charity_id', charity_id)
            .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        if(column === 'name'){ //if chosen filter is by name, since name is obtained from a different table (decrypted_donor table)
            console.log("option chosen is by name")
            const { data: items, error } = await supabase.from('items_donation_transaction')
            .select('*, charity ( id, name ), address ( * ), decrypted_donor ( id, decrypted_name )')
            .eq('verify', false).eq('charity_id', charity_id)
            .order( 'decrypted_donor(decrypted_name)', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = items
            return data
        }
        data = items

    }
    else {        
        const { data: items, error } = await supabase.from('items_donation_transaction')
            .select('*, charity ( id, name ), address ( * ), decrypted_donor ( id, decrypted_name )')
            .eq('verify', false).eq('charity_id', charity_id)
            .order('id', { ascending: true })
        data = items
    }

    return data
}

export default async function Page({ searchParams }: any) {
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
    const { data: charity_member, error: idk } = await supabase.from('decrypted_charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity?.id)

    const column = searchParams?.column
    const order = searchParams?.order

    console.log(`HERE ARE THE ORDERING SETTINGS: ${column} & ${order}`)

    const charityId = charity_id![0]
    const items = await getPickupsData(column, order, charityId)

    var orderby = "" //checks if order is true or false, then returns a string of ascending and descending respectively
    if (order === 'true') {
        orderby = "ascending"
    }
    else {
        orderby = "descending"
    }

    const rows = items?.map(row => ({
        RECORD_ID: row.id,
        DONATED_BY: row.decrypted_donor?.decrypted_name,
        DONOR_ID: row.donor_id,
        DONATION_DATE: formatDate(row.date) + ' ' + formatTime(row.date),
        DONATION_ITEMS: JSON.stringify(row.inventory_item)
    }))
  
    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header={"Pick-up Items"} />
                <TableContent>
                    <SlideOver title="Filter & Sort Data" buttontext="Filter & Sort Data" variant="solid" color="yellow">
                        <div className="flex-col">
                            <form className='flex flex-col w-full gap-y-6' action="/dashboard/donations/pickups" method="GET">
                                <div className="flex flex-col"> {/* Flex container for the first column */}
                                    <label className="block text-sm font-medium text-gray-700">Sort by:</label>
                                    <br />
                                    <SelectField
                                        name="column"
                                        required
                                    >
                                        <option value={"id"}>id</option>
                                        <option value={"name"}>name</option>
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
                    {/*Displays current filters set*/}
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
                    <ExportTest rows={rows} fileName={"PICKUP DONATIONS"} sheetName={"PICKUPS"} />
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Donor Name</Th>
                                <Th>Status</Th>
                                <Th>Date</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {items?.map(item =>
                                <Tr key={item.id}>
                                    <>
                                        {item.donor_id ?
                                            (<Td>{item.decrypted_donor?.decrypted_name}</Td>) :
                                            (<Td>{item.donor_name}</Td>)}
                                    </>
                                    <>
                                        {item.verify ?
                                            (<Td>VERIFIED</Td>) :
                                            (<Td>NOT VERIFIED</Td>)}
                                    </>
                                    <Td>{formatDate(item.date) + ' ' + formatTime(item.date)}</Td>
                                    <Td>
                                        <SlideOver variant="solid" color="blue" buttontext="View Details">
                                            <PickupForm id={item.id} />
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