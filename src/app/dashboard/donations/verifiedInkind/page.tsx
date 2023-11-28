// @ts-nocheck 
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { SelectField, TextField } from '@/components/Fields'
import { Table, TableContainer, TableContent, TableHeaderButton, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import { Button } from '@/components/Button';
import SlideOver from '@/components/SlideOverButton';
import supabase from '@/app/utils/supabase';
import { revalidatePath } from 'next/cache';
import { EditForm, MultilayeredForm } from './form';
import { GetUID } from '@/app/utils/user_id';

export const revalidate = 0;


export default async function VerifiedTable() {
  // Function to format the timestamp as 'mm/dd/yyy'
  const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
      const day = date.getDate().toString().padStart(2, '0');
      return `${month}/${day}/${year}`;
  };

  // Function to format the time as 'h:mm a' (e.g., '2:30 PM')
  const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  console.log("DOES IT WORK???? MAYBE: " + await GetUID())
  const uid = await GetUID()
  const { data: charity_member, error: idk } = await supabase.from('decrypted_charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
  const charity_id = charity_member?.map(member => member.charity?.id)

  const { data: items, error } = await supabase.from('items_donation_transaction')
  .select('*, charity ( id, name ), address ( * ), donor ( id, name )')
  .eq('verify', true).eq('charity_id', charity_id)
  .order('date', {ascending: false})
  
  const { data: inventory, error: error_2 } = await supabase.from('inventory_item').select('*, items_donation_transaction ( *, charity ( id, name ), address ( * ), donor ( id, name ) )')

  return (
    <>
      <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">
        </div>
      </div>

      <TableContainer>
        <TableHeaderButton header="Verified Item Donations">
          <SlideOver title="Assign Item to Donor" variant="solid" color="blue" buttontext="Assign an item to a donor">
            <MultilayeredForm ID={charity_id}/>
          </SlideOver>
        </TableHeaderButton>
        <TableContent>
          <Table>
            <Thead>
              <Tr>
                <Th>Donor Name</Th>
                <Th>Status</Th>
                <Th>Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items?.map(item =>
                <Tr key={item.id}>
                  <>
                    {item.donor_id ?
                      (<Td>{item.donor?.name}</Td>) :
                      (<Td>{item.donor_name}</Td>)}
                  </>
                  <>
                    {item.verify ?
                      (<Td>VERIFIED</Td>) :
                      (<Td>NOT VERIFIED</Td>)}
                  </>
                  <Td>{formatDate(item.date) + ' ' + formatTime(item.date)}</Td>
                  <Td>
                    <SlideOver title="Edit Item Details" variant="solid" color="blue" buttontext="View Details">
                      <EditForm id={item.id} orgID={charity_id} />
                    </SlideOver>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContent>
      </TableContainer>
    </>
  )
} 