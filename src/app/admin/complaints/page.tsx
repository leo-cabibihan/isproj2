import {Table, TableHeader} from '@/components/table/Table'

const header = "Complaints";
const subheader = "Whine whine whine like a little bitch that you are";
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
                </div>
            </div>

            <Table columnNames={columns} tableRows={people} header={header} subHeader={subheader}/>
        </>
    )
    }