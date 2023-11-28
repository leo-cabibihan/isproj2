// @ts-nocheck 
import supabase from '@/app/utils/supabase';
import { Button } from '@/components/Button';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, TableHeader, TableContent } from '@/components/Table';
import React from 'react';
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { GetUID } from '@/app/utils/user_id';

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
 

    const uid = await GetUID()
    
    console.log('UID is: ' + uid)

    const { data: actions } = await supabase.from('decrypted_admin_audit_log').select('*, system_owner ( id, name )').eq('admin_id', uid).order('date', {ascending: false})

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header="Action History" />
                <TableContent>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Admin Name</Th>
                                <Th>Action</Th>
                                <Th>Date</Th>
                                <Th> </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {actions?.map(action =>
                                <Tr key={action.id}>
                                    <Td>{action.system_owner?.name}</Td>
                                    <Td>{action.decrypted_action}</Td>
                                    <Td>{formatDate(action.date) + ' ' + formatTime(action.date)}</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>
        </>

    )
}