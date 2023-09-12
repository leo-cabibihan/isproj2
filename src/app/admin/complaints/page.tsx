import {Table, TableHeader} from '@/components/table/Table'
const columns = ["Donor Name", "Charity Organization", "Date"];
const people = [
  { DonorName: 'Jack Walton', CharityOrganization: 'Tulong Lasalyano', Date: 'January 20, 2023'},
  { DonorName: 'Mark Yang', CharityOrganization:'Red Cross Philippines', Date:'January 20, 2023'},

  // More people...
];


export default function Complaints() {
    return (
        <>    
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                    Complaints
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                    A list of all the complaints made by the Donors against a respective Organization.
                    </p>
                </div>
            </div>

            <Table columnNames={columns} tableRows={people}/>
            //button after the table 

        </>
    )
    }