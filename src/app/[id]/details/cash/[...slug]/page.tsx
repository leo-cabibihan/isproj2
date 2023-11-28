// @ts-nocheck

import supabase from "@/app/utils/supabase";
import { Button } from "@/components/Button";
import { ShowImg } from "@/components/DisplayImg";
import { ImageUpload } from "@/components/ImgUpload";

export default function CashQR({ params }: any) {

    const charityID = params.slug[0]
    const recordID = params.slug[1]

    console.log("Slugs work " + charityID + ' ' + recordID)

    const handleSubmit = async (formData: FormData) => {
        'use server'

        const { data, error } = await supabase.rpc('update_image_evidence', { donation_id: recordID })
        if (data) {
            console.log("SUCCESS")
        }
    } 

    return (
        <>
            <div className="content-center">
                <p className="text-base font-semibold leading-7 text-indigo-600">Donate to Us</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Scan the QR Code to finish transaction:
                </h1>
                <ShowImg folder1="charity" charityID={charityID} recordID={'qr'} />
                <div></div>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Upload Receipt:
                </h1>
                <ImageUpload folderName="receipts" charityID={charityID} recordID={recordID} labelText="Upload Receipt/s"/>
                <form className="space-y-6" action={handleSubmit}>
                    <div className="col-span-full">
                        <Button type="submit" variant="solid" color="blue" className="w-full">
                            <span>
                                Upload Receipt <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}