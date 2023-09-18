import {Table, TableHeader} from '@/components/table/Table'


const header = "Donor's History";
const subheader = "A table list of Donor's donation history";
const columns = ["Event Name", "Donation Type", "Date Donated"];
const people = [
  { EventName: 'Yolanda', DonationType: 'InKind Donation', Date: 'January 20,2030'},
  { EventName: 'Yolanda', DonationType: 'Cash Donation', Date: 'January 20,2030'},

  // More people...
];


export default function DonorHistory() {
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