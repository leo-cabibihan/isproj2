// @ts-nocheck 
'use server'

import { DisplayImage, DownloadImage } from "@/app/utils/display_image"

export async function ShowImg({ folder1, charityID, recordID }: any) {

    const CDNURL = await DisplayImage(folder1, charityID, recordID)

    return (
        <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">

            <img
                src={CDNURL}
                alt=""
                className="absolute md:w-full md:object-contain inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
    )
}

export async function BannerImg({ folder1, charityID, recordID }: any) {
    const CDNURL = await DisplayImage(folder1, charityID, recordID);
  
    return (
      <div className="relative w-full mb-0">
        <img
          src={CDNURL}
          alt=""
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] mb-0"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
    );
  }
  

export async function DownloadableImg({ path, children }: { path: any, children: React.ReactNode }) {

    'use server'

    const downloadImg = async () => {
        await DownloadImage(path)
    }

    return (
        <>
            <a onClick={downloadImg}>
                {children}
            </a>
        </>
    )
}

export async function ShowQr({ folder1, charityID, recordID }: any) {

    const CDNURL = await DisplayImage(folder1, charityID, recordID)

    return (
        <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">

            <img
                src={CDNURL}
                alt=""
                className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
    )
}