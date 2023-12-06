//@ts-nocheck
"use client"

import * as XLSX from 'xlsx';
import { Readable } from 'stream';
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
import * as fs from 'fs';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button, VariantKey, ColorKey } from './Button'
import { handleTableExport } from '@/app/utils/xlsx'

export default function SlideOver({ buttontext, children, variant, color, title }: { buttontext: String, children: React.ReactNode, variant: VariantKey, color: ColorKey, title: String }) {
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

export function ExportTest(rows: any[], fileName: String) {

  XLSX.stream.set_readable(Readable);
  XLSX.set_cptable(cpexcel);
  XLSX.set_fs(fs);

  const destructured_rows = rows.rows
  const destructure_file_name = fileName.fileName
  const file_name = `${destructure_file_name}.xlsx`

  return (
    <>
      <Button variant='solid' color='green' onClick={
        async () => {
          /* fetch JSON data and parse */
          const url = "https://sheetjs.com/data/executive.json";
          const raw_data = await (await fetch(url)).json();

          /* filter for the Presidents */
          const prez = raw_data.filter(row => row.terms.some(term => term.type === "prez"));

          /* sort by first presidential term */
          prez.forEach(row => row.start = row.terms.find(term => term.type === "prez").start);
          prez.sort((l, r) => l.start.localeCompare(r.start));

          /* flatten objects */
          const old_rows = prez.map(row => ({
            name: row.name.first + " " + row.name.last,
            birthday: row.bio.birthday
          }));

          console.log("THE ROWS LOOK LIKE THIS: ", destructured_rows)
          console.log("MAYBE IT'S NOT AN ARRAY? " + destructured_rows)
          console.log("DOES IT HAVE INDEXES? " + destructured_rows[0]!)
          console.log("THE TEST DATA LOOKS LIKE THIS: ", old_rows)
          console.log("HOW DOES THE EXAMPLE DATA LOOK LIKE? " + old_rows)
          console.log("IS THE ACTUAL DATA AN ARRAY THO?? " + Array.isArray(destructured_rows) ? "YES":"NO")
          console.log("FILENAME IS: " + file_name)


          /* generate worksheet and workbook */
          const worksheet = XLSX.utils.json_to_sheet(destructured_rows);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

          // /* calculate column width */
          // const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
          // worksheet["!cols"] = [{ wch: max_width }];

          /* create an XLSX file and try to save to Presidents.xlsx */
          XLSX.writeFile(workbook, "Presidents.xlsx", { compression: true });
        }
      } >TEST</Button>
    </>

  )
}

