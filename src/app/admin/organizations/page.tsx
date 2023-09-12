import {Table, TableHeader} from '@/components/table/Table';
import {Button} from '@/components/Button';
import React from 'react';

const columns = ["NAME", "Email Address", "Date Verified"];
const rows = [
  { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
  { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
  { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
  { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
  { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
  { AdministratorName: 'John Doe', Action: 'lorem.ipsum@dolor.com', Date: 'May 05, 2023' },
  // More people...
];

export default function ViewCharity() {
    return (
        <>
        <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
            Charity List
            </h1>
        </div>
        </div>

            <Table columnNames={columns} tableRows={rows}/>
            <p>button here at end of each</p>
        </>
        
    )
}