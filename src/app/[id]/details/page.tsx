"use client"

import { Button } from "@/components/Button"
import { SelectField, TextField } from "@/components/Fields"
import { DefaultLayout } from "@/components/layouts/Default"
import { ContentRight, ContentLeft, Causes, GraphTemp, News } from "@/components/Single-use"
import { useState } from "react"

const cities = [
  { id: 1, name: "Manila" },
  { id: 2, name: "Quezon City" },
  { id: 3, name: "Mandaluyong" },
  { id: 4, name: "Marikina" },
  { id: 5, name: "Pasig" },
  { id: 6, name: "San Juan" },
  { id: 7, name: "Caloocan" },
]

const provinces = [
  { id: 1, name: "NCR" },
  { id: 2, name: "Bulacan" },
  { id: 3, name: "N/A" },
]

export default function Organization() {
  const [cash, showCash] = useState(true);

  return (
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
                <Button type="button" onClick={() => showCash(false)} variant="solid" color="green" className="relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 ring-1 ring-inset ring-gray-300">
                  <span>
                    Donate Goods
                  </span>
                </Button>
                <Button type="button" onClick={() => showCash(true)} variant="solid" color="green" className="relative inline-flex items-center rounded-l-md px-3 py-2 ring-1 ring-inset ring-gray-300">
                  <span>
                    Donate Cash
                  </span>
                </Button>
              </span>
              {cash ? (
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
              ) : (
                <form action="#">
                  <div className="space-y-12"></div>
                  <div className="border-b border-gray-900/10 pb-12"></div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Donate Goods</h2>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <TextField label="Item name" name="item" type="text" autoComplete="number" placeholder="Rice Sack" required />
                      <TextField label="Quantity" name="qty" type="number" min="1" max="100000" autoComplete="number" placeholder="Rice Sack" required />
                      <TextField label="Expiry Date" name="expiry" type="date" placeholder="" required />
                      <SelectField label="Perishable?" placeholder="yes" required>
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                      </SelectField>
                      <TextField label="House Number/Unit Number" name="house_no" type="text" autoComplete="text" placeholder="123" required />
                      <TextField label="Street Name" name="street" type="text" autoComplete="text" placeholder="123 Bonifacio Street" />
                      <TextField label="Village Name" name="village" type="text" autoComplete="text" placeholder="kekw" />
                      <TextField label="Barangay" name="brgy" type="text" autoComplete="text" placeholder="Saog" required />
                      <TextField label="Zip Code" name="zip_code" type="number" autoComplete="number" min="1" max="9999" placeholder="3019" required />
                      <SelectField label="City" placeholder="yes" required>
                        {cities.map(city =>
                          // eslint-disable-next-line react/jsx-key
                          <option value={city.name}>{city.name}</option>
                        )}
                      </SelectField>
                      <SelectField label="Province" placeholder="N/A" required>
                        {provinces.map(province =>
                          // eslint-disable-next-line react/jsx-key
                          <option value={province.name}>{province.name}</option>
                          )}
                      </SelectField>
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
              )}

            </div>
          </div>
        </div>
        <Causes />
        <News />
      </DefaultLayout>
    </>
  )
}