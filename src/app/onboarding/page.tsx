import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import supabase from '@/app/utils/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'



export default function Example() {
  const addressChanges = async (formData: FormData) => {
    'use server'
    const contactId = formData.get('id')
    const details = {
      house_humber: formData.get('House Number'),
      street_name: formData.get('Street Name'),
      village_name: formData.get('village name'),
      barangay: formData.get('Barangay'),
      city: formData.get('City'),
      province: formData.get('province'),
      zipcode: formData.get('zipcode'),
      house_name: formData.get('house name'),
    }

    const details2 = {
      name: formData.get('Organization Name'),
      about: formData.get('description'),
      charity_phone: formData.get('Contact Number'),
      charity_verified: false,
    }

    const {  } = await supabase.from('charity').insert(details2)
    const { error } = await supabase.from('address').insert(details)
    console.log(error)
    redirect('/onboarding/pending')
  }

  // const detailChanges = async (formData: FormData) => {
  //   'use server'
    
  //   addressChanges
    
  // }
  
  return (
    <>
    <Header></Header>
    <form className="space-y-6" action={addressChanges} method="POST">
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
                name="Organization Name"
                type="name"
                autoComplete="name"
                required
              />

              <TextField
                label="Description"
                name="description"
                type="description"
                autoComplete="description"
                required
              />

              <TextField
                label="Contact Number"
                name="Contact Number"
                type="number"
                autoComplete="number"
                required
              />
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
                name="House Number"
                type="address"
                autoComplete="address"
                required
              />

              <TextField
                label="House Name"
                name="house name"
                type="address"
                autoComplete="address"
                required
              />

              <TextField
                label="Street Name"
                name="Street Name"
                type="address"
                autoComplete="address"
                required
              />

              <TextField
                label="Village Name"
                name="village name"
                type="address"
                autoComplete="address"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <TextField
                label="Barangay"
                name="Barangay"
                type="address"
                autoComplete="address"
                required
              />

              <TextField
                label="City"
                name="City"
                type="address"
                autoComplete="address"
                required
              />

              <TextField
                label="Province"
                name="province"
                type="address"
                autoComplete="address"
                required
              />

              <TextField
                label="Zipcode"
                name="zipcode"
                type="address"
                autoComplete="address"
                required
              />
            </div>
          </div>
        </div>

        <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Upload Certificate File/Image
              </label>
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
          </div>
      <div className="mt-6 flex items-center justify-end gap-x-6 mb-4">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    </>
  )
}
