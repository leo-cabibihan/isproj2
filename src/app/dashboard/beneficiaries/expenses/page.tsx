// @ts-nocheck
import { DisplayError } from '@/app/(auth)/error-handling/function';
import { CharityLog } from '@/app/admin/audit-log/function';
import supabase from '@/app/utils/supabase';
import { getURL } from '@/app/utils/url'
import { GetUID } from '@/app/utils/user_id';
import { Button } from '@/components/Button';
import { SelectField, TextField } from '@/components/Fields'
import { ImageUpload } from '@/components/ImgUpload';

import SlideOver from "@/components/SlideOverButton"
import { TableContainer, Table, TableContent, TableHeaderButton, Tbody, Td, Thead, Tr, Th } from '@/components/Table';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const revalidate = 0;

const header = "Expenses";
const subheader = "A table list of expenses";
const columns = ["Description", "Amount", "Date"];

export default async function Expenses() {

    console.log("DOES IT WORK???? MAYBE: " + await GetUID())
    const uid = await GetUID()
    console.log("UID IS" + uid)
    const { data: charity_member, error: error_2 } = await supabase.from('charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity?.id)

    console.log("CHARITY ID IN EXPENSES IS" + charity_id)
    
    const { data: expenses, error } = await supabase
        .from('expenses')
        .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name ), event (id, name)')
        .eq('charity_id', charity_id)

    console.log("TF", expenses)

    const { data: beneficiaries, error: beneficiaries_error } = await supabase
        .from('beneficiaries')
        .select('*')

    const { data: last_expense, error: event_error } = await supabase
        .from('expenses')
        .select('*')
        .order('id', { ascending: false }).limit(1)

    const expense_id = last_expense?.map(expense => expense.id)
    console.log("LAST EXPENSE'S ID IS: " + (expense_id))

    const { data: events, error: events_error } = await supabase
        .from('event')
        .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
        .eq('charity_id', charity_id)

    const handleSubmit = async (formData: FormData) => {
        'use server'
        const expense = {
            amount: formData.get("amount"),
            reason: formData.get("reason"),
            event_id: formData.get("event_id"),
            beneficiary_id: formData.get("beneficiary_id"),
            charity_id: formData.get("charity_id")
        };

        const {data, error} = await supabase.from('expenses').insert(expense);
        revalidatePath('/');
        CharityLog("ADDED EXPENSE", error)
        DisplayError(`${getURL()}dashboard/beneficiaries/expenses?err=${error?.message}`, error)
    };

    const saveChanges = async (formData: FormData) => {
        'use server'
        const expenseId = formData.get("id")
        const expense = {
            amount: formData.get("amount"),
            reason: formData.get("reason"),
            event_id: formData.get("event"),
            beneficiary_id: formData.get("beneficiary_id"),
        };

        const {data, error} = await supabase.from('expenses').update(expense).eq("id", expenseId)
        revalidatePath('/');
        CharityLog("UPDATED EXPENSE" + expenseId + ".", error)
        DisplayError(`${getURL()}dashboard/beneficiaries/expenses?err=${error?.message}`, error)
    };

    const deleteExpense = async (formData: FormData) => {
        'use server'
        const expenseId = formData.get("id")
        const expense = {
            amount: formData.get("amount"),
            reason: formData.get("reason"),
            event_id: formData.get("event"),
            beneficiary_id: formData.get("beneficiary_id"),
        };

        const {data, error} = await supabase.from('expenses').delete().eq("id", expenseId)
        revalidatePath('/');
        CharityLog("DELETE EXPENSE" + expenseId + ".", error)
        DisplayError(`${getURL()}dashboard/beneficiaries/expenses?err=${error}`, error)
    };


    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeaderButton header="Expenses">
                    <SlideOver buttontext="Add Expense" variant="solid" color="blue">
                        <form className="py-9" action={handleSubmit} method="POST">
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                                    <div>
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Add Expense</h2>
                                    </div>

                                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                        <div className="sm:col-span-4">
                                            <TextField
                                                label=""
                                                name="charity_id"
                                                type="hidden"
                                                defaultValue={charity_id}
                                            />

                                            <TextField
                                                label="Amount"
                                                name="amount"
                                                type="Amount"
                                                autoComplete="Amount"
                                                required
                                            />

                                            <div className="sm:col-span-4 py-5">
                                                <div className="col-span-full">
                                                    <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Description
                                                    </label>
                                                    <div className="mt-2">
                                                        <textarea
                                                            id="reason"
                                                            name="reason"
                                                            rows={3}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue={''}
                                                        />
                                                    </div>
                                                </div>

                                                {/* This will display the list of events linked to charity_id, and all beneficiaries available */}


                                                <SelectField
                                                    className="col-span-full py-5"
                                                    label="Assign Event"
                                                    name="event_id"
                                                >
                                                    {events?.map(event => (
                                                        <option key={event.id} value={event.id}>{event.name}</option>
                                                    ))}
                                                </SelectField>

                                                <SelectField
                                                    className="col-span-full py-5"
                                                    label="Assign Beneficiary"
                                                    name="beneficiary_id"
                                                >
                                                    {beneficiaries?.map(beneficiary => (
                                                        <option key={beneficiary.id} value={beneficiary.id}>{beneficiary.beneficiary_name}</option>
                                                    ))}
                                                </SelectField>


                                                <ImageUpload folderName="expenses" charityID={charity_id} recordID={expense_id![0] + 1} />

                                                <div className="mt-6 col-span-full">
                                                    <div className="col-span-full">
                                                    <Button type="submit" variant="solid" color="blue" className="w-full">
                                                        <span>
                                                            Save Expense <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </Button>
                                                    </div>
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
                                <Th>Description</Th>
                                <Th>Amount</Th>
                                <Th>Beneficiary</Th>
                                <Th>Date Added</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {expenses?.map(expense =>

                                <Tr key={expense.id}>
                                    <Td>{expense.reason}</Td>
                                    <Td>{expense.amount}</Td>
                                    <Td>{expense.beneficiaries?.beneficiary_name}</Td>
                                    <Td>{expense.date}</Td>
                                    <Td>
                                        <SlideOver buttontext="View Details" variant='solid' color="blue">
                                            {/**This is Edit expense form, put slideover on this later*/}
                                            <form className="py-9" action={saveChanges} method="PUT">
                                                <div className="space-y-12">
                                                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                                                        <div>
                                                            <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Expense</h2>
                                                        </div>

                                                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                                            <div className="sm:col-span-4">

                                                                <TextField
                                                                    label=""
                                                                    name="id"
                                                                    type="hidden"
                                                                    defaultValue={expense.id}
                                                                    required
                                                                />

                                                                <TextField
                                                                    label="Amount"
                                                                    name="amount"
                                                                    type="Amount"
                                                                    defaultValue={expense.amount}
                                                                    required
                                                                />

                                                                <div className="sm:col-span-4 py-5">
                                                                    <div className="col-span-full">
                                                                        <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Description
                                                                        </label>
                                                                        <div className="mt-2">
                                                                            <textarea
                                                                                id="reason"
                                                                                name="reason"
                                                                                rows={3}
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                defaultValue={expense.reason as string}
                                                                            />
                                                                        </div>
                                                                    </div>


                                                                    {/* This will display the list of events linked to charity_id, and all beneficiaries available */}
                                                                    
                                                                    <SelectField
                                                                    className="col-span-full py-5"
                                                                    label="Assign Event"
                                                                    name="event_id"
                                                                >
                                                                    {events?.map(event => (
                                                                        <option key={event.id} value={event.id}>{event.name}</option>
                                                                    ))}
                                                                </SelectField>

                                                                <SelectField
                                                                    className="col-span-full py-5"
                                                                    label="Assign Beneficiary"
                                                                    name="beneficiary_id"
                                                                >
                                                                    {beneficiaries?.map(beneficiary => (
                                                                        <option key={beneficiary.id} value={beneficiary.id}>{beneficiary.beneficiary_name}</option>
                                                                    ))}
                                                                </SelectField>

                                                                    <ImageUpload folderName="expenses" charityID={charity_id![0]} recordID={expense.id} />


                                                                    <div className="mt-6 flex items-center justify-start gap-x-6">
                                                                        <Button type="submit" variant="solid" color="blue" className="w-full">
                                                                            <span>
                                                                                Update <span aria-hidden="true">&rarr;</span>
                                                                            </span>
                                                                        </Button>
                                                                        <Button type="submit" variant="solid" color="red" className="w-full" formAction={deleteExpense}>
                                                                            <span>
                                                                                Delete <span aria-hidden="true">&rarr;</span>
                                                                            </span>
                                                                        </Button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </SlideOver>
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>
        </>
    )
}