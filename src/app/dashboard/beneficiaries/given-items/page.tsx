import { TableContainer, Table, Thead, Tr, Th, Tbody, Td } from "@/components/Table";

const people = [
    { AdministratorName: 'bruh Walton', Action: 'Front-end Developer', Date: 'lindsay.walton@example.com' },
    { AdministratorName: 'bruh', Action: 'ginormous godzilla', Date: 'inormous godzilla' },
    { AdministratorName: 'bruh', Action: 'ginormous godzilla', Date: 'inormous godzilla' },
    { AdministratorName: 'bruh', Action: 'ginormous godzilla', Date: 'inormous godzilla' },
]

export default function Page() {
    return (
        <>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>AdministratorName</Th>
                            <Th>Action</Th>
                            <Th>Date</Th>
                            <Th> </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {people.map(person =>

                            <Tr key={person.AdministratorName}>
                                <Td>{person.AdministratorName}</Td>
                                <Td>{person.Action}</Td>
                                <Td>{person.Date}</Td>
                                <Td>
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                        Edit<span className="sr-only">, kek</span>
                                    </a>

                                </Td>
                            </Tr>

                        )}

                    </Tbody>
                </Table>
            </TableContainer>
        </>

    )
}