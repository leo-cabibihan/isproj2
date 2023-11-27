// @ts-nocheck
"use client"

import supabase from "@/app/utils/supabase";
import { Button } from "@/components/Button";
import { TextField, SelectField } from "@/components/Fields";
import { getURL } from '@/app/utils/url'
import { SetStateAction, useEffect, useState } from "react";

export function PickupForm({id}: {id:number}) {
    const [formFields, setFormFields] = useState<any>({})

    const [toDelete, setToDelete] = useState<number[]>([])




    useEffect(() => {

        const fetchData = async () => {
            const {data, error} = await supabase.from("items_donation_transaction").select(`*, inventory_item ( * ), donor ( id, name ), address ( * )`).eq("id", id).single()
            
            if (data) setFormFields(data!)
        }

        fetchData()

    }, [])


    const handleFormChange = (event: any, index: number) => {
        let data = [...formFields.inventory_item];
        console.log(event.target.name)
        data.find(item => item.id === index)[event.target.name] = event.target.value;
        setFormFields({...formFields, inventory_item: data});
    }

    const submit = async (e: any) => {
        e.preventDefault();
        console.log(formFields)
        const rawResponse = await fetch(`https://isproj2.vercel.app/dashboard/donations/pickups/post`, {
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
        let object = { name: null, quantity: null, perishable: true, unit_of_measurement: null , donation_id: id}
    
        const { data: field, error } = await supabase
        .from('inventory_item')
        .insert(object)
        .select()
        .single()
        console.log("ERRORS: ", error)
        console.log("I added a field, what's here?", field)
        if (field)       setFormFields({...formFields, inventory_item: formFields.inventory_item.concat(field)})
        
    } 

    const removeFields = (id: number) => {
        setFormFields({...formFields, inventory_item: formFields.inventory_item.filter((item: any) => item.id !== id)})
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
                            Add Another Item <span aria-hidden="true">&rarr;</span>
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
                            <br/>
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
                            <br/>
                            <TextField
                                label="Unit of Measurement"
                                name="unit_of_measurement"
                                type="text"
                                placeholder={form.unit_of_measurement}
                                onChange={event => handleFormChange(event, form.id)}
                                value={form.unit_of_measurement}
                                required />
                            <br/>
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
                            <br/>
                            <TextField
                                label="Expiry Date (if perishable)"
                                name="expiry"
                                type="date"
                                placeholder={form.date}
                                onChange={event => handleFormChange(event, form.id)}
                                value={form.expiry}
                            />
                            <br/>
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
                        Verify & Save <span aria-hidden="true">&rarr;</span>
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