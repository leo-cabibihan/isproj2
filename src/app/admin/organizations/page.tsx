//@ts-nocheck
import supabase from '@/app/utils/supabase';
import { Button } from '@/components/Button';
import { TextField } from '@/components/Fields';
import SlideOver, { ExportTest } from '@/components/SlideOverButton';
import { Table, TableContainer, TableHeader, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function ViewCharity() {

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

    const { data: organizations } = await supabase.from('charity').select('*, address ( * )').eq('charity_verified', true).order('created_at', { ascending: false })

    //CASH DATA, FORMATTED FOR EXPORTING
    const rows = organizations?.map(row => ({
        CHARITY_ID: row.id,
        NAME: row.name,
        ABOUT: row.about,
        PHONE: row.charity_phone,
        EMAIL: row.email_address,
        ADDRESS: JSON.stringify(row.address),
        DATE_JOINED: formatDate(row.created_at) + ' ' + formatTime(row.created_at)
    }))

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header="All Verified Charities" />
                <ExportTest rows={rows} fileName={'APPROVED CHARITIES'} sheetName={"ORGS"} />
                <Table>
                    <Thead>
                        <br />
                        <Tr>
                            <Th>Organization Name</Th>
                            <Th>Phone Number</Th>
                            <Th>Email Address</Th>
                            <Th> </Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {organizations?.map(org =>
                            <Tr key={org.id}>
                                <Td>{org.name}</Td>
                                <Td>{org.charity_phone}</Td>
                                <Td>{org.email_address}</Td>
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