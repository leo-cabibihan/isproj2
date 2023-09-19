import { Button } from "@/components/Button";
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Thead, Tr } from "@/components/Table";

const people = [
    { DonorName: 'Jack Walton', NumberofDonations: '40', Total: '20,203' },
    { DonorName: 'Mark Yang', NumberofDonations: '21', Total: '20,023' },

    // More people...
];


export default function ListofDonors() {
    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header="List of Donors" />
                <TableContent>
                    <Table>
                        <Thead>
                            <Tr>
                                <Td>Donor Name</Td>
                                <Td>Number of Donations Made</Td>
                                <Td>Total Cash Donated</Td>
                                <Td> </Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {people.map(person =>
                                <Tr key={person.DonorName}>
                                    <Td>{person.DonorName}</Td>
                                    <Td>{person.NumberofDonations}</Td>
                                    <Td>{person.Total}</Td>
                                    <Td>
                                        <Button href={"/dashboard/donations/donors/1"} variant="solid" color="blue">View Details</Button>
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