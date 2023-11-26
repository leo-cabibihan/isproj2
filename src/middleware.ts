// @ts-nocheck
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getURL } from '@/app/utils/url'


export async function middleware(req: NextRequest) {
  var charity_status: any
  const res = NextResponse.next()

  const requestUrl = new URL(req.url)

  const originalUrl = req.nextUrl.protocol + req.headers.get('host') + req.nextUrl.pathname

  const supabase = createMiddlewareClient({ req, res })
  const { data: { user }, error } = await supabase.auth.getUser();
  const uid = user?.id

  if (originalUrl.includes('/admin')) {

    const { data: admin, error: error_3 } = await supabase
      .from('system_owner')
      .select('*')
      .eq('id', uid)

    if (admin?.length !== 1) {
      return Response.redirect(requestUrl.origin)
    }
  }
  else if (originalUrl.includes('/dashboard')) {

    const { data: charity_member, error: error_2 } = await supabase
      .from('charity_member')
      .select('*, charity ( id, charity_verified )')
      .eq('user_uuid', uid)

    charity_member?.map(member => (
      charity_status = member.charity.verification_status
    ))

    if (charity_member?.length !== 1 || charity_status !== 'APPROVED') {
      return Response.redirect(requestUrl.origin)
    }
  }
  else if (originalUrl.includes('/settings')) {
    const { data: donor, error: error_1 } = await supabase
      .from('donor')
      .select('*')
      .eq('id', uid)

    if (donor?.length !== 1) {
      return Response.redirect(requestUrl.origin)
    }
  }
  else if (originalUrl.includes('/owner-invite')) {
    if (user) {
      return Response.redirect(requestUrl.origin)
    }
  }
  else if (originalUrl.includes('/appeals-form')) {
    const { data: charity_member, error: error_2 } = await supabase
      .from('charity_member')
      .select('*, charity ( id, charity_verified )')
      .eq('user_uuid', uid)

    charity_member?.map(member => (
      charity_status = member.charity.charity_verified
    ))

    if (charity_member?.length !== 1) {
      return Response.redirect(requestUrl.origin)
    }
  }

  return res
}
