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

export default function Details() {
  const saveChanges = async (formData: FormData) => {
    'use server'
    const details = {
      name: formData.get('Organization Name'),
      about: formData.get('description'),
      charity_phone: formData.get('Contact Number'),
      charity_verified: false,
    }
    const { error } = await supabase.from('charity').insert(details)
    console.log(error)
    redirect('/onboarding/address')
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
