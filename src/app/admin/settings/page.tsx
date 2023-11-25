// @ts-nocheck 
const navigation = [
  { name: 'Profile', href: '#', current: true },
  { name: 'Settings', href: '#', current: false },
  { name: 'Messages', href: '#', current: false },
  { name: 'Download', href: '#', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
import supabase from '@/app/utils/supabase';
import Alert from '@/components/Alert';
import { Button } from '@/components/Button';
import { TextField } from '@/components/Fields'
import { redirect } from 'next/navigation';
 
export default async function Settings({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

  return (
    <>
      <div className="py-9">
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Settings</h2>
            </div>
            <br/>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-4">
                <form action={'/invite-post'} method='post'>
                  {searchParams.err && <Alert message={searchParams.err as string} />}
                  <TextField
                    label='Invite Administrator'
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                  />
                  <div className="mt-6 flex items-center justify-start gap-x-6">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      + Add Administrator
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form
        action={'/logout-post'}
        method="post"
        className="mt-10 grid grid-cols-1 gap-y-8 justify-center"
      >
          <div className="flex justify-center">
            <Button type='submit' variant="solid" color="red" style={{ width: '30%' }} className="mx-auto">
              Log Out
            </Button>
          </div>
      </form>
    </>
  )
}