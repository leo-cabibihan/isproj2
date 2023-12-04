//@ts-nocheck
import { Container } from '@/components/Container'
import { DefaultLayout } from '@/components/layouts/Default'
import { BannerImg } from '@/components/DisplayImg'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { SelectField, TextField } from '@/components/Fields'
import { Button } from '@/components/Button'

export const revalidate = 0

export default async function SearchTest({ searchParams }: any) {

    const keyword = searchParams.keyword
    console.log(`SEARCHWORD/S: ${keyword}`)

    // Function to format the timestamp as 'mm/dd/yyy'
    const formatDate = (timestamp) => {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month is zero-based
        const day = date.getDate().toString().padStart(2, '0')
        return `${month}/${day}/${year}`
    }

    // Function to format the time as 'h:mm a' (e.g., '2:30 PM')
    const formatTime = (timestamp) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
        })
    }

    const cookieStore = cookies()

    const supabase = createServerActionClient({ cookies: () => cookieStore })

    const {
        data: { session },
        error: sessionError,
    } = await supabase.auth.getSession()

    const { data: charity } = await supabase
        .from('charity')
        .select('*')
        .textSearch('charity_search', keyword)
    const { data, error } = await supabase.from('drop_off_location').select('*')

    const { data: campaign_post } = await supabase
        .from('campaign_post')
        .select('*, charity ( id )')
        .textSearch('post_search', keyword)

    return (
        <>
            <DefaultLayout>
                <main>
                    {charity!.length >= 1 ?
                        (
                            <div className="bg-white py-24 sm:py-32" id="causes">
                                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                    <div className="mx-auto max-w-2xl text-center">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Results in Charities</h2>
                                        <p className="mt-2 text-lg leading-8 text-gray-600">
                                            Search results for &quot;{keyword}&quot;:
                                        </p>
                                    </div>
                                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                        {charity?.map((org) => (
                                            <article
                                                key={org.id}
                                                className="justify-between-center flex flex-col items-start"
                                            >
                                                <BannerImg
                                                    folder1={'charity'}
                                                    charityID={org.id}
                                                    recordID={org.id}
                                                />
                                                <div className="max-w-xl">
                                                    <div className="group relative">
                                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                                            <a href={'/' + org.id + '/details'}>
                                                                <span className="absolute inset-0" />
                                                                {org.name}
                                                            </a>
                                                        </h3>
                                                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                                                            {org.about}
                                                        </p>
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) :
                        (
                            <br />
                        )}

                    {
                        campaign_post!.length >= 1 ?
                            (
                                <div className="bg-white py-24 sm:py-32">
                                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                        <div className="mx-auto max-w-2xl text-center">
                                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                                Results in News
                                            </h2>
                                            <p className="mt-2 text-lg leading-8 text-gray-600">
                                                Search results for &quot;{keyword}&quot;:
                                            </p>
                                        </div>
                                        <div className="lg:mx-0]1 mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:max-w-none lg:grid-cols-3">
                                            {campaign_post?.map((post) => (
                                                <article
                                                    key={post.id}
                                                    className="justify-between-center flex flex-col items-start"
                                                >
                                                    <BannerImg
                                                        folder1={'campaign_post'}
                                                        charityID={post.charity?.id}
                                                        recordID={post.id}
                                                    />
                                                    <div className="group relative">
                                                        <div className="mt-3 flex items-center gap-x-4 text-xs text-gray-500">
                                                            {formatDate(post.date_posted) +
                                                                ' ' +
                                                                formatTime(post.date_posted)}
                                                        </div>
                                                        <h3
                                                            className={`mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600`}
                                                        >
                                                            <a href={'/' + post.id + '/news'}>
                                                                <span className="absolute inset-0" />
                                                                {post.title}
                                                            </a>
                                                        </h3>
                                                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                                                            {post.text}
                                                        </p>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) :
                            (
                                <br/>
                            )
                    }
                </main>
            </DefaultLayout>
        </>
    )
}
