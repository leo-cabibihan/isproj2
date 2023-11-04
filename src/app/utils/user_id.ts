// @ts-nocheck 
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function GetUID() {
    const cookieStore = cookies()

    const supabase = createServerActionClient({ cookies: () => cookieStore })

    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    console.log("SESSION ID IS: " + session?.user.id)
    const uid = session?.user.id

    return (uid)
}

export async function GetEmail() {
    const cookieStore = cookies()

    const supabase = createServerActionClient({ cookies: () => cookieStore })

    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    console.log("SESSION EMAIL IS: " + session?.user.email)
    const email = session?.user.email

    return (email)
}

