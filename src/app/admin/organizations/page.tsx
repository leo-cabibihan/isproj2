// @ts-nocheck 
import supabase from '@/app/utils/supabase';
import { Button } from '@/components/Button';
import { TextField } from '@/components/Fields';
import SlideOver from '@/components/SlideOverButton';
import { Table, TableContainer, TableHeader, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function ViewCharity() {

    const { data: organizations } = await supabase.from('charity').select('*').eq('charity_verified', true)

    return ( 
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header="All Verified Charities" />
                <Table>
                    <Thead>
                        <br/>
                        <Tr>
                            <Th>Organization Name</Th>
                            <Th>Phone Number</Th>
                            <Th>Email Address</Th>
                            <Th>Status</Th>
                            <Th> </Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {organizations?.map(org =>
                            <Tr key={org.id}>
                                <Td>{org.name}</Td>
                                <Td>{org.charity_phone}</Td>
                                <Td>{org.email_address}</Td>
                                <Td>{org.verification_status}</Td>
                                <Td>
                                    <Button href={"/admin/view-charity/" + org.id + "/"} variant="solid" color="blue" className="w-full">
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