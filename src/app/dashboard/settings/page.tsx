//@ts-nocheck
const navigation = [
  { name: 'Profile', href: '#', current: true },
  { name: 'Settings', href: '#', current: false },
  { name: 'Messages', href: '#', current: false },
  { name: 'Download', href: '#', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

import { CharityLog } from '@/app/admin/audit-log/function'
import SubscribeButton from '@/app/paypal/subscribe'
import { NoWhiteSpace } from '@/app/utils/input_validation'
import supabase from '@/app/utils/supabase'
import { getURL } from '@/app/utils/url'
import { GetUID } from '@/app/utils/user_id'
import { Button } from '@/components/Button'
import { DisplayMessage } from '@/components/DisplayMessage'
import { Message } from '@/components/Feedback'
import { TextField } from '@/components/Fields'
import { ImageUpdate, ImageUpload } from '@/components/ImgUpload'
import { QRUpload } from '@/components/QrUpload'
import {
  Table,
  TableContainer,
  TableContent,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@/components/Table'
import { revalidatePath } from 'next/cache'

export const revalidate = 0

var message = ""
var messageType = ""
var heading = ""

export default async function Settings() {

  const uid = await GetUID()
  const { data: charity_member, error: error_2 } = await supabase
    .from('decrypted_charity_member')
    .select('*, charity ( id, name )')
    .eq('user_uuid', uid)
  const charity_id = charity_member?.map((member) => member.charity?.id)
  const { data: members, error } = await supabase
    .from('decrypted_charity_member')
    .select('*, charity ( id, name )')
    .eq('charity_id', charity_id)
  const { data: locations, error: error_3 } = await supabase
    .from('drop_off_location')
    .select('*')
    .eq('charity_id', charity_id)
  const { data: orgs, error: error_4 } = await supabase
    .from('charity')
    .select('*')
    .eq('id', charity_id)

  const handleSubmit = async (formData: FormData) => {
    'use server'

    const address_input = String(formData.get('address'))
    const valid_address = NoWhiteSpace(address_input)

    if (valid_address) {

      const location = {
        address: formData.get('address'),
        charity_id: formData.get('id'),
      }

      const { data, error } = await supabase.from('drop_off_location').insert(location).select()

      if (error) {
        message = `Failed to Add Record. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
        messageType = "ERROR"
        heading = "Record not Added."
      }
      else {
        message = "Record Added Successfully."
        messageType = "SUCCESS"
        heading = "Record Added."
        CharityLog("ADDED ADDRESS", error)
      }

      revalidatePath('/')
      console.log('ADDRESS ERROR ', error)

    }
    else {
      const error_msg = "Invalid Inputs. 2 or more consecutive spaces are not allowed."
      message = error_msg
      messageType = "ERROR"
      heading = "Invalid Input."
      revalidatePath('/');
    }

  }

  const deleteAddress = async (formData: FormData) => {
    'use server'
    const addressId = formData.get('id')
    const location = {
      address: formData.get('address'),
      charity_id: formData.get('id'),
    }

    const { data: delete_address, error: delete_error } = await supabase
      .from('drop_off_location')
      .delete()
      .eq('id', addressId).select()

    if (delete_error) {
      const error = delete_error
      message = `Failed to Delete Record. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
      messageType = "ERROR"
      heading = "Record not Deleted."
    }
    else {
      message = "Record Deleted Successfully."
      messageType = "SUCCESS"
      heading = "Record Deleted."
      CharityLog("REMOVED ADDRESS", error)
    }

    revalidatePath('/')
  }

  const saveChanges = async (formData: FormData) => {
    'use server'

    const name_input = String(formData.get('orgname'))
    const about_input = String(formData.get('description'))

    const valid_name = NoWhiteSpace(name_input)
    const valid_about = NoWhiteSpace(about_input)

    if (valid_name && valid_about) {

      const orgId = formData.get('id')
      const details = {
        name: formData.get('orgname'),
        about: formData.get('description'),
      }

      const { data: update_org, error: update_error } = await supabase
        .from('charity')
        .update(details)
        .eq('id', orgId)
        .select()

      if (update_error) {
        const error = update_error
        message = `Failed to Update Record. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
        messageType = "ERROR"
        heading = "Record not Updated."
      }
      else {
        message = "Record Updated Successfully."
        messageType = "SUCCESS"
        heading = "Record Updated."
        CharityLog("UPDATED ORG DETAILS", error)
      }

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
      <div className="py-9">
        <div className="space-y-12">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Settings
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-2"></div>
              <div className="sm:col-span-4">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Invite New Member
                </h2>
                <form action={'/charity-invite-post'} method="post">
                  <TextField
                    label="Their Email Address:"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                  />

                  <TextField
                    label=""
                    type="hidden"
                    name="id"
                    defaultValue={charity_id}
                    required
                  />

                  <div className="mt-6 flex items-center justify-start gap-x-6">
                    <Button
                      type="submit"
                      variant="solid"
                      color="green"
                    >
                      + Add Administrator
                    </Button>
                  </div>
                </form>
              </div>
              <div className="sm:col-span-2"></div>
              <div className="sm:col-span-4">
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                Current Members
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {members?.map(person => (
                              <tr key={person.user_uuid}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {person.decrypted_member_name}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2"></div>
              <div className="sm:col-span-4">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Drop-Off Locations</h2>
                <form action={handleSubmit} method='post'>
                  <TextField
                    label='Add Drop-off Address'
                    type="text"
                    name="address"
                    autoComplete="text"
                    required
                  />

                  <TextField
                    label=""
                    type="hidden"
                    name="id"
                    defaultValue={charity_id}
                    required
                  />

                  <div className="mt-6 flex items-center justify-start gap-x-6">
                    <Button
                      type="submit"
                      variant="solid"
                      color="green"
                    >
                      + Add Location
                    </Button>
                  </div>
                </form>
              </div>
              <div className="sm:col-span-2"></div>
              <div className="sm:col-span-4">
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                Current Locations
                              </th>
                              <th> </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {locations?.map(location => (
                              <tr key={location.id}>
                                {location.id ?
                                  (
                                    <>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {location.address}
                                      </td>
                                      <td>
                                        <form action={deleteAddress} method="PUT">
                                          <TextField
                                            label=""
                                            name="id"
                                            type="hidden"
                                            defaultValue={location.id}
                                            required
                                          />
                                          <Button type="submit" variant="solid" color="red" className="w-4/5">Remove</Button>
                                        </form>
                                      </td>
                                    </>
                                  ) : (
                                    <>
                                      <td>This list is empty.</td>
                                    </>
                                  )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2"></div>
              <div className="sm:col-span-4"></div>
              <div className="sm:col-span-2"></div>
              <div className="sm:col-span-4"></div>
              <div className="sm:col-span-2"></div>
              <div className="sm:col-span-4"></div>
              <div className="sm:col-span-2"></div>
              <div className="sm:col-span-4">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Update Charity Details</h2>
                <form action={saveChanges} method='PUT' className="space-y-8">

                  {orgs?.map(org => (
                    <>
                      <div>
                        <TextField
                          label=""
                          type="hidden"
                          name="id"
                          defaultValue={org.id}
                          required
                        />

                        <TextField
                          label="Organization Name"
                          type="text"
                          name="orgname"
                          autoComplete="text"
                          defaultValue={org.name}
                          required
                        />
                      </div>

                      <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Change Charity Icon
                        </h2>
                        <ImageUpload
                          folderName="icons"
                          charityID={charity_id}
                          recordID={charity_id}
                          labelText="Upload Image"
                        />
                      </div>

                      <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Change Charity Banner
                        </h2>
                        <ImageUpdate
                          folderName="charity"
                          charityID={charity_id}
                          recordID={charity_id}
                        />
                      </div>

                      {/* <div>
                        <a
                          className="text-blue-600"
                          href={
                            'https://isproj2.vercel.app/dashboard/settings/' +
                            charity_id +
                            '/change-qr'
                          }
                        >
                          <h2 className="text-base font-semibold leading-7 text-blue-600 hover:text-green-700 hover:underline">
                            Upload QR Code for Cash Donations
                          </h2>
                        </a>
                      </div> */}

                      <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Update &quot;About Us&quot; .
                        </h2>
                        <div className="col-span-full">
                          <div className="mt-2">
                            <textarea
                              id="description"
                              name="description"
                              rows={6}
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder={org.about}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-start gap-x-6">
                        <Button
                          type="submit"
                          variant="solid"
                          color="green"
                          style={{ width: '25%' }}
                        >
                          Save
                        </Button>
                      </div>
                    </>
                  ))}

                </form>
                <DisplayMessage content={message} type={messageType} heading={heading} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Subscribe to GiveMore
                  </h2>
                  <SubscribeButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form
        action={'/logout-post'}
        method="post"
        className="mt-10 grid grid-cols-1 gap-y-8 flex justify-center"
      >
        <div className="flex justify-center">
          <Button type='submit' variant="solid" color="red" style={{ width: '30%' }} className="mx-auto">Log Out</Button>
        </div>
      </form>
    </>
  )
}
