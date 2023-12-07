//@ts-nocheck
import supabase from "@/app/utils/supabase";
import Alert from "@/components/Alert";
import { Button } from "@/components/Button";
import { Message } from "@/components/Feedback";
import { TextField } from "@/components/Fields";
import SlideOver, { ExportTest } from "@/components/SlideOverButton";
import { Table, TableContainer, TableContent, TableHeader, TableHeaderButton, Tbody, Td, Th, Thead, Tr } from "@/components/Table";
import { AlertEmail, Email, NoURLMail } from "@/components/email-template";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import { request } from "http";
import { redirect } from "next/navigation";
import { SelectField } from "@/components/Fields";
import { DisplayMessage } from "@/components/DisplayMessage";

export const revalidate = 0;

async function getCharityComplaintsData(column: any, order: any, donor_id: number) {
    var data
    //console.log(`RESULTS ARE SORTED BY ${column}, ORDERED BY ${order}, FROM DONOR NUMBER ${donor_id}`)
    if ((column != null || column != undefined) || (order != null || order != undefined)) {
      const { data: complaints } = await supabase.from('donor_complaints')
        .select('*, charity ( id, name, email_address ), decrypted_donor ( id, decrypted_name )')
        .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        if(column === 'date filed'){
            const { data: complaints } = await supabase.from('donor_complaints')
                .select('*, charity ( id, name, email_address ), decrypted_donor ( id, decrypted_name )')
                .order('created_at', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = complaints
            return data
        }
        else if(column === 'donor name'){
            const { data: complaints } = await supabase.from('donor_complaints')
                .select('*, charity ( id, name, email_address ), decrypted_donor ( id, decrypted_name )')
                .order('decrypted_donor(decrypted_name)', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = complaints
            return data
        }
      data = complaints
    }
    else {
        const { data: complaints } = await supabase.from('donor_complaints')
            .select('*, charity ( id, name, email_address ), decrypted_donor ( id, decrypted_name )')
            .order('created_at', { ascending: false })
        data = complaints
    }
    return data
  }

const plunk = new Plunk("sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db");

var message = ""
var messageType = ""
var heading = ""

export default async function Complaints({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

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

    const column = searchParams?.column
    const order = searchParams?.order

    const { data: donors } = await supabase.from('decrypted_donor')
    .select('*')
    const donor_id = donors?.map(donor => donor.id)

    const complaints = await getCharityComplaintsData(column, order, donor_id)

    var orderby = "" //checks if order is true or false, then returns a string of ascending and descending respectively
    if (order === 'true') {
        orderby = "ascending"
    }
    else {
        orderby = "descending"
    }
  
  

    const rows = complaints?.map(row => ({
        RECORD_ID: row.id,
        FILED_AGAINST: row.charity?.name,
        COMPLAINT_DETAILS: row.complaint,
        DONOR: row.decrypted_donor?.decrypted_name,
        CREATED_AT: formatDate(row.created_at) + ' ' + formatTime(row.created_at)
    }))

    const notifyOrg = async (formData: FormData) => {
        'use server'

        const email = String(formData.get('email'))
        const donor = String(formData.get('donor'))
        const date = String(formData.get('date'))

        console.log('THIS WORKS ', email, donor, date)

        const body = render(<NoURLMail heading={"You have been reported!"}
            content={"You have been reported by " + donor + " at " + date + ". Please click the link to learn more."} />);

        const success = await plunk.emails.send({
            to: email,
            subject: "ALERT!",
            body,
        })

        if (!success) {
            message = "FAILED TO SEND EMAIL. PLEASE CHECK THE EMAIL ADDRESS AND TRY AGAIN."
            messageType = "ERROR"
            heading = "Failed to Send Email."
        }
        else {
            message = "EMAIL HAS BEEN SENT TO CHARITY."
            messageType = "SUCCESS"
            heading = "Email Success."
        }

        console.log("SUCCESS??? ", success)
    }

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
                            <form className='flex flex-col w-full gap-y-6' action="/admin/complaints" method="GET">
                                <div className="flex flex-col"> {/* Flex container for the first column */}
                                    <label className="block text-sm font-medium text-gray-700">Sort by:</label>
                                    <br />
                                    <SelectField
                                        name="column"
                                        required
                                    >
                                        <option value={"id"}>id</option>
                                        <option value={"donor name"}>donor name</option>
                                        <option value={"date filed"}>date filed</option>
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
                    <br/>
                    {/*Displays current filters set*/}
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
                    <ExportTest rows={rows} fileName={"ALL COMPLAINTS"} sheetName={"COMPLAINTS"} />
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Donor Name</Th>
                                <Th>Charity</Th>
                                <Th>Date Filed</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {complaints?.map(complaint =>
                                <Tr key={complaint.id} >
                                    <Td>{complaint.decrypted_donor?.decrypted_name}</Td>
                                    <Td>{complaint.charity?.name}</Td>
                                    <Td>{formatDate(complaint.created_at) + ' ' + formatTime(complaint.created_at)}</Td>
                                    <Td>
                                        <SlideOver title="Complaint Details" variant="solid" color="blue" buttontext="View Details">
                                            <form className="space-y-6" action={notifyOrg} method="POST">
                                                {searchParams.err && <Alert message={searchParams.err as string} />}
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
                                                    defaultValue={complaint.decrypted_donor?.decrypted_name as string}
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
                                            <DisplayMessage content={message} type={messageType} heading={heading} />
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