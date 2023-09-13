import { Button } from "@/components/Button"
import { TextField } from "@/components/Fields"
import { DefaultLayout } from "@/components/layouts/Default"
import { ContentRight, ContentLeft, Causes, GraphTemp, News } from "@/components/Single-use"


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