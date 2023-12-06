//@ts-nocheck
import supabase from '@/app/utils/supabase';
import { Button } from '@/components/Button';
import { TextField } from '@/components/Fields';
import SlideOver, { ExportTest } from '@/components/SlideOverButton';
import { Table, TableContainer, TableHeader, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import { redirect } from 'next/navigation';
import React from 'react';
import { SelectField } from '@/components/Fields';

async function getCharityData(column: any, order: any, charity_id: number) {
    var data
    console.log(`RESULTS ARE SORTED BY ${column}, ORDERED BY ${order}, FROM CHARITY NUMBER ${charity_id}`)
    if ((column != null || column != undefined) || (order != null || order != undefined)) {
        const { data: organizations } = await supabase.from('charity')
            .select('*, address ( * )')
            .eq('charity_verified', true)
            .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        if(column === 'organization name'){
            const { data: organizations } = await supabase.from('charity')
                .select('*, address ( * )')
                .eq('charity_verified', true)
                .order('name', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = organizations
            return data
        }
        else if(column === 'date joined'){
            const { data: organizations } = await supabase.from('charity')
            .select('*, address ( * )')
            .eq('charity_verified', true)
            .order('created_at', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        data = organizations
        return data
        }
        data = organizations
    }
    else {
        const { data: organizations } = await supabase.from('charity')
            .select('*, address ( * )')
            .eq('charity_verified', true)
            .order('created_at', { ascending: false })
        data = organizations
    }

    return data
}

export default async function ViewCharity({ searchParams }: any) {

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

    const { data: organizations_id } = await supabase.from('charity')
    .select('*, address ( * )')
    .eq('charity_verified', true)
    .order('created_at', { ascending: false })

    const charity_id = organizations_id?.map(org => org.id)

    const column = searchParams?.column
    const order = searchParams?.order

    console.log(`HERE ARE THE ORDERING SETTINGS: ${column} & ${order}`)
    
    const organizations = await getCharityData(column, order, charity_id)

    var orderby = "" //checks if order is true or false, then returns a string of ascending and descending respectively
    if (order === 'true') {
        orderby = "ascending"
    }
    else {
        orderby = "descending"
    }


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
                <br/>
                <SlideOver title="Filter & Sort Data" buttontext="Filter & Sort Data" variant="solid" color="yellow">
                        <div className="flex-col">
                            <form className='flex flex-col w-full gap-y-6' action="/admin/organizations" method="GET">
                                <div className="flex flex-col"> {/* Flex container for the first column */}
                                    <label className="block text-sm font-medium text-gray-700">Sort by:</label>
                                    <br />
                                    <SelectField
                                        name="column"
                                        required
                                    >
                                        <option value={"id"}>id</option>
                                        <option value={"organization name"}>organization name</option>
                                        <option value={"date joined"}>date joined</option>
                                    </SelectField>
                                </div>
                                <div className="flex mt-4 gap-x-5 items-center"> {/* Flex container for the second column */}
                                    <label className="block text-sm font-medium text-gray-700">Order as:</label>
                                    <div className="flex gap-x-4 items-center">
                                        <div className="flex items-center">
                                            <input
                                                id="option1"
                                                name="order"
                                                type="radio"
                                                value={true}
                                                checked
                                                className="h-4 w-4 border-gray-300 text-green-700 focus:ring-green-700"
                                            />
                                            <label htmlFor="option1" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                                Ascending
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="option2"
                                                name="order"
                                                type="radio"
                                                value={false}
                                                className="h-4 w-4 border-gray-300 text-green-700 focus:ring-green-700"
                                            />
                                            <label htmlFor="option2" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                                Descending
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center mt-4'> {/* Flex container for the third column */}
                                    <Button type='submit' variant='solid' color='green' className='w-64'>
                                        <span>
                                            Apply Changes <span aria-hidden="true">&rarr;</span>
                                        </span>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </SlideOver>
                    <br/>
                    {/*Displays current filters set*/}
                    <div className="font-bold mt-4 mb-4">
                        {column && order ? (
                            <>
                                <p className="text-green-700 inline">Current Filters: </p>
                                <span>Sorted by: {column} <span className="text-green-700">::</span> Ordered by: {orderby}</span>
                            </>
                        ) : (
                            <p className="text-gray-600 italic">No filters currently active</p>
                        )}
                    </div>
                <ExportTest rows={rows} fileName={'APPROVED CHARITIES'} sheetName={"ORGS"} />
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Organization Name</Th>
                            <Th>Phone Number</Th>
                            <Th>Email Address</Th>
                            <Th>Date Joined</Th>
                            <Th> </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {organizations?.map(org =>
                            <Tr key={org.id}>
                                <Td>{org.name}</Td>
                                <Td>{org.charity_phone}</Td>
                                <Td>{org.email_address}</Td>
                                <Td>{formatDate(org.created_at) + ' ' + formatTime(org.created_at)}</Td>
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