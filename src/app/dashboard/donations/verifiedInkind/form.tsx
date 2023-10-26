"use client"

import supabase from "@/app/utils/supabase";
import { Button } from "@/components/Button";
import { TextField, SelectField } from "@/components/Fields";
import { SetStateAction, useEffect, useState } from "react";

export function MultilayeredForm(object: any) {
    const [formFields, setFormFields] = useState([
        { name: '', quantity: '', expiry: '', perishable: '', unit_of_measurement: '' },
    ])

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")


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
                address: address,
                items: formFields
            })
        });
    }

    const addFields = () => {
        let object = { name: '', quantity: '', expiry: '', perishable: '', unit_of_measurement: '' }

        setFormFields([...formFields, object])
    }

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }

    return (
        <div className="App">
            <form className="space-y-6" onSubmit={submit}>
                <TextField
                    label="Donor Name"
                    name="donor"
                    type="text"
                    placeholder="John Doe"
                    onChange={e => setName(e.target.value)}
                    required
                />

                <TextField
                    label="Pickup Address"
                    name="address"
                    type="text"
                    placeholder="123 Sesame Sreet"
                    onChange={e => setAddress(e.target.value)}
                    required
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

export function EditForm({id}: {id:number}) {
    const [formFields, setFormFields] = useState<any>({})

    const [toDelete, setToDelete] = useState<number[]>([])

    useEffect(() => {

        const fetchData = async () => {
            const {data, error} = await supabase.from("items_donation_transaction").select(`*, inventory_item ( * )`).eq("id", id).single()
            const items = data?.inventory_item
            if (data) setFormFields(data!)
        }

        fetchData()

    }, [])


    const handleFormChange = (event: any, index: number) => {
        let data = [...formFields.inventory_item];
        data[index][event.target.name] = event.target.value;
        setFormFields({...formFields, inventory_item: data});
    }

    const submit = async (e: any) => {
        e.preventDefault();
        console.log(formFields)
        const rawResponse = await fetch('http://localhost:3000/dashboard/donations/verifiedInkind/post', {
            method: 'POST',
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

    const addFields = () => {
        let object = { name: '', quantity: '', expiry: '', perishable: '', unit_of_measurement: '' }
        setFormFields({...formFields, inventory_item: formFields.inventory_item.concat(object)})
    }

    const removeFields = (id: number) => {
        setFormFields({...formFields, inventory_item: formFields.inventory_item.filter((item: any) => item.id === id)})
        setToDelete(toDelete.concat(id))
    }

    return (
        <div className="App">
            <form className="space-y-6" onSubmit={submit}>
                <TextField
                    label="Donor Name"
                    name="donor"
                    type="text"
                    placeholder="John Doe"
                    onChange={e => setFormFields({...formFields, donor: e.target.value})}
                    required
                />

                <TextField
                    label="Pickup Address"
                    name="address"
                    type="text"
                    placeholder="123 Sesame Sreet"
                    onChange={e => setFormFields({...formFields, address: e.target.value})}
                    required
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

                {formFields.inventory_item.map((form: any) => {
                    return (
                        <div key={form.id}>
                            <TextField
                                label="Item Name"
                                name="name"
                                type="text"
                                placeholder="Demon Core"
                                onChange={event => handleFormChange(event, form.id)}
                                value={form.name}
                                required />

                            <TextField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                placeholder="12"
                                min={1}
                                max={10000}
                                onChange={event => handleFormChange(event, form.id)}
                                value={form.quantity}
                                required />

                            <TextField
                                label="Unit of Measurement"
                                name="unit_of_measurement"
                                type="text"
                                placeholder="Balls"
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
                                placeholder="01/12/2023"
                                onChange={event => handleFormChange(event, form.id)}
                                value={form.expiry}
                            />

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