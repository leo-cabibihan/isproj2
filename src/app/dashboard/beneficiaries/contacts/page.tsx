import { Table, TableContainer, TableContent, TableHeaderButton, Tbody, Td, Th, Thead, Tr } from "@/components/Table"
import SlideOver from "@/components/SlideOverButton"
import { TextField } from "@/components/Fields"
import { Button } from "@/components/Button"
import supabase from "@/app/utils/supabase"
import { revalidatePath } from "next/cache"
import Alert from "@/components/Alert"
import { NextResponse } from "next/server"
import { DisplayError } from "@/app/(auth)/error-handling/function"
import { CharityLog } from "@/app/admin/audit-log/function"

export const revalidate = 0;

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const { data: contacts } = await supabase.from('contacts').select("*").order("id", { ascending: true })

  const handleSubmit = async (formData: FormData) => {
    'use server'
    const beneficiary = {
      name: formData.get("beneficiary"),
      contact_no: formData.get("contact_no"),
      address: formData.get("address")
    };

    const { data: beneficiary_insert, error: insert_error } = await supabase.from('contacts').insert(beneficiary);
    revalidatePath('/');
    CharityLog("ADDED CONTACT " + formData.get("beneficiary") + ".")
    DisplayError(`http://localhost:3000/dashboard/beneficiaries/contacts?err=${insert_error?.message}`, insert_error)

  };

  const saveChanges = async (formData: FormData) => {
    'use server'
    const contactId = formData.get("id")
    const beneficiary = {
      name: formData.get("beneficiary"),
      contact_no: formData.get("contact_no"),
      address: formData.get("address")
    };

    const {data: beneficiaries_update, error: update_error} = await supabase.from('contacts').update(beneficiary).eq("id", contactId)
    revalidatePath('/');
    CharityLog("UPDATED CONTACT " + formData.get("beneficiary") + ".")
    DisplayError(`http://localhost:3000/dashboard/beneficiaries/contacts?err=${update_error?.message}`, update_error)
  };

  const deleteContact = async (formData: FormData) => {
    'use server'
    const contactId = formData.get("id")
    const beneficiary = {
      name: formData.get("beneficiary"),
      contact_no: formData.get("contact_no"),
      address: formData.get("address")
    };

    const {data: beneficiary_delete, error: delete_error} = await supabase.from('contacts').delete().eq("id", contactId)
    revalidatePath('/');
    CharityLog("DELETED CONTACT.")
    DisplayError(`http://localhost:3000/dashboard/beneficiaries/contacts?err=${delete_error?.message}`, delete_error)
  };

  return (
    <>
      <div className="sm:flex sm:items-center py-9">
         <div className="sm:flex-auto">
         </div>
      </div>
      <TableContainer>
        <TableHeaderButton header="Contacts">
          <SlideOver buttontext="Add Contact" variant="solid" color="blue">
            <form className="space-y-6" action={handleSubmit} method="POST">
              {searchParams.err && <Alert message={searchParams.err as string} />}
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
                    <SlideOver buttontext="View Details" variant="solid" color="blue">
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
                          defaultValue={contact.name as string}
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
                          defaultValue={contact.address as string}
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