const navigation = [
    { name: 'Profile', href: '#', current: true },
    { name: 'Settings', href: '#', current: false },
    { name: 'Messages', href: '#', current: false },
    { name: 'Download', href: '#', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

import supabase from "@/app/utils/supabase";
import { GetUID } from "@/app/utils/user_id";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";

export default async function Settings() {
    const uid = await GetUID()
    const { data: charity_member, error: error_2 } = await supabase.from('charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity?.id)

    return (
        <>
            <div className="py-9">
                <div className="space-y-12">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Settings</h2>
                        </div>

                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                            <div className="sm:col-span-4">
                                <form action={'/charity-invite-post'} method='post'>
                                    <TextField
                                        label='Invite Member'
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        required
                                    />

                                    <TextField
                                        label=""
                                        type="hidden"
                                        name="id"
                                        defaultValue={charity_id}
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
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                <form
                    action={'/logout-post'}
                    method="post"
                    className="mt-10 grid grid-cols-1 gap-y-8"
                >
                    <Button type='submit' variant="solid" color="red" >Log Out</Button>
                </form>
            </div>


            <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                    <li key={item.name}>
                        <a
                            href={item.href}
                            className={classNames(
                                item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                'group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold'
                            )}
                        >
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    )
}