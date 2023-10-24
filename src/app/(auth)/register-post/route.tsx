import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const name = formData.get('name') as string
  const userType = formData.get('referral_source') as string
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const { data: { user }, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/callback`,
    },
  })

  console.log(user, error)

  if (userType === 'Charity Organization') {
    const charityMember = {
      user_uuid: user?.id,
      member_name: name,
    }
    const { data: ass, error } = await supabase
      .from('charity_member')
      .insert(charityMember)
    console.log(ass, error)

    //CHECKS FOR SIGNUP ERRORS
    console.log("I am error", error)
    if (error) {
      console.log("I should redirect")

      //DISPLAYS ERROR MESSAGE IN PAGE
      return NextResponse.redirect(`http://localhost:3000/register?err=${error.message}`, { status: 301 })
    }

    return NextResponse.redirect('http://localhost:3000/email-pending', {
        status: 301,
      })
      
  }
  if (userType === 'Donor') {
    const donor = {
      id: user?.id,
      name,
    }

    const { data: ass, error } = await supabase.from('donor').insert(donor)
    console.log(ass, error)

    //CHECKS FOR SIGNUP ERRORS
    console.log("I am error", error)
    if (error) {
      console.log("I should redirect")

      //DISPLAYS ERROR MESSAGE IN PAGE
      return NextResponse.redirect(`http://localhost:3000/register?err=${error.message}`, { status: 301 })
    }

    return NextResponse.redirect('http://localhost:3000/email-pending', {
      status: 301,
    })

  }


}
