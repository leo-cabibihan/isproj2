import supabase from '@/app/utils/supabase'
import { Receipts } from '@/components/Single-use'
import { DefaultLayout } from '@/components/layouts/Default'
import { LightBulbIcon } from '@heroicons/react/20/solid'

// const features = [
//   {
//     name: 'Name:',
//     description:
//       'Yolanda Drive',
//     icon: LightBulbIcon,
//   },
//   {
//     name: 'Expenses Amount:',
//     description: 'PHP 50,000',
//     icon: LightBulbIcon,
//   },
//   {
//     name: 'Beneficiary Item Name:',
//     description: 'Canned Goods',
//     icon: LightBulbIcon,
//   },
//   {
//     name: 'Beneficiary Item Quantity',
//     description: '50 Boxes',
//     icon: LightBulbIcon,
//   },
// ]

export default async function Example({ params }) {

  const eventID = params.id

  const { data: events, error: events_error } = await supabase.from('event').select('*, charity ( id, name ), beneficiaries ( id, beneficiary_name, contact )').eq('id', eventID)
  const { data: expenses, error: expenses_error } = await supabase.from('expenses').select('*').eq('event_id', eventID)
  const { data: items, error: item_error } = await supabase.from('beneficiary_items').select('*, inventory_item ( id, name, unit_of_measurement )').eq('event_id', eventID)

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
                          <dd className="inline">{item.inventory_item.name}</dd>
                        </div>
                        <div className="relative pl-9">
                          <dt className="inline font-semibold text-gray-900">
                            <LightBulbIcon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                            Quantity:
                          </dt>{' '}
                          <dd className="inline">{item.quantity} {item.inventory_item.unit_of_measurement}</dd>
                        </div>
                      </div>
                    ))}
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <LightBulbIcon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                        Beneficiary:
                      </dt>{' '}
                      <dd className="inline">{event.beneficiaries.beneficiary_name}</dd>
                    </div>
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <LightBulbIcon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                        Contact No.:
                      </dt>{' '}
                      <dd className="inline">{event.beneficiaries.contact}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <img
                src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                alt="Product screenshot"
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                width={2432}
                height={1442}
              />
            </div>
            <Receipts />
          </div>
        </div>

      ))}
    </DefaultLayout>
  )
}