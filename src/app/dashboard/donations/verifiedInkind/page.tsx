import {Table, TableHeader} from '@/components/table/Table'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { SelectField, TextField } from '@/components/Fields'

const header = "Verified In-Kind Donations";
const subheader = "";
const columns = ["Donor Name", "Donated Items", "Date"];
const people = [
  { DonorName: 'Jack Walton', DonatedItems: 'Canned Goods', Date: 'January 20, 2023'},
  { DonorName: 'Mark Yang', DonatedItems:'Canned Goods', Date:'January 20, 2023'},

  // More people...
];


export default function VerifiedTable() {
    return (
        <>    
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <Table columnNames={columns} tableRows={people} header={header} subHeader={subheader}/>

            {/**Add InKind Verified Donations down here */}

            <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 py-5">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Add In-Kind Donations</h2>

  
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-13">
              <div className="sm:col-span-4">
              
                <TextField
                    label="Donor Name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                />

                <TextField
                  label="Pickup Address"
                  name="Address"
                  type="Address"
                  autoComplete="Address"
                  required
                />

                <div className="mt-6 flex items-center justify-start gap-x-6">
                    <button
                    type="submit"
                    className="rounded-md bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Add Another Item
                  </button>
                </div>

                <div className="border-b border-gray-900/10 pb-12"></div>

                <SelectField
                    className="col-span-full py-5"
                    label="Item Name"
                    name="Item Name"
                    >
                    <option>Canned Goods</option>
                    <option>T-Shirt</option>
                </SelectField>
                
                <TextField
                  label="Quantity"
                  name="Quantity"
                  type="Quantity"
                  autoComplete="Quantity"
                  required
                />

                <SelectField
                    className="col-span-full py-5"
                    label="Perishable?"
                    name="Perishable?"
                    >
                    <option>No</option>
                    <option>Yes</option>
                </SelectField>

                <TextField
                  label="Expiry Date (If perishable)"
                  name="Date"
                  type="Date"
                  autoComplete="Date"
                  required
                />

                <div className="mt-6 flex items-center justify-start gap-x-6">
                    <button
                    type="submit"
                    className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Remove Item
                  </button>
                </div>
                    
                <div className="border-b border-gray-900/10 pb-12"></div>
    
                <div className="col-span-full py-6">
                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Proof of Delivery
                    </label>
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
                

                <div className="mt-6 flex items-center justify-start gap-x-6">
                    <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Save
                    </button>
                    <button
                    type="submit"
                    className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Cancel
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
      </form>



        </>
    )
}