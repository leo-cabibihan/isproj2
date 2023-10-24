import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/dist/server/api-utils'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  console.log('wtf wtf')
  const { data: { user }, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })


  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_IN') console.log('SIGNED_IN', session)
  })

  //CHECKS FOR LOGIN ERRORS
  console.log("I am error", error)
  if (error) {
    console.log("I should redirect")

    //DISPLAYS ERROR MESSAGE IN PAGE
    return NextResponse.redirect(`http://localhost:3000/login?err=${error.message}`, { status: 301 })
  }
  console.log("y am I here")
  const user_id = user?.id
  console.log('UUID IS: ', user_id)

  // //Checks if current user is a charity member or donor (It works)
  const { data: donor, error: error_1 } = await supabase
    .from('donor')
    .select('*')
    .eq('id', user_id)
  const { data: charity_member, error: error_2 } = await supabase
    .from('charity_member')
    .select('*')
    .eq('user_uuid', user_id)
  const { data: admin, error: error_3 } = await supabase
    .from('system_owner')
    .select('*')
    .eq('id', user_id)

  console.log(donor)
  console.log(charity_member)
  console.log(admin)

  console.log(requestUrl.origin)

  if (donor?.length === 1) {
    return NextResponse.redirect('http://localhost:3000/settings', {
      status: 301,
    })
  } else if (charity_member?.length === 1) {
    return NextResponse.redirect('http://localhost:3000/dashboard/settings', {
      status: 301,
    })
  } else if (admin?.length === 1) {
    return NextResponse.redirect('http://localhost:3000/admin/applications', {
      status: 301,
    })
  }
}
