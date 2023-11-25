// @ts-nocheck
import { CharityLog } from "@/app/admin/audit-log/function";
import supabase from "@/app/utils/supabase";
import { NoURLMail, ReceiptEmail } from "@/components/email-template";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const revalidate = 0;
var i

const plunk = new Plunk("sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db");

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.json()
    const cookieStore = cookies()
    const supabaseAuth = createRouteHandlerClient({ cookies: () => cookieStore })

    const new_user = formData.new_user
    const new_address = formData.new_address

    let donor_id
    let address_id

    const address = {
        house_number: formData.house_number,
        street_name: formData.street_name,
        village_name: formData.village_name,
        barangay: formData.barangay,
        city: formData.city,
        province: formData.province,
        zipcode: formData.zipcode
    }

    console.log("NEW USER??? " + new_user)

    console.log("FORMFIELDS WORK YEY ", formData.email, formData.password)

    if (new_user) {

        const { data: { user }, error: signup_error } = await supabaseAuth.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                emailRedirectTo: `${requestUrl.origin}/callback`,
            },
        });

        const donor = {
            id: user?.id,
            name: formData.name,
            subscribed_notification: false
        }

        const { data: donor_data, error } = await supabase.from('donor').insert(donor).select()

        donor_id = donor_data![0].id;

        console.log("NEW DONOR ERROR IS ", signup_error, " & ", error)
        console.log("FORMFIELDS WORK YEY ", formData.email, formData.password)

    } else {
        donor_id = formData.donor_id
        console.log("FORM DONOR ID IS: " + formData.donor_id)
    }

    if (new_address) {
        const { data: new_address, error: address_error } = await supabase.from('address').insert(address).select();
        address_id = new_address![0].id
    } else {
        address_id = formData.address_id
    }
    //hate vercel

    console.log("DONOR ID IS: ", donor_id)

    const { data, error: email_error } = await supabase.from('users').select('email').eq('id', donor_id)

    console.log("EMAIL RETREIVAL ERROR: ", email_error, data)

    console.log("EMAIL CHECKPOINT ", data![0].email, email_error)

    const email = data![0].email

    console.log("ADDRESS_ID " + address_id)


    //GETS THE DATA INSERTED INTO TRANSACTION DETAILS FORM
    const transaction = {
        donor_id: donor_id,
        donor_address_id: address_id,
        verify: true,
        charity_id: formData.charity_id
    }

    //INSERTS TRANSACTION DETAILS INTO TRANSACTION TABLE AND GETS THE ID OF NEW RECORD
    const { data: transactions, error } = await supabase.from('items_donation_transaction').insert(transaction).select()
    console.log("TRANSACTIONS ERROR IS: ", error)
    const transaction_id = transactions![0].id

    const items = formData.items.map((item: any) => ({ ...item, perishable: Boolean(item.perishable), donation_id: transaction_id }))

    //INSERTS DATA OF ITEMS ARRAY INTO RESPECTIVE TABLE
    const { data: item_data, error: item_error } = await supabase.from('inventory_item').insert(items).select()
    // { item_data?.map(item => CharityLog("ADDED ITEMS " + item.name)) }
    console.log("INSERT ERROR IS: ", item_error)

    if (error || item_error) {
        const body = render(<NoURLMail heading={"ADMIN DEBUG MESSAGE"}
            content={"YOU HAVE AN ERROR: ", error, item_error}/>);

        const success = await plunk.emails.send({
            to: 'givemore.isproj2@gmail.com',
            subject: "DEBUG EMAIL!",
            body,
        })
    }

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

    const items = transaction.inventory_item.map((item: any) => ({ ...item, perishable: Boolean(item.perishable), donation_id: transaction_id }))

    //INSERTS DATA OF ITEMS ARRAY INTO RESPECTIVE TABLE
    const { data: item_data, error: item_error } = await supabase.from('inventory_item').upsert(items).select()
    // { item_data?.map(item => CharityLog("UPDATED ITEMS " + item.name)) }
    console.log("INSERT ERROR IS: ", item_error)
    console.log("ERROR", formData.toDelete)
    Promise.allSettled(formData.toDelete.map((id: number) => supabase.from('inventory_item').delete().eq("id", id))).then(res => console.log("ERROR", res))
    // for (const id of formData.toDelete) {
    //     const {error} = await supabase.from
    //     console.log()
    // }
    return Response.json({ status: 200 })

}