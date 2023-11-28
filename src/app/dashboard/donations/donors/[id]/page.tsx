// @ts-nocheck 
import supabase from "@/app/utils/supabase";
import { GetUID } from "@/app/utils/user_id";
import SlideOver from "@/components/SlideOverButton";
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from "@/components/Table";
import { useParams, useRouter } from "next/navigation";




const people = [
    { EventName: 'Yolanda', DonationType: 'InKind Donation', Date: 'January 20,2030' },
    { EventName: 'Yolanda', DonationType: 'Cash Donation', Date: 'January 20,2030' },

    // More people...
];


export default async function DonorHistory({params} : any) {
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

    const {data: donors, error} = await supabase
    .from("donor_summary")
    .select("*")
    .eq("donor_id", donorID)
    .limit(1)

    const {data: donor_history, error: donor_historyError} = await supabase
    .from("donor_transaction_history")
    .select("*")
    .eq("donor_id", donorID)
    .eq("charity_id", charity_id)
    
 
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
                <TableHeader key={donor.donor_id} header={donor.name + "'s History"} />
                    <TableContent>
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
