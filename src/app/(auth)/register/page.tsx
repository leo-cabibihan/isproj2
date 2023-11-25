// @ts-nocheck 
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import Alert from '@/components/Alert'

export const metadata: Metadata = {
  title: 'Register',
}

export default async function Register({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) {
   
  return (
    <>
      <SlimLayout backgroundImage={"https://c1.wallpaperflare.com/preview/770/967/632/door-wood-door-office-office-interior.jpg"}>
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
          action={'/register-post'}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"
          method="post"
        >
          {/* CHECKS IF NULL */}
          {searchParams.err && <Alert message={searchParams.err as string}/>}
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
      
    </>
  )
}
