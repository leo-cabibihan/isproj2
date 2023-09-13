import {Table, TableHeader} from '@/components/table/Table';
import {Button} from '@/components/Button';
import React from 'react';

const header = "History";
const subheader = "I saw you watching furry porn in your downtime, Myko.";
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
        </div>
        </div>

            <Table columnNames={columns} tableRows={people} header={header} subHeader={subheader}/>
            <p>button here at end of each</p>
        </>
        
    )
}