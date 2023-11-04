// @ts-nocheck
'use server'

import { Button } from "./Button";
import { SelectField, TextField } from "./Fields";
import supabase from "@/app/utils/supabase"
import { revalidatePath } from "next/cache"


const cities = [
    { id: 1, name: "Manila" },
    { id: 2, name: "Quezon City" },
    { id: 3, name: "Mandaluyong" },
    { id: 4, name: "Marikina" },
    { id: 5, name: "Pasig" },
    { id: 6, name: "San Juan" },
    { id: 7, name: "Caloocan" },
]

const provinces = [
    { id: 1, name: "NCR" },
    { id: 2, name: "Bulacan" },
    { id: 3, name: "N/A" },
]

export async function CashForm() {
    return (
        <>
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
        </>
    )
}

export async function GoodsForm({ id } : any) {

    const handleSubmit = async (formData: FormData) => {
        'use server'

        const address = {
            house_number: formData.get("house_no"),
            street_name: formData.get("street"),
            village_name: formData.get("village"),
            barangay: formData.get("brgy"),
            house_name: "kek",
            zipcode: formData.get("zip_code"),
            city: formData.get("city"),
            province: formData.get("province")
        }

        const address_id = await supabase.from('address').insert(address).select('id');

        const item = {
            charity_id: id,
            verify: false,
            donor_id: "4f48e3e4-a5d8-4e65-91a0-0b89086d8570",
            donor_address_id: address_id
        };

        const item_id = await supabase.from('items_donation_transaction').insert(item).select('id');

        const item_details = {
            donation_id: item_id,
            name: formData.get("item"),
            quantity: formData.get("qty"),
            expiry: formData.get("expiry"),
            perishable: Boolean(formData.get("isPerishable")),
            unit_of_measurement: formData.get("unit_measure")
        }

        await supabase.from('inventory_item').insert(item_details);
        revalidatePath('/');
    };

    return (
        <>
            <form className="space-y-6" action={handleSubmit} method="POST">
                <div className="space-y-12"></div>
                <div className="border-b border-gray-900/10 pb-12"></div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Donate Goods</h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <TextField label="Item name" name="item" type="text" placeholder="Rice Sack" required />
                        <TextField label="Unit of Measurement" name="unit_measure" type="text" placeholder="Sacks" required />
                        <TextField label="Quantity" name="qty" type="number" min="1" max="100000" autoComplete="number" placeholder="1" required />
                        <TextField label="Expiry Date" name="expiry" type="date" placeholder="" required />
                        <SelectField label="Perishable?" name="isPerishable" placeholder="yes" required>
                            <option value={1}>yes</option>
                            <option value={0}>no</option>
                        </SelectField>
                        <TextField label="House Number/Unit Number" name="house_no" type="text" autoComplete="text" placeholder="123" required />
                        <TextField label="Street Name" name="street" type="text" autoComplete="text" placeholder="123 Bonifacio Street" />
                        <TextField label="Village Name" name="village" type="text" autoComplete="text" placeholder="kekw" />
                        <TextField label="Barangay" name="brgy" type="text" autoComplete="text" placeholder="Saog" required />
                        <TextField label="Zip Code" name="zip_code" type="number" autoComplete="number" min="1" max="9999" placeholder="3019" required />
                        <SelectField label="City" name="city" required>
                            {cities.map(city =>
                                // eslint-disable-next-line react/jsx-key
                                <option value={city.name}>{city.name}</option>
                            )}
                        </SelectField>
                        <SelectField label="Province" name="province" placeholder="N/A" required>
                            {provinces.map(province =>
                                // eslint-disable-next-line react/jsx-key
                                <option value={province.name}>{province.name}</option>
                            )}
                        </SelectField>
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
        </>
    )
}