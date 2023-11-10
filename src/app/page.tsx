// @ts-nocheck 
import { Container } from '@/components/Container'
import { DefaultLayout } from '@/components/layouts/Default'
import { BannerImg } from '@/components/DisplayImg'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'


export const revalidate = 0;

export default async function Home() {
// Function to format the timestamp as 'mm/dd/yyy'
const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
};

// Function to format the time as 'h:mm a' (e.g., '2:30 PM')
const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

  const cookieStore = cookies()

  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  console.log("SESSION ID IS: " + session?.user.id)

  const { data: charity } = await supabase.from('charity').select("*").eq("charity_verified", true)
  const { data, error } = await supabase.from('drop_off_location').select('*')


  const { data: campaign_post } = await supabase.from('campaign_post').select("*, charity ( id )").eq("charity.charity_verified", true)

  return (
    <>
      <DefaultLayout>
        <main>
          <Container className="pb-16 pt-20 text-center lg:pt-32">
            <h1 className="mx-auto max-w-4xl font-serif text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
              Give to{' '}
              <span className="relative whitespace-nowrap text-emerald-600">
                <span className="relative">each other</span>
              </span>{' '}
              to make the world better.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
              At GiveMore, we believe that everyone deserves the opportunity to make a difference. That&apos;s why we make it easy for charities and donors to connect. We are committed to providing a safe and transparent way for people to give, and we believe that everyone deserves the opportunity to make a difference.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
              When you give through GiveMore, you can be confident that your donation is going to a legitimate charity and that it is being used to make a positive impact. We have a team of experienced fundraising experts who work with charities to ensure that they are using our platform effectively and that their campaigns are successful. We also have a strict vetting process for all charities that list themselves on our platform, so you can be sure that you are supporting a reputable organization.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
              We believe that everyone deserves the opportunity to make a difference, and we are committed to making it easy for people to do so. When you give through GiveMore, you can be confident that your donation is going to a good cause and that it is being used to make a positive impact.
            </p>
          </Container>

          <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <svg
                className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                    width={200}
                    height={200}
                    x="50%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M100 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                  <path
                    d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                    strokeWidth={0}
                  />
                </svg>
                <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
              </svg>
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
              <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:pr-4">
                  <div className="lg:max-w-lg">
                    <p className="text-base font-semibold leading-7 text-emerald-600">What is GiveMore?</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us</h1>
                    <p className="mt-6 text-xl leading-8 text-gray-700">
                    GiveMore connects you with charities and causes you're passionate about. With a few clicks, you can explore different charities, learn about their missions, and make a direct impact by donating. It's as easy as choosing your donation amount and method. Your giving journey doesn't end with a donation; it's an ongoing connection with the causes you support.
                    </p>
                  </div>
                </div>
              </div>
              <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                <img
                  className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                  src="https://media.istockphoto.com/id/1145183123/photo/young-happy-volunteers-outdoor-meeting-at-park.jpg?s=612x612&w=0&k=20&c=2jyEEioGzgvaC59D6E3NSqW0hIDVE9BuTfvYu54EJDA="
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="lg:pr-4">
                  <div className="relative overflow-hidden rounded-3xl px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                    <img
                      className="absolute inset-0 h-full w-full object-cover"
                      src="https://www.thespruce.com/thmb/oSY6unPuDXBFJG3PGjl1j-mm7Fc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/laundry-tips-before-you-donate-clothes-4046404-01-ca8bf91d0b9f418689cec82662381c09.jpg"
                      alt=""
                    />                 
                  </div>
                </div>
                <div>
                  <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
                    <p className="text-base font-semibold leading-7 text-[#01794A]">Drop-off Locations</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      Here, you can drop off your donations.
                    </h1>
                    <div className="max-w-xl">
                      <br/>
                      <div className="space-y-5">
                        {data?.map(address => (
                          <div className="max-w-xl" key={address.id}>
                            <dt className="inline font-semibold text-gray-900">
                              
                              Address:
                            </dt>{' '}
                            <dd className="inline">{address.address}</dd>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white py-24 sm:py-32" id="causes">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Latest Causes</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  Find an Organization and donate to them.
                </p>
              </div>
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {charity?.map((org) => (
                  <article key={org.id} className="flex flex-col items-start justify-between-center">
                    <BannerImg folder1={"charity"} charityID={org.id} recordID={org.id} />
                    <div className="max-w-xl">
                      <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <a href={'/' + org.id + '/details'}>
                            <span className="absolute inset-0" />
                            {org.name}
                          </a>
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{org.about}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>


          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Latest News</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  Read posts from different Organizations.
                </p>
              </div>
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0]1 lg:max-w-none lg:grid-cols-3">
                {campaign_post?.map((post) => (
                  <article key={post.id} className="flex flex-col items-start justify-between-center">
                      <BannerImg folder1={"campaign_post"} charityID={post.charity?.id} recordID={post.id} />
                     <div className="group relative" >
                      <div className="flex items-center gap-x-4 text-xs text-gray-500 mt-3">
                        {formatDate(post.date_posted) + ' ' + formatTime(post.date_posted)}
                      </div>
                      <h3 className={`mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600`}>
                        <a href={'/' + post.id + '/news'}>
                          <span className="absolute inset-0" />
                          {post.title} 
                        </a>
                      </h3>
                      <p className="line-clamp-3 text-sm leading-6 text-gray-600 mt-2">
                        {post.text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </main>
      </DefaultLayout>
    </>
  )
}
