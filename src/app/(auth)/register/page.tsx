import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import React from 'react'
import supabase from "@/app/utils/supabase"

export const metadata: Metadata = {
  title: 'Register',
}

export default function Register() {

  const handleSignup = async (formData: FormData) => {
    'use server'
    const { data, error } = await supabase.auth.signUp({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });
  };

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
          Already registered?{' '}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign in
          </Link>{' '}
          to your account.
        </p>
        <form
          action={handleSignup}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
        >
          <TextField
            label="First name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
          />
          <TextField
            label="Last name"
            name="last_name"
            type="text"
            autoComplete="family-name"
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
            <Button type="submit" variant="solid" color="blue" className="w-full">
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
