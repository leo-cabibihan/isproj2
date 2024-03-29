// @ts-nocheck 
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { AlertEmail, Email } from '@/components/email-template';
import { render } from '@react-email/render';
import Plunk from '@plunk/node';
import { v4 as uuidv4 } from "uuid";
import Cryptr from 'cryptr';
import { getURL } from '@/app/utils/url'

const plunk = new Plunk("sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db");

export async function POST(request: Request) {

  //THIS PART WORKS (It generates emails, passwords, does the cookies stuff, etc.)
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const donor = String(formData.get('donor'))
  const date = String(formData.get('date'))
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  console.log('THIS WORKS ', email, donor, date)

  const body = render(<AlertEmail url={`${requestUrl.origin}/dashboard/logs/complaints`} heading={"You have been reported!"} 
  content={"You have been reported by " + donor + " at " + date + ". Please click the link to learn more."}/>);

  const success = await plunk.emails.send({
    to: email,
    subject: "ALERT!",
    body,
  })

  console.log("SUCCESS??? ", success)

  return NextResponse.redirect(`${requestUrl.origin}/email-pending`, {
    status: 301,
  })
 
}
