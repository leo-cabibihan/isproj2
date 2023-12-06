//@ts-nocheck
import { Button } from '@/components/Button';
import React from 'react';
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import { TextField } from '@/components/Fields';
import SlideOver, { ExportTest } from '@/components/SlideOverButton';
import supabase from '@/app/utils/supabase';
import { redirect } from 'next/navigation';
import { revalidatePath } from "next/cache";

export const revalidate = 0;

export default async function Auditlog() {
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


    const { data: logs } = await supabase.from('admin_actions').select('*').order('date', { ascending: false })
    //.order('date', {ascending: false}) <-- If you want the most recent log to be on top of the list.

    //CASH DATA, FORMATTED FOR EXPORTING
    const rows = logs?.map(row => ({
        RECORD_ID: row.id,
        MEMBER: row.decrypted_name,
        ACTION_TAKEN: row.decrypted_action,
        DATE: formatDate(row.date) + ' ' + formatTime(row.date)
    }))

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>
            <TableContainer>
                <TableHeader header="Audit Logs" />
                <TableContent>
                    <ExportTest rows={rows} fileName={"ADMIN AUDIT LOG"} sheetName={"LOGS"} />
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Admin Name</Th>
                                <Th>Action</Th>
                                <Th>Date</Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {logs?.map(log =>

                                <Tr key={log.id}>
                                    <Td>{log.decrypted_name}</Td>
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