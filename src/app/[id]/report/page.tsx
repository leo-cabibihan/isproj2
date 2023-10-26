import Link from 'next/link'

import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import { Footer } from '@/components/Footer'
import supabase from '@/app/utils/supabase'
import { revalidatePath } from 'next/cache'
import { GetUID } from '@/app/utils/user_id'

export const revalidate = 0;

export default async function Report({ params } : any) {

  const orgID = params.id

  const donorID = await GetUID()

  const { data: orgs } = await supabase
    .from('charity')
    .select('*')
    .eq('id', orgID)

  const handleSubmit = async (formData: FormData) => {
    'use server'
    const complaint = {
      complaint: formData.get("reason"),
      image: 1233,
      donor_id: "06c8ed37-d903-4ebf-b5b9-01a2106ab313",
      charity_id: orgID
    };

    const {data, error} = await supabase.from('donor_complaints').insert(complaint);
    revalidatePath('/');
    console.log('ERROR: ', error)
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">

          <div className="flex">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
          </div>

          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Report Charity
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action={handleSubmit} method="POST">
              {orgs?.map(org => (
                <div key={org.id}>
                  <TextField
                    label="Charity Organization's Name"
                    name="name"
                    type="name"
                    readOnly
                    placeholder={org.name}
                  />
                </div>
              ))}

              <div className="col-span-full">
                <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                  Details
                </label>
                <div className="mt-2">
                  <textarea
                    id="reason"
                    name="reason"
                    rows={6}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Lorem Ipsum oh there aren't enough black trans women starring in hollywood type of bullshit"
                  />
                </div>
              </div>



              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Cover photo
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
              <div className="col-span-full">

                <Button type="submit" variant="solid" color="blue" className="w-full">
                  <span>
                    Submit <span aria-hidden="true">&rarr;</span>
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}