
import { GetEmail, GetUID } from '@/app/utils/user_id'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { useRouter } from 'next/router'
import { NextResponse } from 'next/server'

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

    console.log("EMAIL IS: " + email)

    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${requestUrl.origin}/owner-invite-post`,
      },
    })

    console.log("SIGNUP ERROR IS: " + error)

    const system_owner = {
        id: user?.id,
        name: name,
    }
    const { data: admin, error: adminError } = await supabase
        .from('system_owner')
        .insert(system_owner)
    console.log(admin, adminError)

    return NextResponse.redirect('http://localhost:3000/email-pending', {
        status: 301,
    })




}
