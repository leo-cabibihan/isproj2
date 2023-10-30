import supabase from "@/app/utils/supabase";
import { GetUID } from "@/app/utils/user_id";
import { Button } from "@/components/Button";
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from "@/components/Table";

const people = [
    { DonorName: 'Jack Walton', NumberofDonations: '40', Total: '20,203' },
    { DonorName: 'Mark Yang', NumberofDonations: '21', Total: '20,023' },

    // More people...
];


export default async function ListofDonors() {
    const uid = await GetUID()
    const { data: charity_member, error: error_2 } = await supabase.from('charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity_id)

    const {data: donors, error} = await supabase
    .from("donor_summary")
    .select("*")
    .eq("charity_id", charity_id)

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
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Donor Name</Th>
                                <Th>Number of Donations Made</Th>
                                <Th>Total Cash Donated</Th>
                                <Th> </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {donors?.map(donor =>
                                <Tr key={donor.donor_id}>
                                    <Td>{donor.name}</Td>
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