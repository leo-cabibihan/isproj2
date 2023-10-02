'use client'

import supabase from "@/app/utils/supabase";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";


export function ImageUpload({ charityID }) {

    const CDNURL = "https://dkvtrmaiscnbjtfxpurj.supabase.co/storage/v1/object/public/uploads/" + charityID + "/"

    const [images, setImages]: any[] = useState([])

    async function getImages() {
        const { data, error } = await supabase
            .storage
            .from('uploads')
            .list("images", {
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
        if (charityID) {
            getImages()
        }
    }, [charityID])

    async function uploadImage(e) {
        let file = e.target.files[0]

        const { data, error } = await supabase
            .storage
            .from('uploads')
            .upload(charityID + "/" + uuidv4(), file)

        if (data) {
            getImages()
        } else {
            console.log(error)
        }
    }

    return (
        <>
            <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Images
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                                htmlFor="post-images"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Upload a file</span>
                                <input id="post-images" name="post-images" type="file" className="sr-only" onChange={(e) => uploadImage(e)} required/>
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            </div>
        </>
    )
}