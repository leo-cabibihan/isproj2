import { Button } from '@/components/Button';
import React from 'react';
import { MediaObject } from '@/components/Single-use';
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from '@/components/Table';

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

export default function Organization() {
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

                            </Tr>
                        </Thead>
                        <Tbody>
                            {complaints.map(complaint =>

                                <Tr key={complaint.AdministratorName}>
                                    <Td>{complaint.AdministratorName}</Td>
                                    <Td>{complaint.Action}</Td>
                                    <Td>{complaint.Date}</Td>
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

                            </Tr>
                        </Thead>
                        <Tbody>
                            {appeals.map(appeal =>

                                <Tr key={appeal.AdministratorName}>
                                    <Td>{appeal.AdministratorName}</Td>
                                    <Td>{appeal.Action}</Td>
                                    <Td>{appeal.Date}</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>
        </>

    )
}