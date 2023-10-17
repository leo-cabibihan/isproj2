import { Button } from "@/components/Button";
import { TextField, SelectField } from "@/components/Fields";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { SlimLayout } from "@/components/SlimLayout";

import Link from "next/link";

export default function AdminRegister () {
    return (
        <>
      <SlimLayout>
        <div className="flex">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
        </div>
        <h2 className="mt-20 text-lg font-semibold text-gray-900">
          Create an Admin Account
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
          action={'/owner-invite-post'}
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
            label="Verify your Email"
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