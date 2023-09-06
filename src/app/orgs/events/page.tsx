import { Receipts } from '@/components/Receipts'
import { DefaultLayout } from '@/components/layouts/Default'
import { LightBulbIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Name:',
    description:
      'Yolanda Drive',
    icon: LightBulbIcon,
  },
  {
    name: 'Expenses Amount:',
    description: 'PHP 50,000',
    icon: LightBulbIcon,
  },
  {
    name: 'Beneficiary Item Name:',
    description: 'Canned Goods',
    icon: LightBulbIcon,
  },
  {
    name: 'Beneficiary Item Quantity',
    description: '50 Boxes',
    icon: LightBulbIcon,
  },  
  {
    name: 'Beneficiary Representative',
    description: 'Mike Wazowski',
    icon: LightBulbIcon,
  },
  {
    name: 'Contact No.:',
    description: '09123456887',
    icon: LightBulbIcon,
  },
]

export default function Example() {
  return (
    <DefaultLayout>
        <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Events</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Yolanda Drive</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                iste dolor cupiditate blanditiis ratione.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
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
    </DefaultLayout>
  )
}