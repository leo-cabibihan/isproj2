// @ts-nocheck
'use client'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { DefaultLayout } from '@/components/layouts/Default'
import clsx from 'clsx'
import { TextField } from '@/components/Fields'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Causes', href: '#', current: false },
  { name: 'Settings', href: '#', current: false },
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

export default function donationHistory() {
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
                      <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Users
                      </h1>
                      <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their
                        name, title, email and role.
                      </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                      <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add user
                      </button>
                    </div>
                  </div>
                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Title
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Email
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Role
                              </th>
                              <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                              >
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {people.map((person) => (
                              <tr key={person.email}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                  {person.name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {person.title}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {person.email}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {person.role}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                  <a
                                    href="#"
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    Edit
                                    <span className="sr-only">
                                      , {person.name}
                                    </span>
                                  </a>
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
