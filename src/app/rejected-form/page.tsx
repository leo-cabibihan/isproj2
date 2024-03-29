// @ts-nocheck
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import supabase from '@/app/utils/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { ImageUpload } from '@/components/ImgUpload'
import { GetUID } from '../utils/user_id'
import { DefaultLayout } from '@/components/layouts/Default'

export const revalidate = 0;

export default async function Page() {

    console.log("CHECKPOINT. WELCOME TO THE REJECTED FORM!")
    console.log("OPERATION START!")
    console.log("======================================================================")
    //THIS GETS THE CHARITY ID AND LOGS ERRORS
    const uid = await GetUID()
    const { data: charity_member, error: error_2 } = await supabase
        .from('decrypted_charity_member')
        .select('*, charity ( id, name )')
        .eq('user_uuid', uid)
    console.log("CHECKPOINT 1 - PASSED!")
    //THIS IS USED TO STORE THE CHARITY ID FOR LATER AND CHECK IF IT'S RETRIEVED
    const charity_id = charity_member?.map((member) => member.charity?.id)

    console.log("CHARITY OBJECT EXISTS: ", charity_member)
    console.log("THE CHARITY'S ID IS: ", charity_id)
    console.log("ERROR RETRIEVING THE CHARITY MEMBER. DETAILS ARE BELOW: \n", error_2)

    console.log("CHECKPOINT 2 - PASSED!")
    //THIS JUST GETS THE CHARITY DETAILS BASED ON THE ORG ID AND LOGS ANY ERRORS
    const { data: org, error: error_4 } = await supabase
        .from('charity')
        .select('*, address ( * )')
        .eq('id', charity_id)

    console.log("ORG OBJECT IS: ", org)
    console.log("ERROR RETRIEVING THE CHARITY. DETAILS ARE BELOW: \n" + error_4)

    console.log("CHECKPOINT 3 - PASSED!")

    //THIS IS HERE TO STORE THE ADDRESS DETAILS FOR LATER AND CHECKS IF IT'S RETRIEVED
    const address_id = org?.map((org) => org.address?.id)
    console.log("THE ORG'S ADDRESS ID IS: " + address_id)

    console.log("CHECKPOINT 4 - PASSED!")

    //THIS HANDLES THE UPDATING OF THE ORG APPLICATION DETAILS
    const handleSubmit = async (formData: FormData) => {
        'use server'
        console.log("PSA: SUBMIT OPERATION HAS STARTED!")
        const address = {
            house_number: formData.get("house_number"),
            street_name: formData.get("street_name"),
            village_name: formData.get("village_name"),
            barangay: formData.get("barangay"),
            zipcode: formData.get("zipcode"),
            city: formData.get("city"),
            province: formData.get("province")
        }

        console.log("CHECKPOINT 4 - PASSED!")

        const { data: address_data, error: address_error } = await supabase.from('address').update(address).eq('id', address_id).select();
        console.log("ADDRESS OBJECT: ", address_data)
        console.log("ERROR UPDATING THE ADDRESS. DETAILS ARE BELOW: ", address_error)

        console.log("CHECKPOINT 5 - PASSED!")

        const charity_details = {
            name: formData.get('org_name'),
            about: formData.get('description'),
            charity_phone: formData.get('phone'),
            charity_verified: false,
            is_rejected: false,
            address_id: parseInt(address_id),
            email_address: formData.get('email')
        }

        console.log("CHECKPOINT 6 - PASSED!")

        const { data: charity_data, error: charity_error } = await supabase.from('charity').update(charity_details).eq('id', charity_id).select();
        console.log("CHARITY DATA: ", charity_data)
        console.log("ERROR UPDATING THE CHARITY. DETAILS ARE BELOW: ", charity_error)

        console.log("CHECKPOINT 7 - PASSED!")

        revalidatePath('/');
        console.log("===================================================================")
        console.log("OPERATION ENDED!")
        console.log('CONGRATULATIONS! THE OPERATION WAS A SUCCESS!')
        redirect('/pending')
    }

    return (
        <>
            <DefaultLayout>
                <form className="space-y-6 py-8" action={handleSubmit} method="PUT">
                    <div className="container mx-auto px-20 mt-16 mb-16 space-y-24">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Details</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    This information will be displayed publicly, so please be accurate.
                                </p>
                            </div>

                            {org?.map(org => (
                                <>
                                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                        <div className="sm:col-span-6">

                                            <div className="col-span-full">
                                                <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Initial Reason for Rejected Application
                                                </label>
                                                <div className="mt-2">
                                                    <textarea
                                                        id="rejection_reason"
                                                        name="rejection_reason"
                                                        rows={6}
                                                        required
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Enter your charity's about us here..."
                                                        defaultValue={org.rejection_reason}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <br />

                                            <TextField
                                                label=" "
                                                name="charity_id"
                                                type="hidden"
                                                defaultValue={charity_id}
                                                required
                                            />

                                            <TextField
                                                label=" "
                                                name="address_id"
                                                type="hidden"
                                                defaultValue={address_id}
                                                required
                                            />

                                            <TextField
                                                label="Charity Organization's Name"
                                                name="org_name"
                                                type="name"
                                                autoComplete="name"
                                                placeholder='Name of your charity'
                                                defaultValue={org.name}
                                                required
                                            />
                                            <br />
                                            <TextField
                                                label="Contact Number"
                                                name="phone"
                                                type="tel"
                                                autoComplete="tel"
                                                placeholder='e.g: 0918-123-4567, 09181234567, etc.'
                                                defaultValue={org.charity_phone}
                                                required
                                            />
                                            <br />
                                            <TextField
                                                label="Email Address"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                placeholder='e.g: abc@email.com'
                                                defaultValue={org.email_address}
                                                required
                                            />
                                            <br />
                                            <div className="col-span-full">
                                                <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Description
                                                </label>
                                                <div className="mt-2">
                                                    <textarea
                                                        id="description"
                                                        name="description"
                                                        rows={6}
                                                        required
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Enter your charity's about us here..."
                                                        defaultValue={org.about}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Organization Address</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Permanent address of the organization.</p>
                            </div>

                            {org?.map(org => (
                                <>
                                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                        <div className="sm:col-span-3">
                                            <TextField
                                                label="House Number"
                                                name="house_number"
                                                type="address"
                                                autoComplete="address"
                                                placeholder='e.g: 123'
                                                defaultValue={org.address?.house_number}
                                                required
                                            />
                                            <br />
                                            <TextField
                                                label="Street Name"
                                                name="street_name"
                                                type="address"
                                                autoComplete="address"
                                                placeholder='e.g: Anystreet'
                                                defaultValue={org.address?.street_name}
                                                required
                                            />
                                            <br />
                                            <TextField
                                                label="Village Name"
                                                name="village_name"
                                                type="address"
                                                autoComplete="address"
                                                placeholder='e.g: Anyvillage'
                                                defaultValue={org.address?.village_name}
                                                required
                                            />
                                            <br />
                                            <TextField
                                                label="Zipcode"
                                                name="zipcode"
                                                type="address"
                                                autoComplete="address"
                                                placeholder='e.g: 1119'
                                                defaultValue={org.address?.zipcode}
                                                required
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <TextField
                                                label="Barangay"
                                                name="barangay"
                                                type="address"
                                                autoComplete="address"
                                                placeholder='e.g: Anybarangay'
                                                defaultValue={org.address?.barangay}
                                                required
                                            />
                                            <br />
                                            <TextField
                                                label="City"
                                                name="city"
                                                type="address"
                                                autoComplete="address"
                                                placeholder='e.g: Anycity'
                                                defaultValue={org.address?.city}
                                                required
                                            />
                                            <br />
                                            <TextField
                                                label="Province"
                                                name="province"
                                                type="address"
                                                autoComplete="address"
                                                placeholder='e.g: Anyprovince'
                                                defaultValue={org.address?.province}
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>

                        <ImageUpload folderName="onboarding" charityID={charity_id} recordID={charity_id} labelText="Upload Certifying Documents" />

                    </div>
                    <div className="mt-6 flex flex-col items-center justify-end gap-x-6 mb-4">
                        <Button type="submit" variant="solid" color="blue" className="w-1/5">
                            <span>
                                Submit <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Button>
                    </div>
                </form>
            </DefaultLayout>
        </>
    )
}
