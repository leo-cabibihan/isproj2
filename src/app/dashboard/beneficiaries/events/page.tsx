//@ts-nocheck
import { Button } from "@/components/Button";
import { SelectField, TextField } from "@/components/Fields";
import { CDNURL, ImageUpload, imgPath } from "@/components/ImgUpload";
import SlideOver, { ExportTest } from "@/components/SlideOverButton";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, TableHeader, TableContent, TableHeaderButton } from "@/components/Table";
import { revalidatePath } from "next/cache";
import { GetUID } from "@/app/utils/user_id";
import supabase from "@/app/utils/supabase"
import { DisplayError } from "@/app/(auth)/error-handling/function";
import { CharityLog } from "@/app/admin/audit-log/function";
import { getURL } from '@/app/utils/url'
import { Message } from "@/components/Feedback";

export const revalidate = 0;

async function getEventData(column: any, order: any, charity_id: number) {
    var data
    console.log(`RESULTS ARE SORTED BY ${column}, ORDERED BY ${order}, FROM CHARITY NUMBER ${charity_id}`)
    if ((column != null || column != undefined) || (order != null || order != undefined)) {
        const { data: events, error } = await supabase
            .from('event')
            .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
            .eq('charity_id', charity_id).eq('approval_status', 'APPROVED')
            .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        if (column === 'start date') {
            const { data: events, error } = await supabase
                .from('event')
                .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
                .eq('charity_id', charity_id).eq('approval_status', 'APPROVED')
                .order('start_date', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = events
            return data
        }
        else if (column === 'end date') {
            const { data: events, error } = await supabase
                .from('event')
                .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
                .eq('charity_id', charity_id).eq('approval_status', 'APPROVED')
                .order('end_date', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = events
            return data
        }
        else if (column === 'event name') {
            const { data: events, error } = await supabase
                .from('event')
                .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
                .eq('charity_id', charity_id).eq('approval_status', 'APPROVED')
                .order('name', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = events
            return data
        }
        data = events
    }
    else {
        const { data: events, error } = await supabase
            .from('event')
            .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
            .eq('charity_id', charity_id).eq('approval_status', 'APPROVED')
            .order('id', { ascending: false })
        data = events
    }

    return data
}

async function getPendingEventData(column: any, order: any, charity_id: number) {
    var data
    console.log(`RESULTS ARE SORTED BY ${column}, ORDERED BY ${order}, FROM CHARITY NUMBER ${charity_id}`)
    if ((column != null || column != undefined) || (order != null || order != undefined)) {
        const { data: pending_events, error: pending_error } = await supabase
            .from('event')
            .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
            .eq('charity_id', charity_id).eq('approval_status', 'ON-HOLD')
            .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        if (column === 'start date') {
            const { data: pending_events, error: pending_error } = await supabase
                .from('event')
                .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
                .eq('charity_id', charity_id).eq('approval_status', 'ON-HOLD')
                .order('start_date', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = pending_events
            return data
        }
        else if (column === 'end date') {
            const { data: pending_events, error: pending_error } = await supabase
                .from('event')
                .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
                .eq('charity_id', charity_id).eq('approval_status', 'ON-HOLD')
                .order('end_date', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = pending_events
            return data
        }
        else if (column === 'event name') {
            const { data: pending_events, error: pending_error } = await supabase
                .from('event')
                .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
                .eq('charity_id', charity_id).eq('approval_status', 'ON-HOLD')
                .order('name', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = pending_events
            return data
        }
        data = pending_events
    }
    else {
        const { data: pending_events, error: pending_error } = await supabase
            .from('event')
            .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
            .eq('charity_id', charity_id).eq('approval_status', 'ON-HOLD')
            .order('id', { ascending: false })
        data = pending_events
    }
    return data
}

async function getRejectedEventData(column: any, order: any, charity_id: number) {
    var data
    console.log(`RESULTS ARE SORTED BY ${column}, ORDERED BY ${order}, FROM CHARITY NUMBER ${charity_id}`)
    if ((column != null || column != undefined) || (order != null || order != undefined)) {
        const { data: rejected_events, error: rejected_error } = await supabase
            .from('event')
            .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
            .eq('charity_id', charity_id).eq('approval_status', 'REJECTED')
            .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        if (column === 'start date') {
            const { data: rejected_events, error: rejected_error } = await supabase
                .from('event')
                .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
                .eq('charity_id', charity_id).eq('approval_status', 'REJECTED')
                .order('start_date', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = rejected_events
            return data
        }
        else if (column === 'end date') {
            const { data: rejected_events, error: rejected_error } = await supabase
                .from('event')
                .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
                .eq('charity_id', charity_id).eq('approval_status', 'REJECTED')
                .order('end_date', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = rejected_events
            return data
        }
        else if (column === 'event name') {
            const { data: rejected_events, error: rejected_error } = await supabase
                .from('event')
                .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
                .eq('charity_id', charity_id).eq('approval_status', 'REJECTED')
                .order('name', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = rejected_events
            return data
        }
        data = rejected_events
    }
    else {
        const { data: rejected_events, error: rejected_error } = await supabase
            .from('event')
            .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
            .eq('charity_id', charity_id).eq('approval_status', 'REJECTED')
            .order('start_date', { ascending: false })
        data = rejected_events
    }
    return data
}

var message = ""
var messageType = ""
var heading = ""

export default async function Page({ searchParams }: any) {

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

    const events = await getEventData(column, order, charityId)
    const pending_events = await getPendingEventData(column, order, charityId)
    const rejected_events = await getRejectedEventData(column, order, charityId)

    var orderby = "" //checks if order is true or false, then returns a string of ascending and descending respectively
    if (order === 'true') {
        orderby = "ascending"
    }
    else {
        orderby = "descending"
    }

    const generic_error = "Unable to Process request. Please check your data and try again."

    const { data: beneficiaries, error: beneficiaries_error } = await supabase
        .from('beneficiaries')
        .select('*')

    const { data: last_event, error: event_error } = await supabase
        .from('event')
        .select('*')
        .order('id', { ascending: false }).limit(1)

    const event_id = last_event?.map(event => event.id)
    console.log("LAST EVENT'S ID IS: " + (event_id))

    //CASH DATA, FORMATTED FOR EXPORTING
    const rows_1 = events?.map(row => ({
        ID: row.id,
        EVENT_NAME: row.name,
        DESCRIPTION: row.description,
        BENEFICIARY: row.beneficiaries?.beneficiary_name,
        START_DATE: (row.start_date != null || row.start_date != undefined) ? `${formatDate(row.start_date)}, ${formatTime(row.start_date)}` : "N/A",
        END_DATE: (row.end_date != null || row.end_date != undefined) ? `${formatDate(row.end_date)}, ${formatTime(row.end_date)}` : "N/A",
        APPROVAL_STATUS: row.approval_status,
        REJECTION_REASON: (row.rejection_reason != null || row.rejection_reason != undefined) ? row.rejection_reason : "N/A"
    }))

    //CASH DATA, FORMATTED FOR EXPORTING
    const rows_2 = pending_events?.map(row => ({
        ID: row.id,
        EVENT_NAME: row.name,
        DESCRIPTION: row.description,
        BENEFICIARY: row.beneficiaries?.beneficiary_name,
        START_DATE: (row.start_date != null || row.start_date != undefined) ? `${formatDate(row.start_date)}, ${formatTime(row.start_date)}` : "N/A",
        END_DATE: (row.end_date != null || row.end_date != undefined) ? `${formatDate(row.end_date)}, ${formatTime(row.end_date)}` : "N/A",
        APPROVAL_STATUS: row.approval_status,
        REJECTION_REASON: (row.rejection_reason != null || row.rejection_reason != undefined) ? row.rejection_reason : "N/A"
    }))

    //CASH DATA, FORMATTED FOR EXPORTING
    const rows_3 = rejected_events?.map(row => ({
        ID: row.id,
        EVENT_NAME: row.name,
        DESCRIPTION: row.description,
        BENEFICIARY: row.beneficiaries?.beneficiary_name,
        START_DATE: (row.start_date != null || row.start_date != undefined) ? `${formatDate(row.start_date)}, ${formatTime(row.start_date)}` : "N/A",
        END_DATE: (row.end_date != null || row.end_date != undefined) ? `${formatDate(row.end_date)}, ${formatTime(row.end_date)}` : "N/A",
        APPROVAL_STATUS: row.approval_status,
        REJECTION_REASON: (row.rejection_reason != null || row.rejection_reason != undefined) ? row.rejection_reason : "N/A"
    }))

    const handleSubmit = async (formData: FormData) => {
        'use server'
        const event = {
            name: formData.get("event_name"),
            description: formData.get("details"),
            start_date: formData.get("start_date"),
            end_date: formData.get("end_date"),
            //photo: CDNURL,
            charity_id: formData.get("charity_id"),
            beneficiary_id: formData.get("beneficiary_id"),
            is_ongoing: true,
            approval_status: 'ON-HOLD'
        };

        const { data: insert_event, error: insert_error } = await supabase.from('event').insert(event);

        if (insert_error) {
            const error = insert_error
            message = `Failed to Add Event. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
            messageType = "ERROR"
            heading = "Event not Created."
        }
        else {
            message = "Your new event has been added. The Admins will be reviewing it as soon as possible."
            messageType = "SUCCESS"
            heading = "Event Added."
            CharityLog("ADDED NEW EVENT " + formData.get("event_name") + ".", event_error)
        }

        revalidatePath('/');
        // DisplayError(`${getURL}dashboard/beneficiaries/events?err=${generic_error}`, insert_error)
    };

    const saveChanges = async (formData: FormData) => {
        'use server'
        const eventId = formData.get("id")
        const event = {
            name: formData.get("event_name"),
            description: formData.get("description"),
            start_date: formData.get("start_date"),
            end_date: formData.get("end_date"),
            beneficiary_id: formData.get("beneficiary_id")
        };

        const { data: update_event, error: update_error } = await supabase.from('event').update(event).eq("id", eventId).select()

        if (update_error) {
            const error = update_error
            message = `Failed to Update Event. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
            messageType = "ERROR"
            heading = "Event not Updated."
        }
        else {
            message = "Your event has been updated. The Admins will be reviewing it as soon as possible."
            messageType = "SUCCESS"
            heading = "Event Updated."
            CharityLog("UPDATED EVENT " + formData.get("event_name"), update_error)
        }

        revalidatePath('/');
        // DisplayError(`https://isproj2.vercel.app/dashboard/beneficiaries/events?err=${generic_error}`, update_error)
    };

    const saveChanges2 = async (formData: FormData) => {
        'use server'
        const eventId = formData.get("id")
        const event = {
            name: formData.get("event_name"),
            description: formData.get("description"),
            start_date: formData.get("start_date"),
            end_date: formData.get("end_date"),
            beneficiary_id: formData.get("beneficiary_id"),
            approval_status: 'ON-HOLD'
        };

        const { data: update_event, error: update_error } = await supabase.from('event').update(event).eq("id", eventId).select()

        if (update_error) {
            const error = update_error
            message = `Failed to Update Event. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
            messageType = "ERROR"
            heading = "Event not Updated."
        }
        else {
            message = "Your event has been updated. The Admins will be reviewing it as soon as possible."
            messageType = "SUCCESS"
            heading = "Event Updated."
            CharityLog("UPDATED EVENT " + formData.get("event_name"), update_error)
        }

        revalidatePath('/');
        // DisplayError(`https://isproj2.vercel.app/dashboard/beneficiaries/events?err=${generic_error}`, update_error)
    };

    const endEvent = async (formData: FormData) => {
        'use server'
        const eventId = formData.get("id")
        const event = {
            is_ongoing: false
        };

        const { data: update_event, error: update_error } = await supabase.from('event').update(event).eq("id", eventId).select()

        if (update_error) {
            const error = update_error
            message = `Failed to Close Event. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
            messageType = "ERROR"
            heading = "Event not Closed."
        }
        else {
            message = "Your event has been updated."
            messageType = "SUCCESS"
            heading = "Event Closed."
            CharityLog("CLOSED EVENT " + formData.get("event_name"), update_error)
        }

        revalidatePath('/');
        // DisplayError(`https://isproj2.vercel.app/dashboard/beneficiaries/events?err=${generic_error}`, update_error)
    };

    const deleteEvent = async (formData: FormData) => {
        'use server'
        const eventId = formData.get("id")
        const event = {
            name: formData.get("event_name"),
            description: formData.get("description"),
            start_date: formData.get("start_date"),
            end_date: formData.get("end_date"),
        };

        const { data: delete_event, error: delete_error } = await supabase.from('event').delete().eq("id", eventId).select()

        if (delete_error) {
            const error = delete_error
            message = `Failed to Delete Event. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
            messageType = "ERROR"
            heading = "Event not Deleted."
        }
        else {
            message = "Your event has been deleted."
            messageType = "SUCCESS"
            heading = "Event Deleted."
            CharityLog("DELETED EVENT" + formData.get("event_name") + ".", delete_error)
        }

        revalidatePath('/');

        // DisplayError(`https://isproj2.vercel.app/dashboard/beneficiaries/events?err=${generic_error}`, delete_error)
    };

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>
            <SlideOver title="Filter & Sort Data" buttontext="Filter & Sort Data" variant="solid" color="yellow">
                <div className="flex-col">
                    <form className='flex flex-col w-full gap-y-6' action="/dashboard/beneficiaries/events" method="GET">
                        <div className="flex flex-col"> {/* Flex container for the first column */}
                            <label className="block text-sm font-medium text-gray-700">Sort by:</label>
                            <br />
                            <SelectField
                                name="column"
                                required
                            >
                                <option value={"id"}>id</option>
                                <option value={"event name"}>event name</option>
                                <option value={"start date"}>start date</option>
                                <option value={"end date"}>end date</option>
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
            <TableContainer>
                <TableHeaderButton header="Pending Events">
                    <SlideOver title="Add Event Details" buttontext="Add Event" variant="solid" color="blue">
                        <form className="space-y-6" action={handleSubmit} method="POST">
                            <TextField
                                label=""
                                name="charity_id"
                                type="hidden"
                                defaultValue={charity_id}
                                required
                            />

                            <TextField
                                label="Event Name"
                                name="event_name"
                                type="text"
                                required
                            />

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Details
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="details"
                                        name="details"
                                        rows={4}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                        placeholder="Event Details go here..."
                                    />
                                </div>
                            </div>

                            <SelectField
                                className="col-span-full py-2"
                                label="Assign Beneficiary"
                                name="beneficiary_id"
                            >
                                {beneficiaries?.map(beneficiary => (
                                    <option key={beneficiary.id} value={beneficiary.id}>{beneficiary.beneficiary_name}</option>
                                ))}
                            </SelectField>

                            <TextField
                                label="Start Date"
                                name="start_date"
                                type="datetime-local"
                                required
                            />

                            <TextField
                                label="End Date"
                                name="end_date"
                                type="datetime-local"
                                required
                            />
                            <ImageUpload folderName="event" charityID={charity_id![0]} recordID={event_id![0] + 1} labelText="Upload Event Images" />
                            <ImageUpload folderName="event" charityID={charity_id![0]} recordID={event_id![0] + 1} labelText="Upload Project Document/s" />

                            <div className="col-span-full">
                                <Button type="submit" variant="solid" color="blue" className="w-full">
                                    <span>
                                        Submit for Approval <span aria-hidden="true">&rarr;</span>
                                    </span>
                                </Button>
                            </div>
                        </form>
                        <Message content={message} type={messageType} heading={heading} />
                    </SlideOver>
                </TableHeaderButton>
                <TableContent>
                    <ExportTest rows={rows_2} fileName={"PENDING EVENTS"} sheetName={"EVENTS"} />
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Event Name</Th>
                                <Th>Start Date</Th>
                                <Th>End Date</Th>
                                <Th>Approval Status</Th>
                                <Th>Ongoing?</Th>
                                <Th> </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {pending_events?.map(event => (

                                <Tr key={event.id}>
                                    <Td>{event.name}</Td>
                                    <Td>{formatDate(event.start_date) + ' ' + formatTime(event.start_date)}</Td>
                                    <Td>{formatDate(event.end_date) + ' ' + formatTime(event.end_date)}</Td>
                                    <Td>{event.approval_status}</Td>
                                    <Td>
                                        {
                                            event.is_ongoing ? ("ongoing") : ("ended")
                                        }
                                    </Td>
                                    <Td>
                                        <SlideOver title="Edit Event Details" buttontext="View Details" variant="solid" color="blue">
                                            <form className="space-y-6" action={saveChanges} method="PUT">
                                                <TextField
                                                    label=""
                                                    name="id"
                                                    type="hidden"
                                                    defaultValue={event.id}
                                                    required
                                                />

                                                <TextField
                                                    label="Event Name"
                                                    name="event_name"
                                                    defaultValue={event.name}
                                                    type="text"
                                                    required
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
                                                            placeholder="Event Details go here..."
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
                                                    label="New Start Date"
                                                    name="start_date"
                                                    type="datetime-local"

                                                />

                                                <TextField
                                                    label="Current End Date"
                                                    name="end_date"
                                                    type="text"
                                                    defaultValue={formatDate(event.end_date as string) + ' ' + formatTime(event.end_date as string)}
                                                    readOnly
                                                />

                                                <TextField
                                                    label="New End Date"
                                                    name="end_date"
                                                    type="datetime-local"

                                                />

                                                <SelectField
                                                    className="col-span-full py-5"
                                                    label="Assign Beneficiary"
                                                    name="beneficiary_id"
                                                >
                                                    {beneficiaries?.map(beneficiary => (
                                                        <option key={beneficiary.id} value={beneficiary.id}>{beneficiary.beneficiary_name}</option>
                                                    ))}
                                                </SelectField>

                                                <div className="col-span-full">
                                                    <Button type="submit" variant="solid" color="blue" className="w-full">
                                                        <span>
                                                            Save Changes <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </Button>
                                                </div>
                                                <div className="col-span-full">
                                                    <Button formAction={deleteEvent} type="submit" variant="solid" color="red" className="w-full">
                                                        <span>
                                                            Delete Event <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </Button>
                                                </div>
                                            </form>
                                            <Message content={message} type={messageType} heading={heading} />
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
                <TableHeader header="Approved Events" />
                <TableContent>
                    <ExportTest rows={rows_1} fileName={"APPROVED EVENTS"} sheetName={"EVENTS"} />
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Event Name</Th>
                                <Th>Start Date</Th>
                                <Th>End Date</Th>
                                <Th>Approval Status</Th>
                                <Th>Ongoing?</Th>
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
                                    <Td>{event.approval_status}</Td>
                                    <Td>
                                        {
                                            event.is_ongoing ? ("ongoing") : ("ended")
                                        }
                                    </Td>
                                    <Td>
                                        <SlideOver title="Edit Event Details" buttontext="View Details" variant="solid" color="blue">
                                            <form className="space-y-6" action={saveChanges} method="PUT">
                                                <TextField
                                                    label=""
                                                    name="id"
                                                    type="hidden"
                                                    defaultValue={event.id}
                                                    required
                                                />

                                                <TextField
                                                    label="Event Name"
                                                    name="event_name"
                                                    defaultValue={event.name}
                                                    type="text"
                                                    required
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
                                                            placeholder="Event Details go here..."
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
                                                    label="New Start Date"
                                                    name="start_date"
                                                    type="datetime-local"

                                                />

                                                <TextField
                                                    label="Current End Date"
                                                    name="end_date"
                                                    type="text"
                                                    defaultValue={formatDate(event.end_date as string) + ' ' + formatTime(event.end_date as string)}
                                                    readOnly
                                                />

                                                <TextField
                                                    label="New End Date"
                                                    name="end_date"
                                                    type="datetime-local"

                                                />

                                                <SelectField
                                                    className="col-span-full py-5"
                                                    label="Assign Beneficiary"
                                                    name="beneficiary_id"
                                                >
                                                    {beneficiaries?.map(beneficiary => (
                                                        <option key={beneficiary.id} value={beneficiary.id}>{beneficiary.beneficiary_name}</option>
                                                    ))}
                                                </SelectField>

                                                <div className="col-span-full">
                                                    <Button type="submit" variant="solid" color="blue" className="w-full">
                                                        <span>
                                                            Save Changes <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </Button>
                                                </div>
                                                <div className="col-span-full">
                                                    <Button formAction={endEvent} type="submit" variant="solid" color="yellow" className="w-full">
                                                        <span>
                                                            Mark Event as &quot;DONE&quot; <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </Button>
                                                </div>
                                                <div className="col-span-full">
                                                    <Button formAction={deleteEvent} type="submit" variant="solid" color="red" className="w-full">
                                                        <span>
                                                            Delete Event <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </Button>
                                                </div>
                                            </form>
                                            <Message content={message} type={messageType} heading={heading} />
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
                <TableHeader header="Rejected Events" />
                <TableContent>
                    <ExportTest rows={rows_3} fileName={"REJECTED EVENTS"} sheetName={"EVENTS"} />
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Event Name</Th>
                                <Th>Start Date</Th>
                                <Th>End Date</Th>
                                <Th>Approval Status</Th>
                                <Th>Ongoing?</Th>
                                <Th> </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {rejected_events?.map(event => (

                                <Tr key={event.id}>
                                    <Td>{event.name}</Td>
                                    <Td>{formatDate(event.start_date) + ' ' + formatTime(event.start_date)}</Td>
                                    <Td>{formatDate(event.end_date) + ' ' + formatTime(event.end_date)}</Td>
                                    <Td>{event.approval_status}</Td>
                                    <Td>
                                        {
                                            event.is_ongoing ? ("ongoing") : ("ended")
                                        }
                                    </Td>
                                    <Td>
                                        <SlideOver title="View Details" buttontext="View Details" variant="solid" color="blue">
                                            <form className="space-y-6" action={saveChanges2} method="PUT">
                                                <TextField
                                                    label=""
                                                    name="id"
                                                    type="hidden"
                                                    defaultValue={event.id}
                                                    required
                                                />

                                                <TextField
                                                    label="Event Name"
                                                    name="event_name"
                                                    defaultValue={event.name}
                                                    type="text"
                                                    required
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
                                                            placeholder="Event Details go here..."
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
                                                    label="New Start Date"
                                                    name="start_date"
                                                    type="datetime-local"

                                                />

                                                <TextField
                                                    label="Current End Date"
                                                    name="end_date"
                                                    type="text"
                                                    defaultValue={formatDate(event.end_date as string) + ' ' + formatTime(event.end_date as string)}
                                                    readOnly
                                                />

                                                <TextField
                                                    label="New End Date"
                                                    name="end_date"
                                                    type="datetime-local"

                                                />

                                                <SelectField
                                                    className="col-span-full py-5"
                                                    label="Assign Beneficiary"
                                                    name="beneficiary_id"
                                                >
                                                    {beneficiaries?.map(beneficiary => (
                                                        <option key={beneficiary.id} value={beneficiary.id}>{beneficiary.beneficiary_name}</option>
                                                    ))}
                                                </SelectField>

                                                <div className="col-span-full">
                                                    <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Reason for Rejection
                                                    </label>
                                                    <div className="mt-2">
                                                        <textarea
                                                            name="reason"
                                                            rows={4}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue={event.rejection_reason}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <Button type="submit" variant="solid" color="blue" className="w-full">
                                                        <span>
                                                            Resubmit Event <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </Button>
                                                </div>
                                                <div className="col-span-full">
                                                    <Button formAction={deleteEvent} type="submit" variant="solid" color="red" className="w-full">
                                                        <span>
                                                            Delete Event <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </Button>
                                                </div>
                                            </form>
                                            <Message content={message} type={messageType} heading={heading} />
                                        </SlideOver>
                                    </Td>
                                </Tr>

                            ))}

                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>
        </>

    )
}