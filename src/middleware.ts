import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // console.log('hello i am middleware')
  // console.log(req.cookies)
  const supabase = createMiddlewareClient({ req, res })
  const { data, error } = await supabase.auth.getSession()
  // console.log(data, error)

  return res
}
