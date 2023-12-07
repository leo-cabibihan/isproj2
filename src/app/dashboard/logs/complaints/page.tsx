//@ts-nocheck
import { CharityLog } from "@/app/admin/audit-log/function";
import supabase from "@/app/utils/supabase";
import { GetUID } from "@/app/utils/user_id";
import { Button } from "@/components/Button";
import { Message } from "@/components/Feedback";
import { TextField } from "@/components/Fields";
import { ImageUpload } from "@/components/ImgUpload";
import SlideOver, { ExportTest } from "@/components/SlideOverButton";
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from "@/components/Table";
import { revalidatePath } from "next/cache";
import { SelectField } from "@/components/Fields";
import { NoWhiteSpace } from "@/app/utils/input_validation";
import { DisplayMessage } from "@/components/DisplayMessage";

export const revalidate = 0;

async function getComplaintsData(column: any, order: any, charity_id: number) {
    var data
    console.log(`RESULTS ARE SORTED BY ${column}, ORDERED BY ${order}, FROM CHARITY NUMBER ${charity_id}`)
    if ((column != null || column != undefined) || (order != null || order != undefined)) {
        const { data: complaints } = await supabase.from('donor_complaints')
            .select('*, charity ( id, name ), decrypted_donor ( id, decrypted_name )')
            .eq('charity_id', charity_id)
            .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        if (column === 'created at') {
            const { data: complaints } = await supabase.from('donor_complaints')
                .select('*, charity ( id, name ), decrypted_donor ( id, decrypted_name )')
                .eq('charity_id', charity_id)
                .order('created_at', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = complaints
            return data
        }
        data = complaints
    }
    else {
        const { data: complaints } = await supabase.from('donor_complaints')
            .select('*, charity ( id, name ), decrypted_donor ( id, decrypted_name )')
            .eq('charity_id', charity_id)
            .order('created_at', { ascending: false })
        data = complaints
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
    const charity_name = charity_member?.map(member => member.charity?.name)

    const column = searchParams?.column
    const order = searchParams?.order

    console.log(`HERE ARE THE ORDERING SETTINGS: ${column} & ${order}`)

    const charityId = charity_id![0]


    const complaints = await getComplaintsData(column, order, charityId)

    const rows = complaints?.map(row => ({
        RECORD_ID: row.id,
        COMPLAINT_DETAILS: row.complaint,
        DONOR: row.decrypted_donor?.decrypted_name,
        CREATED_AT: formatDate(row.created_at) + ' ' + formatTime(row.created_at)
    }))

    var orderby = "" //checks if order is true or false, then returns a string of ascending and descending respectively
    if (order === 'true') {
        orderby = "ascending"
    }
    else {
        orderby = "descending"
    }

    const { data: last_appeal, error: event_error } = await supabase
        .from('charity_appeals')
        .select('*')
        .order('id', { ascending: false }).limit(1)

    const appeal_id = last_appeal?.map(appeal => appeal.id)
    console.log("LAST EXPENSE'S ID IS: " + (appeal_id))

    const handleSubmit = async (formData: FormData) => {
        'use server'

        const explanation_input = String(formData.get("explanation"))
        const valid_explanation = NoWhiteSpace(explanation_input)

        if (valid_explanation) {

            const appeals = {
                charity_id: formData.get("charity_id"),
                charity_worker_id: formData.get("worker_id"),
                complaint_id: formData.get("complaint_id"),
                explanation: formData.get("explanation")
            };

            const { data, error } = await supabase.from('charity_appeals').insert(appeals).select()

            if (error) {
                message = `Failed to File Appeal. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
                messageType = "ERROR"
                heading = "Appeal not Filed."
            }
            else {
                message = "Appeal Filed Successfully."
                messageType = "SUCCESS"
                heading = "Appeal Filed."
                CharityLog("FILED APPEAL", error)
            }

            console.log("APPEALS ERROR IS: ", error)
            revalidatePath('/');

        }
        else {
            const error_msg = "Invalid Inputs. 2 or more consecutive spaces are not allowed."
            message = error_msg
            messageType = "ERROR"
            heading = "Invalid Input."
            revalidatePath('/');
        }

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
                    <SlideOver title="Filter & Sort Data" buttontext="Filter & Sort Data" variant="solid" color="yellow">
                        <div className="flex-col">
                            <form className='flex flex-col w-full gap-y-6' action="/dashboard/logs/complaints" method="GET">
                                <div className="flex flex-col"> {/* Flex container for the first column */}
                                    <label className="block text-sm font-medium text-gray-700">Sort by:</label>
                                    <br />
                                    <SelectField
                                        name="column"
                                        required
                                    >
                                        <option value={"id"}>id</option>
                                        <option value={"created at"}>created at</option>
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
                    <ExportTest rows={rows} fileName={`COMPLAINTS AGAINST ${charity_name}`} sheetName={"COMPLAINTS"} />
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Donor Name</Th>
                                <Th>Complaint</Th>
                                <Th>Date Filed</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {complaints?.map(complaint =>

                                <Tr key={complaint.id}>
                                    <Td>{complaint.decrypted_donor?.decrypted_name}</Td>
                                    <Td>{complaint.charity?.name}</Td>
                                    <Td>{formatDate(complaint.created_at) + ' ' + formatTime(complaint.created_at)}</Td>
                                    <Td>
                                        <SlideOver title="Complaint Details" variant="solid" color="blue" buttontext="View Details">
                                            <form className="space-y-6" action={handleSubmit} method="POST">
                                                <TextField
                                                    label=""
                                                    name="worker_id"
                                                    type="hidden"
                                                    defaultValue={uid}
                                                    readOnly
                                                />

                                                <div className="col-span-full">
                                                    <label htmlFor="complaint" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Complaint
                                                    </label>
                                                    <div className="mt-2">
                                                        <textarea
                                                            id="complaint"
                                                            name="complaint"
                                                            rows={3}
                                                            readOnly
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue={complaint.complaint}
                                                        />
                                                    </div>
                                                </div>

                                                <TextField
                                                    label=""
                                                    name="charity_id"
                                                    type="hidden"
                                                    defaultValue={charity_id}
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
                                                    defaultValue={complaint.decrypted_donor?.decrypted_name as string}
                                                    readOnly
                                                />

                                                <div className="col-span-full">
                                                    <label htmlFor="explanation" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Appeal
                                                    </label>
                                                    <div className="mt-2">
                                                        <textarea
                                                            id="explanation"
                                                            name="explanation"
                                                            rows={3}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            placeholder="Enter your Appeal Details here..."
                                                        />
                                                    </div>
                                                </div>

                                                <ImageUpload folderName='charity_appeals' charityID={charity_id} recordID={appeal_id![0] + 1} labelText="Upload Proof" />

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
                        <DisplayMessage content={message} type={messageType} heading={heading} />
                    </Table>
                </TableContent>
            </TableContainer>
        </>

    )
}