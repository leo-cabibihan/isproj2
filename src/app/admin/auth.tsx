// @ts-nocheck 
import supabase from "@/app/utils/supabase"
import { revalidatePath } from "next/cache"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

export async function AdminAuth() {
    // console.log("THIS IS A USER: " + await supabase.auth.getUser())
  // console.log("THIS IS A SESSION: " + await supabase.auth.getSession())

  //This gets the currently signed-in user
  const { data: { user } } = await supabase.auth.getUser();
  // console.log(user?.id)
  const uid = user?.id
  console.log("UID IS " + uid)

  //This checks for the admin role
  const { data: admin, error: error_3 } = await supabase.from('system_owner').select('*').eq('id', uid)

  console.log("ADMIN IS " + admin)

  //This redirects anyone that's not signed in and not admin
  if (!user && !admin) {
    console.log("NOT SIGNED IN")
    redirect('/login')
  }

}