// @ts-nocheck 
import { DefaultLayout } from '@/components/layouts/Default'
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import supabase from "@/app/utils/supabase"
import { useRouter } from 'next/navigation'

export default async function News({ params } : any) {
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

  const postID = params.id
  const { data: posts, error } = await supabase.from('campaign_post').select('*, charity ( id, name ), decrypted_charity_member( user_uuid, decrypted_member_name )').eq('id', postID)

  const charityID = posts?.map(post => post.charity?.id);
  const { data: images, error: image_error } = await supabase
    .storage
    .from('uploads')
    .list("campaign_post/" + charityID?.toString() + "/" + postID?.toString(), {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    })
  const CDNURL = "https://dkvtrmaiscnbjtfxpurj.supabase.co/storage/v1/object/public/uploads/campaign_post/" + charityID + "/" + postID + "/"

  return (
    <>
      <DefaultLayout>
        {posts?.map((post) => (
          <div key={post.id} className="bg-white px-6 py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
              <p className="text-base font-semibold leading-7 text-[#01794A]">{post.charity?.name}&apos;s post</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
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
                        written by {post.decrypted_charity_member?.decrypted_member_name}
                      </p>
                      <p className="text-gray-600">{post.charity?.name}</p>
                      <div className="mt-2 flex items-center gap-x-4 text-xs">
                      <time className="text-gray-500">
                        {formatDate(post.date_posted) +
                          ' ' +
                          formatTime(post.date_posted)}
                      </time>
                    </div>
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