import {Table, TableHeader} from '@/components/table/Table';
import {Button} from '@/components/Button';
import React from 'react';

const header = "Charity Organizations";
const subheader = "Donate to these guys";
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
        </div>
        </div>

            <Table columnNames={columns} tableRows={rows} header={header} subHeader={subheader}/>
            <p>button here at end of each</p>
        </>
        
    )
}