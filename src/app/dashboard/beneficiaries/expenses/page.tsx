import { SelectField, TextField } from '@/components/Fields'
import SlideOver from "@/components/SlideOverButton"
import { TableContainer, Table, TableContent, TableHeaderButton, Tbody, Td, Thead, Tr } from '@/components/Table';

const header = "Expenses";
const subheader = "A table list of expenses";
const columns = ["Description", "Amount", "Date"];
const expenses = [
    { Description: 'Paid to Chairman', Amount: '69,000', Date: 'January 20,2030' },
    { Description: 'Yolanda to Red Cross', Amount: '50,000', Date: 'January 20,2030' },

    // More people...
];


export default function Expenses() {
    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeaderButton header="Expenses" buttontext="Add Expense">
                    {/**This is Add expense form, put slideover on this later*/}
                    <form className="py-9">
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                                <div>
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Add Expense</h2>
                                </div>

                                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                    <div className="sm:col-span-4">
                                        <TextField
                                            label="Amount"
                                            name="Amount"
                                            type="Amount"
                                            autoComplete="Amount"
                                            required
                                        />

                                        <div className="sm:col-span-4 py-5">
                                            <div className="col-span-full">
                                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Description
                                                </label>
                                                <div className="mt-2">
                                                    <textarea
                                                        id="about"
                                                        name="about"
                                                        rows={3}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        defaultValue={''}
                                                    />
                                                </div>
                                            </div>



                                            <SelectField
                                                className="col-span-full py-5"
                                                label="Assign Event"
                                                name="assign event"
                                            >
                                                <option>Yolanda</option>
                                                <option>Blood Donation</option>
                                            </SelectField>


                                            <div className="col-span-full py-6">
                                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Upload Receipt/s
                                                </label>
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


                                            <div className="mt-6 flex items-center justify-start gap-x-6">
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Save
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </TableHeaderButton>
                <TableContent>
                    <Table>
                        <Thead>
                            <Tr>
                                <Td>Description</Td>
                                <Td>Amount</Td>
                                <Td>Date Added</Td>
                                <Td> </Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {expenses.map(expense =>

                                <Tr key={expense.Description}>
                                    <Td>{expense.Description}</Td>
                                    <Td>{expense.Amount}</Td>
                                    <Td>{expense.Date}</Td>
                                    <Td>
                                        <SlideOver buttontext="View Details" variant='solid' color="green">
                                            {/**This is Edit expense form, put slideover on this later*/}
                                            <form className="py-9">
                                                <div className="space-y-12">
                                                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                                                        <div>
                                                            <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Expense</h2>
                                                        </div>

                                                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                                            <div className="sm:col-span-4">
                                                                <TextField
                                                                    label="Amount"
                                                                    name="Amount"
                                                                    type="Amount"
                                                                    autoComplete="Amount"
                                                                    required
                                                                />

                                                                <div className="sm:col-span-4 py-5">
                                                                    <div className="col-span-full">
                                                                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Description
                                                                        </label>
                                                                        <div className="mt-2">
                                                                            <textarea
                                                                                id="about"
                                                                                name="about"
                                                                                rows={3}
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                defaultValue={''}
                                                                            />
                                                                        </div>
                                                                    </div>



                                                                    <SelectField
                                                                        className="col-span-full py-5"
                                                                        label="Assign Event"
                                                                        name="assign event"
                                                                    >
                                                                        <option>Yolanda</option>
                                                                        <option>Blood Donation</option>
                                                                    </SelectField>


                                                                    <div className="col-span-full py-6">
                                                                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                                            Upload Receipt/s
                                                                        </label>
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


                                                                    <div className="mt-6 flex items-center justify-start gap-x-6">
                                                                        <button
                                                                            type="submit"
                                                                            className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                        >
                                                                            Save
                                                                        </button>
                                                                        <button
                                                                            type="submit"
                                                                            className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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