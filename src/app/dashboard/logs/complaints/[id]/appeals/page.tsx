import supabase from "@/app/utils/supabase";
import { GetUID } from "@/app/utils/user_id";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from "@/components/Table";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

export default async function Page() {

    console.log("DOES IT WORK???? MAYBE: " + await GetUID())
    const uid = await GetUID()
    const { data: charity_member, error: error_2 } = await supabase.from('charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity?.id)

    const { data: complaints } = await supabase.from('donor_complaints').select('*, charity ( id, name ), donor ( id, name )').eq('charity_id', charity_id)

    const handleSubmit = async (formData: FormData) => {
        'use server'
        const expense = {
            amount: formData.get("amount"),
            reason: formData.get("reason"),
            event_id: formData.get("event_id"),
            beneficiary_id: formData.get("beneficiary_id"),
            charity_id: formData.get("charity_id")
        };

        const { data, error } = await supabase.from('expenses').insert(expense);
        revalidatePath('/');
    };

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>
            <TableContainer>
                <TableHeader header="File an Appeal" />
                <TableContent>
                    <form className="space-y-6" action="#" method="POST">
                        <TextField
                            label="Charity Name"
                            name="name"
                            type="text"
                            placeholder={"complaint.charity.name"}
                            readOnly
                        />

                        <TextField
                            label="Complainant"
                            name="donor"
                            type="text"
                            placeholder={"complaint.donor.name"}
                            readOnly
                        />

                        <div className="col-span-full">
                            <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                                Details
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="reason"
                                    name="reason"
                                    rows={3}
                                    readOnly
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder={"Balls"}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <Button type="submit" variant="solid" color="yellow" className="w-full">
                                <span>
                                    Save <span aria-hidden="true">&rarr;</span>
                                </span>
                            </Button>
                        </div>
                    </form>
                </TableContent>
            </TableContainer>
        </>

    )
}