import supabase from '@/app/utils/supabase';
import { Button } from '@/components/Button';
import { TextField } from '@/components/Fields';
import SlideOver from '@/components/SlideOverButton';
import { Table, TableContainer, TableHeader, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import { redirect } from 'next/navigation';
import React from 'react';

const organizations = [
    { Org: "Philippine Red Cross", Email: "redcross@gmail.com", Date: "May 5, 2023" },
    { Org: "Philippine Red Cross", Email: "redcross@gmail.com", Date: "May 5, 2023" },
    { Org: "Philippine Red Cross", Email: "redcross@gmail.com", Date: "May 5, 2023" },
    { Org: "Philippine Red Cross", Email: "redcross@gmail.com", Date: "May 5, 2023" },
    { Org: "Philippine Red Cross", Email: "redcross@gmail.com", Date: "May 5, 2023" },
    { Org: "Philippine Red Cross", Email: "redcross@gmail.com", Date: "May 5, 2023" },
]

export default async function ViewCharity() {

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
                <TableHeader header="All Charities." />
                <Table>
                    <Thead>
                        <Tr>
                            <Th>NAME</Th>
                            <Th>Email Address</Th>
                            <Th>Date Approved</Th>
                            <Th> </Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {organizations.map(org =>
                            <Tr key={org.Org}>
                                <Td>{org.Org}</Td>
                                <Td>{org.Email}</Td>
                                <Td>{org.Date}</Td>
                                <Td>
                                    <Button href={"/orgs/details"} variant="solid" color="blue" className="w-full">
                                        <span>
                                            View Profile <span aria-hidden="true">&rarr;</span>
                                        </span>
                                    </Button>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </>

    )
}