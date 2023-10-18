import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import MessageUsEmail from '@/components/email-template';
import { Resend } from 'resend';
import emailjs from '@emailjs/browser';



export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const link = 'https://youtu.be/KG_fqkyJ-wo?si=-mGQJMg4xWzNdUwI'
  const service_id = 'service_29bsf8o'
  const template_id = 'template_aleqtnp'
  const user_id = '5D4a6TNuyDrbCMppe'

  var templateParams = {
    from_name: 'The GiveMore Team',
    my_html: MessageUsEmail(),
    recepient: email,
    reply_to: email
  };

  emailjs.init(user_id)

  emailjs.send(service_id, template_id, templateParams, user_id)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function (error) {
      console.log('FAILED...', error);
    });

  // if (response.ok) {
  //   console.log("EMAIL SENT YEY")
  // } else {
  //   console.log("FUCK")
  // }

  return NextResponse.redirect('http://localhost:3000/email-pending', {
    status: 301,
  })


}
