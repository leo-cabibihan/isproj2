// @ts-nocheck 
import supabase from "@/app/utils/supabase"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.json()
    const cookieStore = cookies()
    const supabaseAuth = createRouteHandlerClient({ cookies: () => cookieStore })

    const orgID = formData.charity_id

    console.log("PASSED STUFF" + formData.amount)

    const cash = {
        amount: parseInt(formData.amount),
        charity_id: formData.charity_id,
        donor_id: formData.donor_id,
        is_external: formData.is_external,
        event_id: parseInt(formData.event_id)
    }

    const { data, error } = await supabase.from('cash').insert(cash).select();

    console.log('CASH ERROR', error)

    const recordID = data![0].id

    return NextResponse.redirect(`${requestUrl.origin}/${orgID}/details/cash/${orgID}/${recordID}`)

}