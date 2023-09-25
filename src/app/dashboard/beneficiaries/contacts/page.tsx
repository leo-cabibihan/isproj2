import { Table, TableContainer, TableContent, TableHeaderButton, Tbody, Td, Th, Thead, Tr } from "@/components/Table"
import SlideOver from "@/components/SlideOverButton"
import { TextField } from "@/components/Fields"
import { Button } from "@/components/Button"
import supabase from "@/app/utils/supabase"
import { revalidatePath } from "next/cache"

export const revalidate = 0;

export default async function Page() {
  const { data: contacts } = await supabase.from('contacts').select("*").order("id", {ascending: true})

  const handleSubmit = async (formData: FormData) => {
    'use server'
    const beneficiary = {
      name: formData.get("beneficiary"),
      contact_no: formData.get("contact_no"),
      address: formData.get("address")
    };

    await supabase.from('contacts').insert(beneficiary);
    revalidatePath('/');
  };

  const saveChanges = async (formData: FormData) => {
    'use server'
    const contactId = formData.get("id")
    const beneficiary = {
      name: formData.get("beneficiary"),
      contact_no: formData.get("contact_no"),
      address: formData.get("address")
    };

    await supabase.from('contacts').update(beneficiary).eq("id", contactId)
    revalidatePath('/');
  };

  const deleteContact = async (formData: FormData) => {
    'use server'
    const contactId = formData.get("id")
    const beneficiary = {
      name: formData.get("beneficiary"),
      contact_no: formData.get("contact_no"),
      address: formData.get("address")
    };

    await supabase.from('contacts').delete().eq("id", contactId)
    revalidatePath('/');
  };

  return (
    <>
      <TableContainer>
        <TableHeaderButton header="Contacts">
          <SlideOver buttontext="Add Contact" variant="solid" color="blue">
            <form className="space-y-6" action={handleSubmit} method="POST">
              <TextField
                label="Beneficiary Name"
                name="beneficiary"
                type="text"
                required
              />

              <TextField
                label="Contact Number"
                name="contact_no"
                type="number"
                autoComplete="number"
                maxLength={15}
                max={99999999999}
                required
              />

              <TextField
                label="Address"
                name="address"
                type="text"
                required
              />

              {/* <div className="flex items-center justify-between">
              <div className="text-sm leading-6">
                <a href="/forgot" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div> */}

              <div className="col-span-full">
                <Button type="submit" variant="solid" color="blue" className="w-full">
                  <span>
                    Save Beneficiary <span aria-hidden="true">&rarr;</span>
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
                <Th>Name</Th>
                <Th>Contact Number</Th>
                <Th>Address</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {contacts?.map(contact => (
                <Tr key={contact.id}>
                  <Td>{contact.name}</Td>
                  <Td>{contact.contact_no}</Td>
                  <Td>{contact.address}</Td>
                  <Td>
                    {/* This is the EDIT CONTACT form */}
                    <SlideOver buttontext="View" variant="solid" color="blue">
                      <form className="space-y-6" action={saveChanges} method="PUT">
                        <TextField
                          label=""
                          name="id"
                          type="hidden"
                          defaultValue={contact.id}
                          required
                        />

                        <TextField
                          label="Beneficiary Name"
                          name="beneficiary"
                          type="text"
                          defaultValue={contact.name}
                          required
                        />

                        <TextField
                          label="Contact Number"
                          name="contact_no"
                          type="number"
                          autoComplete="number"
                          maxLength={15}
                          max={99999999999}
                          defaultValue={contact.contact_no}
                          required
                        />

                        <TextField
                          label="Address"
                          name="address"
                          type="text"
                          defaultValue={contact.address}
                          required
                        />
                        <div className="grid grid-cols-3 gap-4">
                          <Button type="submit" variant="solid" color="blue" className="w-full">
                            <span>
                              Update <span aria-hidden="true">&rarr;</span>
                            </span>
                          </Button>
                          <Button type="submit" variant="solid" color="red" className="w-full" formAction={deleteContact}>
                            <span>
                              Delete <span aria-hidden="true">&rarr;</span>
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