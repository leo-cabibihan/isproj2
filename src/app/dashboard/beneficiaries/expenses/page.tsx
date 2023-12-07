//@ts-nocheck
import { DisplayError } from '@/app/(auth)/error-handling/function';
import { CharityLog } from '@/app/admin/audit-log/function';
import supabase from '@/app/utils/supabase';
import { getURL } from '@/app/utils/url'
import { GetUID } from '@/app/utils/user_id';
import { Button } from '@/components/Button';
import { Message } from '@/components/Feedback';
import { SelectField, TextField } from '@/components/Fields'
import { ImageUpload } from '@/components/ImgUpload';
import SlideOver from "@/components/SlideOverButton"
import { TableContainer, Table, TableContent, TableHeaderButton, Tbody, Td, Thead, Tr, Th } from '@/components/Table';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { ExportTest } from '@/components/SlideOverButton';
import { NoWhiteSpace, NumberValidation } from '@/app/utils/input_validation';
import { DisplayMessage } from '@/components/DisplayMessage';

export const revalidate = 0;

async function getExpenseData(column: any, order: any, charity_id: number) {
    var data
    console.log(`RESULTS ARE SORTED BY ${column}, ORDERED BY ${order}, FROM CHARITY NUMBER ${charity_id}`)
    if ((column != null || column != undefined) || (order != null || order != undefined)) {
        const { data: expenses, error } = await supabase
            .from('expenses')
            .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name ), event (id, name)')
            .eq('charity_id', charity_id)
            .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        if (column === 'beneficiary name') {
            const { data: expenses, error } = await supabase
                .from('expenses')
                .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name ), event (id, name)')
                .eq('charity_id', charity_id)
                .order('beneficiaries( beneficiary_name )', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = expenses
            return data
        }
        data = expenses
    }
    else {
        const { data: expenses, error } = await supabase
            .from('expenses')
            .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name ), event (id, name)')
            .eq('charity_id', charity_id)
            .order('id', { ascending: true })
        data = expenses
    }

    return data
}

var message = ""
var messageType = ""
var heading = ""

export default async function Expenses({ searchParams }: any) {

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
    console.log("UID IS" + uid)
    const { data: charity_member, error: error_2 } = await supabase.from('decrypted_charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity?.id)

    const generic_error = "Unable to process request. Please check your data and try again."

    console.log("CHARITY ID IN EXPENSES IS" + charity_id)

    const column = searchParams?.column
    const order = searchParams?.order

    console.log(`HERE ARE THE ORDERING SETTINGS: ${column} & ${order}`)

    const charityId = charity_id![0]
    //console.log("UH OH", expenses)
    const expenses = await getExpenseData(column, order, charityId)

    const rows = expenses?.map(row => ({
        EXPENSE_ID: row.id,
        EVENT: row.event?.name,
        BENEFICIARY: row.beneficiaries?.beneficiary_name,
        DESCRIPTION: row.reason,
        AMOUNT: `PHP ${row.amount}`,
        DATE: formatDate(row.date) + ' ' + formatTime(row.date)
    }))

    var orderby = "" //checks if order is true or false, then returns a string of ascending and descending respectively
    if (order === 'true') {
        orderby = "ascending"
    }
    else {
        orderby = "descending"
    }

    const { data: beneficiaries, error: beneficiaries_error } = await supabase
        .from('beneficiaries')
        .select('*')
        .order('date', { ascending: false })

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
        .eq('is_ongoing', true)
        .eq('approval_status', 'APPROVED')
        .order('start_date', { ascending: false })

    const handleSubmit = async (formData: FormData) => {
        'use server'

        const amount_input = Number(formData.get("amount"))
        const desc_input = String(formData.get("reason"))

        const valid_amount = NumberValidation(amount_input)
        const valid_desc = NoWhiteSpace(desc_input)

        if (valid_amount && valid_desc) {

            const expense = {
                amount: formData.get("amount"),
                reason: formData.get("reason"),
                event_id: formData.get("event_id"),
                beneficiary_id: formData.get("beneficiary_id"),
                charity_id: formData.get("charity_id")
            };

            const { data, error } = await supabase.from('expenses').insert(expense).select();

            if (error) {
                message = `Failed to Add Expense. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
                messageType = "ERROR"
                heading = "Expense not Added."
            }
            else {
                message = "Your Expense has been added."
                messageType = "SUCCESS"
                heading = "Success."
                CharityLog("ADDED EXPENSE", error)
            }

            revalidatePath('/');

            // DisplayError(`https://isproj2.vercel.app/dashboard/beneficiaries/expenses?err=${generic_error}`, error)

        }
        else {
            const error_msg = "Invalid Inputs. 2 or more consecutive spaces are not allowed. Numbers must be properly formatted"
            message = error_msg
            messageType = "ERROR"
            heading = "Invalid Input."
            revalidatePath('/');
        }

    };

    const saveChanges = async (formData: FormData) => {
        'use server'

        const amount_input = Number(formData.get("amount"))
        const desc_input = String(formData.get("reason"))

        const valid_amount = NumberValidation(amount_input)
        const valid_desc = NoWhiteSpace(desc_input)

        if (valid_amount && valid_desc) {

            const expenseId = formData.get("id")
            const expense = {
                amount: formData.get("amount"),
                reason: formData.get("reason"),
                event_id: formData.get("event"),
                beneficiary_id: formData.get("beneficiary_id"),
            };

            const { data, error } = await supabase.from('expenses').update(expense).eq("id", expenseId).select()

            if (error) {
                message = `Failed to Update Expense. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
                messageType = "ERROR"
                heading = "Expense not Updated."
            }
            else {
                message = "Your Expense has been Updated."
                messageType = "SUCCESS"
                heading = "Success."
                CharityLog("UPDATED EXPENSE" + expenseId + ".", error)
            }

            revalidatePath('/');

            // DisplayError(`https://isproj2.vercel.app/dashboard/beneficiaries/expenses?err=${generic_error}`, error)

        }
        else {
            const error_msg = "Invalid Inputs. 2 or more consecutive spaces are not allowed."
            message = error_msg
            messageType = "ERROR"
            heading = "Invalid Input."
            revalidatePath('/');
        }

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

        const { data, error } = await supabase.from('expenses').delete().eq("id", expenseId).select()

        if (error) {
            message = `Failed to Delete Expense. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
            messageType = "ERROR"
            heading = "Expense not Deleted."
        }
        else {
            message = "Your Expense has been Deleted."
            messageType = "SUCCESS"
            heading = "Success."
            CharityLog("DELETED EXPENSE" + expenseId + ".", error)
        }

        revalidatePath('/');

        // DisplayError(`https://isproj2.vercel.app/dashboard/beneficiaries/expenses?err=${generic_error}`, error)
    };


    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeaderButton header="Expenses">
                    <SlideOver title="Add Expense Details" buttontext="Add Expense" variant="solid" color="blue">
                        <form className="py-9" action={handleSubmit} method="POST">
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                        <div className='sm:col-span-1'></div>
                                        <div className="sm:col-span-5">

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


                                                <ImageUpload folderName="expenses" charityID={charity_id} recordID={expense_id![0] + 1} labelText="Upload Receipt/s" />

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
                        {/* <DisplayMessage content={message} type={messageType} heading={heading} /> */}
                    </SlideOver>
                </TableHeaderButton>
                <TableContent>
                    <SlideOver title="Filter & Sort Data" buttontext="Filter & Sort Data" variant="solid" color="yellow">
                        <div className="flex-col">
                            <form className='flex flex-col w-full gap-y-6' action="/dashboard/beneficiaries/expenses" method="GET">
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
                                        <option value={"beneficiary name"}>beneficiary name</option>
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
                    <ExportTest rows={rows} fileName={`EXPENSES`} sheetName={"LIST OF EXPENSES"} />
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Description</Th>
                                <Th>Amount</Th>
                                <Th>Beneficiary</Th>
                                <Th>Date Added</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {expenses?.map(expense =>

                                <Tr key={expense.id}>
                                    <Td>{expense.reason}</Td>
                                    <Td>{expense.amount}</Td>
                                    <Td>{expense.beneficiaries?.beneficiary_name}</Td>
                                    <Td>{formatDate(expense.date) + ' ' + formatTime(expense.date)}</Td>
                                    <Td>
                                        <SlideOver title="Edit Expense Details" buttontext="View Details" variant='solid' color="blue">
                                            {/**This is Edit expense form, put slideover on this later*/}
                                            <form className="py-9" action={saveChanges} method="PUT">
                                                <div className="space-y-12">
                                                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                                                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                                            <div className='sm:col-span-1'></div>
                                                            <div className="sm:col-span-5">


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

                                                                    <ImageUpload folderName="expenses" charityID={charity_id![0]} recordID={expense.id} labelText="Upload Receipt/s" />


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
                        <DisplayMessage content={message} type={messageType} heading={heading} />
                    </Table>
                </TableContent>
            </TableContainer>
        </>
    )
}