//@ts-nocheck
'use client'

import supabase from '@/app/utils/supabase'
import { Button } from '@/components/Button'
import { TextField, SelectField } from '@/components/Fields'
import { ImageUpload } from '@/components/ImgUpload'
import { SetStateAction, useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { getURL } from '@/app/utils/url'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export function MultilayeredForm(ID: any) {
  const [formFields, setFormFields] = useState([
    {
      name: '',
      quantity: '',
      expiry: '',
      perishable: '',
      unit_of_measurement: '',
    },
  ])

  const [newDonor, setNewDonor] = useState(false)
  const [newAddress, setNewAddress] = useState(false)

  const [donor_id, setDonorID] = useState('')
  const [address_id, setAddressID] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [house_number, setHouseNumber] = useState('')
  const [street_name, setStreetName] = useState('')
  const [village_name, setVillageName] = useState('')
  const [barangay, setBarangay] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [zipcode, setZipCode] = useState('')
  const org_id = ID.ID

  const [donorslist, setDonorslist] = useState<any>([])
  const [addresslist, setAddresslist] = useState<any>([])

  const [remarks, setRemarks] = useState("")
  const [withRemarks, setWithRemarks] = useState(false)

  console.log('ORG ID IS', org_id[0])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('decrypted_donor').select(`*`)

      const { data: address, error: address_error } = await supabase
        .from('address')
        .select('*')
      setDonorslist(data!)
      setAddresslist(address!)

      console.log('DONORS LIST ', donorslist, data)
      setDonorslist(data!)
    }

    fetchData()
  }, [])
  //e

  useEffect(() => {
    console.log('DONORS LIST', donorslist)
  }, [donorslist])

  const handleFormChange = (event, index) => {
    let data = [...formFields]
    data[index][event.target.name] = event.target.value
    setFormFields(data)
  }

  const submit = async (e) => {
    e.preventDefault()
    console.log(formFields)
    const rawResponse = await fetch(
      `https://isproj2.vercel.app/dashboard/donations/verifiedInkind/post`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          house_number: house_number,
          street_name: street_name,
          village_name: village_name,
          barangay: barangay,
          city: city,
          province: province,
          zipcode: zipcode,
          new_user: newDonor,
          new_address: newAddress,
          donor_id: donor_id,
          address_id: address_id,
          charity_id: org_id[0],
          remarks: remarks,
          items: formFields,
        }),
      },
    )
  }

  const addFields = () => {
    let object = {
      name: '',
      quantity: '',
      expiry: '',
      perishable: '',
      unit_of_measurement: '',
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (index: any) => {
    let data = [...formFields]
    data.splice(index, 1)
    setFormFields(data)
  }

  const getMinExpiryDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1) // Set minimum date to tomorrow

    const minDate = today.toISOString().split('T')[0]
    return minDate
  }

  return (
    <div className="App">
      <Switch.Group as="div" className="flex items-center">
        <Switch
          checked={newDonor}
          onChange={setNewDonor}
          className={classNames(
            newDonor ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              newDonor ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            )}
          />
        </Switch>
        <Switch.Label as="span" className="ml-3 text-sm">
          <span className="font-medium text-gray-900">New Donor</span>{' '}
        </Switch.Label>
      </Switch.Group>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">
            Donor
          </span>
        </div>
      </div>
      <form className="space-y-6" onSubmit={submit}>
        {newDonor ? (
          <>
            <TextField
              label="Donor Name"
              name="donor"
              type="text"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <TextField
              label="Donor Email"
              name="email"
              type="email"
              placeholder="john.doe@hotmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Donor's Password"
              name="password"
              type="password"
              placeholder="10 characters minimum"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
        ) : (
          <SelectField
            className="col-span-full py-5"
            label="Assign Donor"
            name="beneficiary_id"
            onChange={(e) => setDonorID(e.target.value)}
          >
            {donorslist?.map((form: any) => (
              <option key={form.id} value={form.id}>
                {form.decrypted_name}
              </option>
            ))}
          </SelectField>
        )}

        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">
              Donor&apos;s Address
            </span>
          </div>
        </div>

        <Switch.Group as="div" className="flex items-center">
          <Switch
            checked={newAddress}
            onChange={setNewAddress}
            className={classNames(
              newAddress ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                newAddress ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
              )}
            />
          </Switch>
          <Switch.Label as="span" className="ml-3 text-sm">
            <span className="font-medium text-gray-900">New Address</span>{' '}
          </Switch.Label>
        </Switch.Group>

        {newAddress ? (
          <>
            <TextField
              label="House Number"
              name="house_number"
              type="text"
              placeholder="24 balalallala"
              onChange={(e) => setHouseNumber(e.target.value)}
              required
            />

            <TextField
              label="Street Name"
              name="street_name"
              type="text"
              placeholder="Sesame Street"
              onChange={(e) => setStreetName(e.target.value)}
              required
            />

            <TextField
              label="Village Name"
              name="village_name"
              type="text"
              placeholder="Amityville"
              onChange={(e) => setVillageName(e.target.value)}
            />

            <TextField
              label="Barangay"
              name="barangay"
              type="text"
              placeholder="Barangay Aswang"
              onChange={(e) => setBarangay(e.target.value)}
              required
            />

            <TextField
              label="City"
              name="city"
              type="text"
              placeholder="Manila"
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <TextField
              label="Province/Region"
              name="province"
              type="text"
              placeholder="NCR"
              onChange={(e) => setProvince(e.target.value)}
              required
            />

            <TextField
              label="Zip Code"
              name="zipcode"
              type="number"
              placeholder="3019"
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </>
        ) : (
          <SelectField
            className="col-span-full py-5"
            label="Assign Address"
            name="beneficiary_id"
            onChange={(e) => setAddressID(e.target.value)}
          >
            {addresslist?.map((form: any) => (
              <option key={form.id} value={form.id}>
                {form.house_number} {form.street_name} {form.barangay}...
              </option>
            ))}
          </SelectField>
        )}

        <div className="col-span-full">
          <Button
            onClick={addFields}
            variant="solid"
            color="green"
            className="w-full"
          >
            <span>
              Add Another Item <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>

        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">
              Item Details
            </span>
          </div>
        </div>

        {formFields.map((form, index) => {
          return (
            <div key={index}>
              <TextField
                label="Item Name"
                name="name"
                type="text"
                placeholder="Box of clothes"
                onChange={(event) => handleFormChange(event, index)}
                value={form.name}
                required
              />
              <br />
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                placeholder="12"
                min={1}
                max={10000}
                onChange={(event) => handleFormChange(event, index)}
                value={form.quantity}
                required
              />
              <br />
              <TextField
                label="Unit of Measurement"
                name="unit_of_measurement"
                type="text"
                placeholder="boxes"
                onChange={(event) => handleFormChange(event, index)}
                value={form.unit_of_measurement}
                required
              />
              <br />
              <SelectField
                label="Perishable?"
                name="perishable"
                placeholder="Yes"
                onChange={(event) => handleFormChange(event, index)}
                required
              >
                <option value={'true'}>Yes</option>
                <option value={'false'}>No</option>
              </SelectField>
              <br />
              <TextField
                label="Expiry Date (if perishable)"
                name="expiry"
                type="date"
                placeholder="01/12/2023"
                onChange={(event) => handleFormChange(event, index)}
                value={form.expiry}
                min={getMinExpiryDate()}
              />
              <br />
              <div className="col-span-full">
                <Button
                  onClick={() => removeFields(index)}
                  variant="solid"
                  color="red"
                  className="w-full"
                >
                  <span>
                    Remove Item <span aria-hidden="true">&rarr;</span>
                  </span>
                </Button>
              </div>
            </div>
          )
        })}
        <br />

        <Switch.Group as="div" className="flex items-center">
          <Switch
            checked={withRemarks}
            onChange={setWithRemarks}
            className={classNames(
              withRemarks ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                withRemarks ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
              )}
            />
          </Switch>
          <Switch.Label as="span" className="ml-3 text-sm">
            <span className="font-medium text-gray-900">Items Complete</span>{' '}
          </Switch.Label>
        </Switch.Group>
        <br />

        {
          !withRemarks ?
            (
              <div className="col-span-full">
                <label
                  htmlFor="details"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Remarks
                </label>
                <div className="mt-2">
                  <textarea
                    id="details"
                    name="details"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder='Lorem Ipsum Dolor...'
                    required
                  />
                </div>
              </div>
            )
            :
            (
              <div className="relative">
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-base font-semibold leading-6 text-green-500">
                    Transaction marked as complete
                  </span>
                </div>
              </div>
            )
        }

        <br />
        <br />

        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">
              Proof of Delivery
            </span>
          </div>
        </div>
        <br />
      </form>
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={submit}
          variant="solid"
          color="green"
          className="w-full"
        >
          <span>
            Save <span aria-hidden="true">&rarr;</span>
          </span>
        </Button>
        <Button href={'#'} variant="solid" color="red" className="w-full">
          <span>
            Cancel <span aria-hidden="true">&rarr;</span>
          </span>
        </Button>
      </div>
    </div>
  )
}

export function EditForm({ id, orgID }: { id: number; orgID: any }) {
  const [formFields, setFormFields] = useState<any>({})

  const [toDelete, setToDelete] = useState<number[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('items_donation_transaction')
        .select(`*, inventory_item ( * ), decrypted_donor ( id, decrypted_name ), address ( * )`)
        .eq('id', id)
        .single()

      if (data) {
        setFormFields(data!)
      }
    }

    fetchData()
  }, [])

  const handleFormChange = (event: any, index: number) => {
    let data = [...formFields.inventory_item]
    console.log(event.target.name)
    data.find((item) => item.id === index)[event.target.name] =
      event.target.value
    setFormFields({ ...formFields, inventory_item: data })
  }

  const submit = async (e: any) => {
    e.preventDefault()
    console.log(formFields)
    const rawResponse = await fetch(
      `https://isproj2.vercel.app/dashboard/donations/verifiedInkind/post`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toDelete: toDelete,
          transaction: formFields,
        }),
      },
    )
  }

  const addFields = async () => {
    let object = {
      name: null,
      quantity: null,
      perishable: true,
      unit_of_measurement: null,
      donation_id: id,
    }

    const { data: field, error } = await supabase
      .from('inventory_item')
      .insert(object)
      .select()
      .single()
    console.log('ERRORS: ', error)
    console.log("I added a field, what's here?", field)
    if (field)
      setFormFields({
        ...formFields,
        inventory_item: formFields.inventory_item.concat(field),
      })
  }

  const removeFields = (id: number) => {
    setFormFields({
      ...formFields,
      inventory_item: formFields.inventory_item.filter(
        (item: any) => item.id !== id,
      ),
    })
    setToDelete(toDelete.concat(id))
  }

  const getMinExpiryDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1) // Set minimum date to tomorrow

    const minDate = today.toISOString().split('T')[0]
    return minDate
  }

  return (
    <div className="App">
      <form className="space-y-6" onSubmit={submit}>

        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">
              Donor Details
            </span>
          </div>
        </div>
        <br />

        {console.log("DONOR DETAILS: ", formFields?.decrypted_donor)}
        {console.log("DONOR DETAILS: ", formFields?.address)}

        {/* {
          Object.entries(formFields?.decrypted_donor).forEach((entry) => {
            const [key, value] = entry;
            console.log(`OBJECT ITEM ${key}: ${value}`);
          })
        }; */}

        <TextField label="Donor's Name" name="donor" type="text" defaultValue={formFields?.decrypted_donor?.decrypted_name} readOnly />

        <br />
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">
              Pickup Address
            </span>
          </div>
        </div>
        <br />

        <TextField label="House Number" name="house_number" type="text" defaultValue={formFields?.address?.house_number} readOnly />
        <br />
        <TextField label="Street Name" name="street_name" type="text" defaultValue={formFields?.address?.street_name} readOnly />
        <br />
        <TextField label="Village Name" name="village_name" type="text" defaultValue={formFields?.address?.village_name} readOnly />
        <br />
        <TextField label="Barangay" name="barangay" type="text" defaultValue={formFields?.address?.barangay} readOnly />
        <br />
        <TextField label="City" name="city" type="text" defaultValue={formFields?.address?.city} readOnly />
        <br />
        <TextField label="Province/Region" name="province" type="text" defaultValue={formFields?.address?.province} readOnly />
        <br />
        <TextField label="ZIP Code" name="zipcode" type="text" defaultValue={formFields?.address?.zipcode} readOnly />
        <br />
        <br />

        {formFields?.inventory_item?.map((form: any) => {
          return (
            <div key={form.id}>
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">
                    Item Details
                  </span>
                </div>
              </div>
              <br />
              <TextField
                label="Item Name"
                name="name"
                type="text"
                placeholder={form.name}
                onChange={(event) => handleFormChange(event, form.id)}
                value={form.name}
                readOnly
              />
              <br />
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                placeholder={form.quantity}
                min={1}
                max={10000}
                onChange={(event) => handleFormChange(event, form.id)}
                value={form.quantity}
                readOnly
              />
              <br />
              <TextField
                label="Unit of Measurement"
                name="unit_of_measurement"
                type="text"
                placeholder={form.unit_of_measurement}
                onChange={(event) => handleFormChange(event, form.id)}
                value={form.unit_of_measurement}
                readOnly
              />
              <br />
              <TextField
                label="Perishable?"
                name="perishable"
                type="text"
                placeholder={form.perishable}
                onChange={(event) => handleFormChange(event, form.id)}
                value={form.perishable ? 'YES' : 'NO'}
                readOnly
              />
              <br />
              <br />
              <TextField
                label="Expiry Date (if perishable)"
                name="expiry"
                type="date"
                placeholder={form.date}
                onChange={(event) => handleFormChange(event, form.id)}
                value={form.expiry}
                readOnly
              />
              <br />
            </div>
          )
        })}

        {
          formFields?.remarks && formFields?.remarks.length >= 1 ?
            (
              <div className="col-span-full">
                <label
                  htmlFor="details"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Remarks
                </label>
                <div className="mt-2">
                  <textarea
                    id="details"
                    name="details"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={formFields?.remarks}
                    placeholder='Lorem Ipsum Dolor...'
                    required
                  />
                </div>
              </div>
            )
            :
            (
              <div className="relative">
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-base font-semibold leading-6 text-green-500">
                    This transaction has no Remarks
                  </span>
                </div>
              </div>
            )
        }

        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">
              Proof of Delivery
            </span>
          </div>
        </div>
      </form>
      <br />
    </div>
  )
}
