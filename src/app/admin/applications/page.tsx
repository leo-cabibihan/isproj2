// @ts-nocheck 
import supabase from "@/app/utils/supabase";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { Table, TableContainer, TableContent, TableHeader, Tbody, Td, Th, Thead, Tr } from "@/components/Table";
import { AdminAuth } from "../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AdminLog } from "../audit-log/function";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import { NoURLMail } from "@/components/email-template";

export const revalidate = 0;

const requests = [
  { Name: "EduGuru", Email: "eduguru@gmail.com", Date: "05/05/2023" },
  { Name: "Philippine Red Cross", Email: "redcross@gmail.com", Date: "05/05/2023" },
  { Name: "Helping Hands for All", Email: "handsy@gmail.com", Date: "05/05/2023" },
  { Name: "Hope4All", Email: "hope4all@gmail.com", Date: "05/05/2023" },
  { Name: "TheSoupKitchen.org", Email: "soup@gmail.com", Date: "05/05/2023" },
]

const plunk = new Plunk("sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db");

export default async function Applications() {
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
  const { data: requests, error } = await supabase
    .from('charity')
    .select('*')
    .eq('charity_verified', false)

  const verifyOrg = async (formData: FormData) => {
    'use server'
    const charityId = parseInt(formData.get("id") as string)
    const charityName = String(formData.get("name"))
    console.log("APPROVED CHARITY IS: " + charityName)
    const charity = {
      charity_verified: true
    };

    await supabase.from('charity').update(charity).eq("id", charityId)
    await AdminLog("Approved the application of charity " + charityName + ".")
    revalidatePath('/');
  };

  const rejectOrg = async (formData: FormData) => {
    'use server'
    const email = String(formData.get('email'))
    const name = String(formData.get('name'))
    const reason = String(formData.get('reason'))

    console.log('THIS WORKS ', email, name)

    const body = render(<NoURLMail heading={"APPLICATION STATUS UPDATE"}
      content={"Greetings, " + name + ". Unfortunately, your charity's application has been rejected for the following reason:\n " + reason + "."} />);

    const success = await plunk.emails.send({
      to: email,
      subject: "ALERT!",
      body,
    })

    console.log("SUCCESS??? ", success)

  } 


  return (
    <>
      <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">
        </div>
      </div>
      <TableContainer>
        <TableHeader header="All charity approval requests" />
        <TableContent>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
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
                  <Td>{formatDate(request.created_at) + ' ' + formatTime(request.created_at)}</Td>
                  <Td>
                    <SlideOver title="Approval Request Form" buttontext="Review" variant="solid" color="blue">
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
                          defaultValue={request.name}
                          readOnly
                        />

                        <TextField
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          defaultValue={request.charity_phone}
                          readOnly
                        />

                        <TextField
                          label="Email"
                          name="email"
                          type="email"
                          defaultValue={request.email_address as string}
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
                              defaultValue={request.about}
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                            Uploaded File/s
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="reason"
                              name="reason"
                              rows={3}

                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="Enter your reason for rejection here..."
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

                        <div className="col-span-full">
                          <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                            Reason/s for rejection
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="reason"
                              name="reason"
                              rows={3}

                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="Enter your reason for rejection here..."
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <Button formAction={rejectOrg} type="submit" variant="solid" color="red" className="w-full">
                            <span>
                              Notify Charity <span aria-hidden="true">&rarr;</span>
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