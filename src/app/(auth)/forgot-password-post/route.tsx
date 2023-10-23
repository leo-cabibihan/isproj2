import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const password = String(formData.get('password'))
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { data, error } = await supabase.auth.updateUser({
        password: password
      })

    return NextResponse.redirect('https://youtu.be/dQw4w9WgXcQ?si=cgLEy3uozdjiPjzq', {
        status: 301,
    })

}