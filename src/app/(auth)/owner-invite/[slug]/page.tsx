// @ts-nocheck 
"use client"

import { Button } from "@/components/Button";
import { TextField, SelectField } from "@/components/Fields";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { SlimLayout } from "@/components/SlimLayout";
import { useParams } from "next/navigation";

import Link from "next/link";
import { decode, unescape } from "querystring";

export default function AdminRegister({ params }: any) {

  const email = decodeURIComponent(params.slug)

  return (
    <>
      <SlimLayout>
        <div className="flex">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
        </div>
        <h2 className="mt-20 text-lg font-semibold text-gray-900">
          Finish setting up your Account
        </h2>
        <form
          action={'/owner-invite-post'}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
          method="post"
        >
          <TextField
            label=""
            name="email"
            type="hidden"
            defaultValue={email}
            required
          />
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
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={10}
            required
          />

          <div className="col-span-full">
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Submit <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </SlimLayout>
      <Footer></Footer>
    </>
  )
} 