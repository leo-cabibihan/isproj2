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
  title: 'Reset Password',
}

export default function ForgotPassword({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <div className="flex">
                <Link href="/" aria-label="Home">
                  <Logo className="h-10 w-auto" />
                </Link>
              </div>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Reset Password
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <form action={"forgot-password-post"} method="post" className="space-y-6">
                  {searchParams.err && <Alert message={searchParams.err as string} />}
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    minLength={10}
                    required
                  />

                  <div className="col-span-full">
                    <Button type="submit" variant="solid" color="blue" className="w-full">
                      <span>
                        Reset Password <span aria-hidden="true">&rarr;</span>
                      </span>
                    </Button>
                  </div>
                </form>
              </div>


            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://e0.pxfuel.com/wallpapers/831/291/desktop-wallpaper-charity-background-charity.jpg"
            alt=""
          />
        </div>
      </div>

    </>
  )
} 
