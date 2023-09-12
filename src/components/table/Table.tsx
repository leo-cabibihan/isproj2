import React from 'react'

export function Table<T extends {}>({
  columnNames,
  tableRows,
}: {
  columnNames: string[]
  tableRows: T[]
}) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <TableHeader />
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <TableHead columnNames={columnNames} />
              <TableBody tableRows={tableRows} />
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TableRow<T extends {}>({ obj }: { obj: T }) {
  return (
    <tr>
      {Object.entries(obj).map(([key, value]) => (
        <td
          key={key}
          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
        >
          {' '}
          {typeof value === 'string' ? value : String(value)}{' '}
        </td>
      ))}
    </tr>
  )
}

function TableBody<T extends {}>({ tableRows }: { tableRows: T[] }) {
  return (
    <tbody className="divide-y divide-gray-200">
      {tableRows.map((row, idx) => (
        <TableRow key={idx} obj={row} />
      ))}
    </tbody>
  )
}

function TableHead({ columnNames }: { columnNames: string[] }) {
  return (
    <thead>
      <tr>
        {columnNames.map((column) => (
          <th
            key={column}
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            {column}
          </th>
        ))}
        {/* <th
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
        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
          <span className="sr-only">Edit</span>
        </th> */}
      </tr>
    </thead>
  )
}

export function TableHeader() {
  return (
    /* this applies to all table so for now im commenting, duz each table to have their own instead -myko */

    
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          Users
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          A list of all the users in your account including their name, title,
          email and role.
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
    
    
  )
}
