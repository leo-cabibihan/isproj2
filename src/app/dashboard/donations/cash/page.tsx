import {Table, TableHeader} from '@/components/table/Table';
import {Button} from '@/components/Button';
import React from 'react';

const header = "External Income - Cash";
const subheader = "";
const columns = ["Donor Name", "Amount", "Date"];
const people = [
  { DonorName: 'bruh Walton', Amount: 'Front-end Developer', Date: 'lindsay.walton@example.com' },
  { DonorName: 'bruh', Amount:'ginormous godzilla', Date:'inormous godzilla'},
  // More people...
];

export default function ExternalTable() {
    return (
        <>
        <Table columnNames={columns} tableRows={people} header={header} subHeader={subheader}/>
            <p>button here at end of each</p>
        </>
    )
}