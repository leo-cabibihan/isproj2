import {Table, TableHeader} from '@/components/table/Table'
const columns = ["name", "title", "email", "role"];
const people = [
  { name: 'bruh Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'bruh ass', email: 'lindsay.walton@example.com', role: 'Member' },

  // More people...
];
export default function Page() {
  return (
    <> 
      <Table columnNames={columns} tableRows={people}/>
        
    </>
  )
}