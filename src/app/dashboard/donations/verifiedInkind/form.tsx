// @ts-nocheck
"use client"

import supabase from "@/app/utils/supabase";
import { Button } from "@/components/Button";
import { TextField, SelectField } from "@/components/Fields";
import { ImageUpload } from "@/components/ImgUpload";
import { SetStateAction, useEffect, useState } from "react";
import { Switch } from '@headlessui/react'

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export function MultilayeredForm(ID: any) {
    const [formFields, setFormFields] = useState([
        { name: '', quantity: '', expiry: '', perishable: '', unit_of_measurement: '' },
    ])
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

    const [newDonor, setNewDonor] = useState(false)
    const [newAddress, setNewAddress] = useState(false)

    const [donor_id, setDonorID] = useState("")
    const [address_id, setAddressID] = useState("")


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [house_number, setHouseNumber] = useState("")
    const [street_name, setStreetName] = useState("")
    const [village_name, setVillageName] = useState("")
    const [barangay, setBarangay] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [zipcode, setZipCode] = useState("")
    const org_id = ID.ID

    const [donorslist, setDonorslist] = useState<any>([])
    const [addresslist, setAddresslist] = useState<any>([])

    console.log('ORG ID IS', org_id[0])

    useEffect(() => {

        const fetchData = async () => {
            const { data, error } = await supabase.from("donor").select(`*`)

            const { data: address, error: address_error } = await supabase.from("address").select("*")
            setDonorslist(data!)
            setAddresslist(address!)

            console.log("DONORS LIST ", donorslist, data)
            setDonorslist(data!)

        }

        fetchData()
    }, [])


    useEffect(() => {
        console.log("DONORS LIST wtfwtf", donorslist);
    }, [donorslist]);

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    }

    const submit = async (e) => {
        e.preventDefault();
        console.log(formFields)
        const rawResponse = await fetch('http://localhost:3000/dashboard/donations/verifiedInkind/post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
                items: formFields
            })
        });
    }

    const addFields = () => {
        let object = { name: '', quantity: '', expiry: '', perishable: '', unit_of_measurement: '' }

        setFormFields([...formFields, object])
    }

    const removeFields = (index: any) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }

    return (
        <div className="App">

            <Switch.Group as="div" className="flex items-center">
                <Switch
                    checked={newDonor}
                    onChange={setNewDonor}
                    className={classNames(
                        newDonor ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                    )}
                >
                    <span
                        aria-hidden="true"
                        className={classNames(
                            newDonor ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
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
                    <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Donor</span>
                </div>
            </div>
            <form className="space-y-6" onSubmit={submit}>

                {newDonor ?
                    (
                        <>
                            <TextField
                                label="Donor Name"
                                name="donor"
                                type="text"
                                placeholder="John Doe"
                                onChange={e => setName(e.target.value)}
                                required
                            />

                            <TextField
                                label="Donor Email"
                                name="email"
                                type="email"
                                placeholder="john.doe@hotmail.com"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />

                            <TextField
                                label="Donor's Password"
                                name="password"
                                type="password"
                                placeholder="10 characters minimum"
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </>
                    )
                    :
                    (
                        <SelectField
                            className="col-span-full py-5"
                            label="Assign Donor"
                            name="beneficiary_id"
                            onChange={e => setDonorID(e.target.value)}
                        >
                            {donorslist?.map((form: any) => (
                                <option key={form.id} value={form.id}>{form.name}</option>
                            ))}
                        </SelectField>
                        
                    )}

                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Donor&apos;s Address</span>
                    </div>
                </div>

                <Switch.Group as="div" className="flex items-center">
                    <Switch
                        checked={newAddress}
                        onChange={setNewAddress}
                        className={classNames(
                            newAddress ? 'bg-indigo-600' : 'bg-gray-200',
                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={classNames(
                                newAddress ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                            )}
                        />
                    </Switch>
                    <Switch.Label as="span" className="ml-3 text-sm">
                        <span className="font-medium text-gray-900">New Address</span>{' '}
                    </Switch.Label>
                </Switch.Group>

                {newAddress ?
                    (
                        <>
                            <TextField
                                label="House Number"
                                name="house_number"
                                type="text"
                                placeholder="24 balalallala"
                                onChange={e => setHouseNumber(e.target.value)}
                                required
                            />

                            <TextField
                                label="Street Name"
                                name="street_name"
                                type="text"
                                placeholder="Sesame Street"
                                onChange={e => setStreetName(e.target.value)}
                                required
                            />

                            <TextField
                                label="Village Name"
                                name="village_name"
                                type="text"
                                placeholder="Amityville"
                                onChange={e => setVillageName(e.target.value)}
                            />

                            <TextField
                                label="Barangay"
                                name="barangay"
                                type="text"
                                placeholder="Barangay Aswang"
                                onChange={e => setBarangay(e.target.value)}
                                required
                            />

                            <TextField
                                label="City"
                                name="city"
                                type="text"
                                placeholder="Manila"
                                onChange={e => setCity(e.target.value)}
                                required
                            />

                            <TextField
                                label="Province/Region"
                                name="province"
                                type="text"
                                placeholder="NCR"
                                onChange={e => setProvince(e.target.value)}
                                required
                            />

                            <TextField
                                label="Zip Code"
                                name="zipcode"
                                type="number"
                                placeholder="3019"
                                onChange={e => setZipCode(e.target.value)}
                                required
                            />
                        </>
                    )
                    :
                    (
                        <SelectField
                            className="col-span-full py-5"
                            label="Assign Address"
                            name="beneficiary_id"
                            onChange={e => setAddressID(e.target.value)}
                        >
                            {addresslist?.map((form: any) => (
                                <option key={form.id} value={form.id}>{form.house_number} {form.street_name} {form.barangay}...</option>
                            ))}
                        </SelectField>
                    )}

                <div className="col-span-full">
                    <Button onClick={addFields} variant="solid" color="green" className="w-full">
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

                {formFields.map((form, index) => {
                    return (
                        <div key={index}>
                            <TextField
                                label="Item Name"
                                name="name"
                                type="text"
                                placeholder="Demon Core"
                                onChange={event => handleFormChange(event, index)}
                                value={form.name}
                                required />

                            <TextField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                placeholder="12"
                                min={1}
                                max={10000}
                                onChange={event => handleFormChange(event, index)}
                                value={form.quantity}
                                required />

                            <TextField
                                label="Unit of Measurement"
                                name="unit_of_measurement"
                                type="text"
                                placeholder="Balls"
                                onChange={event => handleFormChange(event, index)}
                                value={form.unit_of_measurement}
                                required />

                            <SelectField
                                label="Perishable?"
                                name="perishable"
                                placeholder="Yes"
                                onChange={event => handleFormChange(event, index)}
                                required
                            >
                                <option value={"true"}>Yes</option>
                                <option value={"false"}>No</option>
                            </SelectField>

                            <TextField
                                label="Expiry Date (if perishable)"
                                name="expiry"
                                type="date"
                                placeholder="01/12/2023"
                                onChange={event => handleFormChange(event, index)}
                                value={form.expiry}
                            />

                            <div className="col-span-full">
                                <Button onClick={() => removeFields(index)} variant="solid" color="red" className="w-full">
                                    <span>
                                        Remove Item <span aria-hidden="true">&rarr;</span>
                                    </span>
                                </Button>
                            </div>
                        </div>
                    )
                })}

                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Proof of Delivery</span>
                    </div>
                </div>

            </form>
            <div className="grid grid-cols-2 gap-4">
                <Button onClick={submit} variant="solid" color="green" className="w-full">
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
        </div>
    );
}

export function EditForm({ id, orgID }: { id: number, orgID: any }) {
    const [formFields, setFormFields] = useState<any>({})

    const [toDelete, setToDelete] = useState<number[]>([])




    useEffect(() => {

        const fetchData = async () => {
            const { data, error } = await supabase.from("items_donation_transaction").select(`*, inventory_item ( * ), donor ( id, name ), address ( * )`).eq("id", id).single()

            if (data) setFormFields(data!)
        }

        fetchData()

    }, [])


    const handleFormChange = (event: any, index: number) => {
        let data = [...formFields.inventory_item];
        console.log(event.target.name)
        data.find(item => item.id === index)[event.target.name] = event.target.value;
        setFormFields({ ...formFields, inventory_item: data });
    }

    const submit = async (e: any) => {
        e.preventDefault();
        console.log(formFields)
        const rawResponse = await fetch('http://localhost:3000/dashboard/donations/verifiedInkind/post', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                toDelete: toDelete,
                transaction: formFields
            })
        });
    }

    const addFields = async () => {
        let object = { name: null, quantity: null, perishable: true, unit_of_measurement: null, donation_id: id }

        const { data: field, error } = await supabase
            .from('inventory_item')
            .insert(object)
            .select()
            .single()
        console.log("ERRORS: ", error)
        console.log("I added a field, what's here?", field)
        if (field) setFormFields({ ...formFields, inventory_item: formFields.inventory_item.concat(field) })

    }

    const removeFields = (id: number) => {
        setFormFields({ ...formFields, inventory_item: formFields.inventory_item.filter((item: any) => item.id !== id) })
        setToDelete(toDelete.concat(id))
    }

    return (
        <div className="App">
            <form className="space-y-6" onSubmit={submit}>
                <TextField
                    label="Donor Name"
                    name="donor"
                    type="text"

                    readOnly
                />

                <TextField
                    label="Pickup Address"
                    name="address"
                    type="text"
                    readOnly
                />

                <div className="col-span-full">
                    <Button onClick={addFields} variant="solid" color="green" className="w-full">
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

                {formFields?.inventory_item?.map((form: any) => {
                    return (
                        <div key={form.id}>
                            <TextField
                                label="Item Name"
                                name="name"
                                type="text"
                                placeholder={form.name}
                                onChange={event => handleFormChange(event, form.id)}
                                value={form.name}
                                required />

                            <TextField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                placeholder={form.quantity}
                                min={1}
                                max={10000}
                                onChange={event => handleFormChange(event, form.id)}
                                value={form.quantity}
                                required />

                            <TextField
                                label="Unit of Measurement"
                                name="unit_of_measurement"
                                type="text"
                                placeholder={form.unit_of_measurement}
                                onChange={event => handleFormChange(event, form.id)}
                                value={form.unit_of_measurement}
                                required />

                            <SelectField
                                label="Perishable?"
                                name="perishable"
                                placeholder="Yes"
                                onChange={event => handleFormChange(event, form.id)}
                                required
                            >
                                <option value={"true"}>Yes</option>
                                <option value={"false"}>No</option>
                            </SelectField>

                            <TextField
                                label="Expiry Date (if perishable)"
                                name="expiry"
                                type="date"
                                placeholder={form.date}
                                onChange={event => handleFormChange(event, form.id)}
                                value={form.expiry}
                            />

                            <ImageUpload folderName={"inventory_item"} charityID={orgID} recordID={form.id} />

                            <div className="col-span-full">
                                <Button onClick={() => removeFields(form.id)} variant="solid" color="red" className="w-full">
                                    <span>
                                        Remove Item <span aria-hidden="true">&rarr;</span>
                                    </span>
                                </Button>
                            </div>
                        </div>
                    )
                })}

                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Proof of Delivery</span>
                    </div>
                </div>
            </form>
            <div className="grid grid-cols-2 gap-4">
                <Button onClick={submit} variant="solid" color="green" className="w-full">
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
        </div>
    );
}