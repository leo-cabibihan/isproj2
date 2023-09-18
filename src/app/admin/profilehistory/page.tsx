import { Button } from '@/components/Button';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, TableHeader, TableContent } from '@/components/Table';
import React from 'react';

const actions = [
    { Admin: "Myko Macawiwili", Action: "Wanked to my little pony", Date: "August 12, 2023" },
    { Admin: "Myko Macawiwili", Action: "Bought new keyboard", Date: "August 12, 2023" },
    { Admin: "Myko Macawiwili", Action: "Kidnapped a child", Date: "August 12, 2023" },
    { Admin: "Myko Macawiwili", Action: "Un-virgin-ed the olive oil", Date: "August 12, 2023" },
]

export default function Auditlog() {
    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header="Action History." />
                <TableContent>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Admin Name</Th>
                                <Th>Action</Th>
                                <Th>Date</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {actions.map(action =>
                                <Tr key={action.Admin}>
                                    <Td>{action.Admin}</Td>
                                    <Td>{action.Action}</Td>
                                    <Td>{action.Date}</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>
        </>

    )
}