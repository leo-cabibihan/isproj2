// @ts-nocheck
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function middleware(req: NextRequest) {
  var charity_status: any
  const res = NextResponse.next()

  const originalUrl = req.nextUrl.protocol + req.headers.get('host') + req.nextUrl.pathname

  const supabase = createMiddlewareClient({ req, res })
  const { data: { user }, error } = await supabase.auth.getUser();
  const uid = user?.id

  if (originalUrl.includes('/admin')) {
    // console.log('ADMIIIIIIIIIN')

    //CHECK FOR ADMIN ROLE
    const { data: admin, error: error_3 } = await supabase
      .from('system_owner')
      .select('*')
      .eq('id', uid)
    // console.log(admin)

    if (admin?.length !== 1) {
      // console.log("NOT SIGNED IN")
      return Response.redirect('http://localhost:3000')
    }
  }
  else if (originalUrl.includes('/dashboard')) {
    // console.log('CHARITY')

    //CHECK FOR CHARITY ROLE
    const { data: charity_member, error: error_2 } = await supabase
      .from('charity_member')
      .select('*, charity ( id, charity_verified )')
      .eq('user_uuid', uid)
    // console.log(charity_member)

    //CHECK IF CHARITY IS VERIFIED
    charity_member?.map(member => (
      charity_status = member.charity.charity_verified
    ))
    // console.log("THE CHARITY STATUS IS: " + charity_status)

    if (charity_member?.length !== 1 || charity_status == false) {
      // console.log("NOT A CHARITY FUCK OFF")
      return Response.redirect('http://localhost:3000')
    }
  }
  else if (originalUrl.includes('/settings')) {
    //CHECK FOR DONOR ROLE
    const { data: donor, error: error_1 } = await supabase
      .from('donor')
      .select('*')
      .eq('id', uid)
    // console.log(donor)

    if (donor?.length !== 1) {
      // console.log("NOT A DONOR FUCK OFF")
      return Response.redirect('http://localhost:3000')
    }
  }
  else if (originalUrl.includes('/owner-invite')) {
    if (user) {
      // console.log("ALREADY AN ADMIN, SO FUCK OFF")
      return Response.redirect('http://localhost:3000')
    }
  }
  else if (originalUrl.includes('/appeals-form')) {
    const { data: charity_member, error: error_2 } = await supabase
      .from('charity_member')
      .select('*, charity ( id, charity_verified )')
      .eq('user_uuid', uid)
    // console.log(charity_member)

    //CHECK IF CHARITY IS VERIFIED
    charity_member?.map(member => (
      charity_status = member.charity.charity_verified
    ))
    // console.log("THE CHARITY STATUS IS: " + charity_status)

    if (charity_member?.length !== 1) {
      // console.log("NOT A CHARITY FUCK OFF")
      return Response.redirect('http://localhost:3000')
    }
  }

  return res
}
