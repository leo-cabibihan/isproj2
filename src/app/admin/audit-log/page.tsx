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

    // console.log("THIS IS A USER: " + await supabase.auth.getUser())
    // console.log("THIS IS A SESSION: " + await supabase.auth.getSession())

    // //This gets the currently signed-in user
    // const { data: { user } } = await supabase.auth.getUser();
    // // console.log(user?.id)
    // const uid = user?.id
    // console.log("UID IS " + uid)

    // //This checks for the admin role
    // const { data: admin, error: error_3 } = await supabase.from('system_owner').select('*').eq('id', uid)

    // console.log("ADMIN IS " + admin)

    // //This redirects anyone that's not signed in and not admin
    // if (!user && !admin) {
    //     console.log("NOT SIGNED IN")
    //     redirect('/login')
    // }

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
                                    <Td>{log.system_owner.name}</Td>
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