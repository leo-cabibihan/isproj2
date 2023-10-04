import { Button } from '@/components/Button';
import React from 'react';
import { MediaObject } from '@/components/Single-use';
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import SlideOver from '@/components/SlideOverButton';
import { TextField } from '@/components/Fields';
import supabase from '@/app/utils/supabase';
import { redirect } from 'next/navigation';

const orgName = "Umbrella Corporation";
const orgDesc = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
const complaints = [
    { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
    { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
    { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
    { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
    { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
    { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
    // More people...
];

const appeals = [
    { AdministratorName: 'Joe Biden', Action: 'lorem.ipsum@dolor.com', Date: 'June 05, 2023' },
    { AdministratorName: 'Joe Biden', Action: 'lorem.ipsum@dolor.com', Date: 'June 05, 2023' },
    { AdministratorName: 'Joe Biden', Action: 'lorem.ipsum@dolor.com', Date: 'June 05, 2023' },
    { AdministratorName: 'Joe Biden', Action: 'lorem.ipsum@dolor.com', Date: 'June 05, 2023' },
    { AdministratorName: 'Joe Biden', Action: 'lorem.ipsum@dolor.com', Date: 'June 05, 2023' },
    { AdministratorName: 'Joe Biden', Action: 'lorem.ipsum@dolor.com', Date: 'June 05, 2023' },
    { AdministratorName: 'Joe Biden', Action: 'lorem.ipsum@dolor.com', Date: 'June 05, 2023' },
    // More people...
];

export default async function Organization() {

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

    return (
        <>
            <div className="sm:flex sm:items-center py-9 px-10">
                <div className="sm:flex-auto">
                    <MediaObject heading={orgName} subheading={orgDesc} />
                </div>
            </div>
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
                                <Th>NAME</Th>
                                <Th>Email Address</Th>
                                <Th>Date Filed</Th>
                                <Th> </Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {complaints.map(complaint =>

                                <Tr key={complaint.AdministratorName}>
                                    <Td>{complaint.AdministratorName}</Td>
                                    <Td>{complaint.Action}</Td>
                                    <Td>{complaint.Date}</Td>
                                    <Td>
                                        <SlideOver buttontext="View Complaint" variant="solid" color="blue">
                                            <form className="space-y-6" action="#" method="POST">
                                                <TextField
                                                    label="Charity Name"
                                                    name="charity"
                                                    type="text"
                                                    readOnly
                                                    placeholder={orgName}
                                                />

                                                <TextField
                                                    label="Email Address"
                                                    name="email"
                                                    type="email"
                                                    readOnly
                                                    placeholder={complaint.Action}
                                                />

                                                <TextField
                                                    label="Details"
                                                    name="details"
                                                    type="textarea"
                                                    readOnly
                                                    placeholder={orgDesc}
                                                />

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
                                <Th>NAME</Th>
                                <Th>Email Address</Th>
                                <Th>Date Filed</Th>
                                <Th> </Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {appeals.map(appeal =>

                                <Tr key={appeal.AdministratorName}>
                                    <Td>{appeal.AdministratorName}</Td>
                                    <Td>{appeal.Action}</Td>
                                    <Td>{appeal.Date}</Td>
                                    <Td>
                                        <SlideOver buttontext="View Complaint" variant="solid" color="blue">
                                            <form className="space-y-6" action="#" method="POST">
                                                <TextField
                                                    label="Charity Name"
                                                    name="charity"
                                                    type="text"
                                                    readOnly
                                                    placeholder={orgName}
                                                />

                                                <TextField
                                                    label="Email Address"
                                                    name="email"
                                                    type="email"
                                                    readOnly
                                                    placeholder={appeal.Action}
                                                />

                                                <TextField
                                                    label="Details"
                                                    name="details"
                                                    type="textarea"
                                                    readOnly
                                                    placeholder={orgDesc}
                                                />

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