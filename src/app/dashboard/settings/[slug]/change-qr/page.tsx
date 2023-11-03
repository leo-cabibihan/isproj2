import { QRUpload } from "@/components/QrUpload";

export default function Test({ params }: any) {

    const charityID = params.slug

    console.log("Slugs work " + charityID)

    return (
        <>
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Upload QR Code for Cash Donations</h2>
                <QRUpload folderName="charity" charityID={charityID} recordID={"qr"} />
            </div>
        </>
    )
}