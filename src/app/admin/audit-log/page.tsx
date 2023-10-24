import { Button } from '@/components/Button';
import React from 'react';
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import { TextField } from '@/components/Fields';
import SlideOver from '@/components/SlideOverButton';
import supabase from '@/app/utils/supabase';
import { redirect } from 'next/navigation';
import { revalidatePath } from "next/cache";

export const revalidate = 0;

export default async function Auditlog() {

    const { data: logs } = await supabase.from('admin_audit_log').select('*, system_owner ( id, name )')

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>
            <TableContainer>
                <TableHeader header="Audit Log" />
                <TableContent>
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
                                    <Td>{log.system_owner?.name}</Td>
                                    <Td>{log.action}</Td>
                                    <Td>{log.date}</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>
        </>
    )
}