import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { SelectField, TextField } from '@/components/Fields'
import { Table, TableContainer, TableContent, TableHeaderButton, Tbody, Td, Thead, Tr } from '@/components/Table';
import { Button } from '@/components/Button';
import SlideOver from '@/components/SlideOverButton';
import supabase from '@/app/utils/supabase';
import { revalidatePath } from 'next/cache';
import { EditForm, MultilayeredForm } from './form';

export const revalidate = 0;


export default async function VerifiedTable() {

  const { data: items, error } = await supabase.from('items_donation_transaction').select('*, charity ( id, name ), address ( * ), donor ( id, name )')
  const { data: inventory, error: error_2 } =  await supabase.from('inventory_item').select('*, items_donation_transaction ( *, charity ( id, name ), address ( * ), donor ( id, name ) )')

  console.log("ITEMS ARE: ", items)

  return (
    <>
      <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">
        </div>
      </div>

      <TableContainer>
        <TableHeaderButton header="Verified Item Donations">
          <SlideOver variant="solid" color="blue" buttontext="View Details">
            <MultilayeredForm />
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
              {inventory?.map(item =>
                <Tr key={item.id}> 
                  <>
                    {item.items_donation_transaction?.donor_id ? 
                    (<Td>{item.items_donation_transaction?.donor?.name}</Td>) :
                    (<Td>{item.items_donation_transaction?.donor_name}</Td>)}
                  </>
                  <>
                    {item.items_donation_transaction?.verify ? 
                    (<Td>VERIFIED</Td>):
                    (<Td>NOT VERIFIED</Td>)}
                  </>
                  <Td>{item.items_donation_transaction?.date}</Td>
                  <Td>
                    <SlideOver variant="solid" color="blue" buttontext="View Details">
                      
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