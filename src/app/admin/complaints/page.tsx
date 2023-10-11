import supabase from "@/app/utils/supabase";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { Table, TableContainer, TableContent, TableHeader, TableHeaderButton, Tbody, Td, Th, Thead, Tr } from "@/components/Table";
import { request } from "http";
import { redirect } from "next/navigation";

const complaints = [
    { Donor: "Myko Macawiwili", Charity: "Philippine Red Cross", Date: "June 16, 2023" },
    { Donor: "Myko Macawiwili", Charity: "Philippine Red Cross", Date: "June 16, 2023" },
    { Donor: "Myko Macawiwili", Charity: "Philippine Red Cross", Date: "June 16, 2023" },
    { Donor: "Myko Macawiwili", Charity: "Philippine Red Cross", Date: "June 16, 2023" },
    { Donor: "Myko Macawiwili", Charity: "Philippine Red Cross", Date: "June 16, 2023" },
]

export default async function Complaints() {

    // console.log("THIS IS A USER: " + await supabase.auth.getUser())
    // console.log("THIS IS A SESSION: " + await supabase.auth.getSession())

    //This gets the currently signed-in user
    const { data: { user } } = await supabase.auth.getUser();
    // console.log(user?.id)
    const uid = user?.id
    console.log("UID IS " + uid)

    //This checks for the admin role
    const { data: admin, error: error_3 } = await supabase.from('system_owner').select('*').eq('id', uid)

    console.log("ADMIN IS " + admin)

    //This redirects anyone that's not signed in and not admin
    if (!user && !admin) {
        console.log("NOT SIGNED IN")
        redirect('/login')
    }

    const { data: complaints } = await supabase.from('donor_complaints').select('*, charity ( id, name ), donor ( id, name )')

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
                                    <Td>{complaint.donor.name}</Td>
                                    <Td>{complaint.charity.name}</Td>
                                    <Td>{complaint.created_at}</Td>
                                    <Td>
                                        <SlideOver variant="solid" color="blue" buttontext="View Details">
                                            <form className="space-y-6" action="#" method="POST">
                                                <TextField
                                                    label="Charity Name"
                                                    name="name"
                                                    type="text"
                                                    placeholder={complaint.charity.name}
                                                    readOnly
                                                />

                                                <TextField
                                                    label="Complainant"
                                                    name="donor"
                                                    type="text"
                                                    placeholder={complaint.donor.name}
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
                            )}
                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>
        </>
    )
}