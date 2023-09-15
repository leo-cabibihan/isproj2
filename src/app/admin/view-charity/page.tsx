import {Table, TableHeader} from '@/components/table/Table';
import {Button} from '@/components/Button';
import React from 'react';
import { MediaObject } from '@/components/Single-use';

const header = "Test";
const subHeader = "Lorem Ipsum BS fuck you.";
const orgName = "Umbrella Corporation";
const orgDesc = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
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

export default function Organization() {
    return (
        <>
        <div className="sm:flex sm:items-center py-9 px-10">
        <div className="sm:flex-auto">  
        <MediaObject heading={orgName} subheading={orgDesc} />
        </div>
        </div>
        <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">  
        </div>
        </div>
        
            <Table columnNames={columns} tableRows={rows1} header={header} subHeader={subHeader}/>
            <p>button here at end of each</p>

        <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">
        </div>
        </div>

            <Table columnNames={columns} tableRows={rows2} header={header} subHeader={subHeader}/>
            <p>button here at end of each</p>
        </>
        
    )
}