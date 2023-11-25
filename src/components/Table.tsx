// @ts-nocheck 
import { Button } from "./Button"
import { TextField } from "./Fields"
import SlideOver from "./SlideOverButton"

const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
]


export function Table({ children }: { children: React.ReactNode }) {
    return (
        <table className="min-w-full divide-y divide-gray-300">
            {children}
        </table>
    )
} 

export function TableContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">   {/*TableContainer*/}
            {children}
        </div>
    )
}

export function TableHeader({ header }: { header: String }) {
    return (
        <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">{header}</h1>
            </div>
        </div>
    )
}

export function TableHeaderButton({ header, children }: { header: String, children: React.ReactNode }) {
    return (
        <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">{header}</h1>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                {children}
            </div>
        </div>
    )
}

export function TableContent({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    {children}
                </div>
            </div>
        </div>
    )
}

export function Thead({ children }: { children: React.ReactNode }) {
    return (
        <thead>
            {children}
        </thead>
    )
}

export function Tbody({ children }: { children: React.ReactNode }) {
    return (
        <tbody className="divide-y divide-gray-200">
            {children}
        </tbody>
    )
}

export function Tr({ children }: { children: React.ReactNode }) {
    return (
        <tr>
            {children}
        </tr>
    )
}

export function Th({ children }: { children: React.ReactNode }) {
    return (
        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            {children}
        </th>
    )
}

export function Td({ children }: { children: React.ReactNode }) {
    return (
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {children}
        </td>
    )
}