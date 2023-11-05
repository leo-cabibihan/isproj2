// @ts-nocheck
import { CharityLog } from '@/app/admin/audit-log/function';
import supabase from '@/app/utils/supabase';
import { GetUID } from '@/app/utils/user_id';
import { Button } from '@/components/Button';
import { SelectField, TextField } from '@/components/Fields'
import { ImageUpload } from '@/components/ImgUpload';
import SlideOver from '@/components/SlideOverButton';
import { TableContainer, TableHeaderButton, TableContent, Table, Thead, Tr, Th, Tbody, Td } from '@/components/Table';
import { CashReceiptEmail } from '@/components/email-template';
import Plunk from '@plunk/node';
import { render } from '@react-email/render';
import { revalidatePath } from 'next/cache';
import React from 'react';

const people = [
    { DonorName: 'bruh Walton', Amount: 'Front-end Developer', Date: 'lindsay.walton@example.com' },
    { DonorName: 'bruh', Amount: 'ginormous godzilla', Date: 'inormous godzilla' },
    // More people...
];

const plunk = new Plunk("sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db");

export const revalidate = 0;

export default async function ExternalTable() {

    console.log("DOES IT WORK???? MAYBE: " + await GetUID())

    const uid = await GetUID()
    const { data: charity_member, error: error_2 } = await supabase.from('charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity?.id)

    const charityId = charity_id![0]
    const { data: event } = await supabase
        .from('event')
        .select('*')
        .eq('charity_id', charityId)
        .order("id", { ascending: true })

    const { data: cash, error: cash_error } = await supabase.from('cash')
        .select('*, charity ( id, name ), donor ( id, name ), event( id, name )')
        .eq('charity_id', charityId)
        .order("id", { ascending: true })

    const { data, error } = await supabase.from('cash')
        .select('*')
        .eq('charity_id', charityId)
        .order("id", { ascending: false }).limit(1)

    const cash_id = data?.map(post => post.id)

    const handleSubmit = async (formData: FormData) => {
        'use server'

        const cash = {
            amount: formData.get('amount'),
            date: formData.get('date'),
            charity_id: charityId,
            is_external: true,
            event_id: formData.get('event')

        }

        const { data, error } = await supabase.from('cash').insert(cash).select()
        CharityLog("ADDED EXTERNAL INCOME WORTH PHP " + data![0].amount, error)
        revalidatePath('/');
    };

    const saveChanges = async (formData: FormData) => {
        'use server'
        const cashID = formData.get("id")
        const cash = {
            amount: formData.get('amount'),
            date: formData.get('date'),
            charity_id: charityId,
            is_external: true,
            event_id: formData.get('event')
        }

        const { data, error } = await supabase.from('cash').update(cash).eq("id", cashID).select()
        CharityLog("EDITED EXTERNAL INCOME WORTH PHP " + data![0].amount, error)
        revalidatePath('/');
    };

    const deletePost = async (formData: FormData) => {
        'use server'
        const cashID = formData.get("id")

        const { data, error } = await supabase.from('cash').delete().eq("id", cashID).select()
        CharityLog("DELETED EXTERNAL INCOME " + data![0].id, error)
        revalidatePath('/');
    };

    const emailReceipt = async (formData: FormData) => {
        'use server'

        const { data, error: email_error } = await supabase.from('users').select('email').eq('id', formData.get("donor_id"))

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
            to: data![0].email as string,
            subject: "THANK YOU!",
            body,
        })

        console.log("SUCCESS??? ", success)
    }

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeaderButton header="Cash">
                    <SlideOver buttontext="Add External Income" variant="solid" color="blue">
                        <form className="py-9" action={handleSubmit} method='POST'>
                            <div className="space-y-12">
                                <div>
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Add External Income</h2>
                                </div>
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

                                            <div className="sm:col-span-4 py-5">
                                                <TextField
                                                    label="Date Donated"
                                                    name="date"
                                                    type="Date"
                                                    autoComplete="Date"
                                                    required
                                                    max={new Date().toISOString().split('T')[0]}
                                                />

                                                <SelectField
                                                    label='Assign to Event'
                                                    name="event"
                                                    required
                                                >
                                                    {event?.map(event => (
                                                        <option key={event.id} value={event.id}>{event.name}</option>
                                                    ))}
                                                </SelectField>

                                                <div className="col-span-full">
                                                    <ImageUpload folderName="cash" charityID={charityId} recordID={cash_id![0] + 1} />
                                                </div>


                                                <div className="mt-6 flex items-center justify-start gap-x-6">
                                                    <Button type='submit' variant='solid' color='blue'>Submit</Button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </SlideOver>
                </TableHeaderButton>
                <TableContent>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Source</Th>
                                <Th>Amount</Th>
                                <Th>Date</Th>
                                <Th> </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cash?.map(cash =>
                                <Tr key={cash.id}>
                                    {cash.is_external ? (
                                        <Td>EXTERNAL</Td>
                                    ) : (
                                        <Td>{cash.donor?.name}</Td>
                                    )}
                                    <Td>{cash.amount}</Td>
                                    <Td>{cash.date}</Td>
                                    <Td>
                                        {cash.is_external ?
                                            (
                                                <SlideOver variant="solid" color="blue" buttontext="Edit External Income">
                                                    <form className="py-9" action={saveChanges} method='PUT'>
                                                        <div className="space-y-12">
                                                            <div>
                                                                <h2 className="text-base font-semibold leading-7 text-gray-900">Add External Income</h2>
                                                            </div>
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

                                                                            <SelectField
                                                                                label='Assign to Event'
                                                                                name="event"
                                                                                required
                                                                            >
                                                                                {event?.map(event => (
                                                                                    <option key={event.id} value={event.id}>{event.name}</option>
                                                                                ))}
                                                                            </SelectField>

                                                                            <div className="col-span-full">
                                                                                <ImageUpload folderName="cash" charityID={charityId} recordID={cash.id} />
                                                                            </div>


                                                                            <div className="mt-6 flex items-center justify-start gap-x-6">
                                                                                <Button type='submit' variant='solid' color='blue' className="w-full">Submit</Button>
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
                                                </SlideOver>
                                            ) :
                                            (
                                                <SlideOver variant="solid" color="blue" buttontext="View Details">
                                                    <form className="py-9" action={emailReceipt} method='POST'>
                                                        <div className="space-y-12">
                                                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                                                                <div>
                                                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Edit External Income</h2>
                                                                </div>

                                                                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                                                    <div className="sm:col-span-4">

                                                                        <TextField
                                                                            label=""
                                                                            name="donor_id"
                                                                            type="hidden"
                                                                            defaultValue={cash.donor?.id}
                                                                            readOnly
                                                                        />

                                                                        <TextField
                                                                            label="Donated By"
                                                                            name="donor"
                                                                            type="text"
                                                                            defaultValue={cash.donor?.name as string}
                                                                            readOnly
                                                                        />

                                                                        <TextField
                                                                            label="Amount"
                                                                            name="amount"
                                                                            type="number"
                                                                            defaultValue={cash.amount}
                                                                            readOnly
                                                                        />

                                                                        <TextField
                                                                            label="Donated on"
                                                                            name="date"
                                                                            type="text"
                                                                            defaultValue={cash.date}
                                                                            readOnly
                                                                        />

                                                                        <TextField
                                                                            label="Donated on"
                                                                            name="charity"
                                                                            type="text"
                                                                            defaultValue={cash.charity?.name}
                                                                            readOnly
                                                                        />

                                                                        <TextField
                                                                            label="Event Donated to"
                                                                            name="event"
                                                                            type="text"
                                                                            defaultValue={cash.event?.name}
                                                                            readOnly
                                                                        />

                                                                        <div className="mt-6 flex items-center justify-start gap-x-6">
                                                                            <button
                                                                                type="submit"
                                                                                className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                            >
                                                                                Save
                                                                            </button>
                                                                            <button
                                                                                type="submit"
                                                                                className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                            >
                                                                                Delete
                                                                            </button>
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
                    </Table>
                </TableContent>
            </TableContainer >


            {/**Edit external income here, use slideover once its fixed */}


        </>
    )
}