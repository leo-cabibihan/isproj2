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

export default function address() {
  const saveChanges = async (formData: FormData) => {
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
    const { error } = await supabase.from('address').insert(details)
    console.log(error)
    redirect('/onboarding/photo')
  }

  return (
    <>
      <Header></Header>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md"></div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            About Charity
          </h2>

          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action={saveChanges} method="POST">
              <TextField
                label="House Number"
                name="House Number"
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

              <TextField
                label="House Name"
                name="house name"
                type="address"
                autoComplete="address"
                required
              />

              <div className="col-span-full">
                <Button variant="solid" color="white" className="w-full">
                  <span>
                    Back<span aria-hidden="true">&rarr;</span>
                  </span>
                </Button>
              </div>

              <div className="col-span-full">
                <Button variant="solid" color="blue" className="w-full">
                  Submit<span aria-hidden="true">&rarr;</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Footer></Footer>
    </>
  )
}
