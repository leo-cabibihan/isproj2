//@ts-nocheck
"use client"

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button, VariantKey, ColorKey } from './Button'
import { handleTableExport } from '@/app/utils/xlsx'

export function SlideOver({ buttontext, children, variant, color, title }: { buttontext: String, children: React.ReactNode, variant: VariantKey, color: ColorKey, title: String }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant={variant} color={color} onClick={() => setOpen(true)}>{buttontext}</Button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            {title}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">{children}</div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>

  )
}

export function ExportButton({ variant, color, data, filename }: { variant: VariantKey, color: ColorKey, data: any, filename: String }) {

  console.log("IDK ANYMORE ", data, filename)
  console.log("IS IT STRINGIFY??? ", JSON.stringify({ rows: data }))
  console.log("THIS IS IN NON-OBJECT ", JSON.stringify(data))

  const handleExport = async (e: any) => {
    e.preventDefault()
    const rawResponse = await fetch(
      `https://isproj2.vercel.app/dashboard/donations/cash/post`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rows: data,
          file_name: filename
        }),
      },
    )
  }

  return (
    <>
      <Button variant={variant} color={color} onClick={handleExport}>Download Data</Button>
    </>

  )
}

