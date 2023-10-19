import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Email } from '@/components/email-template';
import { render } from '@react-email/render';
import Plunk from '@plunk/node';
import { v4 as uuidv4 } from "uuid";

const plunk = new Plunk("sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db");

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  console.log('okok')
  console.log(code)

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const token = await supabase.auth.exchangeCodeForSession(code)
    console.log('wtf wtf')
    console.log(token)
  }

  return NextResponse.redirect(`${requestUrl.origin}/owner-invite`)
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = uuidv4()
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const { data: { user }, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/invite-post`,
    },
  })

  // const body = render(<Email url="http://localhost:3000/owner-invite" />);

  // const success = await plunk.emails.send({
  //   to: email,
  //   subject: "Hello World!",
  //   body,
  // })

  return NextResponse.redirect('http://localhost:3000/email-pending', {
    status: 301,
  })


}
