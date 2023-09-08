import Link from 'next/link'

import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import { Footer } from '@/components/Footer'

export default function OnboardingDetails() {
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          
          <div className="flex">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
          </div>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            About Charity
          </h2>   

          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" method="POST">  

              <TextField
                label="Organization Email Address"
                name="email"
                type="email"
                autoComplete="email"
                required
              />

                     
              <TextField
                label="Charity Organization's Name"
                name="name"
                type="name"
                autoComplete="name"
                required
              />
                     
              <TextField
                label="Description"
                name="description"
                type="description"
                autoComplete="description"
                required
              />

              <TextField
                label="Address Line 1"
                name="address1"
                type="address"
                autoComplete="address"
                required
              />

              <TextField
                label="Address Line 2"
                name="address2"
                type="address"
                autoComplete="address"
                required
              />

              <TextField
                label="Contact Number"
                name="number"
                type="number"
                autoComplete="number"
                required
              />


        <div className="col-span-full">
            <Button type="submit" variant="solid" color="white" className="w-full">
                <span>
                Back<span aria-hidden="true">&rarr;</span>
                </span>
            </Button>
        </div>

        
              <div className="col-span-full">
          <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              Submit <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
            </form>
          </div>
        </div>
      </div>
      </>
    )
  }