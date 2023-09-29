import supabase from "@/app/utils/supabase";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { TableContainer } from "@/components/Table";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

async function uploadFile(file) {   
    
    const { data, error } = await supabase.storage.from('uploads').upload(String(randomUUID), file)
    if (error) {
        
    } else {
        // Handle success
    }   
}

export default async function Page() {

    const handleSubmit = async (formData: FormData) => {
        'use server'
        const post = {
            title: formData.get("title"),
            text: formData.get("details"),
            charity_id: 12,
            charity_member_id: "06c8ed37-d903-4ebf-b5b9-01a2106ab313"

        };

        await supabase.from('campaign_post').insert(post);
        revalidatePath('/');

        uploadFile(formData.get("post-images"))
    };


    return (
        <>

            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <form className="space-y-6" action={handleSubmit} method="POST">
                <TextField
                    label="Post Title"
                    name="title"
                    type="text"
                    required
                />

                <div className="col-span-full">
                    <label htmlFor="details" className="block text-sm font-medium leading-6 text-gray-900">
                        Details
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="details"
                            name="details"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={''}
                            placeholder="A long time ago, in a Galaxy far far away..."
                        />
                    </div>
                </div>

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
                                    <input id="post-images" name="post-images" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-full">
                    <Button type="submit" variant="solid" color="blue" className="w-full">
                        <span>
                            Save Post <span aria-hidden="true">&rarr;</span>
                        </span>
                    </Button>
                </div>
            </form>
        </>
    )
}