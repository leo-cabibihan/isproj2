import supabase from "@/app/utils/supabase";
import { Button } from "@/components/Button";
import { SelectField, TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, TableHeader, TableContent, TableHeaderButton } from "@/components/Table";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

export default async function Page() {


    const { data: events, error } = await supabase
        .from('event')
        .select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name )')
        .eq('charity.id', 12)

    const handleSubmit = async (formData: FormData) => {
        'use server'
        const event = {
            name: formData.get("event_name"),
            description: formData.get("details"),
            start_date: formData.get("start_date"),
            end_date: formData.get("end_date")
        };

        await supabase.from('event').insert(event);
        revalidatePath('/');
    };

    const saveChanges = async (formData: FormData) => {
        'use server'
        const eventId = formData.get("id")
        const event = {
            name: formData.get("event_name"),
            description: formData.get("details"),
            start_date: formData.get("start_date"),
            end_date: formData.get("end_date")
        };

        await supabase.from('event').update(event).eq("id", eventId)
        revalidatePath('/');
    };

    const deleteContact = async (formData: FormData) => {
        'use server'
        const eventId = formData.get("id")
        const event = {
            name: formData.get("event_name"),
            description: formData.get("details"),
            start_date: formData.get("start_date"),
            end_date: formData.get("end_date")
        };
    
        await supabase.from('contacts').delete().eq("id", eventId)
        revalidatePath('/');
      };

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                <TableHeaderButton header="Events">
                    <SlideOver buttontext="Add Event" variant="solid" color="blue">
                        <form className="space-y-6" action={handleSubmit} method="POST">
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
                                        rows={4}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                        placeholder="Event Details go here..."
                                    />
                                </div>
                            </div>

                            <TextField
                                label="Start Date"
                                name="start_date"
                                type="date"
                                required
                            />

                            <TextField
                                label="End Date"
                                name="end_date"
                                type="date"

                            />

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
                                <Th>Charity</Th>
                                <Th>Beneficiary</Th>
                                <Th> </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {events?.map(event => (

                                <Tr key={event.id}>
                                    <Td>{event.name}</Td>
                                    <Td>{event.start_date}</Td>
                                    <Td>{event.end_date}</Td>
                                    <Td>{event.charity.name}</Td>
                                    <Td>{event.beneficiaries.beneficiary_name}</Td>
                                    <Td>
                                        <SlideOver buttontext="View Details" variant="solid" color="blue">
                                            <form className="space-y-6" action={saveChanges} method="PUT">

                                                <TextField
                                                    label=""
                                                    name="id"
                                                    type="hidden"
                                                    defaultValue={event.id}
                                                    required
                                                />

                                                <TextField
                                                    label="Event Name"
                                                    name="event_name"
                                                    defaultValue={event.name}
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
                                                            rows={4}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue={event.details}
                                                            placeholder="Event Details go here..."
                                                        />
                                                    </div>
                                                </div>

                                                <TextField
                                                    label="Start Date"
                                                    name="start_date"
                                                    type="date"
                                                    defaultValue={event.start_date}
                                                    required
                                                />

                                                <TextField
                                                    label="End Date"
                                                    name="end_date"
                                                    type="date"
                                                    defaultValue={event.end_date}

                                                />
                                                {/* {events?.map(event => (
                                                    <SelectField
                                                        className="col-span-full"
                                                        label="I am a"
                                                        name="beneficiaries"
                                                        key={event.id}
                                                    >
                                                        <option value={event.beneficiaries.name}>{event.beneficiaries.name}</option>
                                                    </SelectField>
                                                ))} */}

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

                            ))}

                        </Tbody>
                    </Table>
                </TableContent>
            </TableContainer>
        </>

    )
}