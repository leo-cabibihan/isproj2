//@ts-nocheck
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { DefaultLayout } from '@/components/layouts/Default'
import clsx from 'clsx'
import { TextField } from '@/components/Fields'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { GetUID } from '@/app/utils/user_id'
import supabase from '@/app/utils/supabase'
import { ExportTest } from '@/components/SlideOverButton'
import SlideOver from '@/components/SlideOverButton'
import { SelectField } from '@/components/Fields'
import { Button } from '@/components/Button'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'History', href: '/settings/donationHistory', current: true },
  { name: 'Settings', href: '/settings', current: false },
  { name: 'Causes', href: '/causes', current: false }
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  // More people...
]

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(' ')
}

export const revalidate = 0

async function getDonationHistoryData(column: any, order: any, currentDonor: any) {
  var data
  if ((column != null || column != undefined) || (order != null || order != undefined)) {
    const { data: donor_history, error: donor_historyError } = await supabase
      .from("donor_transaction_history")
      .select("*")
      .eq("donor_id", currentDonor)
      .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
      if(column === 'donation date'){
        const { data: donor_history, error: donor_historyError } = await supabase
          .from("donor_transaction_history")
          .select("*")
          .eq("donor_id", currentDonor)
          .order('donation_date', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        data = donor_history
        return data
      }
      if(column === 'event name'){
        const { data: donor_history, error: donor_historyError } = await supabase
          .from("donor_transaction_history")
          .select("*")
          .eq("donor_id", currentDonor)
          .order('event_name', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        data = donor_history
        return data
      }
      data = donor_history
  }
  else {        
    const { data: donor_history, error: donor_historyError } = await supabase
      .from("donor_transaction_history")
      .select("*")
      .eq("donor_id", currentDonor)
      .order('donation_date', { ascending: false })
    data = donor_history
  }

  return data
}

export default async function donationHistory({ searchParams }: any) {
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
  const column = searchParams?.column
  const order = searchParams?.order

  const uid = await GetUID()
  const { data: donor, error: donorsError2 } = await supabase
    .from("decrypted_donor")
    .select("*")
    .eq("id", uid)
  const currentDonor = donor?.map(donor => (donor.id))

  const donor_history = await getDonationHistoryData(column, order, currentDonor)

  var orderby = "" //checks if order is true or false, then returns a string of ascending and descending respectively
  if (order === 'true') {
      orderby = "ascending"
  }
  else {
      orderby = "descending"
  }

  const { data: donors, error: donorsError } = await supabase
    .from("decrypted_donor")
    .select("*")
    .eq("id", currentDonor)
    .limit(1)

  const rows = donor_history?.map(row => ({
    DONOR_NAME: row.name,
    DONATION_TYPE: row.donation_type,
    DONATED_TO: row.event_name,
    DONATED_ON: formatDate(row.donation_date) + ' ' + formatTime(row.donation_date)
  }))

  return (
    <>
      <div className="min-h-full">
        <div className="py-10">

          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              {
                //   Start of scuffed table
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      {donors?.map(donor => (
                        <h1 className="text-base font-semibold leading-6 text-gray-900" key={donor.decrypted_name}>
                          {donor.decrypted_name + "'s Donation History"}
                        </h1>
                      ))}
                      <p className="mt-2 text-sm text-gray-700">
                        Here you&apos;ll see all of your donations whether it&apos;s cash or an in-kind donation.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <SlideOver title="Filter & Sort Data" buttontext="Filter & Sort Data" variant="solid" color="yellow">
                          <div className="flex-col">
                              <form className='flex flex-col w-full gap-y-6' action={"/settings/donationHistory"} method="GET">
                                  <div className="flex flex-col"> {/* Flex container for the first column */}
                                      <label className="block text-sm font-medium text-gray-700">Sort by:</label>
                                      <br />
                                      <SelectField
                                          name="column"
                                          required
                                      >
                                          <option value={"event name"}>event name</option>
                                          <option value={"donation date"}>donation date</option>
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
                        <ExportTest rows={rows} fileName={`YOUR DONATION HISTORY`} sheetName={"DONATION HISTORY"} />
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Event Name
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Donation Type
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Date Donated
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {donor_history?.map(donor => (
                              <tr key={donor.donor_id}>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {donor.event_name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {donor.donation_type}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {formatDate(donor.donation_date) + ' ' + formatTime(donor.donation_date)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                // End of Scuffed Table
              }
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
