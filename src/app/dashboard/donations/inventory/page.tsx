import { Button } from "@/components/Button";
import { TextField, SelectField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { TableContainer, TableHeaderButton, TableContent, Table, Thead, Tr, Td, Tbody } from "@/components/Table";

const items = [
    { quantity: "12 Liters", name: "Water", isPerishable: "No" },
    { quantity: "12 Liters", name: "Water", isPerishable: "No" },
    { quantity: "12 Liters", name: "Water", isPerishable: "No" },
    { quantity: "12 Liters", name: "Water", isPerishable: "No" },
    { quantity: "12 Liters", name: "Water", isPerishable: "No" },
]

export default function Page() {
    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeaderButton header="Verified Item Donations">
                    <SlideOver variant="solid" color="blue" buttontext="View Details">
                        <form className="space-y-6" action="#" method="POST">
                            <TextField
                                label="Item Name"
                                name="item"
                                type="text"
                                placeholder="Water"
                                required
                            />

                            <TextField
                                label="Unit of Measurement"
                                name="measurement"
                                type="text"
                                placeholder="Liters"
                                required
                            />

                            <TextField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                placeholder="12"
                                min={1}
                                max={10000}
                                required
                            />

                            <SelectField
                                label="Perishable?"
                                name="isPerishable"
                                placeholder="Yes"
                                required
                            >
                                <option>Yes</option>
                                <option>No</option>
                            </SelectField>

                            <TextField
                                label="Expiry Date (if perishable)"
                                name="expiry"
                                type="date"
                                placeholder="01/12/2023"
                            />

                            <div className="col-span-full">
                                <Button href={"#"} variant="solid" color="green" className="w-full">
                                    <span>
                                        Save Item <span aria-hidden="true">&rarr;</span>
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </SlideOver>
                </TableHeaderButton>
                <TableContent>
                    <Table>
                        <Thead>
                            <Tr>
                                <Td>Quantity</Td>
                                <Td>Donated Items</Td>
                                <Td>Perishable?</Td>
                                <Td> </Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {items.map(item =>
                                <Tr key={item.name}>
                                    <Td>{item.quantity}</Td>
                                    <Td>{item.name}</Td>
                                    <Td>{item.isPerishable}</Td>
                                    <Td>
                                        <SlideOver variant="solid" color="blue" buttontext="View Details">
                                            <form className="space-y-6" action="#" method="POST">
                                                <TextField
                                                    label="Item Name"
                                                    name="item"
                                                    type="text"
                                                    placeholder="Water"
                                                    required
                                                />

                                                <TextField
                                                    label="Unit of Measurement"
                                                    name="measurement"
                                                    type="text"
                                                    placeholder="Liters"
                                                    required
                                                />

                                                <TextField
                                                    label="Quantity"
                                                    name="quantity"
                                                    type="number"
                                                    placeholder="12"
                                                    min={1}
                                                    max={10000}
                                                    required
                                                />

                                                <SelectField
                                                    label="Perishable?"
                                                    name="isPerishable"
                                                    placeholder="Yes"
                                                    required
                                                >
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </SelectField>

                                                <TextField
                                                    label="Expiry Date (if perishable)"
                                                    name="expiry"
                                                    type="date"
                                                    placeholder="01/12/2023"
                                                />

                                                <div className="grid grid-cols-3 gap-4">
                                                    <Button href={"#"} variant="solid" color="green" className="w-full">
                                                        <span>
                                                            Save Changes <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </Button>
                                                    <Button href={"#"} variant="solid" color="red" className="w-full">
                                                        <span>
                                                            Delete Item <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </Button>
                                                    <Button href={"#"} variant="solid" color="red" className="w-full">
                                                        <span>
                                                            Cancel <span aria-hidden="true">&rarr;</span>
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