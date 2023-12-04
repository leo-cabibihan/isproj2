// @ts-nocheck
'use client'

import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'
import { getURL } from '@/app/utils/url'
import supabase from '@/app/utils/supabase'

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation({ session }) {
  const isLoggedIn = Boolean(session?.user?.id)
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="#causes">Causes</MobileNavLink>

            <hr className="m-2 border-slate-300/40" />
            {isLoggedIn ? (
              <MobileNavLink href="/login-post">Open Dashboard</MobileNavLink>
            ) : (
              <MobileNavLink href="/login">Sign in</MobileNavLink>
            )}
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export function Header({ session }) {
  console.log('i am header', session)

  const isLoggedIn = Boolean(session?.user?.id)
  console.log('I am logged in', isLoggedIn)
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex items-center justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/#causes">Causes</NavLink>
            </div>
          </div>

          <form className="ml-4 flex-grow md:ml-8" action="/searchtest" method="GET">
            <label
              htmlFor="default-search"
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                name="keyword"
                className="bg-gray-10 dark:text-gray block w-full rounded-lg border border-gray-100 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-200 dark:bg-gray-300 dark:placeholder-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Search..."
              />
              <Button
                type="submit"
                className="hover: focus absolute bottom-2.5 end-2.5 rounded-lg px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-4"
                color="green"
              >
                Search
              </Button>
            </div>
          </form>

          <div className="ml-4 flex items-center gap-x-5 md:ml-4 md:gap-x-8">
            {isLoggedIn ? (
              <Button
                className="hidden md:block"
                href="/login-post"
                color="green"
              >
                Open Dashboard
              </Button>
            ) : (
              <>
                <div className="hidden md:block">
                  <NavLink href="/login">Sign in</NavLink>
                </div>
                <Button href="/register" color="green">
                  <span>Register</span>
                </Button>
              </>
            )}

            <div className="-mr-1 md:hidden">
              <MobileNavigation session={session} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
