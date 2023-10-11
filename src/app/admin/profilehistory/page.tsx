import supabase from '@/app/utils/supabase';
import { Button } from '@/components/Button';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, TableHeader, TableContent } from '@/components/Table';
import React from 'react';
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

export const revalidate = 0;

export default async function Auditlog() {

    //This gets the currently signed-in user
    const { data: { user } } = await supabase.auth.getUser();
    // console.log(user?.id)
    const uid = user?.id
    console.log("UID IS " + uid)

    //This checks for the admin role
    const { data: admin, error: error_3 } = await supabase.from('system_owner').select('*').eq('id', uid)

    console.log("ADMIN IS " + admin)

    //This redirects anyone that's not signed in and not admin
    if (!user && !admin) {
        console.log("NOT SIGNED IN")
        redirect('/login')
    }

    const { data: actions } = await supabase.from('admin_audit_log').select('*, system_owner ( id, name )').eq('id', uid)

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
                                    <Td>{action.system_owner.name}</Td>
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