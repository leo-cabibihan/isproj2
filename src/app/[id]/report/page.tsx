// @ts-nocheck
import Link from 'next/link'

import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import { Footer } from '@/components/Footer'
import supabase from '@/app/utils/supabase'
import { revalidatePath } from 'next/cache'
import { GetEmail, GetUID } from '@/app/utils/user_id'
import { ImageUpload } from '@/components/ImgUpload'
import { render } from '@react-email/render'
import { NoURLMail, ReceiptEmail } from '@/components/email-template'
import Plunk from '@plunk/node'

export const revalidate = 0

const plunk = new Plunk('sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db')

export default async function Report({ params }: any) {
  const orgID = params.id

  const donorID = await GetUID()
  const email = await GetEmail()

  const { data: orgs } = await supabase
    .from('charity')
    .select('*')
    .eq('id', orgID)

  const { data: last_complaint, error: complaint_error } = await supabase
    .from('donor_complaints')
    .select('*')
    .order('id', { ascending: false })
    .limit(1)

  const complaint_id = last_complaint?.map((post) => post.id)
  console.log("LAST EVENT'S ID IS: " + (complaint_id![0] + 1))

  const handleSubmit = async (formData: FormData) => {
    'use server'
    const complaint = {
      complaint: formData.get('reason'),
      image: 1233,
      donor_id: donorID,
      charity_id: orgID,
    }

    const { data, error } = await supabase
      .from('donor_complaints')
      .insert(complaint)
      .select()
    revalidatePath('/')
    const body = render(
      <NoURLMail
        heading={'COMPLAINT RECEIVED'}
        content={
          'Thank you for filing a complaint. Rest assured that the admins will review this as soon as possible and take immediate action.'
        }
      />,
    )

    const success = await plunk.emails.send({
      to: email,
      subject: 'Complaint Received',
      body,
    })

    console.log('SUCCESS??? ', success)
    console.log('ERROR: ', error)
  }

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
              {orgs?.map((org) => (
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
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
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

              <ImageUpload
                folderName="campaign_post"
                charityID={orgID}
                recordID={complaint_id![0] + 1}
              />

              <div className="col-span-full">
                <Button
                  href="/id/reportprocess"
                  type="submit"
                  variant="solid"
                  color="blue"
                  className="w-full"
                >
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
