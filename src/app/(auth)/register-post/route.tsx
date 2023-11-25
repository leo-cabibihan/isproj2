// @ts-nocheck 
import { getURL } from '@/app/utils/url'
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

  const signup_error = "Email Address already exists. Please use a different one or Login."

  const { data: { user }, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/callback`,
    },
  })

  if (userType === 'Charity Organization') {
    const charityMember = {
      user_uuid: user?.id,
      member_name: name,
    }
    const { data: member, error } = await supabase
      .from('charity_member')
      .insert(charityMember)

    //CHECKS FOR SIGNUP ERRORS
    if (error) {
      //DISPLAYS ERROR MESSAGE IN PAGE
      return NextResponse.redirect(`${requestUrl.origin}/register?err=${signup_error}`, { status: 301 })
    }

    return NextResponse.redirect(`${requestUrl.origin}/email-pending`, {
        status: 301,
      })
      
  }
  if (userType === 'Donor') {
    const donor = {
      id: user?.id,
      name,
    }

    const { data: donor_data, error } = await supabase.from('donor').insert(donor)

    //CHECKS FOR SIGNUP ERRORS
    if (error) {
      //DISPLAYS ERROR MESSAGE IN PAGE
      return NextResponse.redirect(`${requestUrl.origin}/register?err=${signup_error}`, { status: 301 })
    }

    return NextResponse.redirect(`${requestUrl.origin}/email-pending`, {
      status: 301,
    })

  }


}
