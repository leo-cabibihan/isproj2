import {Table, TableHeader} from '@/components/table/Table';
import {Button} from '@/components/Button';
import React from 'react';

const columns = ["NAME", "Email Address", "Date Filed"];
const rows1 = [
  { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
  { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
  { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
  { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
  { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
  { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
  // More people...
];

const rows2 = [
    { AdministratorName: 'Joe Biden', Action: 'lorem.ipsum@dolor.com', Date: 'June 05, 2023' },
    { AdministratorName: 'Joe Biden', Action: 'lorem.ipsum@dolor.com', Date: 'June 05, 2023' },
    { AdministratorName: 'Joe Biden', Action: 'lorem.ipsum@dolor.com', Date: 'June 05, 2023' },
    { AdministratorName: 'Joe Biden', Action: 'lorem.ipsum@dolor.com', Date: 'June 05, 2023' },
    { AdministratorName: 'Joe Biden', Action: 'lorem.ipsum@dolor.com', Date: 'June 05, 2023' },
    { AdministratorName: 'Joe Biden', Action: 'lorem.ipsum@dolor.com', Date: 'June 05, 2023' },
    { AdministratorName: 'Joe Biden', Action: 'lorem.ipsum@dolor.com', Date: 'June 05, 2023' },
    // More people...
  ];

export default function Organizatio() {
    return (
        <>
        <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
            View Complaints
            </h1>
        </div>
        </div>

            <Table columnNames={columns} tableRows={rows1}/>
            <p>button here at end of each</p>

        <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
            Audit Log
            </h1>
        </div>
        </div>

            <Table columnNames={columns} tableRows={rows2}/>
            <p>button here at end of each</p>
        </>
        
    )
}