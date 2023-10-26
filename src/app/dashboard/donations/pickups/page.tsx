import { Button } from "@/components/Button";
import { SelectField, TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { TableContainer, TableHeader, TableContent, Table, Thead, Tr, Td, Tbody } from "@/components/Table";
import { MultilayeredForm } from "./form";

const pickups = [
    { donor_name: "Myko Macawiwili", item: "lato-lato", date: "June 16, 2023" },
    { donor_name: "Gabe Pariñas", item: "Napalm", date: "November 18, 2023" },
    { donor_name: "Abdul Jamal", item: "Airplane", date: "September 11, 2001" },
    { donor_name: "Leo Cabibihan", item: "Laptop", date: "April 20, 1969" },
    { donor_name: "Myko Macawiwili", item: "lato-lato", date: "June 16, 2023" },
    { donor_name: "Pajeet Rashid", item: "Human Feces", date: "June 17, 2022" },
]

export default function Page() {
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
                                <Td>Donated Items</Td>
                                <Td>Date</Td>
                                <Td> </Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {pickups.map(pickup =>
                                <Tr key={pickup.donor_name}>
                                    <Td>{pickup.donor_name}</Td>
                                    <Td>{pickup.item}</Td>
                                    <Td>{pickup.date}</Td>
                                    <Td>
                                        <SlideOver variant="solid" color="blue" buttontext="View Details">
                                            <MultilayeredForm object={pickup}/>
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