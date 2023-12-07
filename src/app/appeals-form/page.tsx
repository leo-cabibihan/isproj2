//@ts-nocheck
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/Button'
import { SelectField, TextField } from "@/components/Fields";
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import supabase from '@/app/utils/supabase'
import { redirect, useSearchParams } from 'next/navigation'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { useRouter } from 'next/router'
import Alert from '@/components/Alert'
import { ImageUpload } from "@/components/ImgUpload";
import { GetUID } from "@/app/utils/user_id";
import { CharityLog } from '../admin/audit-log/function';
import { revalidatePath } from 'next/cache';
import { Message } from '@/components/Feedback';
import { NoWhiteSpace } from '../utils/input_validation';
import { DisplayMessage } from '@/components/DisplayMessage';

export const metadata: Metadata = {
  title: 'Sign In',
}

var message = ""
var messageType = ""
var heading = ""

export default async function Appeals({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

  console.log("DOES IT WORK???? MAYBE: " + await GetUID())
  const uid = await GetUID()
  const { data: charity_member, error: error_2 } = await supabase.from('decrypted_charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
  const charity_id = charity_member?.map(member => member.charity?.id)

  const { data: complaints } = await supabase.from('donor_complaints').select('*, charity ( id, name ), decrypted_donor ( id, decrypted_name )').eq('charity_id', charity_id)

  const { data: last_appeal, error: event_error } = await supabase
    .from('charity_appeals')
    .select('*')
    .order('id', { ascending: false }).limit(1)

  const appeal_id = last_appeal?.map(appeal => appeal.id)
  console.log("LAST EXPENSE'S ID IS: " + (appeal_id))

  const handleSubmit = async (formData: FormData) => {
    'use server'

    const input = String(formData.get("explanation"))

    const valid_input = NoWhiteSpace(input)

    if (valid_input) {

      const appeals = {
        charity_id: formData.get("charity_id"),
        charity_worker_id: formData.get("worker_id"),
        complaint_id: formData.get("complaint_id"),
        explanation: formData.get("explanation")
      };

      const { data, error } = await supabase.from('charity_appeals').insert(appeals).select()

      if (error) {
        message = `Failed to File Appeal. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
        messageType = "ERROR"
        heading = "Appeal not Filed."
      }
      else {
        message = "Your Appeal has been Filed. The Admins will be reviewing it as soon as possible."
        messageType = "SUCCESS"
        heading = "Appeal has been Filed."
        CharityLog("FILED APPEAL", error)
      }

      console.log("APPEALS ERROR IS: ", error)
      revalidatePath('/');

    }
    else {
      const error_msg = "Invalid Inputs. 2 or more consecutive spaces are not allowed."
      message = error_msg
      messageType = "ERROR"
      heading = "Invalid Input."
    }

  };


  return (
    <>
      <SlimLayout>
        <div className="flex">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
        </div>
        <h2 className="mt-20 text-lg font-semibold text-gray-900">
          Fill out an Appeal form
        </h2>
        <form
          action={handleSubmit}
          method="post"
          className="grid grid-cols-1 gap-y-8"
        >
          {/* CHECKS IF NULL */}
          {searchParams.err && <Alert message={searchParams.err as string} />}
          <TextField
            label=""
            name="worker_id"
            type="hidden"
            defaultValue={uid}
            readOnly
          />

          <TextField
            label=""
            name="charity_id"
            type="hidden"
            defaultValue={charity_id}
            readOnly
          />

          <SelectField
            className="col-span-full py-5"
            label="Pick Complaint"
            name="complaint_id"
          >
            {complaints?.map(complaint => (
              <option key={complaint.id} value={complaint.id}>{complaint.complaint}</option>
            ))}
          </SelectField>

          <div className="col-span-full">
            <label htmlFor="explanation" className="block text-sm font-medium leading-6 text-gray-900">
              Details
            </label>
            <div className="mt-2">
              <textarea
                id="explanation"
                name="explanation"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter your appeal details here..."
              />
            </div>
          </div>

          <ImageUpload folderName='charity_appeals' charityID={charity_id} recordID={appeal_id![0] + 1} labelText="donor_complaints" />

          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                File Appeal <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
        <DisplayMessage content={message} type={messageType} heading={heading} />
      </SlimLayout>

    </>
  )
}
