// @ts-nocheck 
import { GetEmail, GetUID } from '@/app/utils/user_id'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { useRouter } from 'next/router'
import { NextResponse } from 'next/server'
import Cryptr from 'cryptr';
import { getURL } from '@/app/utils/url'

const cryptr = new Cryptr("3UzEs9SUb9rbc3SlQuw9H462JK9xWxJwElh7f5knBaDQ6te9u6")

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const token = await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(`${requestUrl.origin}/admin/settings`)
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)

  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const name = formData.get('name') as string
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const decryptedEmail = cryptr.decrypt(email)

  const { data: { user }, error } = await supabase.auth.signUp({
    email: decryptedEmail,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/owner-invite-post`,
    },
  })

  const system_owner = {
    id: user?.id,
    name: name,
  }
  const { data: admin, error: adminError } = await supabase
    .from('system_owner')
    .insert(system_owner)
  console.log(admin, adminError)

  return NextResponse.redirect(getURL() + 'email-pending', {
    status: 301,
  })
}
