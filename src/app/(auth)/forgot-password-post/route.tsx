// @ts-nocheck 
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getURL } from '@/app/utils/url'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const password = String(formData.get('password'))
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { data, error } = await supabase.auth.updateUser({
        password: password
    })

    if (error) {

        //DISPLAYS ERROR MESSAGE IN PAGE
        return NextResponse.redirect(`${requestUrl.origin}/forgot-password?err=${error.message}`, { status: 301 })
    }


    return NextResponse.redirect(requestUrl.origin, {
        status: 301,
    })

}