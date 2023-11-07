// @ts-nocheck 
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Email } from '@/components/email-template';
import { render } from '@react-email/render';
import Plunk from '@plunk/node';
import { v4 as uuidv4 } from "uuid";
import Cryptr from 'cryptr';
import { getURL } from './app/utils/url'

const plunk = new Plunk("sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db");
const cryptr = new Cryptr("3UzEs9SUb9rbc3SlQuw9H462JK9xWxJwElh7f5knBaDQ6te9u6")

export async function POST(request: Request) {

  //THIS PART WORKS (It generates emails, passwords, does the cookies shit, etc.)
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const id = String(formData.get('id'))
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const encryptedEmail = cryptr.encrypt(email)
  const encryptedID = cryptr.encrypt(id)

  const body = render(<Email url={getURL() + "org-invite/" + encryptedEmail + "/" + encryptedID}/>);

  const success = await plunk.emails.send({
    to: email,
    subject: "Hello World!",
    body,
  })

  return NextResponse.redirect(getURL() + 'email-pending', {
    status: 301,
  })
}
