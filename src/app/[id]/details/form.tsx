//@ts-nocheck
'use client'

import supabase from '@/app/utils/supabase'
import { Button } from '@/components/Button'
import { ShowImg } from '@/components/DisplayImg'
import { TextField, SelectField } from '@/components/Fields'
import { useEffect, useState } from 'react'
import { getURL } from '@/app/utils/url'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export function FormComponent({ ID, DonorID }: any) {
  const [cash, showCash] = useState(false)

  return (
    <>
      <div>
        <span className="block md:isolate md:inline-flex md:space-x-10 md:rounded-md md:shadow-sm">
          <div className="mb-3 md:mb-0 md:space-x-3">
            <Button
              type="button"
              onClick={() => showCash(false)}
              variant="solid"
              color="green"
              className="relative inline-flex items-center px-3 py-2 ring-1 ring-inset ring-gray-300 md:rounded-r-md"
            >
              <span>Donate Goods</span>
            </Button>
            <Button
              type="button"
              onClick={() => showCash(true)}
              variant="solid"
              color="green"
              className="relative inline-flex items-center px-3 py-2 ring-1 ring-inset ring-gray-300 md:rounded-l-md"
            >
              <span>Donate Cash</span>
            </Button>
          </div>
          <div>
            <Button variant="solid" color="red" href={'/' + ID + '/report'}>
              <span>Report Charity</span>
            </Button>
          </div>
        </span>

        <>
          {cash ? (
            <CashForm ID={ID} UserID={DonorID} />
          ) : (
            <GoodsForm ID={ID} UserID={DonorID} />
          )}
        </>
      </div>
    </>
  )
}

export function GoodsForm({ ID, UserID }: any) {
  const [formFields, setFormFields] = useState([
    {
      name: '',
      quantity: '',
      expiry: '',
      perishable: '',
      unit_of_measurement: '',
    },
  ])

  const [house_no, setHouse_no] = useState('')
  const [street, setStreet] = useState('')
  const [village, setVillage] = useState('')
  const [brgy, setBrgy] = useState('')
  const [zip_code, setZip_code] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')

  const handleFormChange = (event: any, index: any) => {
    let data = [...formFields]

    data[index][event.target.name] = event.target.value
    setFormFields(data)
  }

  const submit = async (e: any) => {
    e.preventDefault()

    const rawResponse = await fetch(
      `https://isproj2.vercel.app/${ID}/details/post`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orgID: ID,
          donorID: UserID,
          house_no: house_no,
          street: street,
          village: village,
          brgy: brgy,
          zip_code: zip_code,
          city: city,
          province: province,
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

  const handlePerishableChange = (event, index) => {
    const updatedFormFields = [...formFields]
    updatedFormFields[index].perishable = parseInt(event.target.value)
    setFormFields(updatedFormFields)
  }

  return (
    <div className="App">
      <form className="space-y-6" onSubmit={submit}>
        <div className="space-y-12"></div>
        <div className="border-b border-gray-900/10 pb-12"></div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Donate Goods
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <div className="space-y-14">
              <div className="space-y-7">
                <div>
                  {formFields.map((form, index) => {
                    console.log('I am perishable', form.perishable === 1)
                    return (
                      <div key={index} className="space-y-4">
                        <div className="mt-3">
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

                          <TextField
                            label="Item name"
                            name="name"
                            type="text"
                            placeholder="Rice Sack"
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.name}
                            required
                          />
                          <br />
                          <TextField
                            label="Unit of Measurement"
                            name="unit_of_measurement"
                            type="text"
                            placeholder="Sacks"
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.unit_of_measurement}
                            required
                          />
                          <br />
                          <TextField
                            label="Quantity"
                            name="quantity"
                            type="number"
                            min="1"
                            max="100000"
                            autoComplete="number"
                            placeholder="1"
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.quantity}
                            required
                          />
                          <br />
                          <SelectField
                            label="Perishable?"
                            name="perishable"
                            placeholder="no"
                            onChange={(event) =>
                              handlePerishableChange(event, index)
                            }
                            required
                          >
                            <option value={0}>no</option>

                            <option value={1}>yes</option>
                          </SelectField>
                          <br />
                          <TextField
                            label="Expiry Date (if perishable)"
                            name="expiry"
                            type="date"
                            placeholder=""
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.expiry}
                          />
                        </div>

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
                </div>

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
              </div>

              <div>
                <TextField
                  label="House Number/Unit Number"
                  name="house_no"
                  type="text"
                  autoComplete="text"
                  placeholder="123"
                  onChange={(e) => setHouse_no(e.target.value)}
                  required
                />
                <br />
                <TextField
                  label="Street Name"
                  name="street"
                  type="text"
                  autoComplete="text"
                  placeholder="123 Bonifacio Street"
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
                <br />
                <TextField
                  label="Village Name"
                  name="village"
                  type="text"
                  autoComplete="text"
                  placeholder="villa"
                  onChange={(e) => setVillage(e.target.value)}
                />
                <br />
                <TextField
                  label="Barangay"
                  name="brgy"
                  type="text"
                  autoComplete="text"
                  placeholder="Saog"
                  onChange={(e) => setBrgy(e.target.value)}
                  required
                />
                <br />
                <TextField
                  label="Zip Code"
                  name="zip_code"
                  type="number"
                  autoComplete="number"
                  min="1"
                  max="9999"
                  placeholder="3019"
                  onChange={(e) => setZip_code(e.target.value)}
                  required
                />
                <br />
                <TextField
                  label="City"
                  name="city"
                  type="text"
                  autoComplete="text"
                  placeholder="Manila"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <br />
                <TextField
                  label="Region/Province"
                  name="province"
                  type="text"
                  autoComplete="text"
                  placeholder="NCR"
                  onChange={(e) => setProvince(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="pt-6">
            <Button
              type="submit"
              onClick={submit}
              variant="solid"
              color="green"
              className="w-1/5"
            >
              <span className="block md:inline">
                Donate <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export function CashForm({ ID, UserID }: any) {
  const [amount, setAmount] = useState('')
  const [eventID, setEventID] = useState('')
  const [eventslist, setEventsList] = useState<any>([])
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('event')
        .select('*')
        .eq('charity_id', ID)
        .eq('is_ongoing', true)
        .eq('approval_status', 'APPROVED').order('id', { ascending: true })
      setEventsList(data!)

      setEventsList(data!)

      console.log("DEBUG RESULTS FOR THE CASH FORM: ", data + ". ERROR IS: ", error)
    }

    fetchData()
  }, [])

  const submit = async (e: any) => {
    e.preventDefault()
    const rawResponse = await fetch(
      `https://isproj2.vercel.app/${ID}/details/cash`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          charity_id: ID,
          donor_id: UserID,
          is_external: false,
          event_id: eventID,
        }),
      },
    )
  }

  return (
    <form className="mt-10 grid grid-cols-1 gap-y-8">
      <div className="space-y-12"></div>
      <div className="border-b border-gray-900/10 pb-12"></div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Donate Cash
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <TextField
            label="Amount"
            name="amount"
            type="number"
            autoComplete="number"
            step="0.01"
            min="100"
            max="100000"
            placeholder="0.00"
            required
            onChange={(e) => setAmount(e.target.value)}
          />

          <SelectField
            className="col-span-full py-5"
            label="Choose Event to Donate to"
            name="event_id"
            onChange={(e) => setEventID(e.target.value)}
            required
          >
            {eventslist?.map((form: any) => (
              <option key={form.id} value={form.id}>
                {form.name}
              </option>
            ))}
          </SelectField>
        </div>
      </div>
      <div>
        {/* PAYPAL STUFF GOES HERE */}
      </div>
    </form>
  )
}
