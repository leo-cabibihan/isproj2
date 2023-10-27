"use client"

import { Button } from "@/components/Button";
import { TextField, SelectField } from "@/components/Fields";
import { useState } from "react";

export function FormComponent({ ID, DonorID }: any) {

    const [cash, showCash] = useState(false)

    console.log("DONOR ID IS " + DonorID)

    return (
        <>
            <div>
                <span className="isolate inline-flex rounded-md shadow-sm space-x-10">
                    <div>
                        <Button type="button" onClick={() => showCash(false)} variant="solid" color="green" className="relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 ring-1 ring-inset ring-gray-300">
                            <span>
                                Donate Goods
                            </span>
                        </Button>
                        <Button type="button" onClick={() => showCash(true)} variant="solid" color="green" className="relative inline-flex items-center rounded-l-md px-3 py-2 ring-1 ring-inset ring-gray-300">
                            <span>
                                Donate Cash
                            </span>
                        </Button>
                    </div>
                    <div>
                        <Button variant="solid" color="red" href={'/' + ID + '/report'}>
                            <span>
                                Report Charity
                            </span>
                        </Button>
                    </div>
                </span>

                <>
                    {cash ? (
                        <CashForm />
                    ) : (
                        <GoodsForm ID={ID} UserID={DonorID}/>
                    )}
                </>

            </div>
        </>
    )
}

export function GoodsForm(object: any, { ID, UserID }: any) {
    const [formFields, setFormFields] = useState([
        { name: '', quantity: '', expiry: '', perishable: '', unit_of_measurement: '' },
    ])

    console.log("THE ACTUAL DONOR ID IS: " + ID)



    const [house_no, setHouse_no] = useState("")
    const [street, setStreet] = useState("")
    const [village, setVillage] = useState("")
    const [brgy, setBrgy] = useState("")
    const [zip_code, setZip_code] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")


    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    }

    const submit = async (e) => {
        e.preventDefault();
        console.log(formFields)
        const rawResponse = await fetch('http://localhost:3000/' + ID + '/details/post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
                <div className="space-y-12"></div>
                <div className="border-b border-gray-900/10 pb-12"></div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Donate Goods</h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="sm:col-span-4">

                        <div className="space-y-14">
                            <div className="space-y-7">
                                <div>
                                    {formFields.map((form, index) => {
                                        return (
                                            <div key={index} className="space-y-4">
                                                <div className="mt-3">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                            <div className="w-full border-t border-gray-300" />
                                                        </div>
                                                        <div className="relative flex justify-center">
                                                            <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Item Details</span>
                                                        </div>
                                                    </div>

                                                    <TextField label="Item name" name="name" type="text" placeholder="Rice Sack"
                                                        onChange={event => handleFormChange(event, index)} value={form.name} required />
                                                    <TextField label="Unit of Measurement" name="unit_of_measurement" type="text" placeholder="Sacks"
                                                        onChange={event => handleFormChange(event, index)} value={form.unit_of_measurement} required />
                                                    <TextField label="Quantity" name="quantity" type="number" min="1" max="100000" autoComplete="number" placeholder="1"
                                                        onChange={event => handleFormChange(event, index)} value={form.quantity} required />
                                                    <TextField label="Expiry Date" name="expiry" type="date" placeholder=""
                                                        onChange={event => handleFormChange(event, index)} value={form.expiry} required />
                                                    <SelectField label="Perishable?" name="perishable" placeholder="yes"
                                                        onChange={event => handleFormChange(event, index)} required>
                                                        <option value={1}>yes</option>
                                                        <option value={0}>no</option>
                                                    </SelectField>
                                                </div>

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
                                </div>

                                <div className="col-span-full">
                                    <Button onClick={addFields} variant="solid" color="green" className="w-full">
                                        <span>
                                            Add Another Item <span aria-hidden="true">&rarr;</span>
                                        </span>
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <TextField label="House Number/Unit Number" name="house_no" type="text" autoComplete="text"
                                    placeholder="123" onChange={e => setHouse_no(e.target.value)} required />
                                <TextField label="Street Name" name="street" type="text" autoComplete="text" placeholder="123 Bonifacio Street"
                                    onChange={e => setStreet(e.target.value)} />
                                <TextField label="Village Name" name="village" type="text" autoComplete="text" placeholder="villa"
                                    onChange={e => setVillage(e.target.value)} />
                                <TextField label="Barangay" name="brgy" type="text" autoComplete="text" placeholder="Saog"
                                    onChange={e => setBrgy(e.target.value)} required />
                                <TextField label="Zip Code" name="zip_code" type="number" autoComplete="number" min="1" max="9999" placeholder="3019"
                                    onChange={e => setZip_code(e.target.value)} required />
                                <TextField label="City" name="city" type="text" autoComplete="text" placeholder="Manila"
                                    onChange={e => setCity(e.target.value)} />
                                <TextField label="Region/Province" name="province" type="text" autoComplete="text" placeholder="NCR"
                                    onChange={e => setProvince(e.target.value)} />
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <div className="pt-6">
                        <Button type="submit" onClick={submit} variant="solid" color="green" className="w-1/5">
                            <span>
                                Donate <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export function CashForm() {
    return (
        <form action="#">
            <div className="space-y-12"></div>
            <div className="border-b border-gray-900/10 pb-12"></div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Donate Cash</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                    <TextField
                        label="Amount"
                        name="number"
                        type="number"
                        autoComplete="number"
                        step="0.01"
                        min="100"
                        max="100000"
                        placeholder="0.00"
                        required
                    />
                </div>
            </div>
            <div>
                <div className="pt-6">
                    <Button type="submit" variant="solid" color="green" className="w-1/5">
                        <span>
                            Donate <span aria-hidden="true">&rarr;</span>
                        </span>
                    </Button>
                </div>
            </div>
        </form>
    )
}