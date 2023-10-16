import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import MessageUsEmail from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const email = String(formData.get('email'))
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const link = 'https://youtu.be/KG_fqkyJ-wo?si=-mGQJMg4xWzNdUwI'


    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Hello World',
            react: MessageUsEmail()
          });
    
        return NextResponse.json(data);
      } catch (error) {
        return NextResponse.json({ error });
      }

    return NextResponse.redirect('http://localhost:3000/email-pending', {
        status: 301,
    })


}
