import { Button } from "@/components/Button"
import { TextField } from "@/components/Fields"
import { News } from "@/components/News"
import { GraphTemp } from "@/components/GraphTemp"
import { DefaultLayout } from "@/components/layouts/Default"
import { ContentRight } from "@/components/ContentRight"

const posts = [
  {
    id: 1,
    title: 'Yolanda Drive',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
  },
  // More posts...
  {
      id: 2,
      title: 'Meteor Shower',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      imageUrl:
        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
    },

    {
      id: 3,
      title: 'Bagyong Myko',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      imageUrl:
        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
    },
]


export default function Organization() {
    return(
    <>
      <DefaultLayout>
      <ContentLeft />
        <ContentRight />
        <GraphTemp />
        <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <div className="mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Donate to Tulong Lasalyano</h2>
          <p className="mt-8">
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
            sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
          </p>
          <span className="isolate inline-flex rounded-md shadow-sm">
                <Button type="button" href="#" variant="solid" color="green" className="relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 ring-1 ring-inset ring-gray-300">
                <span>
                  Donate Goods
                </span>
                </Button> 
                <Button type="button" href="#" variant="solid" color="green" className="relative inline-flex items-center rounded-l-md px-3 py-2 ring-1 ring-inset ring-gray-300">
                <span>
                  Donate Cash
                </span>
                </Button>      
          </span>
          <form action="#">
            <div className="space-y-12"></div>
              <div className="border-b border-gray-900/10 pb-12"></div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Donate Cash</h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <TextField
                    label="Amount"
                    name="number"
                    type="number"
                    autoComplete="number"
                    step="0.01"
                    min="100"
                    max="100000"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div>
              <div className="pt-6">
              <Button type="submit" variant="solid" color="green" className="w-1/5">
                <span>
                  Donate <span aria-hidden="true">&rarr;</span>
                </span>
              </Button>
              </div>
        </div>
          </form>
          
        </div>
      </div>
        </div>
        <Causes />
        <News />
      </DefaultLayout>
    </>
    )
}

export function Causes() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Latest Events</h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col items-start justify-between">
              <div className="relative w-full">
                <img
                  src={post.imageUrl}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <span className="absolute inset-0" />
                      {post.title}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
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

export function ContentLeft() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          
          <div>
            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">Donate to Us</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Tulong Lasalyano
              </h1>
              <div className="max-w-xl">
                <p className="mt-6">
                  Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
                  vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque
                  erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
                  semper sed amet vitae sed turpis id.
                </p>
                <p className="mt-6">
                  Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
                  vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque
                  erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
                  semper sed amet vitae sed turpis id.
                </p>
                <p className="mt-6">
                  Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
                  vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque
                  erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
                  semper sed amet vitae sed turpis id.
                </p>
                <p className="mt-6">
                  Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
                  vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque
                  erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
                  semper sed amet vitae sed turpis id.
                </p>
              </div>
            </div>
          </div>

<div className="lg:pr-4">
            <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
              <img
                className="absolute inset-0 h-full w-full object-cover "
                src="https://scontent.fmnl5-2.fna.fbcdn.net/v/t39.30808-6/276317381_109278458396550_7620802680570009451_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeHYg9oTV2bb151aqFN2Z_G9o5dcbJrOtq-jl1xsms62rygjMbRfqlT4eai5f_75Gf16IIwatZeGxfAXly-nKJH_&_nc_ohc=A6x_B2T4sBwAX8zDC2F&_nc_ht=scontent.fmnl5-2.fna&oh=00_AfAqNoIVHc51KqoHvkTJuYOK02T94U04IpKano8Ham1pnA&oe=64FB7B6D"
                alt=""
              />
              
              
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}