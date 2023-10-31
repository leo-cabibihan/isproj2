import supabase from "@/app/utils/supabase"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const cash = String(formData.get('cash'))
    const cookieStore = cookies()
    const supabaseAuth = createRouteHandlerClient({ cookies: () => cookieStore })
                                            
    const sdk = require('api')('@paymaya/v5.18#ffo1kql3uxdce8');

    sdk.createDynamicQR({
        totalAmount: { currency: 'PHP', value: cash },
        redirectUrl: {
            success: 'https://youtu.be/wpV-gGA4PSk?si=XSTMliCOGdX8ZGJ9',
            failure: 'https://youtu.be/wpV-gGA4PSk?si=XSTMliCOGdX8ZGJ9',
            cancel: 'https://youtu.be/wpV-gGA4PSk?si=XSTMliCOGdX8ZGJ9'
        },  
        requestReferenceNumber: '5b4a6d60-2165-4bc1-bb0e-e610d1a3f82d'
    })
        .then(({ data } : any) => console.log(data))
        .catch((err: any) => console.error(err));

    return Response.redirect(`${requestUrl.origin}/thankyou`)

}