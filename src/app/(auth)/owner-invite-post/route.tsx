import { GetEmail, GetUID } from '@/app/utils/user_id'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const password = String(formData.get('password'))
    const name = formData.get('name') as string
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // const { data: { user }, error } = await supabase.auth.signUp({
    //     email,
    //     password,
    //     options: {
    //         emailRedirectTo: `${requestUrl.origin}/callback`,
    //     },
    // })

    // console.log(user, error)


    const { data, error } = await supabase.auth.updateUser({password: password})

    const system_owner = {
        id: data.user?.id,
        name: name,
    }
    const { data: admin, error: adminError } = await supabase
        .from('system_owner')
        .insert(system_owner)
    console.log(admin, adminError)

    return NextResponse.redirect('http://localhost:3000/admin/settings', {
        status: 301,
    })




}
