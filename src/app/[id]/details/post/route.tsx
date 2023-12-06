//@ts-nocheck

import supabase from '@/app/utils/supabase'
import { NoURLMail, ReceiptEmail } from '@/components/email-template'
import Plunk from '@plunk/node'
import { render } from '@react-email/render'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export const revalidate = 0
var i

const plunk = new Plunk('sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db')

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.json()
  const cookieStore = cookies()
  const supabaseAuth = createRouteHandlerClient({ cookies: () => cookieStore })

  const orgID = formData.orgID
  const userID = formData.donorID

  const {
    data: { session },
    error: session_error,
  } = await supabaseAuth.auth.getSession()
  const uid = session?.user.id
  const email = session?.user.email

  //GETS THE DATA INSERTED INTO ADDRESS FORM
  const address = {
    house_number: formData.house_no,
    street_name: formData.street,
    village_name: formData.village,
    barangay: formData.brgy,
    zipcode: formData.zip_code,
    city: formData.city,
    province: formData.province,
  }

  //STORES THE DONATED ITEMS INTO ARRAY FOR CLEANLINESS
  var item = formData.items

  //INSERTS ADDRESS DETAILS INTO ADDRESS TABLE AND GETS THE ID OF NEW RECORD
  const { data: new_address, error: address_error } = await supabase
    .from('address')
    .insert(address)
    .select()
  const address_id = new_address![0].id

  const transaction = {
    charity_id: orgID,
    verify: false,
    donor_id: uid,

    donor_address_id: address_id,
  }

  const { data: new_item, error } = await supabase
    .from('items_donation_transaction')
    .insert(transaction)
    .select()
  console.log('new item', new_item, error)
  const item_id = new_item![0].id

  //ITERATES THROUGH THE ITEM ARRAY (Line 32), CONVERTS THE VALUE OF ISPERISHABLE SELECTFIELD INTO BOOL (Line 33)
  for (i = 0; i < item.length; i++) {
    const perishable = Boolean(item[i].perishable)
    if (perishable === false) delete item[i].expiry
    item[i].perishable = perishable

    //ASSIGNS NEW ADDRESS ID TO ALL THE ITEMS SPECIFIED INTO FORM

    Object.assign(item[i], { donation_id: item_id })
  }

  //INSERTS DATA OF ITEMS ARRAY INTO RESPECTIVE TABLE
  console.log('hello hello add', item)
  const { data: item_data, error: item_error } = await supabase
    .from('inventory_item')
    .insert(item)
    .select()
  console.log('item data', item_data, item_error)

  const body = render(
    <ReceiptEmail
      heading={'YOUR DONATION RECEIPT'}
      content={new_item}
      content_2={item_data}
    />,
  )

  const success = await plunk.emails.send({
    to: email,
    subject: 'THANK YOU!',
    body,
  })

  if (success) {
    console.log("YEAAAAA THE EMAIL WAS SENT B O I")
  }
  else {
    console.log("Supabase is WEEEEIRD.")
  }

  if ([error, item_error, address_error].some((err) => err !== null)) {
    console.log('errors', error, item_error, address_error)
    return NextResponse.json({ error: error?.message }, { status: 400 })
  } else {
    console.log()
    return NextResponse.json({ success: true }, { status: 200 })
  }
}
