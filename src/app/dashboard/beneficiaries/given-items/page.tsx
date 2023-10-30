import { Button } from "@/components/Button";
import { SelectField, TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, TableHeaderButton, TableContent } from "@/components/Table";
import { TableHeader } from "@/components/table/Table";
import { DisplayError } from '@/app/(auth)/error-handling/function';
import supabase from '@/app/utils/supabase';
import { GetUID } from '@/app/utils/user_id';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export const revalidate = 0;

export default async function beneficiaryitem() {

    console.log("DOES IT WORK???? MAYBE: " + await GetUID())
    const uid = await GetUID()
    const { data: charity_member, error: error_2 } = await supabase.from('charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity?.id)

    console.log("CHARITY ID " + charity_id)

    const { data: events, error: events_error } = await supabase
        .from('event')
        .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
        .eq('charity_id', charity_id)

    console.log("EVENTS ERROR", events_error)

    const { data: inventory, error: error_3 } = await supabase.from('inventory_item').select('*, items_donation_transaction!inner(*) ').eq('items_donation_transaction.charity_id', charity_id)

    const { data: beneficiary_items, error: bs_error } = await supabase
        .from('beneficiary_items')
        .select('*, inventory_item ( id, name ), charity ( id, name )')
        .eq('charity_id', charity_id)

    console.log("hello I suck ", bs_error)

    const handleSubmit = async (formData: FormData) => {
        'use server'

        const current_item_id = formData.get("item_id")

        const { data: item_to_add, error: error_3 } = await supabase.from('inventory_item').select('*, items_donation_transaction!inner(*) ').eq('items_donation_transaction.charity_id', charity_id).eq("id", current_item_id).single()
        
        const inventoryQuantity = item_to_add?.quantity as number - parseInt(formData.get("amount") as string)
              
        const { error: idk } = await supabase.from('inventory_item').update({quantity: inventoryQuantity}).eq("id", current_item_id)
        
        const item = {
            item_id: current_item_id,
            charity_id: parseInt(charity_id),
            event_id: formData.get("event_id"),
            quantity: formData.get('amount'),
            description: formData.get("desc")
        };

        const { data, error } = await supabase.from('beneficiary_items').insert(item);
        revalidatePath('/');

        console.log("I am tired and I want to perish. ", error_3, idk, error)

    };

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>
            <TableContainer>
                <TableHeaderButton header="Given Items">
                    <SlideOver buttontext="Add Item" variant="solid" color="blue">
                        <form className="space-y-6" action={handleSubmit} method="POST">
                            <TextField
                                label=""
                                name="charity_id"
                                type="hidden"
                                defaultValue={charity_id}
                            />

                            <TextField
                                label="Amount"
                                name="amount"
                                type="number"
                                min={1}
                                max={100000}
                                autoComplete="number"
                                required
                            />

                            <div className="sm:col-span-4 py-5">
                                <div className="col-span-full">
                                    <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="desc"
                                            name="desc"
                                            rows={3}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                            placeholder="Lorem Ipsum Toolazytotype..."
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
                                    label="Assign Item"
                                    name="item_id"
                                >
                                    {inventory?.map(item => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </SelectField>


                                {/* <ImageUpload folderName="expenses" charityID={charity_id} recordID={expense_id![0] + 1} /> */}

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
                        </form>
                    </SlideOver>
                </TableHeaderButton>
                <TableContent>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Quantity</Th>
                                <Th>Date</Th>
                                <Th> </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {beneficiary_items?.map(item =>

                                <Tr key={item.id}>
                                    <Td>{item.inventory_item?.name}</Td>
                                    <Td>{item.quantity}</Td>
                                    <Td>{item.date}</Td>
                                    <Td>
                                        <SlideOver buttontext="Details" variant="solid" color="blue">
                                            <form className="space-y-6" action="#" method="POST">
                                                <TextField
                                                    label="Email Address"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    required
                                                />

                                                <TextField
                                                    label="Password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    required
                                                />

                                                <div className="flex items-center justify-between">
                                                    <div className="text-sm leading-6">
                                                        <a href="/forgot" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                            Forgot password?
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <Button type="submit" variant="solid" color="blue" className="w-full">
                                                        <span>
                                                            Sign up <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </Button>
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