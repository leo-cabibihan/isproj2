// @ts-nocheck 

import supabase from "@/app/utils/supabase"
import { Button } from "@/components/Button"
import { SelectField, TextField } from "@/components/Fields"
import { DefaultLayout } from "@/components/layouts/Default"
import { ContentRight, ContentLeft, Causes, GraphTemp, News } from "@/components/Single-use"
import { revalidatePath } from "next/cache"
import { useState } from "react"
import { FormComponent, GoodsForm } from "./form"
import { GetUID } from "@/app/utils/user_id"
import { BannerImg, ShowImg } from "@/components/DisplayImg"

export const revalidate = 0;

export default async function Organization({ params }: any) {

  //THIS JUST GETS THE ORG ID FROM THE ROUTE. US  E THIS TO FILTER TO THE SPECIFIC ORG.
  const orgID = params.id

  const donorID = await GetUID()

  const { data: donor, error: error_1 } = await supabase
    .from('donor')
    .select('*')
    .eq('id', donorID)

  const { data: orgs } = await supabase
    .from('charity')
    .select('*')
    .eq('id', orgID)

  return (
    <>
      <DefaultLayout>
        <ContentLeft id={orgID} />
        <ContentRight id={orgID} />
        <GraphTemp id={orgID}/>
        <div className="bg-white px-6 py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <div className="mt-16 max-w-2xl space-y-20">
              <div>
                {orgs?.map(org => (
                  <h2 key={org.id} className="text-2xl font-bold tracking-tight text-gray-900">Donate to {org.name}</h2>
                ))}
                <div className="space-y-8">
                  <p className="mt-8">
                    Your giving journey doesn&apos;t end with a donation; it&apos;s an ongoing connection with the causes you support. If you have any concerns, you can choose to report this charity with by clicking the Report Charity button below.
                  </p>
                  {/*<Button variant="solid" color="red" href={'/' + orgID + '/report'}>
                    <span>
                      Report Charity
                    </span>
                </Button>*/}
                </div>
              </div>
              {
                donor?.length === 1 ? (
                  <>
                    <FormComponent ID={orgID} DonorID={donorID} />
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