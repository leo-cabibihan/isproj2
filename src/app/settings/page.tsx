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
import { Button } from '@/components/Button'

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }
const navigation = [
  { name: 'History', href: '/settings/donationHistory', current: false },
  { name: 'Settings', href: '/settings', current: true },
  { name: 'Causes', href: '/causes', current: false }
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(' ')
}

export default function settings() {
  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                Settings
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              {
                <form>
                  <div className="space-y-12">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                      <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Reset Password
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          This is the action of invalidating the current
                          password and then creating a new one.
                        </p>
                      </div>

                      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="sm:col-span-4">
                          <TextField
                            label="Email Address"
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                          />

                          <TextField
                            label="Old Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                          />

                          <TextField
                            label="New Password"
                            name="password"
                            type="password"
                            required
                          />

                          <div className="mt-6 flex items-center justify-start gap-x-6">
                            <button
                              type="submit"
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Update Password
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                      <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Personal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Change account name.
                        </p>
                      </div>

                      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="sm:col-span-3">
                          <TextField
                            label="First Name"
                            placeholder="John"
                            type="name"
                            name="name"
                          />

                          <TextField
                            label="Last Name"
                            placeholder="Doe"
                            type="name"
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save
                    </button>
                    <form action={'/logout-post'} method="post">
                      <button
                        type="submit"
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Log out
                      </button>
                    </form>
                  </div>
                </form>
              }
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
