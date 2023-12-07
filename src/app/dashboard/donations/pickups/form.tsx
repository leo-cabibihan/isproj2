//@ts-nocheck
'use client'

import supabase from '@/app/utils/supabase'
import { Button } from '@/components/Button'
import { TextField, SelectField } from '@/components/Fields'
import { getURL } from '@/app/utils/url'
import { SetStateAction, useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { NoWhiteSpace } from '@/app/utils/input_validation'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

var message = ""
var messageType = ""
var heading = ""

function Failure({ heading, content }: any) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{heading}</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Success({ heading, content }: any) {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">{heading}</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


function Message({ content, type, heading }: any) {
  if (type == 'ERROR') {
    return <Failure heading={heading} content={content} />
  } else if (type == 'SUCCESS') {
    return <Success heading={heading} content={content} />
  }
}

export function PickupForm({ id }: { id: number }) {
  const [formFields, setFormFields] = useState<any>({})
  const [toDelete, setToDelete] = useState<number[]>([])
  const [remarks, setRemarks] = useState("")
  const [complete, setComplete] = useState(false)

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [heading, setHeading] = useState('')

  console.log(remarks)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('items_donation_transaction')
        .select(`*, inventory_item ( * ), decrypted_donor ( id, decrypted_name ), address ( * )`)
        .eq('id', id)
        .single()

      if (data) setFormFields(data!)
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

    const remarks_input = String(formFields.remarks)

    const valid_remarks = NoWhiteSpace(remarks_input)

    console.log("COMPLETE? " + complete)


    if (complete == false) {

      console.log(remarks_input.length + remarks_input !== undefined ? "VALID":"EMPTY" + remarks_input !== null ? "VALID":"EMPTY")

      if (remarks_input.length > 0 || remarks_input !== undefined || remarks_input !== null) {

        console.log("THIS MEANS IT'S NOT EMPTY")

        if (valid_remarks) {

          try {

            console.log(formFields)
            const rawResponse = await fetch(
              `https://isproj2.vercel.app/dashboard/donations/pickups/post`,
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

            console.log("REMARKS BEING SUBMITTED: ", remarks)

            console.log("DOES IT WORK?", formFields.remarks)

            setMessage('Operation Successful!')
            setMessageType('SUCCESS')
            setHeading('Success!')

          }
          catch (error) {
            console.log('Error Donating. See Details: \n', error)
            const temp_message = 'Error Donating. See Donation Details and try again.'
            setMessage(temp_message)
            setMessageType('ERROR')
            setHeading('Donation Error!')
            console.log(error.message)
          }

        }
        else {

          setMessage('Textfields must not 2 or more consecutive spaces.')
          setMessageType('ERROR')
          setHeading('Invalid Input!')

        }
      }
      else {
        setMessage('This field is required.')
        setMessageType('ERROR')
        setHeading('Input Required!')
      }

    }
    else if (complete == true) {

      try {

        console.log(formFields)
        const rawResponse = await fetch(
          `https://isproj2.vercel.app/dashboard/donations/pickups/post`,
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

        console.log("REMARKS BEING SUBMITTED: ", remarks)

        console.log("DOES IT WORK?", formFields.remarks)

        setMessage('Operation Successful!')
        setMessageType('SUCCESS')
        setHeading('Success!')

      }
      catch (error) {
        console.log('Error Donating. See Details: \n', error)
        const temp_message = 'Error Donating. See Donation Details and try again.'
        setMessage(temp_message)
        setMessageType('ERROR')
        setHeading('Donation Error!')
        console.log(error.message)
      }

    }

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
        {console.log("ADDRESS DETAILS: ", formFields?.address)}

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

        {formFields?.inventory_item?.map((form: any) => {
          return (
            <div key={form.id}>
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
              {
                form.perishable ?
                  (
                    <TextField
                      label="Perishable?"
                      name="perishable"
                      type="text"
                      onChange={(event) => handleFormChange(event, form.id)}
                      value="YES"
                      readOnly
                    />
                  )
                  :
                  (
                    <TextField
                      label="Perishable?"
                      name="perishable"
                      type="text"
                      onChange={(event) => handleFormChange(event, form.id)}
                      value="NO"
                      readOnly
                    />
                  )
              }
              <br />
              <TextField
                label="Expiry Date (if perishable)"
                name="expiry"
                type="date"
                placeholder={form.date}
                onChange={(event) => handleFormChange(event, form.id)}
                value={form.expiry}
                min={getMinExpiryDate()}
                readOnly
              />
              <br />
              <div className="col-span-full">
                <Button
                  onClick={() => removeFields(form.id)}
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
            checked={complete}
            onChange={setComplete}
            className={classNames(
              complete ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                complete ? 'translate-x-5' : 'translate-x-0',
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
          !complete ?
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
                    onChange={e => setFormFields({ ...formFields, remarks: e.target.value })}
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

        <div className="col-span-full">
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      </form>
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={submit}
          variant="solid"
          color="green"
          className="w-full"
        >
          <span>
            Verify & Save <span aria-hidden="true">&rarr;</span>
          </span>
        </Button>
        <Button href={'#'} variant="solid" color="red" className="w-full">
          <span>
            Cancel <span aria-hidden="true">&rarr;</span>
          </span>
        </Button>
        <Message content={message} type={messageType} heading={heading} />
      </div>
    </div>
  )
}
