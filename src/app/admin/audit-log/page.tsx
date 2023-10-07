import { Button } from '@/components/Button';
import React from 'react';
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import { TextField } from '@/components/Fields';
import SlideOver from '@/components/SlideOverButton';
import supabase from '@/app/utils/supabase';
import { redirect } from 'next/navigation';

const logs = [
    { AdminName: "Myko Macawiwili", Actions: "Freeze Charity 'Tulong Lasalyano'.", Date: "June 16, 2023" },
    { AdminName: "Myko Macawiwili", Actions: "Freeze Charity 'Tulong Lasalyano'.", Date: "June 16, 2023" },
    { AdminName: "Myko Macawiwili", Actions: "Freeze Charity 'Tulong Lasalyano'.", Date: "June 16, 2023" },
    { AdminName: "Myko Macawiwili", Actions: "Freeze Charity 'Tulong Lasalyano'.", Date: "June 16, 2023" },
    { AdminName: "Myko Macawiwili", Actions: "Freeze Charity 'Tulong Lasalyano'.", Date: "June 16, 2023" },
]

export default async function Auditlog() {

    // console.log("THIS IS A USER: " + await supabase.auth.getUser())
    // console.log("THIS IS A SESSION: " + await supabase.auth.getSession())

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
                                <Th>NAME</Th>
                                <Th>Email Address</Th>
                                <Th>Date Filed</Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {logs.map(log =>

                                <Tr key={log.AdminName}>
                                    <Td>{log.AdminName}</Td>
                                    <Td>{log.Actions}</Td>
                                    <Td>{log.Date}</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>
        </>

    )
}