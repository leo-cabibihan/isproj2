import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import supabase from '@/app/utils/supabase'
import { redirect } from 'next/navigation'
import Form from './form'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'

export const metadata: Metadata = {
  title: 'Register',
}

export default async function Register() {
  // const cookieStore = cookies()

  // const supabase = createServerActionClient({ cookies: () => cookieStore })

  // const handleSubmit = async (formData: FormData) => {
  //   'use server'
  //   const name = formData.get('name') as string
  //   const userType = formData.get('referral_source') as string
  //   const newUser = {
  //     email: formData.get('email') as string,
  //     password: formData.get('password') as string,
  //     options: {
  //       emailRedirectTo: `http://localhost:3000/callback`,
  //     },
  //   }

  //   const {
  //     data: { user },
  //     error,
  //   } = await supabase.auth.signUp(newUser)
  //   console.log(user)
  //   if (userType === 'Charity Organization') {
  //     const charityMember = {
  //       user_uuid: user?.id,
  //       member_name: name,
  //     }
  //     const { data: ass, error } = await supabase
  //       .from('charity_member')
  //       .insert(charityMember)
  //     console.log(ass, error)
  //   }
  //   if (userType === 'Donor') {
  //     const donor = {
  //       id: user?.id,
  //       name,
  //     }

  //     const { data: ass, error } = await supabase.from('donor').insert(donor)
  //     console.log(ass, error)
  //   }
  // }
  return (
    <>
      <SlimLayout>
        <div className="flex">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
        </div>
        <h2 className="mt-20 text-lg font-semibold text-gray-900">
          Get started for free
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Already registered?
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign in
          </Link>{' '}
          to your account.
        </p>
        <form
          action={'/register-post'}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
          method="post"
        >
          <TextField
            className="col-span-full"
            label="Name"
            name="name"
            type="name"
            autoComplete="name"
            required
          />
          <TextField
            className="col-span-full"
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            className="col-span-full"
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={10}
            required
          />
          <SelectField
            className="col-span-full"
            label="I am a"
            name="referral_source"
          >
            <option>Charity Organization</option>
            <option>Donor</option>
          </SelectField>
          <div className="col-span-full">
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign up <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </SlimLayout>
      <Footer></Footer>
    </>
  )
}
