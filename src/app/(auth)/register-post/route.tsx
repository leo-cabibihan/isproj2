
import { NoWhiteSpace, PasswordCheck } from '@/app/utils/input_validation'
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

  //PASSWORD VALIDATION
  const valid_input = PasswordCheck(password, email)
  const valid_name = NoWhiteSpace(name)

  if (valid_input && valid_name) {

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
  else {

    const message = "Invalid Auth Credentials. Passwords must have at least 10 characters, one UPPERCASE, one lowercase, \nat least one number, \nand at least one symbol (i.e. '!^@?' etc.). \nEmails must follow the proper format. \nName must not contain 2 or more consecutive spaces."
    //DISPLAYS ERROR MESSAGE IN PAGE
    return NextResponse.redirect(`${requestUrl.origin}/register?err=${message}`, { status: 301 })

  }


}
