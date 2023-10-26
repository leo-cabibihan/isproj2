import supabase from "@/app/utils/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const revalidate = 0;
var i

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.json()
    const cookieStore = cookies()
    const supabaseAuth = createRouteHandlerClient({ cookies: () => cookieStore })

    //GETS THE DATA INSERTED INTO TRANSACTION DETAILS FORM
    const transaction = {
        donor_name: formData.name,
        address: formData.address,
        verify: true
    }

    //INSERTS TRANSACTION DETAILS INTO TRANSACTION TABLE AND GETS THE ID OF NEW RECORD
    const { data: transactions, error } = await supabase.from('items_donation_transaction').insert(transaction).select()
    console.log("TRANSACTIONS ERROR IS: ", error)
    const transaction_id = transactions![0].id

    const items = formData.items.map((item: any) => ({...item, perishable: Boolean(item.perishable), donation_id: transaction_id}))

    //INSERTS DATA OF ITEMS ARRAY INTO RESPECTIVE TABLE
    const { data: item_data, error: item_error } = await supabase.from('inventory_item').insert(items).select()
    console.log("INSERT ERROR IS: ", item_error)

    return Response.json({ status: 200 })

}

export async function PUT(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.json()
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

    const items = transaction.inventory_items.map((item: any) => ({...item, perishable: Boolean(item.perishable), donation_id: transaction_id}))

    //INSERTS DATA OF ITEMS ARRAY INTO RESPECTIVE TABLE
    const { data: item_data, error: item_error } = await supabase.from('inventory_item').upsert(items).select()
    console.log("INSERT ERROR IS: ", item_error)

    Promise.all(formData.toDelete.map((id: number) => supabase.from('').delete().eq("id", id))).then(res => console.log("bruh idk wtf wtf", res))
    
    return Response.json({ status: 200 })

}