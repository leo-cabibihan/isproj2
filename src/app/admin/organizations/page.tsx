import supabase from '@/app/utils/supabase';
import { Button } from '@/components/Button';
import { TextField } from '@/components/Fields';
import SlideOver from '@/components/SlideOverButton';
import { Table, TableContainer, TableHeader, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import { redirect } from 'next/navigation';
import React from 'react';

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

    const { data: organizations } = await supabase.from('charity').select('*').eq('charity_verified', true)

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
                            <Th>Org Name</Th>
                            <Th>Phone Number</Th>
                            <Th>Email Address</Th>
                            <Th>Verified?</Th>
                            <Th> </Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {organizations?.map(org =>
                            <Tr key={org.id}>
                                <Td>{org.name}</Td>
                                <Td>{org.charity_phone}</Td>
                                <Td>{org.email_address}</Td>
                                <Td>{org.harity_verified}</Td>
                                <Td>
                                    <Button href={"/view-charity/" + org.id + "/"} variant="solid" color="blue" className="w-full">
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