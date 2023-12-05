//@ts-nocheck
import supabase from "@/app/utils/supabase"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { redirect } from 'next/navigation'
import { CashReceiptEmail } from "@/components/email-template"
import { render } from "@react-email/render"
import Plunk from "@plunk/node"

const plunk = new Plunk('sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db')

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.json()
    const cookieStore = cookies()
    const supabaseAuth = createRouteHandlerClient({ cookies: () => cookieStore })

    const orgID = formData.charity_id
    const donor_id = formData.donor_id

    const cash = {
        amount: parseInt(formData.amount),
        charity_id: formData.charity_id,
        donor_id: formData.donor_id,
        is_external: formData.is_external,
        event_id: parseInt(formData.event_id),
        receipt_data: formData.receipt_data
    }

    const { data, error } = await supabase.from('cash').insert(cash).select();

    console.log("POST REQUEST DETAILS ARE: DATA - ", data + ". ERROR - ", error)

    const recordID = data![0].id
    const raw_response = data![0]

    console.log("RAW RESPONSE: ", raw_response)

    const { data: donor_details, error: email_error } = await supabase.from('decrypted_users').select('decrypted_email').eq('id', raw_response.donor_id)
    const { data: orgs } = await supabase.from('charity').select('*').eq('id', orgID)
    const { data: donor, error: error_1 } = await supabase.from('decrypted_donor').select('*').eq('id', donor_id)

    const email = donor_details![0].decrypted_email
    const org_name = orgs![0].name
    const donor_name = donor![0].decrypted_name

    const formatted_data = {
        amount: raw_response.amount,
        donor: donor_name,
        date: raw_response.date,
        charity: org_name,
        event: "filler",
    }

    const body = render(
        <CashReceiptEmail
            heading={"YOUR DONATION RECEIPT"}
            content={formatted_data}
        />
    )

    const success = await plunk.emails.send({
        to: 'gaboparinas78@gmail.com',
        subject: "THANK YOU!",
        body,
    })

    console.log("SUCCESS??? ", success)

}