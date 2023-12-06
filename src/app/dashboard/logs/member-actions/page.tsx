//@ts-nocheck
import supabase from "@/app/utils/supabase"
import { GetUID } from "@/app/utils/user_id"
import { Button } from "@/components/Button"
import { ExportTest } from "@/components/SlideOverButton"
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
    const { data: charity_member, error: error_2 } = await supabase.from('decrypted_charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity?.id)
    const charity_name = charity_member?.map(member => member.charity?.name)

    const { data: logs, error } = await supabase.from('charity_member_actions')
        .select('*')
        .eq('charity_id', charity_id)
        .order('date', { ascending: false })

    //CASH DATA, FORMATTED FOR EXPORTING
    const rows = logs?.map(row => ({
        RECORD_ID: row.id,
        MEMBER: row.decrypted_member_name,
        ACTION_TAKEN: row.decrypted_action,
        DATE: formatDate(row.date) + ' ' + formatTime(row.time)
    }))

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
                    <ExportTest rows={rows} fileName={`${charity_name}'s AUDIT LOG`} sheetName={"LOG"} />
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
                                    <Td>{log.decrypted_member_name}</Td>
                                    <Td>{log.decrypted_action}</Td>
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