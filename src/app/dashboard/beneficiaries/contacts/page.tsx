//@ts-nocheck
import { Table, TableContainer, TableContent, TableHeaderButton, Tbody, Td, Th, Thead, Tr } from "@/components/Table"
import SlideOver, { ExportTest } from "@/components/SlideOverButton"
import { TextField } from "@/components/Fields"
import { Button } from "@/components/Button"
import supabase from "@/app/utils/supabase"
import { revalidatePath } from "next/cache"
import Alert from "@/components/Alert"
import { NextResponse } from "next/server"
import { DisplayError } from "@/app/(auth)/error-handling/function"
import { CharityLog } from "@/app/admin/audit-log/function"
import { GetUID } from "@/app/utils/user_id"
import { getURL } from '@/app/utils/url'

export const revalidate = 0;

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

  // Function to format the timestamp as 'mm/dd/yyy'
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
  };

  // Function to format the time as 'h:mm a' (e.g., '2:30 PM')
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const uid = await GetUID()
  const { data: charity_member, error: error_2 } = await supabase.from('decrypted_charity_member').select('*, charity ( id, name )').eq('user_uuid', uid).single()
  const charity_id = charity_member?.charity?.id
  const charity_name = charity_member?.charity?.name

  const generic_error = "Transaction error. Please check your data and try again."

  const { data: contacts } = await supabase.from('beneficiaries').select("*").order("id", { ascending: true }).eq('charity_id', charity_id).order('date', { ascending: false })

  //CASH DATA, FORMATTED FOR EXPORTING
  const rows = contacts?.map(row => ({
    BENEFICIARY_ID: row.id,
    BENEFICIARY_NAME: row.beneficiary_name,
    ADDRESS: row.address,
    CONTACT_NUMBER: row.contact,
    DATE_ADDED: formatDate(row.date) + ' ' + formatTime(row.date)
  }))

  const handleSubmit = async (formData: FormData) => {
    'use server'
    const beneficiary = {
      beneficiary_name: formData.get("beneficiary"),
      contact: formData.get("contact_no"),
      address: formData.get("address"),
      charity_id: parseInt(charity_id)
    };

    const { data: beneficiary_insert, error: insert_error } = await supabase.from('beneficiaries').insert(beneficiary).select();
    revalidatePath('/');
    console.log("THE ERROR IS: ", beneficiary_insert, insert_error)
    DisplayError(`https://isproj2.vercel.app/dashboard/beneficiaries/contacts?err=${generic_error}`, insert_error)

    CharityLog("ADDED BENEFICIARY " + beneficiary_insert![0].beneficiary_name + " ON " + beneficiary_insert![0].date + ".", insert_error)
    console.log("ERROR IS ", insert_error)

  };

  const saveChanges = async (formData: FormData) => {
    'use server'
    const contactId = formData.get("id")
    const beneficiary = {
      beneficiary_name: formData.get("beneficiary"),
      contact: formData.get("contact_no"),
      address: formData.get("address")
    };

    const { data: beneficiaries_update, error: update_error } = await supabase.from('beneficiaries').update(beneficiary).eq("id", contactId).select()
    revalidatePath('/');
    CharityLog("UPDATED BENEFICIARY " + beneficiaries_update![0].beneficiary_name + " ON " + beneficiaries_update![0].date + ".", update_error)
    DisplayError(`https://isproj2.vercel.app/dashboard/beneficiaries/contacts?err=${generic_error?.message}`, update_error)
  };

  const deleteContact = async (formData: FormData) => {
    'use server'
    const contactId = formData.get("id")
    const beneficiary = {
      beneficiary_name: formData.get("beneficiary"),
      contact: formData.get("contact_no"),
      address: formData.get("address")
    };

    const { data: beneficiary_delete, error: delete_error } = await supabase.from('beneficiaries').delete().eq("id", contactId).select()
    revalidatePath('/');
    CharityLog("ADDED BENEFICIARY " + beneficiary_delete![0].beneficiary_name + " ON " + beneficiary_delete![0].date + ".", delete_error)
    DisplayError(`https://isproj2.vercel.app/dashboard/beneficiaries/contacts?err=${generic_error?.message}`, delete_error)
  };

  return (
    <>
      <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">
        </div>
      </div>
      <TableContainer>
        <TableHeaderButton header="Contacts">
          <SlideOver title="Add Contact Details" buttontext="Add Contact" variant="solid" color="blue">
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
          <ExportTest rows={rows} fileName={`${charity_name}'s BENEFICIARIES`} sheetName={"BENEFICIARIES"} />
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
                  <Td>{contact.beneficiary_name}</Td>
                  <Td>{contact.contact}</Td>
                  <Td>{contact.address}</Td>
                  <Td>
                    {/* This is the EDIT CONTACT form */}
                    <SlideOver title="Edit Contact Details" buttontext="View Details" variant="solid" color="blue">
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
                          defaultValue={contact.beneficiary_name as string}
                          required
                        />

                        <TextField
                          label="Contact Number"
                          name="contact_no"
                          type="number"
                          autoComplete="number"
                          maxLength={15}
                          max={99999999999}
                          defaultValue={contact.contact}
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