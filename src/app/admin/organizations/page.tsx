import { Button } from '@/components/Button';
import { TextField } from '@/components/Fields';
import SlideOver from '@/components/SlideOverButton';
import { Table, TableContainer, TableHeader, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import React from 'react';

const organizations = [
    { Org: "Philippine Red Cross", Email: "redcross@gmail.com", Date: "May 5, 2023" },
    { Org: "Philippine Red Cross", Email: "redcross@gmail.com", Date: "May 5, 2023" },
    { Org: "Philippine Red Cross", Email: "redcross@gmail.com", Date: "May 5, 2023" },
    { Org: "Philippine Red Cross", Email: "redcross@gmail.com", Date: "May 5, 2023" },
    { Org: "Philippine Red Cross", Email: "redcross@gmail.com", Date: "May 5, 2023" },
    { Org: "Philippine Red Cross", Email: "redcross@gmail.com", Date: "May 5, 2023" },
]

export default function ViewCharity() {
    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header="All Charities." />
                <Table>
                    <Thead>
                        <Tr>
                            <Th>NAME</Th>
                            <Th>Email Address</Th>
                            <Th>Date Approved</Th>
                            <Th> </Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {organizations.map(org =>
                            <Tr key={org.Org}>
                                <Td>{org.Org}</Td>
                                <Td>{org.Email}</Td>
                                <Td>{org.Date}</Td>
                                <Td>
                                    <Button href={"/orgs/details"} variant="solid" color="blue" className="w-full">
                                        <span>
                                            View Profile <span aria-hidden="true">&rarr;</span>
                                        </span>
                                    </Button>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </>

    )
}