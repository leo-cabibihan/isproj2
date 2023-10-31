import { DownloadImage } from '@/app/utils/display_image'
import supabase from '@/app/utils/supabase'
import { BannerImg, DownloadableImg } from '@/components/DisplayImg'
import { Receipts } from '@/components/Single-use'
import { DefaultLayout } from '@/components/layouts/Default'
import { LightBulbIcon } from '@heroicons/react/20/solid'

export default async function Example({ params }: any) {

  const eventID = params.id
  const { data: events, error: events_error } = await supabase.from('event').select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name, contact )').eq('id', eventID)
  const { data: expenses, error: expenses_error } = await supabase.from('expenses').select('*').eq('event_id', eventID)
  const { data: items, error: item_error } = await supabase.from('beneficiary_items').select('*, inventory_item ( id, name, unit_of_measurement )').eq('event_id', eventID)

  const charityID = events?.map(event => event.charity?.id);
  const { data: images, error } = await supabase
    .storage
    .from('uploads')
    .list("event/" + charityID?.toString() + "/" + eventID?.toString(), {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    })
  const CDNURL = "https://dkvtrmaiscnbjtfxpurj.supabase.co/storage/v1/object/public/uploads/event/" + charityID + "/" + eventID + "/"
  const IMGPATH = "event/" + charityID + "/" + eventID + "/"

  return (
    <DefaultLayout>
      {events?.map(event => (

        <div className="overflow-hidden bg-white py-24 sm:py-32" key={event.id}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="text-base font-semibold leading-7 text-indigo-600">Events</h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{event.name}</p>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    {event.description}
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <LightBulbIcon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                        Name:
                      </dt>{' '}
                      <dd className="inline">{event.name}</dd>
                    </div>
                    {expenses?.map(expense => (
                      <div className="relative pl-9" key={expense.id}>
                        <dt className="inline font-semibold text-gray-900">
                          <LightBulbIcon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                          Expenses Amount:
                        </dt>{' '}
                        <dd className="inline">{expense.amount}</dd>
                      </div>
                    ))}
                    {items?.map(item => (
                      <div key={item.id} className='space-y-8'>
                        <div className="relative pl-9">
                          <dt className="inline font-semibold text-gray-900">
                            <LightBulbIcon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                            Beneficiary Item:
                          </dt>{' '}
                          <dd className="inline">{item.inventory_item?.name}</dd>
                        </div>
                        <div className="relative pl-9">
                          <dt className="inline font-semibold text-gray-900">
                            <LightBulbIcon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                            Quantity:
                          </dt>{' '}
                          <dd className="inline">{item.quantity} {item.inventory_item?.unit_of_measurement}</dd>
                        </div>
                      </div>
                    ))}
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <LightBulbIcon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                        Beneficiary:
                      </dt>{' '}
                      <dd className="inline">{event.beneficiaries?.beneficiary_name}</dd>
                    </div>
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <LightBulbIcon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                        Contact No.:
                      </dt>{' '}
                      <dd className="inline">{event.beneficiaries?.contact}</dd>
                    </div>
                  </dl>
                </div>
              </div>

            </div>
            <div className="bg-white">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Event Images</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {images?.map((image) => {
                    return (
                      <div key={CDNURL + image.name}>

                        <img src={CDNURL + image.name} />
                        <div
                          className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-indigo-700 opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                          <h1 className="text-2xl text-white">Fiction T-Shirt Store</h1>
                          <a className="mt-5 px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-600 duration-300" href="#">Continue Shopping</a>
                        </div>

                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

      ))}
    </DefaultLayout>
  )
}