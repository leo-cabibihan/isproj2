import { DefaultLayout } from '@/components/layouts/Default'
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import supabase from "@/app/utils/supabase"
import { useRouter } from 'next/navigation'

export default async function News({ params } : any) {

  const postID = params.id
  const { data: posts, error } = await supabase.from('campaign_post').select('*, charity ( id, name ), charity_member( user_uuid, member_name )').eq('id', postID)

  const charityID = posts?.map(post => post.charity.id);
  const { data: images, error: image_error } = await supabase
    .storage
    .from('uploads')
    .list("campaign_post/" + charityID?.toString() + "/" + postID?.toString(), {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    })
  console.log('Charity ID:', charityID);
  const CDNURL = "https://dkvtrmaiscnbjtfxpurj.supabase.co/storage/v1/object/public/uploads/campaign_post/" + charityID + "/" + postID + "/"

  return (
    <>
      <DefaultLayout>
        {posts?.map((post) => (
          <div key={post.id} className="bg-white px-6 py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
              <p className="text-base font-semibold leading-7 text-indigo-600">{post.charity.name}</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Balls</h1>
              <p className="mt-6 text-xl leading-8">
                {post.subheading}
              </p>
              <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                <div className="relative flex items-center gap-x-4">
                  {/* {images?.map((image) => {
                    return (
                      <div key={CDNURL + "/" + image.name}>
                        <img src={CDNURL + "/" + image.name} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                      </div>
                    )
                  })} */}
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
              {images?.map((image) => {
                return (
                  <figure key={CDNURL + "/" + image.name} className="mt-16">
                    <img
                      className="aspect-video rounded-xl bg-gray-50 object-cover"
                      src={CDNURL + "/" + image.name}
                      alt=""
                    />
                    <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
                      <InformationCircleIcon className="mt-0.5 h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
                      Faucibus commodo massa rhoncus, volutpat.
                    </figcaption>
                  </figure>
                )
              })}
            </div>
          </div>
        ))}
      </DefaultLayout>
    </>
  )
}