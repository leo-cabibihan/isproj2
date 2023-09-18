import { Button } from '@/components/Button';
import React from 'react';
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import { TextField } from '@/components/Fields';
import SlideOver from '@/components/SlideOverButton';

const logs = [
    { AdminName: "Myko Macawiwili", Actions: "Freeze Charity 'Tulong Lasalyano'.", Date: "June 16, 2023" },
    { AdminName: "Myko Macawiwili", Actions: "Freeze Charity 'Tulong Lasalyano'.", Date: "June 16, 2023" },
    { AdminName: "Myko Macawiwili", Actions: "Freeze Charity 'Tulong Lasalyano'.", Date: "June 16, 2023" },
    { AdminName: "Myko Macawiwili", Actions: "Freeze Charity 'Tulong Lasalyano'.", Date: "June 16, 2023" },
    { AdminName: "Myko Macawiwili", Actions: "Freeze Charity 'Tulong Lasalyano'.", Date: "June 16, 2023" },
]

export default function Auditlog() {
    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>
            <TableContainer>
                <TableHeader header="Audit Log" />
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
                            {logs.map(log =>

                                <Tr key={log.AdminName}>
                                    <Td>{log.AdminName}</Td>
                                    <Td>{log.Actions}</Td>
                                    <Td>{log.Date}</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>
        </>

    )
}