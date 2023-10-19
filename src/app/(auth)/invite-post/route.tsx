import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Email } from '@/components/email-template';
import { render } from '@react-email/render';
import Plunk from '@plunk/node';

const plunk = new Plunk("sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db");


export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const body = render(<Email url="http://localhost:3000/owner-invite" />);

  const success = await plunk.emails.send({
    to: email,
    subject: "Hello World!",
    body,
  })

  return NextResponse.redirect('http://localhost:3000/email-pending', {
    status: 301,
  })


}
