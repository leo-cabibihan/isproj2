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

export default async function donationHistory() {
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
  const { data: donor, error: donorsError2 } = await supabase
    .from("decrypted_donor")
    .select("*")
    .eq("id", uid)
  const currentDonor = donor?.map(donor => (donor.id))

  const { data: donors, error: donorsError } = await supabase
    .from("decrypted_donor")
    .select("*")
    .eq("id", currentDonor)
    .limit(1)

  const { data: donor_history, error: donor_historyError } = await supabase
    .from("donor_transaction_history")
    .select("*")
    .eq("donor_id", currentDonor)

  //CASH DATA, FORMATTED FOR EXPORTING
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
