import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, TableHeader, TableContent, TableHeaderButton } from "@/components/Table";

const events = [
    { name: "Typhoon Yolanda", start_date: "June 08, 2023", end_date: "June 16, 2023" },
    { name: "Typhoon Yolanda", start_date: "June 08, 2023", end_date: "June 16, 2023" },
    { name: "Typhoon Yolanda", start_date: "June 08, 2023", end_date: "June 16, 2023" },
    { name: "Typhoon Yolanda", start_date: "June 08, 2023", end_date: "June 16, 2023" },
    { name: "Typhoon Yolanda", start_date: "June 08, 2023", end_date: "June 16, 2023" },
    { name: "Typhoon Yolanda", start_date: "June 08, 2023", end_date: "June 16, 2023" },
]

export default function Page() {
    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeaderButton header="Events">
                    <SlideOver buttontext="Add Event" variant="solid" color="blue">
                        <form className="space-y-6" action="#" method="POST">
                            <TextField
                                label="Event Name"
                                name="event_name"
                                type="text"
                                required
                            />

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Details
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="details"
                                        name="details"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                        placeholder="Event Details go here..."
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <Button type="submit" variant="solid" color="blue" className="w-full">
                                    <span>
                                        Save Event <span aria-hidden="true">&rarr;</span>
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
                                <Th>Event Name</Th>
                                <Th>Start Date</Th>
                                <Th>End Date</Th>
                                <Th> </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {events.map(event =>

                                <Tr key={event.name}>
                                    <Td>{event.name}</Td>
                                    <Td>{event.start_date}</Td>
                                    <Td>{event.end_date}</Td>
                                    <Td>
                                        <SlideOver buttontext="View Details" variant="solid" color="blue">
                                            <form className="space-y-6" action="#" method="POST">
                                                <TextField
                                                    label="Email Address"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    required
                                                />

                                                <TextField
                                                    label="Password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    required
                                                />

                                                <div className="flex items-center justify-between">
                                                    <div className="text-sm leading-6">
                                                        <a href="/forgot" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                            Forgot password?
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <Button type="submit" variant="solid" color="blue" className="w-full">
                                                        <span>
                                                            Sign up <span aria-hidden="true">&rarr;</span>
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