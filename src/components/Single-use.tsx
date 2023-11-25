// @ts-nocheck
import supabase from "@/app/utils/supabase"
import { Button } from "./Button"
import { Container } from "./Container"
import { BannerImg } from "./DisplayImg"
import { LightBulbIcon } from "@heroicons/react/24/solid"
import TotalCashDonationsChart from "./TotalCashDonationChart"
import TotalInKindTransactionsChart from "./TotalInKindTransactionsChart"

export function Cards() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Latest Causes</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Find an Organization and donate to them.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {orgs.map((org) => (
            <article key={org.id} className="flex flex-col items-start justify-between">
              <div className="relative w-full">
                <img
                  src={org.imageUrl}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="absolute inset-0" />
                    {org.title}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{org.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <Button type="submit" variant="solid" color="green" className="w-full" href={"/orgs/details"}>
                    <span>
                      Donate Now <span aria-hidden="true">&rarr;</span>
                    </span>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Content() {
  return (
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
                Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam
                eget aliquam. Quisque id at vitae feugiat egestas.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt=""
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
                vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque
                erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
                semper sed amet vitae sed turpis id.
              </p>
              <p className="mt-8">
                Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor
                fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac
                adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <Container className="pb-16 pt-20 text-center lg:pt-32">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Give to{' '}
        <span className="relative whitespace-nowrap text-emerald-600">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute left-0 top-2/3 h-[0.58em] w-full fill-emerald-300/70"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative">each other</span>
        </span>{' '}
        to make the world better.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat nisl pretium fusce id velit ut tortor pretium viverra.
      </p>

    </Container>
  )
}

export async function Causes({ id }: any) {
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

  const { data: events } = await supabase
    .from('event')
    .select('*, charity ( id, name )')
    .eq('charity_id', id)
  console.log(id + "!!!!!")
  console.log(events)

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Latest Events</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Check out this charity&apos;s latest events.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {events?.map((event) => (
            <article key={event.id} className="flex flex-col items-start justify-between-center">
              <BannerImg folder1={"event"} charityID={id} recordID={event.id} />
              <div className="max-w-xl">
                <div className="mt-5 flex items-center gap-x-4 text-xs">
                  <time className="text-gray-500">
                    {formatDate(event.start_date) + ' ' + formatTime(event.start_date)}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={'/' + event.id + '/events'}>
                      <span className="absolute inset-0" />
                      {event.name}
                    </a>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{event.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function ContentLeft({ id }: any) {

  const { data: orgs } = await supabase
    .from('charity')
    .select('*')
    .eq('id', id)

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {orgs?.map((org) => (
            <>
              <div key={org.id}>
                <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
                  <p className="text-base font-semibold leading-7 text-[#01794A]">Donate to Us</p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {org.name}
                  </h1>
                  <div className="max-w-xl">
                    <p className="mt-6">
                      {org.about}
                    </p>
                  </div>
                </div>
              </div><div className="lg:pr-4">
                <BannerImg folder1={"charity"} charityID={org.id} recordID={org.id} />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function Receipts({ id }: any) {
  const eventID = id
  const { data: events, error: events_error } = await supabase.from('event').select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name, contact )').eq('id', eventID)

  const charityID = events?.map(event => event.charity?.id);
  const { data: images, error } = await supabase
    .storage
    .from('uploads')
    .list(charityID?.toString(), {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    })
  const CDNURL = "https://dkvtrmaiscnbjtfxpurj.supabase.co/storage/v1/object/public/uploads/" + charityID + "/"
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Uploaded Receipts</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {images?.map((image) => {
            return (
              <div key={CDNURL + "/" + image.name}>
                <img src={CDNURL + "/" + image.name} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export async function ContentRight({ id }: any) {

  const { data, error } = await supabase.from('drop_off_location').select('*').eq('charity_id', id)

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-4">
            <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src="https://www.thespruce.com/thmb/oSY6unPuDXBFJG3PGjl1j-mm7Fc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/laundry-tips-before-you-donate-clothes-4046404-01-ca8bf91d0b9f418689cec82662381c09.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="text-base leading-7 text-gray-700 lg:max-w-lg space-y-10">
              <div>
                <p className="text-base font-semibold leading-7 text-[#01794A]">Drop-off Locations</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Here, you can drop off your donations.
                </h1>
              </div>
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
  )
}

export async function GraphTemp({ id }: any) {
  //Total Cash Donations Received Query (INCOME)
  const { data: totalCashDonations, error: totalCashDonationsError } = await supabase
  .from('total_cash_donations_received')
  .select('total_cash_donations_received, month')
  .eq('charity_id', id)
  .limit(12);
  const totalCashData = totalCashDonations?.flatMap(totalCash => (
    [
        {
            name: totalCash.month,
            totalCashDonations: totalCash.total_cash_donations_received,
        }
    ]
    )) || [];

  //Total In-Kind Transactions Received Query (INCOME)
  const { data: totalInKindTransactions, error: totalInKindTransactionsError } = await supabase
  .from('total_inkind_donation_transactions')
  .select('total_inkind_donation_transactions, month')
  .eq('charity_id', id)
  .limit(12);
  const totalInKindData = totalInKindTransactions?.flatMap(totalInKind => (
    [
        {
            name: totalInKind.month,
            totalInKindTransactions: totalInKind.total_inkind_donation_transactions,
        }
    ]
    )) || [];
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Organization Statistics
          </h2>
          <p className="mt-6 text-base leading-7 italic text-gray-600">           
          The information presented here is derived from the latest 12 months of this charity statistics.
          </p>
          <br/>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4x1">Total Cash and In-Kind Donations</h2>
          <p className="mt-2 text-base leading-8 text-gray-600">
                How much cash donations and in-kind donation transactions are received per month.
          </p>
          <br/>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
            <TotalCashDonationsChart CashData={totalCashData}/>
            <TotalInKindTransactionsChart InKindData={totalInKindData} />
            </div>
      </div>
    </div>
  )
}

export async function News({ id }: any) {

  const { data: posts } = await supabase
    .from('campaign_post')
    .select('*, charity ( id, name ), charity_member( user_uuid, member_name )')
    .eq('charity_id', id)

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Latest News</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
          Read posts from this Organization.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts?.map((post) => (
            <article key={post.id} className="flex flex-col items-start justify-between-center">
              <BannerImg folder1={"campaign_post"} charityID={id} recordID={post.id} />
              <div className="max-w-xl">
                {/* <div className="mt-8 flex items-center gap-x-4 text-xs">
                        <time dateTime={post.datetime} className="text-gray-500">
                          {post.date}
                        </time>
                      </div> */}
                <div className="group relative">
                  <h3 className="mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={'/' + post.id + '/news'}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{post.text}</p>
                </div>
                {/* <div className="relative mt-8 flex items-center gap-x-4">
                        <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                        <div className="text-sm leading-6">
                          <p className="font-semibold text-gray-900">
                            <a href={post.author.href}>
                              <span className="absolute inset-0" />
                              {post.author.name}
                            </a>
                          </p>
                          <p className="text-gray-600">{post.author.role}</p>
                        </div>
                      </div> */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MediaObject({ heading, subheading }: { heading: String, subheading: String }) {
  return (
    <div className="flex">
      <div className="pr-10">
        <h4 className="text-lg font-bold">{heading}</h4>
        <p className="mt-1 text-justify">
          {subheading}
        </p>
      </div>
      <div className="ml-4 flex-shrink-0">
        <img src="https://www.nicepng.com/png/detail/640-6404773_umbrella-corp-png-umbrella-corporation-logo-vector.png" className="rounded-full h-20 w-20"></img>
      </div>
    </div>
  )
}
