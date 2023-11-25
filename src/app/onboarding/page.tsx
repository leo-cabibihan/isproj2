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

export const revalidate = 0;

export default async function Example() {

  const { data: last_charity, error: post_error } = await supabase
    .from('charity')
    .select('*')
    .order('id', { ascending: false }).limit(1)

  const last_id = last_charity?.map(charity => charity.id)
  console.log("LAST CHARITY'S ID IS: " + (last_id![0] + 1))

  const handleSubmit = async (formData: FormData) => {
    'use server'
    const address = {
      house_number: formData.get("house_number"),
      street_name: formData.get("street_name"),
      village_name: formData.get("village_name"),
      barangay: formData.get("barangay"),
      zipcode: formData.get("zipcode"),
      city: formData.get("city"),
      province: formData.get("province")
    }
 
    const { data: new_address, error: address_error } = await supabase.from('address').insert(address).select();
    console.log("ADDRESS ERROR", address_error)
    const address_id = new_address![0].id
    console.log("ADDRESS ID IS: " + address_id + ". IT WORKS!!!!!!!!!")

    const charity_details = {
      name: formData.get('org_name'),
      about: formData.get('description'),
      charity_phone: formData.get('phone'),
      charity_verified: false,
      address_id: address_id,
      email_address: formData.get('email')
    }

    const { data: charity, error: charity_error } = await supabase.from('charity').insert(charity_details).select()
    console.log("CHARITY ERROR IS ", charity_error)
    const charity_id = charity![0].id

    console.log("CHARITY ID IS: " + charity_id + ". IT WORKS!!!!!")
    console.log("CHARITY IS: " + charity)
    const charityID = charity_id
    console.log("HEY BRO " + charityID)

    const uid = await GetUID()

    const charity_member = {
      charity_id: charityID
    }

    const {data: member, error: member_error} = await supabase.from('charity_member').update(charity_member).eq("user_uuid", uid)

    console.log("MEMBER ERROR IS ", member_error)

    revalidatePath('/');
    redirect('/pending')
  }

  return (
    <>
      <Header></Header>
      <form className="space-y-6 py-8" action={handleSubmit} method="POST">
        <div className="container mx-auto px-20 mt-16 mb-16 space-y-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Details</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly, so please be accurate.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-6">
                <TextField
                  label="Charity Organization's Name"
                  name="org_name"
                  type="name"
                  autoComplete="name"
                  placeholder='Name of your charity'
                  required
                />
                <br/>
                <TextField
                  label="Contact Number"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder='e.g: 0918-123-4567, 09181234567, etc.'
                  required
                />
                <br/>
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder='e.g: abc@email.com'
                  required
                />
                <br/>
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
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Organization Address</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Permanent address of the organization.</p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-3">
                <TextField
                  label="House Number"
                  name="house_number"
                  type="address"
                  autoComplete="address"
                  placeholder='e.g: 123'
                  required
                />
                <br/>
                <TextField
                  label="Street Name"
                  name="street_name"
                  type="address"
                  autoComplete="address"
                  placeholder='e.g: Anystreet'
                  required
                />
                <br/>
                <TextField
                  label="Village Name"
                  name="village_name"
                  type="address"
                  autoComplete="address"
                  placeholder='e.g: Anyvillage'
                  required
                />
                <br/>
                <TextField
                  label="Zipcode"
                  name="zipcode"
                  type="address"
                  autoComplete="address"
                  placeholder='e.g: 1119'
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
                  required
                />
                <br/>
                <TextField
                  label="City"
                  name="city"
                  type="address"
                  autoComplete="address"
                  placeholder='e.g: Anycity'
                  required
                />
                <br/>
                <TextField
                  label="Province"
                  name="province"
                  type="address"
                  autoComplete="address"
                  placeholder='e.g: Anyprovince'
                  required
                />
              </div>
            </div>
          </div>

          <ImageUpload folderName="onboarding" charityID={last_id![0] + 1} recordID={last_id![0] + 1} />
          
        </div>
        <div className="mt-6 flex flex-col items-center justify-end gap-x-6 mb-4">
          <Button type="submit" variant="solid" color="blue" className="w-1/5">
            <span>
              Submit <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </>
  )
}
