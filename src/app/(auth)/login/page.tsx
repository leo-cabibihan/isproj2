import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import supabase from '@/app/utils/supabase'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default async function Login() {
  const handleSubmit = async (formData: FormData) => {
    'use server'
    const current_user = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    
    const { data: {user} } = await supabase.auth.signInWithPassword(current_user)
    console.log(user)
    const user_id = user?.id
    console.log("UUID IS: " + user_id)

    // //Checks if current user is a charity member or donor (It works)
    const { data: donor, error: error_1 } = await supabase.from('donor').select('*').eq('id', user_id)
    const { data: charity_member, error: error_2} = await supabase.from('charity_member').select('*').eq('user_uuid', user_id)
    const { data: admin, error: error_3 } = await supabase.from('system_owner').select('*').eq('id', user_id)

    console.log(donor)
    console.log(charity_member)
    console.log(admin)

    if (donor?.length === 1) { redirect("/settings") }
    else if (charity_member?.length === 1) { redirect("/dashboard/statistics") }
    else if (admin?.length === 1) { redirect("/admin/applications") }

    // //REDIRECT USER DEPENDING ON ROLE
    // if(donor) {
    //   return NextResponse.redirect("https://youtu.be/dQw4w9WgXcQ?si=rt-q9WXdvry1Qkpu")
    // }
    // else if(charity_member) {
    //   return NextResponse.redirect("/dashboard/posts")
    // }
  }
  return (
    <>
      <SlimLayout>
        <div className="flex">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
        </div>
        <h2 className="mt-20 text-lg font-semibold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Don’t have an account?{' '}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>{' '}
          to start donating.
        </p>
        <form action={handleSubmit} className="mt-10 grid grid-cols-1 gap-y-8">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            minLength={10}
            required
          />
          <p className="mt-2 text-sm text-gray-700">
            <Link
              href="/forgot"
              className="font-medium text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </SlimLayout>
      <Footer></Footer>
    </>
  )
}
