import {Table, TableHeader} from '@/components/table/Table'


const header = "List Of Donors";
const subheader = "A table list of Donors";
const columns = ["Donor Name", "Number of Donations", "Total Cash Donated"];
const people = [
  { DonorName: 'Jack Walton', NumberofDonations: '40', Total: '20,203'},
  { DonorName: 'Mark Yang', NumberofDonations:'21', Total:'20,023'},

  // More people...
];


export default function ListofDonors() {
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