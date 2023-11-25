// @ts-nocheck 
import supabase from "@/app/utils/supabase";
import Alert from "@/components/Alert";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { Table, TableContainer, TableContent, TableHeader, TableHeaderButton, Tbody, Td, Th, Thead, Tr } from "@/components/Table";
import { AlertEmail, Email, NoURLMail } from "@/components/email-template";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import { request } from "http";
import { redirect } from "next/navigation";

const plunk = new Plunk("sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db");

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
    const { data: complaints } = await supabase.from('donor_complaints').select('*, charity ( id, name, email_address ), donor ( id, name )')

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
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Donor Name</Th>
                                <Th>Charity</Th>
                                <Th>Date Filed</Th>
                                <Th> </Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {complaints?.map(complaint =>
                                <Tr key={complaint.id} >
                                    <Td>{complaint.donor?.name}</Td>
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
                            )}
                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>
        </>
    )
}