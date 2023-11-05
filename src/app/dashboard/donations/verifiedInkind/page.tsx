// @ts-nocheck 
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { SelectField, TextField } from '@/components/Fields'
import { Table, TableContainer, TableContent, TableHeaderButton, Tbody, Td, Thead, Tr } from '@/components/Table';
import { Button } from '@/components/Button';
import SlideOver from '@/components/SlideOverButton';
import supabase from '@/app/utils/supabase';
import { revalidatePath } from 'next/cache';
import { EditForm, MultilayeredForm } from './form';
import { GetUID } from '@/app/utils/user_id';

export const revalidate = 0;


export default async function VerifiedTable() {

  console.log("DOES IT WORK???? MAYBE: " + await GetUID())
  const uid = await GetUID()
  const { data: charity_member, error: idk } = await supabase.from('charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
  const charity_id = charity_member?.map(member => member.charity?.id)

  const { data: items, error } = await supabase.from('items_donation_transaction').select('*, charity ( id, name ), address ( * ), donor ( id, name )').eq('verify', true).eq('charity_id', charity_id)
  const { data: inventory, error: error_2 } = await supabase.from('inventory_item').select('*, items_donation_transaction ( *, charity ( id, name ), address ( * ), donor ( id, name ) )')

  return (
    <>
      <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">
        </div>
      </div>

      <TableContainer>
        <TableHeaderButton header="Verified Item Donations">
          <SlideOver variant="solid" color="blue" buttontext="View Details">
            <MultilayeredForm ID={charity_id}/>
          </SlideOver>
        </TableHeaderButton>
        <TableContent>
          <Table>
            <Thead>
              <Tr>
                <Td>Donor Name</Td>
                <Td>Status</Td>
                <Td>Date</Td>
                <Td> </Td>
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
                  <Td>{item.date}</Td>
                  <Td>
                    <SlideOver variant="solid" color="blue" buttontext="View Details">
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