//@ts-nocheck
import supabase from '@/app/utils/supabase';
import { Button } from '@/components/Button';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, TableHeader, TableContent } from '@/components/Table';
import React from 'react';
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { GetUID } from '@/app/utils/user_id';
import { ExportTest } from '@/components/SlideOverButton';
import SlideOver from '@/components/SlideOverButton';
import { SelectField } from '@/components/Fields';

export const revalidate = 0;

async function getProfileHistoryData(column: any, order: any, uid: any) {
    var data
    if ((column != null || column != undefined) || (order != null || order != undefined)) {
        const { data: actions } = await supabase.from('admin_actions')
            .select('*')
            .eq('id', uid)
            .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
      data = actions
    }
    else {
        const { data: actions } = await supabase.from('admin_actions')
            .select('*')
            .eq('id', uid)
            .order('date', { ascending: false })
        data = actions
    }
    return data
  }

export default async function Auditlog({ searchParams }: any) {
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

    const column = searchParams?.column
    const order = searchParams?.order

    const uid = await GetUID()
    console.log('UID is: ' + uid)
    const { data: admin_id } = await supabase.from('admin_actions')
    .select('*')
    .eq('id', uid)

    const actions = await getProfileHistoryData(column, order, uid)

    var orderby = "" //checks if order is true or false, then returns a string of ascending and descending respectively
    if (order === 'true') {
        orderby = "ascending"
    }
    else {
        orderby = "descending"
    }

    const name = actions?.map(action => action.decrypted_name)

    const rows = actions?.map(row => ({
        RECORD_ID: row.id,
        MEMBER: row.decrypted_name,
        ACTION_TAKEN: row.decrypted_action,
        DATE: formatDate(row.date) + ' ' + formatTime(row.date)
    }))

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header="Action History" />
                <TableContent>
                    <SlideOver title="Filter & Sort Data" buttontext="Filter & Sort Data" variant="solid" color="yellow">
                        <div className="flex-col">
                            <form className='flex flex-col w-full gap-y-6' action="/admin/profilehistory" method="GET">
                                <div className="flex flex-col"> {/* Flex container for the first column */}
                                    <label className="block text-sm font-medium text-gray-700">Sort by:</label>
                                    <br />
                                    <SelectField
                                        name="column"
                                        required
                                    >
                                        <option value={"id"}>id</option>
                                        <option value={"date"}>date</option>
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
                    <ExportTest rows={rows} fileName={`ADMIN's AUDIT LOG`} sheetName={"LOGS"} />
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
                                    <Td>{action.decrypted_name}</Td>
                                    <Td>{action.decrypted_action}</Td>
                                    <Td>{formatDate(action.date) + ' ' + formatTime(action.date)}</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>
        </>

    )
}