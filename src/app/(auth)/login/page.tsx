"use client"

import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { ClerkProvider } from '@clerk/nextjs/app-beta'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function Login() {

  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  // const router = useRouter();

  //start the login process
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        // router.push("/")
      }
      else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }

    } catch (err: any) {
      console.error("error", err.errors[0].longMessage)
    }
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
        <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            onChange={(e) => setPassword(e.target.value)}
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
            <Button onClick={handleSubmit} type="submit" variant="solid" color="blue" className="w-full">
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
