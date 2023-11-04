// @ts-nocheck 
import { Button } from "@/components/Button";
import { ImageUpload } from "@/components/ImgUpload";

export default function CashReceipt() {
    return (
        <>
            <div className="content-center">
                <p className="text-base font-semibold leading-7 text-indigo-600">Donate to Us</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Scan the QR Code to finish transaction:
                </h1>
                <ImageUpload folderName="cash_receipts" charityID={12} recordID={23} />
                <div className="pt-6">
                    <Button type="submit" href={''} variant="solid" color="green" className="w-1/5">
                        <span>
                            Donate <span aria-hidden="true">&rarr;</span>
                        </span>
                    </Button>
                </div>
            </div>
        </>
    )
}