import { Button } from '@/components/Button';
import React from 'react';
import { MediaObject } from '@/components/Single-use';
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import SlideOver from '@/components/SlideOverButton';
import { TextField } from '@/components/Fields';
import supabase from '@/app/utils/supabase';
import { redirect } from 'next/navigation';
import { revalidatePath } from "next/cache";

export const revalidate = 0;

export default async function Organization({ params }: any) {

    const orgID = params.id

    const { data: orgs } = await supabase.from('charity').select('*').eq('id', orgID)

    const { data: complaints, error } = await supabase
        .from('donor_complaints')
        .select('*, charity ( id, name ), donor ( id, name )')
        .eq('charity_id', orgID)
    console.log(complaints ? "IT WORK" : "DONT WORK")

    const { data: appeals, error: appeals_error } = await supabase
        .from('charity_appeals')
        .select('*, charity ( id, name ), charity_member ( user_uuid, member_name ), donor_complaints ( id, donor ( id, name ) )')
        .eq('charity_id', orgID)

    return (
        <>
            {orgs?.map(org => (

                <div className="sm:flex sm:items-center py-9 px-10" key={org.id}>
                    <div className="sm:flex-auto">
                        <MediaObject heading={org.name} subheading={org.about} />
                    </div>
                </div>

            ))}
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header="View Complaints." />
                <TableContent>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Filed by</Th>
                                <Th>Filed Against</Th>
                                <Th>Date Filed</Th>
                                <Th> </Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {complaints?.map(complaint => (
                                <Tr key={complaint.id}>
                                <Td>{complaint.donor?.name}</Td>
                                <Td>{complaint.charity?.name}</Td>
                                <Td>{complaint.created_at}</Td>
                                <Td>
                                    <SlideOver buttontext="View Complaint" variant="solid" color="blue">
                                        <form className="space-y-6" action="#" method="POST">
                                            <TextField
                                                label="Charity Name"
                                                name="charity"
                                                type="text"
                                                readOnly
                                                placeholder={complaint.charity?.name}
                                            />

                                            <TextField
                                                label="Filed by"
                                                name="donor"
                                                type="text"
                                                readOnly
                                                placeholder={complaint.donor?.name as string}
                                            />

                                            <TextField
                                                label="Filed at"
                                                name="date"
                                                type="date"
                                                readOnly
                                                placeholder={complaint.created_at as string}
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
                                                        placeholder={complaint.complaint}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <Button type="submit" variant="solid" color="yellow" className="w-full">
                                                    <span>
                                                        Notify Charity <span aria-hidden="true">&rarr;</span>
                                                    </span>
                                                </Button>
                                            </div>
                                        </form>
                                    </SlideOver>
                                </Td>
                            </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>

            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header="View Appeals." />
                <TableContent>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Filed By</Th>
                                <Th>Charity</Th>
                                <Th>Date Filed</Th>
                                <Th> </Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {appeals?.map(appeal =>

                                <Tr key={appeal.id}>
                                    <Td>{appeal.charity_member?.member_name}</Td>
                                    <Td>{appeal.charity?.name}</Td>
                                    <Td>{appeal.created_at}</Td>
                                    <Td>
                                        <SlideOver buttontext="View Complaint" variant="solid" color="blue">
                                            <form className="space-y-6" action="#" method="POST">
                                                <TextField
                                                    label="Charity Name"
                                                    name="charity"
                                                    type="text"
                                                    readOnly
                                                    placeholder={appeal.charity?.name}
                                                />

                                                <TextField
                                                    label="Filed by"
                                                    name="charity_worker"
                                                    type="text"
                                                    readOnly
                                                    placeholder={String(appeal.charity_member?.member_name)}
                                                />

                                                <TextField
                                                    label="Complaint Filed by"
                                                    name="complainant"
                                                    type="text"
                                                    readOnly
                                                    placeholder={appeal.donor_complaints?.donor?.name as string}
                                                />

                                                <div className="col-span-full">
                                                    <label htmlFor="details" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Details
                                                    </label>
                                                    <div className="mt-2">
                                                        <textarea
                                                            id="details"
                                                            name="details"
                                                            rows={3}
                                                            readOnly
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            placeholder={appeal.explanation}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <Button type="submit" variant="solid" color="red" className="w-full">
                                                        <span>
                                                            Freeze Charity <span aria-hidden="true">&rarr;</span>
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