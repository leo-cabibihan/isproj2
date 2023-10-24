import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const email = String(formData.get('email'))
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { data, error } = await supabase.auth.resetPasswordForEmail(email)

    console.log("ERROR IS: " + error)

    //CHECKS FOR LOGIN ERRORS
    if (error) {
        //DISPLAYS ERROR MESSAGE IN PAGE
        return NextResponse.redirect(`http://localhost:3000/reset?err=${error.message}`, { status: 301 })
    }

    return NextResponse.redirect('http://localhost:3000/email-pending', {
        status: 301,
    })

}