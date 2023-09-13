import {Table, TableHeader} from '@/components/table/Table';
import {Button} from '@/components/Button';
import React from 'react';

const header = "Audit Log";
const subheader = "I see you spending our charity money on cherry MX brown switch dildos, Myko.";
const columns = ["Administrator Name", "Action/s", "Date"];
const people = [
  { AdministratorName: 'bruh Walton', Action: 'Front-end Developer', Date: 'lindsay.walton@example.com' },
  { AdministratorName: 'bruh', Action:'ginormous godzilla', Date:'inormous godzilla'},
  // More people...
];

export default function Auditlog() {
    return (
        <>
        <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">
        </div>
        </div>

            <Table columnNames={columns} tableRows={people} header={header} subHeader={subheader}/>
            <p>button here at end of each</p>
        </>
        
    )
}