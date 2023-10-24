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

    //STORES THE DONATED ITEMS INTO ARRAY FOR CLEANLINESS
    var item = formData.items

    //INSERTS TRANSACTION DETAILS INTO TRANSACTION TABLE AND GETS THE ID OF NEW RECORD
    const { data: transactions, error } = await supabase.from('items_donation_transaction').insert(transaction).select()
    console.log("TRANSACTIONS ERROR IS: ", error)
    const transaction_id = transactions![0].id

    //ITERATES THROUGH THE ITEM ARRAY (Line 32), CONVERTS THE VALUE OF ISPERISHABLE SELECTFIELD INTO BOOL (Line 33) 
    for (i = 0; i < item.length; i++) {
        item[i].perishable = Boolean(item[i].perishable)
        //ASSIGNS NEW TRANSACTION ID TO ALL THE ITEMS SPECIFIED INTO FORM
        Object.assign(item[i], { donation_id: transaction_id })
    }

    //INSERTS DATA OF ITEMS ARRAY INTO RESPECTIVE TABLE
    const { data: item_data, error: item_error } = await supabase.from('inventory_item').insert(item).select()
    console.log("INSERT ERROR IS: ", item_error)

    return Response.json({ status: 200 })

}