import { Button } from "@/components/Button";
import { TableContainer, TableHeaderButton } from "@/components/Table";
import supabase from "@/app/utils/supabase"
import { revalidatePath } from "next/cache"
import { TextField } from "@/components/Fields";
import SlideOver from "@/components/SlideOverButton";
import { useState } from "react";
import { randomUUID } from "crypto";
import { PhotoIcon } from "@heroicons/react/24/solid";

export const revalidate = 0;

export default async function Page() {

    //Temp. ID for testing purposes whilst auth is still WIP
    const charityId = 12
    const { data: posts, error } = await supabase
        .from('campaign_post')
        .select('*, charity ( id, name ), charity_member( user_uuid, member_name )')
        .eq('charity_id', charityId)

    console.log(posts?.map(post => {post.member_name}))

    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>


            <TableContainer>
                <TableHeaderButton header="Posts of Red Cross Philippines">
                    <Button variant="solid" color="blue" href={"/dashboard/posts/createPost"}>Create Post</Button>
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
                                                    <div className="text-sm leading-6">
                                                        <p className="font-semibold text-gray-900">
                                                            <a href="#">
                                                                <span className="absolute inset-0" />
                                                                {post.charity_member.member_name}
                                                                
                                                            </a>
                                                        </p>
                                                        <p className="text-gray-600">{post.name}</p>
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