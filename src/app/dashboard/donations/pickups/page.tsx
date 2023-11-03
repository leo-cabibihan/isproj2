import { Button } from "@/components/Button";
import { SelectField, TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { TableContainer, TableHeader, TableContent, Table, Thead, Tr, Td, Tbody, TableHeaderButton } from "@/components/Table";
import { PickupForm } from "./form";
import supabase from "@/app/utils/supabase";
import { GetUID } from "@/app/utils/user_id";

const pickups = [
    { donor_name: "Myko Macawiwili", item: "lato-lato", date: "June 16, 2023" },
    { donor_name: "Gabe Pariñas", item: "Napalm", date: "November 18, 2023" },
    { donor_name: "Abdul Jamal", item: "Airplane", date: "September 11, 2001" },
    { donor_name: "Leo Cabibihan", item: "Laptop", date: "April 20, 1969" },
    { donor_name: "Myko Macawiwili", item: "lato-lato", date: "June 16, 2023" },
    { donor_name: "Pajeet Rashid", item: "Human Feces", date: "June 17, 2022" },
]

export default async function Page() {
    console.log("DOES IT WORK???? MAYBE: " + await GetUID())
    const uid = await GetUID()
    const { data: charity_member, error: idk } = await supabase.from('charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity?.id)  

    const { data: items, error } = await supabase.from('items_donation_transaction').select('*, charity ( id, name ), address ( * ), donor ( id, name )').eq('verify', false).eq('charity_id', charity_id)
    const { data: inventory, error: error_2 } = await supabase.from('inventory_item').select('*, items_donation_transaction ( *, charity ( id, name ), address ( * ), donor ( id, name ) )')

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeader header={"Pick-up Items"}/>
                <TableContent>
                    <Table>
                        <Thead>
                            <Tr>
                                <Td>Donor Name</Td>
                                <Td>Status</Td>
                                <Td>Date</Td>
                                <Td> </Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {items?.map(item =>
                                <Tr key={item.id}>
                                    <>
                                        {item.donor_id ?
                                            (<Td>{item.donor?.name}</Td>) :
                                            (<Td>{item.donor_name}</Td>)}
                                    </>
                                    <>
                                        {item.verify ?
                                            (<Td>VERIFIED</Td>) :
                                            (<Td>NOT VERIFIED</Td>)}
                                    </>
                                    <Td>{item.date}</Td>
                                    <Td>
                                        <SlideOver variant="solid" color="blue" buttontext="View Details">
                                            <PickupForm id={item.id} />
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