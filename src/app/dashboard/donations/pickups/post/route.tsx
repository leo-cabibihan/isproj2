import { CharityLog } from "@/app/admin/audit-log/function";
import supabase from "@/app/utils/supabase";
import { ReceiptEmail } from "@/components/email-template";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const revalidate = 0;
var i

const plunk = new Plunk("sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db");

export async function PUT(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.json()
    console.log("FoRMDATA: ", formData.transaction.inventory_item)
    const transaction = formData?.transaction
    const cookieStore = cookies()
    const supabaseAuth = createRouteHandlerClient({ cookies: () => cookieStore })

    //GETS THE DATA INSERTED INTO TRANSACTION DETAILS FORM
    const newTransaction = {
        donor_name: transaction.name,
        address: transaction.address,
        verify: true
    }

    //INSERTS TRANSACTION DETAILS INTO TRANSACTION TABLE AND GETS THE ID OF NEW RECORD
    const { data: transactions, error } = await supabase.from('items_donation_transaction').update(newTransaction).eq("id", transaction.id).select()
    console.log("TRANSACTIONS ERROR IS: ", error)
    const transaction_id = transactions![0].id
    
    console.log("CHECKPOINT - USER EMAIL IS " + transactions![0].donor_id)

    const { data, error: email_error } = await supabase.from('users').select('email').eq('id', transactions![0].donor_id)

    console.log("EMAIL CHECKPOINT ", data![0].email, email_error)

    const email = data![0].email

    const items = transaction.inventory_item.map((item: any) => ({ ...item, perishable: Boolean(item.perishable), donation_id: transaction_id }))

    //INSERTS DATA OF ITEMS ARRAY INTO RESPECTIVE TABLE
    const { data: item_data, error: item_error } = await supabase.from('inventory_item').upsert(items).select()
    { item_data?.map(item => CharityLog("UPDATED PICKUP ITEM " + item.name, item_error)) }
    console.log("INSERT ERROR IS: ", item_error)
    console.log("imma delete ur ass", formData.toDelete)
    Promise.allSettled(formData.toDelete.map((id: number) => supabase.from('inventory_item').delete().eq("id", id))).then(res => console.log("bruh idk wtf wtf", res))
    // for (const id of formData.toDelete) {
    //     const {error} = await supabase.from
    //     console.log()
    // }

    console.log("DONOR'S EMAIL IS " + email)
    console.log("CHECKPOINT")

    const body = render(<ReceiptEmail heading={"YOUR DONATION RECEIPT"}
        content={transactions} content_2={item_data} />);

    const success = await plunk.emails.send({
        to: email as string,
        subject: "THANK YOU!",
        body,
    })

    console.log("SUCCESS??? ", success)

    return Response.json({ status: 200 })

}