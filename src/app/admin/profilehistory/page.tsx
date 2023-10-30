import supabase from '@/app/utils/supabase';
import { Button } from '@/components/Button';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, TableHeader, TableContent } from '@/components/Table';
import React from 'react';
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { GetUID } from '@/app/utils/user_id';

export const revalidate = 0;

export default async function Auditlog() {

    const uid = await GetUID()
    
    console.log('FUUUUUUUUCK' + uid)

    //RED IS JUST TS BEING A BITCH SO IGNORE IT.
    const { data: actions } = await supabase.from('admin_audit_log').select('*, system_owner ( id, name )').eq('admin_id', uid)

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
                                    <Td>{action.action}</Td>
                                    <Td>{action.date}</Td>
                                    <Td>
                                        <Button variant='solid' color='blue' href="#">View Profile</Button>
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