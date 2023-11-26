// @ts-nocheck 
import { Button } from '@/components/Button';
import React from 'react';
import { MediaObject } from '@/components/Single-use';
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import SlideOver from '@/components/SlideOverButton';
import { SelectField, TextField } from '@/components/Fields';
import supabase from '@/app/utils/supabase';
import { redirect } from 'next/navigation';
import { revalidatePath } from "next/cache";
import { AdminLog } from '../../audit-log/function';

export const revalidate = 0;

export default async function Organization({ params }: any) {

    const generic_error = "Unable to Process request. Please check your data and try again."
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
    const orgID = params.id

    const { data: orgs } = await supabase.from('charity').select('*').eq('id', orgID)

    const { data: complaints, error } = await supabase
        .from('donor_complaints')
        .select('*, charity ( id, name, email_address ), donor ( id, name )')
        .eq('charity_id', orgID)
    console.log(complaints ? "IT WORK" : "DONT WORK")

    const { data: appeals, error: appeals_error } = await supabase
        .from('charity_appeals')
        .select('*, charity ( id, name ), charity_member ( user_uuid, member_name ), donor_complaints ( id, donor ( id, name ) )')
        .eq('charity_id', orgID)

    const { data: events, error: events_error } = await supabase
        .from('event')
        .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
        .eq('charity_id', orgID)

    // const { data: pending_events, error: pending_error } = await supabase
    //     .from('event')
    //     .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
    //     .eq('charity_id', orgID).eq('approval_status', 'ON-HOLD')

    const freezeOrg = async (formData: FormData) => {
        'use server'
        const charityId = parseInt(formData.get("id") as string)
        const charityName = String(formData.get("name"))
        const charity = {
            charity_verified: false
        };

        await supabase.from('charity').update(charity).eq("id", charityId)
        await AdminLog("Froze charity " + charityName + ".")
        revalidatePath('/');
    };

    const hideEvent = async (formData: FormData) => {
        'use server'
        const eventId = formData.get("id")
        const event = {
            approval_status: 'ON-HOLD'
        };

        const { data: update_event, error: update_error } = await supabase.from('event').update(event).eq("id", eventId)
        revalidatePath('/');
        AdminLog("HID EVENT " + formData.get("event_name"), update_error)
        DisplayError(`https://givemore.vercel.app/dashboard/beneficiaries/events?err=${generic_error}`, update_error)
    };

    const unhideEvent = async (formData: FormData) => {
        'use server'
        const eventId = formData.get("id")
        const event = {
            approval_status: 'APPROVED'
        };

        const { data: update_event, error: update_error } = await supabase.from('event').update(event).eq("id", eventId)
        revalidatePath('/');
        AdminLog("APPROVED EVENT " + formData.get("event_name"), update_error)
        DisplayError(`https://givemore.vercel.app/dashboard/beneficiaries/events?err=${generic_error}`, update_error)
    };

    const rejectEvent = async (formData: FormData) => {
        'use server'
        const eventId = formData.get("id")
        const event = {
            approval_status: 'REJECTED',
            rejection_reason: formData.get("reason")
        };

        const { data: update_event, error: update_error } = await supabase.from('event').update(event).eq("id", eventId)
        revalidatePath('/');
        AdminLog("APPROVED EVENT " + formData.get("event_name"), update_error)
        DisplayError(`https://givemore.vercel.app/dashboard/beneficiaries/events?err=${generic_error}`, update_error)
    };

    return (
        <>
            {orgs?.map(org => (

                <>
                    <div className="sm:flex sm:items-center py-9 px-10" key={org.id}>
                        <div className="sm:flex-auto">
                            <MediaObject heading={org.name} subheading={org.about} />
                        </div>
                    </div>

                    <form action={freezeOrg} method='POST'>
                        <div className="grid grid-cols-4">
                            <TextField
                                label=""
                                name="id"
                                type="hidden"
                                readOnly
                                defaultValue={org.id}
                                className="w-full col-span-2"
                            />
                            <TextField
                                label=""
                                name="name"
                                type="hidden"
                                readOnly
                                defaultValue={org.name}
                                className="w-full col-span-1"
                            />
                            <Button type="submit" variant="solid" color="red" className="w-full col-span-1">
                                <span>
                                    Freeze Charity <span aria-hidden="true">&rarr;</span>
                                </span>
                            </Button>
                        </div>
                    </form>
                </>

            ))}
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header="View Complaints" />
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
                                    <Td>{formatDate(complaint.created_at) + ' ' + formatTime(complaint.created_at)}</Td>
                                    <Td>
                                        <SlideOver title="Complaint Details" buttontext="View Complaint" variant="solid" color="blue">
                                            <form className="space-y-6" action={'/view-charity/post'} method="POST">
                                                <TextField
                                                    label="Charity Name"
                                                    name="charity"
                                                    type="text"
                                                    readOnly
                                                    defaultValue={complaint.charity?.name}
                                                />

                                                <TextField
                                                    label="Charity Email"
                                                    name="email"
                                                    type="email"
                                                    readOnly
                                                    defaultValue={complaint.charity?.email_address as string}
                                                />

                                                <TextField
                                                    label="Filed by"
                                                    name="donor"
                                                    type="text"
                                                    readOnly
                                                    defaultValue={complaint.donor?.name as string}
                                                />

                                                <TextField
                                                    label="Filed at"
                                                    name="date"
                                                    type="text"
                                                    readOnly
                                                    defaultValue={formatDate(complaint.created_at) + ' ' + formatTime(complaint.created_at)}
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
                                                            defaultValue={complaint.complaint}
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
                <TableHeader header="View Appeals" />
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
                                    <Td>{formatDate(appeal.created_at) + ' ' + formatTime(appeal.created_at)}</Td>
                                    <Td>
                                        <SlideOver title="Appeal Details" buttontext="View Appeal" variant="solid" color="blue">
                                            <form className="space-y-6" action="#" method="POST">
                                                <TextField
                                                    label="Charity Name"
                                                    name="charity"
                                                    type="text"
                                                    readOnly
                                                    defaultValue={appeal.charity?.name}
                                                />

                                                <TextField
                                                    label="Filed by"
                                                    name="charity_worker"
                                                    type="text"
                                                    readOnly
                                                    defaultValue={String(appeal.charity_member?.member_name)}
                                                />

                                                <TextField
                                                    label="Complaint Filed by"
                                                    name="complainant"
                                                    type="text"
                                                    readOnly
                                                    defaultValue={appeal.donor_complaints?.donor?.name as string}
                                                />
                                                <TextField
                                                    label="Appeal Filed at"
                                                    name="appeal_date"
                                                    type="text"
                                                    readOnly
                                                    defaultValue={formatDate(appeal.created_at) + ' ' + formatTime(appeal.created_at)}
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
                                                            defaultValue={appeal.explanation}
                                                        />
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

            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header="Approved Events" />
                <TableContent>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Event Name</Th>
                                <Th>Start Date</Th>
                                <Th>End Date</Th>
                                <Th>Charity</Th>
                                <Th>Status</Th>
                                <Th> </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {events?.map(event => (

                                <Tr key={event.id}>
                                    <Td>{event.name}</Td>
                                    <Td>{formatDate(event.start_date) + ' ' + formatTime(event.start_date)}</Td>
                                    {
                                        event.is_ongoing ?
                                            (<Td>N/A</Td>) :
                                            (<Td>{formatDate(event.end_date) + ' ' + formatTime(event.end_date)}</Td>)
                                    }
                                    <Td>{event.charity?.name}</Td>
                                    <Td>
                                        {
                                            event.is_ongoing ? ("ongoing") : ("ended")
                                        }
                                    </Td>
                                    <Td>
                                        <SlideOver title="View Event Details" buttontext="View Details" variant="solid" color="blue">
                                            <form className="space-y-6" action={saveChanges} method="PUT">
                                                <TextField
                                                    label=""
                                                    name="id"
                                                    type="hidden"
                                                    defaultValue={event.id}
                                                    readOnly
                                                />

                                                <TextField
                                                    label="Event Name"
                                                    name="event_name"
                                                    defaultValue={event.name}
                                                    type="text"
                                                    readOnly
                                                />

                                                <div className="col-span-full">
                                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Details
                                                    </label>
                                                    <div className="mt-2">
                                                        <textarea
                                                            name="description"
                                                            rows={4}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue={event.description}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>

                                                <TextField
                                                    label="Current Start Date"
                                                    name="current_start_date"
                                                    type="text"
                                                    defaultValue={formatDate(event.start_date as string) + ' ' + formatTime(event.start_date as string)}
                                                    readOnly
                                                />

                                                <TextField
                                                    label="Current End Date"
                                                    name="end_date"
                                                    type="text"
                                                    defaultValue={formatDate(event.end_date as string) + ' ' + formatTime(event.end_date as string)}
                                                    readOnly
                                                />

                                                {
                                                    event.beneficiary_id ?
                                                        (
                                                            <TextField
                                                                label="Beneficiary"
                                                                name="beneficiary"
                                                                defaultValue={event.beneficiaries?.beneficiary_name}
                                                                type="text"
                                                                readOnly
                                                            />
                                                        )
                                                        :
                                                        (
                                                            <p>&nbsp;</p>
                                                        )
                                                }

                                                <div className="col-span-full">
                                                    <Button formAction={hideEvent} type="submit" variant="solid" color="yellow" className="w-full">
                                                        <span>
                                                            HIDE EVENT <span aria-hidden="true">&rarr;</span>
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

            {/* <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header="Pending Events" />
                <TableContent>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Event Name</Th>
                                <Th>Start Date</Th>
                                <Th>End Date</Th>
                                <Th>Charity</Th>
                                <Th>Status</Th>
                                <Th> </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {pending_events?.map(event => (

                                <Tr key={event.id}>
                                    <Td>{event.name}</Td>
                                    <Td>{formatDate(event.start_date) + ' ' + formatTime(event.start_date)}</Td>
                                    {
                                        event.is_ongoing ?
                                            (<Td>N/A</Td>) :
                                            (<Td>{formatDate(event.end_date) + ' ' + formatTime(event.end_date)}</Td>)
                                    }
                                    <Td>{event.charity?.name}</Td>
                                    <Td>
                                        {
                                            event.is_ongoing ? ("ongoing") : ("ended")
                                        }
                                    </Td>
                                    <Td>
                                        <SlideOver title="View Event Details" buttontext="View Details" variant="solid" color="blue">
                                            <form className="space-y-6" method="PUT">
                                                <TextField
                                                    label=""
                                                    name="id"
                                                    type="hidden"
                                                    defaultValue={event.id}
                                                    readOnly
                                                />

                                                <TextField
                                                    label="Event Name"
                                                    name="event_name"
                                                    defaultValue={event.name}
                                                    type="text"
                                                    readOnly
                                                />

                                                <div className="col-span-full">
                                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Details
                                                    </label>
                                                    <div className="mt-2">
                                                        <textarea
                                                            name="description"
                                                            rows={4}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue={event.description}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>

                                                <TextField
                                                    label="Current Start Date"
                                                    name="current_start_date"
                                                    type="text"
                                                    defaultValue={formatDate(event.start_date as string) + ' ' + formatTime(event.start_date as string)}
                                                    readOnly
                                                />

                                                <TextField
                                                    label="Current End Date"
                                                    name="end_date"
                                                    type="text"
                                                    defaultValue={formatDate(event.end_date as string) + ' ' + formatTime(event.end_date as string)}
                                                    readOnly
                                                />

                                                {
                                                    event.beneficiary_id ?
                                                        (
                                                            <TextField
                                                                label="Beneficiary"
                                                                name="beneficiary"
                                                                defaultValue={event.beneficiaries?.beneficiary_name}
                                                                type="text"
                                                                readOnly
                                                            />
                                                        )
                                                        :
                                                        (
                                                            <p>&nbsp;</p>
                                                        )
                                                }

                                                <div className="col-span-full">
                                                    <Button formAction={unhideEvent} type="submit" variant="solid" color="green" className="w-full">
                                                        <span>
                                                            APPROVE EVENT <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </Button>
                                                </div>

                                                <div className="col-span-full">
                                                    <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Reason for Rejection
                                                    </label>
                                                    <div className="mt-2">
                                                        <textarea
                                                            name="reason"
                                                            rows={4}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            placeholder='Lorem Ipsum Dolor Sit Amet...'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <Button formAction={rejectEvent} type="submit" variant="solid" color="red" className="w-full">
                                                        <span>
                                                            REJECT EVENT <span aria-hidden="true">&rarr;</span>
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
            </TableContainer> */}
        </>

    )
}