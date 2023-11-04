// @ts-nocheck 
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import supabase from '@/app/utils/supabase'
import { redirect, useSearchParams } from 'next/navigation'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { useRouter } from 'next/router'
import Alert from '@/components/Alert'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default async function Login({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) {

  // console.log("i am search", searchParams)
  
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
        <form
          action={'/login-post'}
          method="post"
          className="mt-10 grid grid-cols-1 gap-y-8"
        >
          {/* CHECKS IF NULL */}
          {searchParams.err && <Alert message={searchParams.err as string}/>}
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
              href="/reset"
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
      
    </>
  )
}
