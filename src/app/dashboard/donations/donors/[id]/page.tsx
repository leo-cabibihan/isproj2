import SlideOver from "@/components/SlideOverButton";
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Thead, Tr } from "@/components/Table";




const people = [
    { EventName: 'Yolanda', DonationType: 'InKind Donation', Date: 'January 20,2030' },
    { EventName: 'Yolanda', DonationType: 'Cash Donation', Date: 'January 20,2030' },

    // More people...
];


export default function DonorHistory() {
    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header="Donor's History" />
                <TableContent>
                    <Table>
                        <Thead>
                            <Tr>
                                <Td>Event Name</Td>
                                <Td>Donation Type</Td>
                                <Td>Date Donated</Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {people.map(person =>
                                <Tr key={person.EventName}>
                                    <Td>{person.EventName}</Td>
                                    <Td>{person.DonationType}</Td>
                                    <Td>{person.Date}</Td>
                                </Tr>
                                )}
                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>
        </>
    )
}