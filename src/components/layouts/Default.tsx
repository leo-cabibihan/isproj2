// @ts-nocheck 
import { Footer } from "../Footer";
import { Header } from "../Header";

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'


export async function DefaultLayout({ children }: { children: React.ReactNode }){
    const cookieStore = cookies()

    const supabase = createServerActionClient({ cookies: () => cookieStore })
  
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    console.log("default layout: " + session?.user.id)
    return(
        <>
            <Header  session={session}/>
            <main>{children}</main>
            <Footer />
        </>
    )
}