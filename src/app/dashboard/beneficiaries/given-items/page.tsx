import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, TableHeaderButton, TableContent } from "@/components/Table";
import { TableHeader } from "@/components/table/Table";

const people = [
    { AdministratorName: 'bruh Walton', Action: 'Front-end Developer', Date: 'lindsay.walton@example.com' },
    { AdministratorName: 'bruh', Action: 'ginormous godzilla', Date: 'inormous godzilla' },
    { AdministratorName: 'bruh', Action: 'ginormous godzilla', Date: 'inormous godzilla' },
    { AdministratorName: 'bruh', Action: 'ginormous godzilla', Date: 'inormous godzilla' },
]

export default function Page() {
    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>
            <TableContainer>
                <TableHeaderButton header="Given Items" buttontext="Add item.">
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
                </TableHeaderButton>
                <TableContent>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>AdministratorName</Th>
                                <Th>Action</Th>
                                <Th>Date</Th>
                                <Th> </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {people.map(person =>

                                <Tr key={person.AdministratorName}>
                                    <Td>{person.AdministratorName}</Td>
                                    <Td>{person.Action}</Td>
                                    <Td>{person.Date}</Td>
                                    <Td>
                                        <SlideOver buttontext="bruh" variant="solid" color="blue">
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