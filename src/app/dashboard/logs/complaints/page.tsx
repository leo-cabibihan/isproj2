import { CharityLog } from "@/app/admin/audit-log/function";
import supabase from "@/app/utils/supabase";
import { GetUID } from "@/app/utils/user_id";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { ImageUpload } from "@/components/ImgUpload";
import SlideOver from "@/components/SlideOverButton";
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from "@/components/Table";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

export default async function Page() {

    console.log("DOES IT WORK???? MAYBE: " + await GetUID())
    const uid = await GetUID()
    const { data: charity_member, error: error_2 } = await supabase.from('charity_member').select('*, charity ( id, name )').eq('user_uuid', uid as string)
    const charity_id = charity_member?.map(member => member.charity?.id)

    const { data: complaints } = await supabase.from('donor_complaints').select('*, charity ( id, name ), donor ( id, name )').eq('charity_id', Number(charity_id))

    const { data: last_appeal, error: event_error } = await supabase
        .from('charity_appeals')
        .select('*')
        .order('id', { ascending: false }).limit(1)

    const appeal_id = last_appeal?.map(appeal => appeal.id)
    console.log("LAST EXPENSE'S ID IS: " + (appeal_id))

    const handleSubmit = async (formData: FormData) => {
        'use server'
        const appeals = {
            charity_id: formData.get("charity_id"),
            charity_worker_id: formData.get("worker_id"),
            complaint_id: formData.get("complaint_id"),
            explanation: formData.get("explanation")
        };

        const { data, error } = await supabase.from('charity_appeals').insert(appeals).select()
        CharityLog("FILED APPEAL", error)
        console.log("APPEALS ERROR IS: ", error)
        revalidatePath('/');
    };

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>
            <TableContainer>
                <TableHeader header="Complaints" />
                <TableContent>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Donor Name</Th>
                                <Th>Complaint</Th>
                                <Th>Date Filed</Th>
                                <Th> </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {complaints?.map(complaint =>

                                <Tr key={complaint.id}>
                                    <Td>{complaint.donor?.name}</Td>
                                    <Td>{complaint.charity?.name}</Td>
                                    <Td>{complaint.created_at}</Td>
                                    <Td>
                                        <SlideOver variant="solid" color="blue" buttontext="View Details">
                                            <form className="space-y-6" action={handleSubmit} method="POST">

                                                <TextField
                                                    label=""
                                                    name="worker_id"
                                                    type="hidden"
                                                    defaultValue={uid}
                                                    readOnly
                                                />

                                                <TextField
                                                    label=""
                                                    name="charity_id"
                                                    type="hidden"
                                                    defaultValue={Number(charity_id)}
                                                    readOnly
                                                />

                                                <TextField
                                                    label=""
                                                    name="complaint_id"
                                                    type="hidden"
                                                    defaultValue={complaint.id}
                                                    readOnly
                                                />

                                                <TextField
                                                    label="Complainant"
                                                    name="donor"
                                                    type="text"
                                                    placeholder={complaint.donor?.name as string}
                                                    readOnly
                                                />

                                                <div className="col-span-full">
                                                    <label htmlFor="explanation" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Details
                                                    </label>
                                                    <div className="mt-2">
                                                        <textarea
                                                            id="explanation"
                                                            name="explanation"
                                                            rows={3}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            placeholder="Lorem Ipsum Dolor Sit Amet..."
                                                        />
                                                    </div>
                                                </div>

                                                <ImageUpload folderName='charity_appeals' charityID={charity_id} recordID={appeal_id![0] + 1} />

                                                <div className="col-span-full">
                                                    <Button type="submit" variant="solid" color="yellow" className="w-full">
                                                        <span>
                                                            File Appeal <span aria-hidden="true">&rarr;</span>
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