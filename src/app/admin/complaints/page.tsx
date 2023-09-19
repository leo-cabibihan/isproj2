import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { Table, TableContainer, TableContent, TableHeader, TableHeaderButton, Tbody, Td, Th, Thead, Tr } from "@/components/Table";
import { request } from "http";

const complaints = [
    { Donor: "Myko Macawiwili", Charity: "Philippine Red Cross", Date: "June 16, 2023" },
    { Donor: "Myko Macawiwili", Charity: "Philippine Red Cross", Date: "June 16, 2023" },
    { Donor: "Myko Macawiwili", Charity: "Philippine Red Cross", Date: "June 16, 2023" },
    { Donor: "Myko Macawiwili", Charity: "Philippine Red Cross", Date: "June 16, 2023" },
    { Donor: "Myko Macawiwili", Charity: "Philippine Red Cross", Date: "June 16, 2023" },
]

export default function Complaints() {
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
                                <Th>NAME</Th>
                                <Th>Email Address</Th>
                                <Th>Date Filed</Th>
                                <Th> </Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {complaints.map(complaint =>
                                <Tr key={complaint.Donor} >
                                    <Td>{complaint.Donor}</Td>
                                    <Td>{complaint.Charity}</Td>
                                    <Td>{complaint.Date}</Td>
                                    <Td>
                                        <SlideOver variant="solid" color="blue" buttontext="View Details">
                                            <form className="space-y-6" action="#" method="POST">
                                                <TextField
                                                    label="Charity Name"
                                                    name="name"
                                                    type="text"
                                                    placeholder={complaint.Charity}
                                                    readOnly
                                                />

                                                <TextField
                                                    label="Complainant"
                                                    name="donor"
                                                    type="text"
                                                    placeholder={complaint.Donor}
                                                    readOnly
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
        </>
    )
}