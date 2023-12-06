// @ts-nocheck 
import supabase from "@/app/utils/supabase";
import { GetUID } from "@/app/utils/user_id";
import SlideOver from "@/components/SlideOverButton";
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from "@/components/Table";
import { SelectField } from "@/components/Fields";
import { Button } from "@/components/Button";
import { ExportTest } from "@/components/SlideOverButton";


async function getDonorHistoryData(column: any, order: any, charity_id: number, donorID: number) {
    var data
    console.log(`RESULTS ARE SORTED BY ${column}, ORDERED BY ${order}, FROM CHARITY NUMBER ${charity_id}`)
    if ((column != null || column != undefined) || (order != null || order != undefined)) {
        const {data: donor_history, error: donor_historyError} = await supabase
            .from("donor_transaction_history")
            .select("*")
            .eq("donor_id", donorID)
            .eq("charity_id", charity_id)
            .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        if(column === 'donation date'){
            const {data: donor_history, error: donor_historyError} = await supabase
                .from("donor_transaction_history")
                .select("*")
                .eq("donor_id", donorID)
                .eq("charity_id", charity_id)
                .order('donation_date', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = donor_history
            return data
        }
        if(column === 'event name'){
            const {data: donor_history, error: donor_historyError} = await supabase
                .from("donor_transaction_history")
                .select("*")
                .eq("donor_id", donorID)
                .eq("charity_id", charity_id)
                .order('event_name', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = donor_history
            return data
        }
        data = donor_history
    }
    else {        
        const {data: donor_history, error: donor_historyError} = await supabase
            .from("donor_transaction_history")
            .select("*")
            .eq("donor_id", donorID)
            .eq("charity_id", charity_id)
            .order('donation_date', { ascending: true })
        data = donor_history
    }

    return data
}

export default async function DonorHistory({params, searchParams} : any) {
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

    const donorID = params.id
    const uid = await GetUID()
    const { data: charity_member, error: error_2 } = await supabase.from('decrypted_charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity_id)
    //const { data: charity_member, error: error_2 } = await supabase.from('charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const column = searchParams?.column
    const order = searchParams?.order

    console.log(`HERE ARE THE ORDERING SETTINGS: ${column} & ${order}`)

    const charityId = charity_id![0]
    const donor_history = await getDonorHistoryData(column, order, charityId, donorID)

    const rows = donor_history?.map(row => ({
        DONOR_ID: row.donor_id,
        EVENT_NAME: row.event_name,
        DONATION_TYPE: row.donation_type,
        DATE_DONATED: formatDate(row.donation_date) + ' ' + formatTime(row.donation_date)
    }))
    
    var orderby = "" //checks if order is true or false, then returns a string of ascending and descending respectively
    if (order === 'true') {
        orderby = "ascending"
    }
    else {
        orderby = "descending"
    }

    const {data: donors, error} = await supabase
    .from("donor_summary")
    .select("*")
    .eq("donor_id", donorID)
    .limit(1)
 
    console.log("donor_id is: " + donorID)
    
    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
            </div>
            </div>

            <TableContainer>
                {donors?.map(donor =>
                <>
                <TableHeader key={donor.donor_id} header={donor.decrypted_name + "'s History"} />
                    <TableContent>
                    <SlideOver title="Filter & Sort Data" buttontext="Filter & Sort Data" variant="solid" color="yellow">
                        <div className="flex-col">
                            <form className='flex flex-col w-full gap-y-6' action={"/dashboard/donations/donors/" + donor.donor_id} method="GET">
                                <div className="flex flex-col"> {/* Flex container for the first column */}
                                    <label className="block text-sm font-medium text-gray-700">Sort by:</label>
                                    <br />
                                    <SelectField
                                        name="column"
                                        required
                                    >
                                        <option value={"event name"}>event name</option>
                                        <option value={"donation date"}>donation date</option>
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
                    <ExportTest rows={rows} fileName={`${donor.decrypted_name}'s DONATION HISTORY`} sheetName={"DONORS"} />
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Event Name</Th>
                                    <Th>Donation Type</Th>
                                    <Th>Date Donated</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {donor_history?.map(donor_history =>
                                <Tr key={donor_history.donor_id}>
                                    <Td>{donor_history.event_name}</Td>
                                    <Td>{donor_history.donation_type}</Td>
                                    <Td>{formatDate(donor_history.donation_date) + ' ' + formatTime(donor_history.donation_date)}</Td>
                                </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContent>
                </>
                )}
            </TableContainer>
        </>
    )
}
