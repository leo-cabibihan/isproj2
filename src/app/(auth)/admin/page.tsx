import Link from 'next/link'

import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function Admin() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          
          <div className="flex">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
          </div>
          
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" method="POST">      
              <TextField
                label="Email Address"
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
                required
              />

              <div className="flex items-center justify-between">
                <div className="text-sm leading-6">
                  <a href="/forgot" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="col-span-full">
          <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              Sign up <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
            </form>

            
          
          </div>
        </div>
      </div>
  )
}
