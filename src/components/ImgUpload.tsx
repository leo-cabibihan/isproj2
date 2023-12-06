//@ts-nocheck
'use client'

import supabase from "@/app/utils/supabase";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./Button";
import { Failure, Success } from "./Feedback";

export var imgPath = ""
export var CDNURL = ""

var existingImg

function Message({ content, type, heading }: any) {
    if (type == 'ERROR') {
        return <Failure heading={heading} content={content} />;
    }
    else if (type == 'SUCCESS') {
        return <Success heading={heading} content={content} />;
    }
}

export function ImageUpload({ folderName, charityID, recordID, labelText }: any) {

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [heading, setHeading] = useState("");

    const [images, setImages]: any[] = useState([])

    async function getImages() {
        const { data, error } = await supabase
            .storage
            .from('uploads')
            .list(folderName + "/" + charityID + "/" + recordID, {
                limit: 100,
                offset: 0,
                sortBy: { column: "name", order: "asc" }
            })

        if (data !== null) {
            setImages(data);
        } else {
            alert("Error Loading Images");
            console.log(error);
        }


    }

    useEffect(() => {
        if (folderName && charityID && recordID) {
            getImages()
        }
    }, [folderName && charityID && recordID])

    async function uploadImage(e: any) {
        let file = e.target.files[0]

        const { data, error } = await supabase
            .storage
            .from('uploads')
            .upload(folderName + "/" + charityID + "/" + recordID + "/" + uuidv4(), file)

        console.log("DATA RETURNED: " + { data })

        if (data) {
            getImages()
            setMessage("File uploaded successfully!");
            setMessageType('SUCCESS');
            setHeading('Upload Complete!')
        } else {
            console.log("Error uploading file. See the details below: \n", error)
            const temp_message = "Error uploading file."
            setMessage(temp_message);
            setMessageType('ERROR');
            setHeading('Upload Error!')
        }
        const CDNURL = "https://dkvtrmaiscnbjtfxpurj.supabase.co/storage/v1/object/public/uploads/" + folderName + "/" + charityID + "/"
            + recordID + "/" + data?.path
        imgPath = String(data?.path)
        return imgPath && CDNURL
    }

    return (
        <>
            <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    {labelText}
                </label>
                <div className="space-y-5">
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="post-images"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input id="post-images" name="post-images" type="file" className="sr-only" onChange={(e) => uploadImage(e)} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>

                </div>
            </div>
            <Message content={message} type={messageType} heading={heading} />
        </>

    )
}

export function ImageUpdate({ folderName, charityID, recordID }: any) {

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [heading, setHeading] = useState("");


    async function GetImage() {
        const { data: images, error: image_error } = await supabase
            .storage
            .from('uploads')
            .list(folderName + "/" + charityID + "/" + recordID, {
                limit: 1,
                offset: 0,
                sortBy: { column: "name", order: "asc" },
            })

        console.log("GET FILE ERROR IS: ", image_error)
        const img_name = images?.map(image => image.name)
        return img_name
    }

    async function uploadImage(e: any) {
        let file = e.target.files[0]

        let img_name = await GetImage()

        const { data, error } = await supabase
            .storage
            .from('uploads')
            .update(folderName + "/" + charityID + "/" + recordID + "/" + img_name, file, {
                cacheControl: '3600',
                upsert: true
            })

        if (data) {
            setMessage("File uploaded successfully!");
            setMessageType('SUCCESS');
            setHeading('Upload Complete!')
        } else {
            console.log("Error uploading file. See the details below: \n", error)
            const temp_message = "Error uploading file."
            setMessage(temp_message);
            setMessageType('ERROR');
            setHeading('Upload Error!')
        }

    }

    return (
        <>
            <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Upload File/s
                </label>
                <div className="space-y-5">
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="post-images"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input id="post-images" name="post-images" type="file" className="sr-only" onChange={(e) => uploadImage(e)} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>

                </div>
            </div>
            <Message content={message} type={messageType} heading={heading} />
        </>

    )
}

