import supabase from "@/app/utils/supabase"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
    const cookieStore = cookies()

    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const {error} = await supabase.auth.signOut()
    console.log("this is logout eroor",error)
    return NextResponse.redirect("http://localhost:3000/", {
        status: 301,
    })
}