import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { SelectField, TextField } from '@/components/Fields'
import { Table, TableContainer, TableContent, TableHeaderButton, Tbody, Td, Thead, Tr } from '@/components/Table';
import { Button } from '@/components/Button';
import SlideOver from '@/components/SlideOverButton';
import supabase from '@/app/utils/supabase';
import { revalidatePath } from 'next/cache';
import { MultilayeredForm } from './form';

export const revalidate = 0;



const items = [
  { DonorName: 'Jack Walton', DonatedItems: 'Canned Goods', Date: '2023-01-20' },
  { DonorName: 'Mark Yang', DonatedItems: 'Canned Goods', Date: '2023-01-20' },

  // More people...
];


export default async function VerifiedTable() {

  return (
    <>
      <div className="sm:flex sm:items-center py-9">
        <div className="sm:flex-auto">
        </div>
      </div>

      <TableContainer>
        <TableHeaderButton header="Verified Item Donations">
          <SlideOver variant="solid" color="blue" buttontext="View Details">
            {/* <form className="space-y-6" action="#" method="POST">
              <TextField
                label="Donor Name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
              />

              <TextField
                label="Pickup Address"
                name="address"
                type="text"
                placeholder="123 Sesame Sreet"
                required
              />

              <div className="col-span-full">
                <Button href={"#"} variant="solid" color="green" className="w-full">
                  <span>
                    Add Another Itemm <span aria-hidden="true">&rarr;</span>
                  </span>
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Item Details</span>
                </div>
              </div>

              <TextField
                label="Item Name"
                name="item_name"
                type="text"
                placeholder="Demon Core"
                required
              />
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                placeholder="12"
                min={1}
                max={10000}
                required
              />
              <SelectField
                label="Perishable?"
                name="isPerishable"
                placeholder="Yes"
                required
              >
                <option>Yes</option>
                <option>No</option>
              </SelectField>

              <TextField
                label="Expiry Date (if perishable)"
                name="expiry"
                type="date"
                placeholder="01/12/2023"
              />

              <div className="col-span-full">
                <Button href={"#"} variant="solid" color="red" className="w-full">
                  <span>
                    Remove Item <span aria-hidden="true">&rarr;</span>
                  </span>
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Proof of Delivery</span>
                </div>
              </div>

              <div className="col-span-full">
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button href={"#"} variant="solid" color="green" className="w-full">
                  <span>
                    Save <span aria-hidden="true">&rarr;</span>
                  </span>
                </Button>
                <Button href={"#"} variant="solid" color="red" className="w-full">
                  <span>
                    Cancel <span aria-hidden="true">&rarr;</span>
                  </span>
                </Button>
              </div>
            </form> */}
            <MultilayeredForm/>
          </SlideOver>
        </TableHeaderButton>
        <TableContent>
          <Table>
            <Thead>
              <Tr>
                <Td>Donor Name</Td>
                <Td>Donated Items</Td>
                <Td>Date</Td>
                <Td> </Td>
              </Tr>
            </Thead>
            <Tbody>
              {items.map(item =>
                <Tr key={item.DonorName}>
                  <Td>{item.DonorName}</Td>
                  <Td>{item.DonatedItems}</Td>
                  <Td>{item.Date}</Td>
                  <Td>
                    <SlideOver variant="solid" color="blue" buttontext="View Details">
                      <form className="space-y-6" action="#" method="POST">
                        <TextField
                          label="Donor Name"
                          name="name"
                          type="text"
                          placeholder={item.DonorName}
                          required
                        />

                        <TextField
                          label="Pickup Address"
                          name="address"
                          type="text"
                          placeholder="123 Sesame Sreet"
                          required
                        />

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300" />
                          </div>
                          <div className="relative flex justify-center">
                            <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Item Details</span>
                          </div>
                        </div>

                        <TextField
                          label="Item Name"
                          name="item_name"
                          type="text"
                          placeholder={item.DonatedItems}
                          required
                        />
                        <TextField
                          label="Quantity"
                          name="quantity"
                          type="number"
                          placeholder="12"
                          min={1}
                          max={10000}
                          required
                        />
                        <SelectField
                          label="Perishable?"
                          name="isPerishable"
                          placeholder="Yes"
                          required
                        >
                          <option>Yes</option>
                          <option>No</option>
                        </SelectField>

                        <TextField
                          label="Expiry Date (if perishable)"
                          name="expiry"
                          type="date"
                          placeholder={item.Date}
                        />

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300" />
                          </div>
                          <div className="relative flex justify-center">
                            <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Proof of Delivery</span>
                          </div>
                        </div>

                        <div className="col-span-full">
                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <Button href={"#"} variant="solid" color="green" className="w-full">
                            <span>
                              Save <span aria-hidden="true">&rarr;</span>
                            </span>
                          </Button>
                          <Button href={"#"} variant="solid" color="red" className="w-full">
                            <span>
                              Delete <span aria-hidden="true">&rarr;</span>
                            </span>
                          </Button>
                          <Button href={"#"} variant="solid" color="red" className="w-full">
                            <span>
                              Cancel <span aria-hidden="true">&rarr;</span>
                            </span>
                          </Button>
                        </div>
                      </form>
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