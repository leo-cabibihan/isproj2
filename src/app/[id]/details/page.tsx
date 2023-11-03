

import supabase from "@/app/utils/supabase"
import { Button } from "@/components/Button"
import { SelectField, TextField } from "@/components/Fields"
import { DefaultLayout } from "@/components/layouts/Default"
import { ContentRight, ContentLeft, Causes, GraphTemp, News } from "@/components/Single-use"
import { revalidatePath } from "next/cache"
import { useState } from "react"
import { FormComponent, GoodsForm } from "./form"
import { GetUID } from "@/app/utils/user_id"
import { ShowQr } from "./cash/form"
import { BannerImg, ShowImg } from "@/components/DisplayImg"

export const revalidate = 0;

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

export default async function Organization({ params }: any) {

  //THIS JUST GETS THE ORG ID FROM THE ROUTE. US  E THIS TO FILTER TO THE SPECIFIC ORG.
  const orgID = params.id
  console.log(orgID + "!!!!!!")

  const donorID = await GetUID()

  const { data: donor, error: error_1 } = await supabase
    .from('donor')
    .select('*')
    .eq('id', donorID as string)

  const { data: orgs } = await supabase
    .from('charity')
    .select('*')
    .eq('id', orgID)

  return (
    <>
      <DefaultLayout>
        <ContentLeft id={orgID} />
        <ContentRight id={orgID} />
        <GraphTemp />
        <div className="bg-white px-6 py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <div className="mt-16 max-w-2xl space-y-20">
              <div>
                {orgs?.map(org => (
                  <h2 key={org.id} className="text-2xl font-bold tracking-tight text-gray-900">Donate to {org.name}</h2>
                ))}
                <div className="space-y-8">
                  <p className="mt-8">
                    Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
                    sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
                  </p>
                  <Button variant="solid" color="red" href={'/' + orgID + '/report'}>
                    <span>
                      Report Charity
                    </span>
                  </Button>
                </div>
              </div>
              {
                donor?.length === 1 ? (
                  <>
                    <GoodsForm ID={orgID} UserID={donorID} />
                    <div className="space-y-12"></div>
                    <div className="border-b border-gray-900/10 pb-12"></div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Donate Cash</h2>
                    <ShowImg folder1={"charity"} charityID={orgID} recordID={"qr"} />
                  </>
                ) : (
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Please <a className="text-blue-600" href={"/login"}>log in</a> in order to donate.</h1>
                )
              }

            </div>
          </div>
        </div>
        <Causes id={orgID} />
        <News id={orgID} />
      </DefaultLayout>
    </>
  )
}  