//@ts-nocheck

import { CharityLog } from '@/app/admin/audit-log/function';
import { NumberValidation } from '@/app/utils/input_validation';
import supabase from '@/app/utils/supabase';
import { GetUID } from '@/app/utils/user_id';
import { handleTableExport } from '@/app/utils/xlsx';
import { Button } from '@/components/Button';
import { DisplayMessage } from '@/components/DisplayMessage';
import { ExportButton } from '@/components/Export';
import { Message } from '@/components/Feedback';
import { SelectField, TextField } from '@/components/Fields'
import { ImageUpload } from '@/components/ImgUpload';
import SlideOver, { ExportTest } from '@/components/SlideOverButton';
import { TableContainer, TableHeaderButton, TableContent, Table, Thead, Tr, Th, Tbody, Td } from '@/components/Table';
import { CashReceiptEmail } from '@/components/email-template';
import Plunk from '@plunk/node';
import { render } from '@react-email/render';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import React from 'react';

const plunk = new Plunk("sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db");



export const revalidate = 0;

async function getCashData(column: any, order: any, charity_id: number) {
    var data
    console.log(`RESULTS ARE SORTED BY ${column}, ORDERED BY ${order}, FROM CHARITY NUMBER ${charity_id}`)
    if ((column != null || column != undefined) || (order != null || order != undefined)) {
        const { data: cash, error: cash_error } = await supabase.from('cash')
            .select('*, charity ( id, name ), decrypted_donor ( id, decrypted_name ), event( id, name )')
            .eq('charity_id', charity_id)
            .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        data = cash
    }
    else {
        const { data: cash, error: cash_error } = await supabase.from('cash')
            .select('*, charity ( id, name ), decrypted_donor ( id, decrypted_name ), event( id, name )')
            .eq('charity_id', charity_id)
            .order("id", { ascending: true })
        data = cash
    }

    return data
}

var message = ""
var messageType = ""
var heading = ""

export default async function ExternalTable({ searchParams }: any) {



    console.log("DO SEARCHPARAMS WORK? ", searchParams)
    console.log(`PARAMS SIZE IS ${Object.keys(searchParams).length}`)

    const paramSize = Object.keys(searchParams).length

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

    console.log("DOES IT WORK???? MAYBE: " + await GetUID())

    const uid = await GetUID()
    const { data: charity_member, error: error_2 } = await supabase.from('decrypted_charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity?.id)

    const column = searchParams?.column
    const order = searchParams?.order

    console.log(`HERE ARE THE ORDERING SETTINGS: ${column} & ${order}`)

    const charityId = charity_id![0]

    //CASH DATA, RETURNED AS RAW JSON.
    const cash = await getCashData(column, order, charityId)

    //CASH DATA, FORMATTED FOR EXPORTING
    const rows = cash?.map(row => ({
        RECORD_ID: row.id,
        CASH_AMOUNT: row.amount,
        TRANSACTION_DATE: formatDate(row.date) + ' ' + formatTime(row.date),
        CHARITY_DONATED_TO: row.charity?.name,
        SOURCE: row.is_external ? "EXTERAL SOURCE" : "DONATIONS",
        DONATED_BY: row.decrypted_donor?.decrypted_name,
        EVENT_DONATED_TO: row.event?.name
    }))

    console.log("CASH DATA LOOKS LIKE THIS: ", cash)
    console.log("MEANWHILE, FORMATTED DATA LOOKS LIKE THIS: ", rows)

    var orderby = "" //checks if order is true or false, then returns a string of ascending and descending respectively
    if (order === 'true') {
        orderby = "ascending"
    }
    else {
        orderby = "descending"
    }

    const { data: event } = await supabase
        .from('event')
        .select('*')
        .eq('charity_id', charityId).eq('is_ongoing', true).eq('approval_status', 'APPROVED')
        .order("id", { ascending: true })

    const { data, error } = await supabase.from('cash')
        .select('*')
        .eq('charity_id', charityId)
        .order("id", { ascending: false }).limit(1)

    const cash_id = data?.map(post => post.id)

    const handleSubmit = async (formData: FormData) => {
        'use server'

        const amount_input = Number(formData.get('amount'))
        const valid_amount = NumberValidation(amount_input)

        if (valid_amount) {

            const cash = {
                amount: formData.get('amount'),
                date: formData.get('date'),
                charity_id: charityId,
                is_external: true,
                event_id: formData.get('event')

            }

            const { data, error } = await supabase.from('cash').insert(cash).select()

            if (error) {
                message = `Failed to Add External Income. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
                messageType = "ERROR"
                heading = "Data not Added."
            }
            else {
                message = "External Income has been added to the system."
                messageType = "SUCCESS"
                heading = "Record Added."
                await CharityLog("ADDED EXTERNAL INCOME WORTH PHP " + data![0].amount, error)
            }

            revalidatePath('/');

        }
        else {
            const error_msg = "Invalid Inputs. Number must be non-negative."
            message = error_msg
            messageType = "ERROR"
            heading = "Invalid Input."
            revalidatePath('/');
        }

    };

    const saveChanges = async (formData: FormData) => {
        'use server'

        const amount_input = Number(formData.get('amount'))
        const valid_amount = NumberValidation(amount_input)

        if (valid_amount) {

            const cashID = formData.get("id")
            const cash = {
                amount: formData.get('amount'),
                date: formData.get('date'),
                charity_id: charityId,
                is_external: true,
                event_id: formData.get('event')
            }

            const { data, error } = await supabase.from('cash').update(cash).eq("id", cashID).select()

            if (error) {
                message = `Failed to Update Record. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
                messageType = "ERROR"
                heading = "Record not Updated."
            }
            else {
                message = "Record Updated Successfully."
                messageType = "SUCCESS"
                heading = "Record Updated."
                await CharityLog("EDITED EXTERNAL INCOME WORTH PHP " + data![0].amount, error)
            }

            revalidatePath('/');

        }
        else {
            const error_msg = "Invalid Inputs. Number must be non-negative."
            message = error_msg
            messageType = "ERROR"
            heading = "Invalid Input."
            revalidatePath('/');
        }

    };

    const deletePost = async (formData: FormData) => {
        'use server'
        const cashID = formData.get("id")

        const { data, error } = await supabase.from('cash').delete().eq("id", cashID).select()

        if (error) {
            message = `Failed to Delete Record. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
            messageType = "ERROR"
            heading = "Record not Deleted."
        }
        else {
            message = "Record Deleted Successfully."
            messageType = "SUCCESS"
            heading = "Record Deleted."
            await CharityLog("DELETED EXTERNAL INCOME " + data![0].id, error)
        }
        revalidatePath('/');
    };

    const emailReceipt = async (formData: FormData) => {
        'use server'

        const { data, error: email_error } = await supabase.from('decrypted_users').select('decrypted_email').eq('id', formData.get("donor_id"))

        const details = {
            amount: formData.get("amount"),
            donor: formData.get("donor"),
            date: formData.get("date"),
            charity: formData.get("charity"),
            event: formData.get("event")
        }

        const body = render(<CashReceiptEmail heading={"YOUR DONATION RECEIPT"}
            content={details} />);

        const success = await plunk.emails.send({
            to: data![0].decrypted_email as string,
            subject: "THANK YOU!",
            body,
        })
        

        if (!success) {
            message = `Failed to Email Cash Receipt.`
            messageType = "ERROR"
            heading = "Receipt not Sent."
        }
        else {
            message = "Receipt Sent Successfully."
            messageType = "SUCCESS"
            heading = "Record Sent."
        }
        revalidatePath('/');
        console.log("SUCCESS??? ", success)
    }

    const handleExport = async (rows: any, fileName: any) => {

        const rawResponse = await fetch(
            `https://isproj2.vercel.app/dashboard/donations/cash/post`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rows: rows,
                    file_name: fileName
                }),
            },
        )
    }

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeaderButton header="Cash">
                    <SlideOver title="Add External Income" buttontext="Add External Income" variant="solid" color="blue">
                        <form className="py-4" action={handleSubmit} method='POST'>
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                        <div className='sm:col-span-1'></div>
                                        <div className="sm:col-span-5">

                                            <TextField
                                                label="Amount"
                                                name="amount"
                                                type="number"
                                                autoComplete="number"
                                                required
                                            />
                                            <br />
                                            <div className="sm:col-span-4">
                                                <TextField
                                                    label="Date Donated"
                                                    name="date"
                                                    type="Date"
                                                    autoComplete="Date"
                                                    required
                                                    max={new Date().toISOString().split('T')[0]}
                                                />
                                                <br />
                                                <SelectField
                                                    label='Assign to Event'
                                                    name="event"
                                                    required
                                                >
                                                    {event?.map(event => (
                                                        <option key={event.id} value={event.id}>{event.name}</option>
                                                    ))}
                                                </SelectField>
                                                <br />
                                                <div className="col-span-full">
                                                    <ImageUpload folderName="cash" charityID={charityId} recordID={cash_id![0] + 1} labelText="Upload Receipt/s" />
                                                </div>
                                                <br />
                                                <div className="flex justify-center">
                                                    <Button type='submit' variant='solid' color='blue' style={{ width: '80%' }} className="mx-auto">Submit</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        {/* <DisplayMessage content={message} type={messageType} heading={heading} /> */}
                    </SlideOver>
                </TableHeaderButton>
                <TableContent>
                    <SlideOver title="Filter & Sort Data" buttontext="Filter & Sort Data" variant="solid" color="yellow">
                        <div className="flex-col">
                            <form className='flex flex-col w-full gap-y-6' action="/dashboard/donations/cash" method="GET">
                                <div className="flex flex-col"> {/* Flex container for the first column */}
                                    <label className="block text-sm font-medium text-gray-700">Sort by:</label>
                                    <br />
                                    <SelectField
                                        name="column"
                                        required
                                    >
                                        <option value={"id"}>id</option>
                                        <option value={"amount"}>amount</option>
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
                    <br />
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
                    {/* BUTTON TO EXPORT FILE */}
                    <ExportTest rows={rows} fileName={"CASH"} sheetName={"CASH DONATIONS"} />
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Source</Th>
                                <Th>Amount</Th>
                                <Th>Date</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cash?.map(cash =>
                                <Tr key={cash.id}>
                                    {cash.is_external ? (
                                        <Td>EXTERNAL</Td>
                                    ) : (
                                        <Td>{cash.decrypted_donor?.decrypted_name}</Td>
                                    )}
                                    <Td>{cash.amount}</Td>
                                    <Td>{formatDate(cash.date) + ' ' + formatTime(cash.date)}</Td>
                                    <Td>
                                        {cash.is_external ?
                                            (
                                                <SlideOver title="Edit External Income" variant="solid" color="blue" buttontext="Edit External Income">
                                                    <form className="py-1" action={saveChanges} method='PUT'>
                                                        <div className="space-y-12">
                                                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                                                                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                                                    <div className='sm:col-span-1'></div>
                                                                    <div className="sm:col-span-5">
                                                                        <TextField
                                                                            label=""
                                                                            name="id"
                                                                            type="hidden"
                                                                            defaultValue={cash.id}
                                                                            required
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                            label="Amount"
                                                                            name="amount"
                                                                            type="number"
                                                                            defaultValue={cash.amount}
                                                                            required
                                                                        />
                                                                        <div className="sm:col-span-4 py-5">
                                                                            <TextField
                                                                                label="Date Donated"
                                                                                name="date"
                                                                                type="Date"
                                                                                autoComplete="Date"
                                                                                required
                                                                                max={new Date().toISOString().split('T')[0]}
                                                                            />
                                                                            <br />
                                                                            <SelectField
                                                                                label='Assign to Event'
                                                                                name="event"
                                                                                required
                                                                            >
                                                                                {event?.map(event => (
                                                                                    <option key={event.id} value={event.id}>{event.name}</option>
                                                                                ))}
                                                                            </SelectField>
                                                                            <br />
                                                                            <div className="col-span-full">
                                                                                <ImageUpload folderName="cash" charityID={charityId} recordID={cash.id} labelText="Upload Receipt/s" />
                                                                            </div>
                                                                            <div className="mt-6 flex items-center justify-start gap-x-6">
                                                                                <Button type='submit' variant='solid' color='blue' className="w-full">Save Changes</Button>
                                                                            </div>
                                                                            <div className="mt-6 flex items-center justify-start gap-x-6">
                                                                                <Button type="submit" variant="solid" color="red" className="w-full" formAction={deletePost}>Delete</Button>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    {/* <DisplayMessage content={message} type={messageType} heading={heading} /> */}
                                                </SlideOver>
                                            ) :
                                            (
                                                <SlideOver title="Edit Details" variant="solid" color="blue" buttontext="View Details">
                                                    <form className="py-4" action={emailReceipt} method='POST'>
                                                        <div className="space-y-12">
                                                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                                                                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                                                    <div className='sm:col-span-1'></div>
                                                                    <div className="sm:col-span-5">
                                                                        <TextField
                                                                            label=""
                                                                            name="donor_id"
                                                                            type="hidden"
                                                                            defaultValue={cash.decrypted_donor?.id}
                                                                            readOnly
                                                                        />

                                                                        <TextField
                                                                            label="Donated By"
                                                                            name="donor"
                                                                            type="text"
                                                                            defaultValue={cash.decrypted_donor?.decrypted_name as string}
                                                                            readOnly
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                            label="Amount"
                                                                            name="amount"
                                                                            type="number"
                                                                            defaultValue={cash.amount}
                                                                            readOnly
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                            label="Donated on"
                                                                            name="date"
                                                                            type="text"
                                                                            defaultValue={formatDate(cash.date) + ' ' + formatTime(cash.date)}
                                                                            readOnly
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                            label="Donated on"
                                                                            name="charity"
                                                                            type="text"
                                                                            defaultValue={cash.charity?.name}
                                                                            readOnly
                                                                        />
                                                                        <br />
                                                                        <TextField
                                                                            label="Event Donated to"
                                                                            name="event"
                                                                            type="text"
                                                                            defaultValue={cash.event?.name}
                                                                            readOnly
                                                                        />
                                                                        <div className="col-span-full">
                                                                        </div>
                                                                        <div className="mt-6 flex items-center justify-start gap-x-6">
                                                                            <Button type='submit' variant='solid' color='blue' className="w-full">Email Receipt</Button>
                                                                        </div>
                                                                        <div className="mt-6 flex items-center justify-start gap-x-6">
                                                                            <Button type="submit" variant="solid" color="red" className="w-full" formAction={deletePost}>Delete</Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </form>

                                                </SlideOver>
                                            )}
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                        <DisplayMessage content={message} type={messageType} heading={heading} />
                    </Table>
                </TableContent>
            </TableContainer >


            {/**Edit external income here, use slideover once its fixed */}


        </>
    )
}