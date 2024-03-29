//@ts-nocheck
import supabase from '@/app/utils/supabase'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import SlideOver, { ExportTest } from '@/components/SlideOverButton'
import {
  Table,
  TableContainer,
  TableContent,
  TableHeader,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@/components/Table'
import { AdminAuth } from '../auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { AdminLog } from '../audit-log/function'
import Plunk from '@plunk/node'
import { render } from '@react-email/render'
import { NoURLMail } from '@/components/email-template'
import { SelectField } from '@/components/Fields'
import { Message } from '@/components/Feedback'
import { NoWhiteSpace } from '@/app/utils/input_validation'
import { DisplayMessage } from '@/components/DisplayMessage'

export const revalidate = 0

async function getCharityApplicationsData(column: any, order: any, charity_id: number) {
  var data
  console.log(`RESULTS ARE SORTED BY ${column}, ORDERED BY ${order}, FROM CHARITY NUMBER ${charity_id}`)
  if ((column != null || column != undefined) || (order != null || order != undefined)) {
    const { data: requests, error } = await supabase
      .from('charity')
      .select('*, address ( * )')
      .eq('charity_verified', false)
      .eq('is_rejected', false)
      .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
    if (column === 'date filed') {
      const { data: requests, error } = await supabase
        .from('charity')
        .select('*, address ( * )')
        .eq('charity_verified', false)
        .eq('is_rejected', false)
        .order('created_at', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
      data = requests
      return data
    }
    data = requests
  }
  else {
    const { data: requests, error } = await supabase
      .from('charity')
      .select('*, address ( * )')
      .eq('charity_verified', false)
      .eq('is_rejected', false)
      .order('created_at', { ascending: false })
    data = requests
  }

  return data
}

const plunk = new Plunk('sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db')

var message = ""
var messageType = ""
var heading = ""

export default async function Applications({ searchParams }: any) {

  // Function to format the timestamp as 'mm/dd/yyy'
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0')
    return `${month}/${day}/${year}`
  }

  // Function to format the time as 'h:mm a' (e.g., '2:30 PM')
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const column = searchParams?.column
  const order = searchParams?.order

  const { data: organizations_id } = await supabase.from('charity')
    .select('*, address ( * )')
    .eq('charity_verified', true)
    .order('created_at', { ascending: false })
  const charity_id = organizations_id?.map(org => org.id)

  const requests = await getCharityApplicationsData(column, order, charity_id)

  var orderby = "" //checks if order is true or false, then returns a string of ascending and descending respectively
  if (order === 'true') {
    orderby = "ascending"
  }
  else {
    orderby = "descending"
  }


  const rows = requests?.map(row => ({
    CHARITY_ID: row.id,
    NAME: row.name,
    ABOUT: row.about,
    PHONE: row.charity_phone,
    EMAIL: row.email_address,
    ADDRESS: JSON.stringify(row.address),
    DATE_JOINED: formatDate(row.created_at) + ' ' + formatTime(row.created_at)
  }))

  const verifyOrg = async (formData: FormData) => {
    'use server'
    const charityId = parseInt(formData.get('id') as string)
    const charityName = String(formData.get('name'))
    const charity = {
      charity_verified: true
    }

    const { data, error } = await supabase.from('charity').update(charity).eq('id', charityId).select()

    if (error) {
      message = `Failed to Verify Charity. Details are below: \n${error.details} \n${error.hint} \n${error.message}.`
      messageType = "ERROR"
      heading = "Operation Failed."
    }
    else {
      message = "The Charity has been Verified."
      messageType = "SUCCESS"
      heading = "Operation Successful."
      await AdminLog('Approved the application of charity ' + charityName + '.')
    }
    revalidatePath('/')
  }

  const rejectOrg = async (formData: FormData) => {
    'use server'
    const email = String(formData.get('email'))
    const name = String(formData.get('name'))
    const reason = String(formData.get('reason'))

    const charityId = parseInt(formData.get('id') as string)

    const valid_input = NoWhiteSpace(reason)

    if (valid_input) {

      const charity = {
        charity_verified: false,
        is_rejected: true,
        rejection_reason: reason
      }

      const { data, error } = await supabase.from('charity').update(charity).eq('id', charityId).select()

      if (error) {
        message = `Failed to Reject Charity. Details are below: \n${error.details} \n${error.hint} \n${error.message}.`
        messageType = "ERROR"
        heading = "Operation Failed."
      }
      else {
        message = "The Charity has been Rejected."
        messageType = "SUCCESS"
        heading = "Operation Successful."
        await AdminLog('Rejected the application of charity ' + name + '.')
      }

      const body = render(
        <NoURLMail
          heading={'APPLICATION STATUS UPDATE'}
          content={
            'Greetings, ' +
            name +
            ". Unfortunately, your charity's application has been rejected for the following reason:\n " +
            reason +
            '.'
          }
        />,
      )

      const success = await plunk.emails.send({
        to: email,
        subject: 'ALERT!',
        body,
      })
      revalidatePath('/')

    }
    else {
      const error_msg = "Invalid Inputs. 2 or more consecutive spaces are not allowed."
      message = error_msg
      messageType = "ERROR"
      heading = "Invalid Input."
      revalidatePath('/');
    }
  }

  return (
    <>
      <div className="py-9 sm:flex sm:items-center">
        <div className="sm:flex-auto"></div>
      </div>
      <TableContainer>
        <TableHeader header="All Charity Approval Requests" />
        <TableContent>
          <SlideOver title="Filter & Sort Data" buttontext="Filter & Sort Data" variant="solid" color="yellow">
            <div className="flex-col">
              <form className='flex flex-col w-full gap-y-6' action="/admin/applications" method="GET">
                <div className="flex flex-col"> {/* Flex container for the first column */}
                  <label className="block text-sm font-medium text-gray-700">Sort by:</label>
                  <br />
                  <SelectField
                    name="column"
                    required
                  >
                    <option value={"id"}>id</option>
                    <option value={"name"}>name</option>
                    <option value={"date filed"}>date filed</option>
                  </SelectField>
                </div>
                <div className="flex mt-4 gap-x-5 items-center"> {/* Flex container for the second column */}
                  <label className="block text-sm font-medium text-gray-700">Order as:</label>
                  <div className="flex gap-x-4 items-center">
                    <div className="flex items-center">
                      <input
                        id="option1"
                        name="order"
                        type="radio"
                        value={true}
                        checked
                        className="h-4 w-4 border-gray-300 text-green-700 focus:ring-green-700"
                      />
                      <label htmlFor="option1" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                        Ascending
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="option2"
                        name="order"
                        type="radio"
                        value={false}
                        className="h-4 w-4 border-gray-300 text-green-700 focus:ring-green-700"
                      />
                      <label htmlFor="option2" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                        Descending
                      </label>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-center mt-4'> {/* Flex container for the third column */}
                  <Button type='submit' variant='solid' color='green' className='w-64'>
                    <span>
                      Apply Changes <span aria-hidden="true">&rarr;</span>
                    </span>
                  </Button>
                </div>
              </form>
            </div>
          </SlideOver>
          <br />
          {/*Displays current filters set*/}
          <div className="font-bold mt-4 mb-4">
            {column && order ? (
              <>
                <p className="text-green-700 inline">Current Filters: </p>
                <span>Sorted by: {column} <span className="text-green-700">::</span> Ordered by: {orderby}</span>
              </>
            ) : (
              <p className="text-gray-600 italic">No filters currently active</p>
            )}
          </div>
          <ExportTest rows={rows} fileName={"PENDING CHARITIES"} sheetName={"APPLICATIONS"} />
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email Address</Th>
                <Th>Date Filed</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests?.map((request) => (
                <Tr key={request.id}>
                  <Td>{request.name}</Td>
                  <Td>{request.email_address}</Td>
                  <Td>
                    {formatDate(request.created_at) +
                      ' ' +
                      formatTime(request.created_at)}
                  </Td>
                  <Td>
                    <SlideOver
                      title="Approval Request Form"
                      buttontext="Review"
                      variant="solid"
                      color="blue"
                    >
                      <form
                        className="space-y-6"
                        action={verifyOrg}
                        method="POST"
                      >
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
                          <label
                            htmlFor="details"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
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
                          <label
                            htmlFor="reason"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
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
                          <Button
                            type="submit"
                            variant="solid"
                            color="blue"
                            className="w-full"
                          >
                            <span>
                              Accept Request{' '}
                              <span aria-hidden="true">&rarr;</span>
                            </span>
                          </Button>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="reason"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
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
                          <Button
                            formAction={rejectOrg}
                            type="submit"
                            variant="solid"
                            color="red"
                            className="w-full"
                          >
                            <span>
                              Reject & Notify Charity{' '}
                              <span aria-hidden="true">&rarr;</span>
                            </span>
                          </Button>
                        </div>
                      </form>

                    </SlideOver>
                  </Td>
                </Tr>
              ))}
              <DisplayMessage content={message} type={messageType} heading={heading} />
            </Tbody>
          </Table>
        </TableContent>
      </TableContainer>
    </>
  )
}
