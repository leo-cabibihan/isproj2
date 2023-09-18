import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@/components/Table";

const complaints = [
    { id: "1", DonorName: 'Myko Macawiwili', Charity: 'Red Cross', Date: 'June 16, 2023' },
    { id: "2", DonorName: 'Gabe Parinas', Charity: 'Red Cross', Date: 'June 13, 2023' },
    { id: "3", DonorName: 'Leo Cabibihan', Charity: 'Red Cross', Date: 'June 10, 2023' },
    { id: "4", DonorName: 'Ryan Lim', Charity: 'Tulong Lasalyano', Date: 'June 1, 2023' },
]

export default function Page() {
    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Donor Name</Th>
                            <Th>Charity Organization</Th>
                            <Th>Date</Th>
                            <Th> </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {complaints.map(complaint =>

                            <Tr key={complaint.id}>
                                <Td>{complaint.DonorName}</Td>
                                <Td>{complaint.Charity}</Td>
                                <Td>{complaint.Date}</Td>
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