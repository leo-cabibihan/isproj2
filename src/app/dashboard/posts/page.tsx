

import { Button } from "@/components/Button";
import { TableContainer, TableHeaderButton } from "@/components/Table";
import supabase from "@/app/utils/supabase"
import { revalidatePath } from "next/cache"
import { TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { useState } from "react";
import { randomUUID } from "crypto";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { ImageUpload } from "@/components/ImgUpload";

export const revalidate = 0;


export default async function Page() {

    //HOWTO GET CHARITY ID:
    //=> Get UUID of currently logged in user
    //==> const user = useUser()
    //=> Get Charity ID from charity_member table equal to current UUID
    //=> store Charity ID somewhere
    
    //Temp. ID for testing purposes whilst auth is still WIP

    const charityId = 12

    const { data: posts, error } = await supabase
        .from('campaign_post')
        .select('*, charity ( id, name ), charity_member( user_uuid, member_name )')
        .eq('charity_id', charityId)

    const handleSubmit = async (formData: FormData) => {
        'use server'

        const {data: imageID} = await supabase.rpc('image_id')

        const post = {
            title: formData.get("title"),
            text: formData.get("details"),
            subheading: formData.get("subtitle"),
            charity_id: 12,
            charity_member_id: "06c8ed37-d903-4ebf-b5b9-01a2106ab313",
            image_id: imageID
        };

        await supabase.from('campaign_post').insert(post);
        revalidatePath('/');
    };

    const saveChanges = async (formData: FormData) => {
        'use server'
        const postId = formData.get("id")
        const post = {
            title: formData.get("title"),
            text: formData.get("details"),
            subheading: formData.get("subtitle"),
            charity_id: 12,
            charity_member_id: "06c8ed37-d903-4ebf-b5b9-01a2106ab313"
        };

        await supabase.from('campaign_post').update(post).eq("id", postId)
        revalidatePath('/');
    };

    const deletePost = async (formData: FormData) => {
        'use server'
        const postId = formData.get("id")
        const post = {
            title: formData.get("title"),
            text: formData.get("details"),
            subheading: formData.get("subtitle"),
            charity_id: 12,
            charity_member_id: "06c8ed37-d903-4ebf-b5b9-01a2106ab313"
        };

        await supabase.from('contacts').delete().eq("id", postId)
        revalidatePath('/');
    };

    // async function uploadImage(e) {
    //     let file = e.target.files[0]

    //     const{ data, error } = await supabase
    //         .storage
    //         .from('uploads')
    //         .upload("images/" + randomUUID(), file)

    //     if(data) {
    //         getImages()
    //     } else {
    //         console.log(error)
    //     }

    // }

    

    return (
        
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>


            <TableContainer>
                <TableHeaderButton header="Posts of Red Cross Philippines">
                    <SlideOver buttontext={"Create Post"} variant="solid" color="blue">
                        <form className="space-y-6" action={handleSubmit} method="POST">
                            <TextField
                                label="Post Title"
                                name="title"
                                type="text"
                                required
                            />

                            <TextField
                                label="Subtitle"
                                name="subtitle"
                                type="text"
                            />

                            <div className="col-span-full">
                                <label htmlFor="details" className="block text-sm font-medium leading-6 text-gray-900">
                                    Details
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="details"
                                        name="details"
                                        rows={6}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                        placeholder="A long time ago, in a Galaxy far far away..."
                                    />
                                </div>
                            </div>

                            <ImageUpload charityID={charityId}/>

                            <div className="col-span-full">
                                <Button type="submit" variant="solid" color="blue" className="w-full">
                                    <span>
                                        Save Post <span aria-hidden="true">&rarr;</span>
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </SlideOver>
                </TableHeaderButton>
                <div className="bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:max-w-4xl">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
                            <p className="mt-2 text-lg leading-8 text-gray-600">
                                Learn how to grow your business with our expert advice.
                            </p>
                            <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
                                {posts?.map((post) => (
                                    <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                                        <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                                            <img
                                                src="#"
                                                alt=""
                                                className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                                            />
                                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-x-4 text-xs">
                                                <time dateTime={post.date_posted} className="text-gray-500">
                                                    {post.date_posted}
                                                </time>

                                            </div>
                                            <div className="group relative max-w-xl">
                                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                                    <a href="#">
                                                        <span className="absolute inset-0" />
                                                        {post.title}
                                                    </a>
                                                </h3>
                                                <p className="mt-5 text-sm leading-6 text-gray-600">{post.text}</p>
                                            </div>
                                            <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                                                <div className="relative flex items-center gap-x-4">
                                                    <img src="#" alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                                    <div className="text-sm leading-6 grid grid-cols-4 gap-4">
                                                        <div className="col-span-3">
                                                            <p className="font-semibold text-gray-900">

                                                                {post.charity_member.member_name}
                                                            </p>
                                                            <p className="text-gray-600">{post.charity.name}</p>
                                                        </div>
                                                        <SlideOver buttontext="View Details" variant="solid" color="blue">
                                                            <form className="space-y-6" action={saveChanges} method="PUT">

                                                                <TextField
                                                                    label=""
                                                                    name="id"
                                                                    type="hidden"
                                                                    defaultValue={post.id}
                                                                    required
                                                                />

                                                                <TextField
                                                                    label="Post Title"
                                                                    name="title"
                                                                    type="text"
                                                                    defaultValue={post.title}
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
                                                                            rows={6}
                                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                            defaultValue={post.text}
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
                                                                            Update <span aria-hidden="true">&rarr;</span>
                                                                        </span>
                                                                    </Button>
                                                                    <Button type="submit" variant="solid" color="red" className="w-full" formAction={deletePost}>
                                                                        <span>
                                                                            Delete <span aria-hidden="true">&rarr;</span>
                                                                        </span>
                                                                    </Button>
                                                                </div>
                                                            </form>
                                                        </SlideOver>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </TableContainer>
        </>

    )
}