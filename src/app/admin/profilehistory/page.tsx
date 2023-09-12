import {Table, TableHeader} from '@/components/table/Table';
import {Button} from '@/components/Button';
import React from 'react';

const columns = ["Administrator Name", "Action/s", "Date"];
const people = [
  { AdministratorName: 'bruh Walton', Action: 'Freeze Charity', Date: 'June 20, 2023' },
  { AdministratorName: 'bruh Walton', Action:'Freeze Charity', Date:'June 20, 2023'},
  // More people...
];

export default function Auditlog() {
    return (
        <>
        <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
            Action History
            </h1>
            <p className="mt-2 text-sm text-gray-700">
            A list of all the actions made in your account.
            </p>
        </div>
        </div>

            <Table columnNames={columns} tableRows={people}/>
            <p>button here at end of each</p>
        </>
        
    )
}