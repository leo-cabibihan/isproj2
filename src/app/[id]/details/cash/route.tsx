
import supabase from "@/app/utils/supabase"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { redirect } from 'next/navigation'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.json()
    const cookieStore = cookies()
    const supabaseAuth = createRouteHandlerClient({ cookies: () => cookieStore })

    const orgID = formData.charity_id

    const cash = {
        amount: parseInt(formData.amount),
        charity_id: formData.charity_id,
        donor_id: formData.donor_id,
        is_external: formData.is_external,
        event_id: parseInt(formData.event_id)
    }

    const { data, error } = await supabase.from('cash').insert(cash).select();

    console.log("POST REQUEST DETAILS ARE: DATA - ", data + ". ERROR - ", error)

    const recordID = data![0].id
    const raw_response = data![0]

    console.log("RAW RESPONSE: ", raw_response)

    // const invoice = async () => {

    //     const response = await fetch("/paypal/invoice", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         // use the "body" param to optionally pass additional order information
    //         // like product ids and quantities
    //         body: JSON.stringify({
    //             data: raw_response 
    //         })
    //     });
    // }

    // return invoice

}