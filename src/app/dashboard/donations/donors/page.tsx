//@ts-nocheck
import supabase from "@/app/utils/supabase";
import { GetUID } from "@/app/utils/user_id";
import { Button } from "@/components/Button";
import { ExportTest } from "@/components/SlideOverButton";
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from "@/components/Table";
import SlideOver from "@/components/SlideOverButton";
import { SelectField } from "@/components/Fields";

async function getDonorSummaryData(column: any, order: any, charity_id: number) {
    var data
    console.log(`RESULTS ARE SORTED BY ${column}, ORDERED BY ${order}, FROM CHARITY NUMBER ${charity_id}`)
    if ((column != null || column != undefined) || (order != null || order != undefined)) {
        const {data: donors, error} = await supabase
            .from("donor_summary")
            .select("*")
            .eq("charity_id", charity_id)
            .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        if(column === 'name'){
            const {data: donors, error} = await supabase
                .from("donor_summary")
                .select("*")
                .eq("charity_id", charity_id)
                .order('decrypted_name', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = donors
            return data
        }           
        else if(column === 'total number of donations'){
            const {data: donors, error} = await supabase
            .from("donor_summary")
            .select("*")
            .eq("charity_id", charity_id)
            .order('total_number_of_donations', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = donors
            return data
        }
        else if(column === 'total cash donated'){
            const {data: donors, error} = await supabase
            .from("donor_summary")
            .select("*")
            .eq("charity_id", charity_id)
            .order('total_cash_donated', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = donors
            return data
        }
        data = donors
    }
    else {        
        const {data: donors, error} = await supabase
            .from("donor_summary")
            .select("*")
            .eq("charity_id", charity_id)
            .order('donor_id', { ascending: true })
        data = donors
    }

    return data
}

export default async function ListofDonors({ searchParams }: any) {
    const uid = await GetUID()
    const { data: charity_member, error: error_2 } = await supabase.from('decrypted_charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity_id)
    
    const column = searchParams?.column
    const order = searchParams?.order

    console.log(`HERE ARE THE ORDERING SETTINGS: ${column} & ${order}`)

    const charityId = charity_id![0]

    const donors = await getDonorSummaryData(column, order, charityId)

    const rows = donors?.map(row => ({
        DONOR_ID: row.donor_id,
        DONOR_NAME: row.decrypted_name,
        TOTAL_CASH_DONATED: `PHP ${row.total_cash_donated}`,
        TOTAL_NUMBER_OF_DONATIONS: `${row.total_number_of_donations} DONATIONS`
    }))

    var orderby = "" //checks if order is true or false, then returns a string of ascending and descending respectively
    if (order === 'true') {
        orderby = "ascending"
    }
    else {
        orderby = "descending"
    }

    console.log("CHARITY ID IS: " + charity_id)
    //const {data: donationCount, error} = await supabase
    //.from("")

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header="List of Donors" />
                <TableContent>
                <SlideOver title="Filter & Sort Data" buttontext="Filter & Sort Data" variant="solid" color="yellow">
                        <div className="flex-col">
                            <form className='flex flex-col w-full gap-y-6' action="/dashboard/donations/donors" method="GET">
                                <div className="flex flex-col"> {/* Flex container for the first column */}
                                    <label className="block text-sm font-medium text-gray-700">Sort by:</label>
                                    <br />
                                    <SelectField
                                        name="column"
                                        required
                                    >
                                        <option value={"donor_id"}>id</option>
                                        <option value={"name"}>name</option>
                                        <option value={"total number of donations"}>total number of donations</option>
                                        <option value={"total cash donated"}>total cash donated</option>
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
                    <ExportTest rows={rows} fileName={"DONORS LIST"} sheetName={"DONORS"} />
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Donor Name</Th>
                                <Th>Number of Donations Made</Th>
                                <Th>Total Cash Donated</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {donors?.map(donor =>
                                <Tr key={donor.donor_id}>
                                    <Td>{donor.decrypted_name}</Td>
                                    <Td>{donor.total_number_of_donations}</Td>
                                    <Td>{donor.total_cash_donated}</Td>
                                    <Td>
                                        <Button href={"/dashboard/donations/donors/" + donor.donor_id} variant="solid" color="blue">View Details</Button>
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