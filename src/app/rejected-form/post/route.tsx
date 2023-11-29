// @ts-nocheck 
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { AlertEmail, Email } from '@/components/email-template';
import { render } from '@react-email/render';
import Plunk from '@plunk/node';
import { v4 as uuidv4 } from "uuid";
import Cryptr from 'cryptr';
import { getURL } from '@/app/utils/url'
import supabase from '@/app/utils/supabase'

const plunk = new Plunk("sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db");

export async function PUT(request: Request) {

    //THIS PART WORKS (It generates emails, passwords, does the cookies stuff, etc.)
    const requestUrl = new URL(request.url)
    const formData = await request.formData()

    const address_id = formData.get("address_id")
    const charity_id = formData.get("charity_id")

    console.log("PSA: SUBMIT OPERATION HAS STARTED!")
    const address = {
        house_number: formData.get("house_number"),
        street_name: formData.get("street_name"),
        village_name: formData.get("village_name"),
        barangay: formData.get("barangay"),
        zipcode: formData.get("zipcode"),
        city: formData.get("city"),
        province: formData.get("province")
    }

    console.log("CHECKPOINT 4 - PASSED!")

    const { data: address_data, error: address_error } = await supabase.from('address').update(address).eq('id', address_id).select();
    console.log("ADDRESS OBJECT: ", address_data)
    console.log("ERROR UPDATING THE ADDRESS. DETAILS ARE BELOW: ", address_error)

    console.log("CHECKPOINT 5 - PASSED!")

    const charity_details = {
        name: formData.get('org_name'),
        about: formData.get('description'),
        charity_phone: formData.get('phone'),
        charity_verified: false,
        is_rejected: false,
        address_id: address_id,
        email_address: formData.get('email')
    }

    console.log("CHECKPOINT 6 - PASSED!")

    const { data: charity_data, error: charity_error } = await supabase.from('charity').update(charity_details).eq('id', charity_id).select();
    console.log("CHARITY DATA: ", charity_data)
    console.log("ERROR UPDATING THE CHARITY. DETAILS ARE BELOW: ", charity_error)

    console.log("CHECKPOINT 7 - PASSED!")

    revalidatePath('/');
    console.log("===================================================================")
    console.log("OPERATION ENDED!")
    console.log('CONGRATULATIONS! THE OPERATION WAS A SUCCESS!')
    redirect('/pending')

    return NextResponse.redirect(`${requestUrl.origin}/email-pending`, {
        status: 301,
    })

}
