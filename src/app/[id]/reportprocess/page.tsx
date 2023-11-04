// @ts-nocheck 
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'

export default function reportProcess() {
    return (
      <>
      <Header/>
        <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-indigo-600">Report Pending</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Pending</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Your Report is still being verified. Please wait for updates.
          </p>
          <div className="mt-10">
              <a href="/" className="text-sm font-semibold leading-7 text-indigo-600">
                <span aria-hidden="true">&larr;</span> Back to home
              </a>
            </div>
        </div>
      </div>
      <Footer/>
      </>
    )
  }
  