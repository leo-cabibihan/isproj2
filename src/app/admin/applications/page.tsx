import {Table, TableHeader} from '@/components/table/Table'
const columns = ["name", "title", "email", "role"];
const people = [
  { name: 'bruh Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'bruh ass', title:'suck my ginormous godzilla', hotdog:'suck my ginormous godzilla',email: 'lindsay.walton@example.com', role: 'Member' },

  // More people...
];
export default function Applications() {
  return (
    <> 
      <Table columnNames={columns} tableRows={people}/>
    </>
  )
}