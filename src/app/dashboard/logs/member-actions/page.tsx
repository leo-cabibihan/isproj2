// @ts-nocheck 
import supabase from "@/app/utils/supabase"
import { GetUID } from "@/app/utils/user_id"
import { Button } from "@/components/Button"
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from "@/components/Table"

const actions = [
    { name: "Myko Macawiwili", actions: "Logged in to system", date: "June 16, 2023" },
    { name: "Myko Macawiwili", actions: "Logged in to system", date: "June 16, 2023" },
    { name: "Myko Macawiwili", actions: "Logged in to system", date: "June 16, 2023" },
    { name: "Myko Macawiwili", actions: "Logged in to system", date: "June 16, 2023" },
    { name: "Myko Macawiwili", actions: "Logged in to system", date: "June 16, 2023" },
    { name: "Myko Macawiwili", actions: "Logged in to system", date: "June 16, 2023" },
]

export default async function Page() {
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
 

    const uid = await GetUID()
    const { data: charity_member, error: error_2 } = await supabase.from('charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity?.id)

    const { data: logs, error } = await supabase.from('charity_audit_log')
    .select('*, charity_member ( * ), charity ( * )')
    .eq('charity_id', charity_id)
    .order('date', {ascending: false})
    
    console.log("pain", error, logs)
    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header="Charity Actions" />
                <TableContent>
                <Table>
                        <Thead>
                            <Tr>
                                <Th>Charity Member Name</Th>
                                <Th>Action</Th>
                                <Th>Date</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {logs?.map(log =>

                                <Tr key={log.id}>
                                    <Td>{log.charity_member.member_name}</Td>
                                    <Td>{log.action}</Td>
                                    <Td>{formatDate(log.date) + ' ' + formatTime(log.date)}</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>
        </>

    )
}