import { Button } from "@/components/Button";
import { SelectField, TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { TableContainer, TableHeader, TableContent, Table, Thead, Tr, Td, Tbody } from "@/components/Table";

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
                                <Td>Number of Donations Made</Td>
                                <Td>Total Cash Donated</Td>
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
                                            <form className="space-y-6" action="#" method="POST">
                                                <TextField
                                                    label="Donor Name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="John Doe"
                                                    required
                                                />

                                                <TextField
                                                    label="Pickup Address"
                                                    name="address"
                                                    type="text"
                                                    placeholder="123 Sesame Sreet"
                                                    required
                                                />

                                                <div className="col-span-full">
                                                    <Button href={"#"} variant="solid" color="green" className="w-full">
                                                        <span>
                                                            Add Another Itemm <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </Button>
                                                </div>

                                                <div className="relative">
                                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                        <div className="w-full border-t border-gray-300" />
                                                    </div>
                                                    <div className="relative flex justify-center">
                                                        <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Item Details</span>
                                                    </div>
                                                </div>

                                                <TextField
                                                    label="Item Name"
                                                    name="item_name"
                                                    type="text"
                                                    placeholder="Demon Core"
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
                                                    <Button href={"#"} variant="solid" color="red" className="w-full">
                                                        <span>
                                                            Remove Item <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </Button>
                                                </div>

                                                <div className="relative">
                                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                        <div className="w-full border-t border-gray-300" />
                                                    </div>
                                                    <div className="relative flex justify-center">
                                                        <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Proof of Delivery</span>
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                        <div className="text-center">
                                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                                <label
                                                                    htmlFor="file-upload"
                                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                                >
                                                                    <span>Upload a file</span>
                                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                                </label>
                                                                <p className="pl-1">or drag and drop</p>
                                                            </div>
                                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <Button href={"#"} variant="solid" color="green" className="w-full">
                                                        <span>
                                                            Verify Item <span aria-hidden="true">&rarr;</span>
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