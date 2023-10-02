import { DefaultLayout } from '@/components/layouts/Default'
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import supabase from "@/app/utils/supabase"
import { useRouter } from 'next/navigation'

export default async function News({ params }) {

  const CDNURL = "https://dkvtrmaiscnbjtfxpurj.supabase.co/storage/v1/object/public/uploads/"

  const postID = params.id
  const { data: posts, error } = await supabase
    .from('campaign_post')
    .select('*, charity ( id, name ), charity_member( user_uuid, member_name )')
    .eq('id', postID)


  return (
    <>
      <DefaultLayout>
        {posts?.map((post) => (
          <div key={post.id} className="bg-white px-6 py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
              <p className="text-base font-semibold leading-7 text-indigo-600">{post.charity.name}</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
              <p className="mt-6 text-xl leading-8">
                {post.subheading}
              </p>
              <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                <div className="relative flex items-center gap-x-4">
                  <img src={CDNURL+ post.image_id} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6 grid grid-cols-4 gap-4">
                    <div className="col-span-3">
                      <p className="font-semibold text-gray-900">

                        {post.charity_member.member_name}
                      </p>
                      <p className="text-gray-600">{post.charity.name}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 max-w-2xl">
                <p>
                  {post.text}
                </p>
              </div>
              <figure className="mt-16">
                <img
                  className="aspect-video rounded-xl bg-gray-50 object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
                  alt=""
                />
                <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
                  <InformationCircleIcon className="mt-0.5 h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
                  Faucibus commodo massa rhoncus, volutpat.
                </figcaption>
              </figure>
            </div>
          </div>
        ))}
      </DefaultLayout>
    </>
  )
}