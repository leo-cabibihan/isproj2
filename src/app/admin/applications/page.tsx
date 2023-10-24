import supabase from "@/app/utils/supabase";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from "@/components/Table";
import { AdminAuth } from "../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

const requests = [
  { Name: "EduGuru", Email: "eduguru@gmail.com", Date: "05/05/2023" },
  { Name: "Philippine Red Cross", Email: "redcross@gmail.com", Date: "05/05/2023" },
  { Name: "Helping Hands for All", Email: "handsy@gmail.com", Date: "05/05/2023" },
  { Name: "Hope4All", Email: "hope4all@gmail.com", Date: "05/05/2023" },
  { Name: "TheSoupKitchen.org", Email: "soup@gmail.com", Date: "05/05/2023" },
]

export default async function Applications() {

  const { data: requests, error } = await supabase
    .from('charity')
    .select('*')
    .eq('charity_verified', false)

  const verifyOrg = async (formData: FormData) => {
    'use server'
    const charityId = parseInt(formData.get("id") as string)
    const charity = {
      charity_verified: true
    };

    await supabase.from('charity').update(charity).eq("id", charityId)
    revalidatePath('/');
  };


  return (
    <>
      <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">
        </div>
      </div>
      <TableContainer>
        <TableHeader header="All charity approval requests." />
        <TableContent>
          <Table>
            <Thead>
              <Tr>
                <Th>NAME</Th>
                <Th>Email Address</Th>
                <Th>Date Filed</Th>
                <Th> </Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests?.map(request =>

                <Tr key={request.id}>
                  <Td>{request.name}</Td>
                  <Td>{request.email_address}</Td>
                  <Td>{request.created_at}</Td>
                  <Td>
                    <SlideOver buttontext="Review" variant="solid" color="blue">
                      <form className="space-y-6" action={verifyOrg} method="POST">
                        <TextField
                          label=""
                          name="id"
                          type="hidden"
                          defaultValue={request.id}
                          required
                        />

                        <TextField
                          label="Charity Name"
                          name="name"
                          type="text"
                          placeholder={request.name}
                          readOnly
                        />

                        <TextField
                          label="Phone Number"
                          name="name"
                          type="tel"
                          placeholder={request.charity_phone}
                          readOnly
                        />

                        <TextField
                          label="Email"
                          name="email"
                          type="email"
                          placeholder={request.email_address as string}
                          readOnly
                        />

                        <div className="col-span-full">
                          <label htmlFor="details" className="block text-sm font-medium leading-6 text-gray-900">
                            Details
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="details"
                              name="details"
                              rows={3}
                              readOnly
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder={request.about}
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <Button type="submit" variant="solid" color="blue" className="w-full">
                            <span>
                              Accept Request <span aria-hidden="true">&rarr;</span>
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