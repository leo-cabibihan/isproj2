// @ts-nocheck 
import { AdminLog, CharityLog } from "@/app/admin/audit-log/function"
import supabase from "@/app/utils/supabase"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
    const cookieStore = cookies()

    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    const uid = session?.user.id

    const { data: charity_member, error: error_2 } = await supabase
        .from('charity_member')
        .select('*')
        .eq('user_uuid', uid)
    const { data: admin, error: error_3 } = await supabase
        .from('system_owner')
        .select('*')
        .eq('id', uid)

    if (charity_member?.length === 1) {
        CharityLog(charity_member![0].member_name + " has logged out.", null)
    }
    else if (admin?.length === 1) [
        AdminLog(admin![0].name + " has logged out.")
    ]
    
    const { error } = await supabase.auth.signOut()
    // console.log("this is logout eroor", error)
    return NextResponse.redirect("http://localhost:3000/", {
        status: 301,
    })
}