//@ts-nocheck

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
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { DisplayImage } from "@/app/utils/display_image";
import { ShowImg } from "@/components/DisplayImg";
import { CharityLog } from "@/app/admin/audit-log/function";
import { GetUID } from "@/app/utils/user_id";
import { Column } from "@react-email/components";
import { SelectField } from "@/components/Fields";
import { Message } from "@/components/Feedback";
import { NoWhiteSpace } from "@/app/utils/input_validation";
import { DisplayMessage } from "@/components/DisplayMessage";

export const revalidate = 0;

async function getPostData(column: any, order: any, charity_id: number) {
    var data
    console.log(`RESULTS ARE SORTED BY ${column}, ORDERED BY ${order}, FROM CHARITY NUMBER ${charity_id}`)
    if ((column != null || column != undefined) || (order != null || order != undefined)) {
        const { data: posts, error } = await supabase
            .from('campaign_post')
            .select('*, charity ( id, name ), decrypted_charity_member( user_uuid, decrypted_member_name )')
            .eq('charity_id', charity_id)
            .order(`${column}`, { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
        if (column === 'date posted') {
            const { data: posts, error } = await supabase
                .from('campaign_post')
                .select('*, charity ( id, name ), decrypted_charity_member( user_uuid, decrypted_member_name )')
                .eq('charity_id', charity_id)
                .order('date_posted', { ascending: order === 'true' ? true : false }) //if order is true, then true, otherwise false.
            data = posts
            return data
        }
        data = posts
    }
    else {
        const { data: posts, error } = await supabase
            .from('campaign_post')
            .select('*, charity ( id, name ), decrypted_charity_member( user_uuid, decrypted_member_name )')
            .eq('charity_id', charity_id)
            .order('date_posted', { ascending: false })
        data = posts
    }

    return data
}

var message = ""
var messageType = ""
var heading = ""

export default async function Page({ searchParams }: any) {

    // Function to format the timestamp as 'mm/dd/yyy'
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}/${day}/${year}`;
    };

    // Function to format the time as 'h:mm a' (e.g., '2:30 PM')
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };

    console.log("DOES IT WORK???? MAYBE: " + await GetUID())

    const uid = await GetUID()
    const { data: charity_member, error: error_2 } = await supabase.from('decrypted_charity_member').select('*, charity ( id, name )').eq('user_uuid', uid)
    const charity_id = charity_member?.map(member => member.charity?.id)

    const column = searchParams?.column
    const order = searchParams?.order

    console.log(`HERE ARE THE ORDERING SETTINGS: ${column} & ${order}`)

    const charityId = charity_id![0]

    const { data: last_post, error: post_error } = await supabase
        .from('campaign_post')
        .select('*')
        .order('id', { ascending: false }).limit(1)

    const posts = await getPostData(column, order, charityId)
    var orderby = "" //checks if order is true or false, then returns a string of ascending and descending respectively
    if (order === 'true') {
        orderby = "ascending"
    }
    else {
        orderby = "descending"
    }

    const post_id = last_post?.map(post => post.id)
    console.log("LAST EVENT'S ID IS: " + (post_id![0] + 1))

    const handleSubmit = async (formData: FormData) => {
        'use server'

        const title_input = String(formData.get("title"))
        const text_input = String(formData.get("details"))
        const subheading_input = String(formData.get("subtitle"))

        const valid_title = NoWhiteSpace(title_input)
        const valid_text = NoWhiteSpace(text_input)
        const valid_subheading = NoWhiteSpace(subheading_input)

        if (valid_title && valid_text && valid_subheading) {

            const post = {
                title: formData.get("title"),
                text: formData.get("details"),
                subheading: formData.get("subtitle"),
                charity_id: charityId,
                charity_member_id: uid
            };

            const { data, error } = await supabase.from('campaign_post').insert(post).select()

            if (error) {
                message = `Failed to Add Record. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
                messageType = "ERROR"
                heading = "Record not Added."
            }
            else {
                message = "Record Added Successfully."
                messageType = "SUCCESS"
                heading = "Record Added."
                CharityLog("CREATED POST " + data![0].title, error)
            }

            revalidatePath('/');

        }
        else {
            const error_msg = "Invalid Inputs. 2 or more consecutive spaces are not allowed."
            message = error_msg
            messageType = "ERROR"
            heading = "Invalid Input."
        }

    };

    const saveChanges = async (formData: FormData) => {
        'use server'

        const title_input = String(formData.get("title"))
        const text_input = String(formData.get("details"))
        const subheading_input = String(formData.get("subtitle"))

        const valid_title = NoWhiteSpace(title_input)
        const valid_text = NoWhiteSpace(text_input)
        const valid_subheading = NoWhiteSpace(subheading_input)

        if (valid_title && valid_text && valid_subheading) {

            const postId = formData.get("id")
            const post = {
                title: formData.get("title"),
                text: formData.get("details"),
                subheading: formData.get("subtitle"),
                charity_id: charityId,
                charity_member_id: uid
            };

            const { data, error } = await supabase.from('campaign_post').update(post).eq("id", postId).select()

            if (error) {
                message = `Failed to Update Record. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
                messageType = "ERROR"
                heading = "Record not Updated."
            }
            else {
                message = "Record Updated Successfully."
                messageType = "SUCCESS"
                heading = "Record Updated."
                CharityLog("UPDATED POST " + data![0].title, error)
            }

            revalidatePath('/');

        }
        else {
            const error_msg = "Invalid Inputs. 2 or more consecutive spaces are not allowed."
            message = error_msg
            messageType = "ERROR"
            heading = "Invalid Input."
        }

    };

    const deletePost = async (formData: FormData) => {
        'use server'
        const postId = formData.get("id")
        const post = {
            title: formData.get("title"),
            text: formData.get("details"),
            subheading: formData.get("subtitle"),
            charity_id: charityId,
            charity_member_id: uid
        };

        const { data, error } = await supabase.from('campaign_post').delete().eq("id", postId).select()

        if (error) {
            message = `Failed to Delete Record. See Details below: \n${error.details} \n${error.hint} \n ${error.message}.`
            messageType = "ERROR"
            heading = "Record not Deleted."
        }
        else {
            message = "Record Deleted Successfully."
            messageType = "SUCCESS"
            heading = "Record Deleted."
            CharityLog("DELETED POST " + data![0].title, error)
        }

        revalidatePath('/');
    };

    return (

        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>

            <TableContainer>
                {charity_member?.map(member => (
                    <TableHeaderButton key={member.charity?.name} header={member.charity.name + "'s Posts"}>
                        <SlideOver title="Create Post Details" buttontext={"Create Post"} variant="solid" color="blue">
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

                                <ImageUpload folderName="campaign_post" charityID={charityId} recordID={post_id![0] + 1} labelText="Upload Image" />

                                <div className="col-span-full">
                                    <Button type="submit" variant="solid" color="blue" className="w-full">
                                        <span>
                                            Save Post <span aria-hidden="true">&rarr;</span>
                                        </span>
                                    </Button>
                                </div>
                            </form>
                            <DisplayMessage content={message} type={messageType} heading={heading} />
                        </SlideOver>
                    </TableHeaderButton>
                ))}
                <br />
                <SlideOver title="Filter & Sort Data" buttontext="Filter & Sort Data" variant="solid" color="yellow">
                    <div className="flex-col">
                        <form className='flex flex-col w-full gap-y-6' action="/dashboard/posts" method="GET">
                            <div className="flex flex-col"> {/* Flex container for the first column */}
                                <label className="block text-sm font-medium text-gray-700">Sort by:</label>
                                <br />
                                <SelectField
                                    name="column"
                                    required
                                >
                                    <option value={"id"}>id</option>
                                    <option value={"title"}>title</option>
                                    <option value={"date posted"}>date posted</option>
                                </SelectField>
                            </div>
                            <div className="flex mt-4 gap-x-5 items-center"> {/* Flex container for the second column */}
                                <label className="block text-sm font-medium text-gray-700">Order as:</label>
                                <div className="flex gap-x-4 items-center">
                                    <div className="flex items-center">
                                        <input
                                            id="option1"
                                            name="order"
                                            type="radio"
                                            value={true}
                                            checked
                                            className="h-4 w-4 border-gray-300 text-green-700 focus:ring-green-700"
                                        />
                                        <label htmlFor="option1" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                            Ascending
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="option2"
                                            name="order"
                                            type="radio"
                                            value={false}
                                            className="h-4 w-4 border-gray-300 text-green-700 focus:ring-green-700"
                                        />
                                        <label htmlFor="option2" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                            Descending
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col items-center mt-4'> {/* Flex container for the third column */}
                                <Button type='submit' variant='solid' color='green' className='w-64'>
                                    <span>
                                        Apply Changes <span aria-hidden="true">&rarr;</span>
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </SlideOver>
                <div className="font-bold mt-4 mb-4">
                    {column && order ? (
                        <>
                            <p className="text-green-700 inline">Current Filters: </p>
                            <span>Sorted by: {column} <span className="text-green-700">::</span> Ordered by: {orderby}</span>
                        </>
                    ) : (
                        <p className="text-gray-600 italic">No filters currently active</p>
                    )}
                </div>
                <div className="bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:max-w-4xl">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Campaign Posts</h2>
                            <p className="mt-2 text-lg leading-8 text-gray-600">
                                Here you can see this charity&apos;s posts.
                            </p>
                            <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
                                {posts?.map((post) => (

                                    < article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                                        <ShowImg folder1={"campaign_post"} charityID={charityId} recordID={post.id} />
                                        <div>
                                            <div className="flex items-center gap-x-4 text-xs">
                                                <time dateTime={post.date_posted} className="text-gray-500">
                                                    {formatDate(post.date_posted) + ' ' + formatTime(post.date_posted)}
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
                                                    {/*WHERE THE IMAGE WOULD GO BASED ON THE POSTID*/}
                                                    <img src="#" alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                                    <div className="text-sm leading-6 grid grid-cols-4 gap-4">
                                                        <div className="col-span-3">
                                                            <p className="font-semibold text-gray-900">

                                                                {post.decrypted_charity_member?.decrypted_member_name}
                                                            </p>
                                                            <p className="text-gray-600">{post.charity?.name}</p>
                                                        </div>
                                                        <SlideOver title="Edit Post Details" buttontext="View Details" variant="solid" color="blue">
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
                                                                    <br />
                                                                    <br />
                                                                    <Button type="submit" variant="solid" color="red" className="w-full" formAction={deletePost}>
                                                                        <span>
                                                                            Delete <span aria-hidden="true">&rarr;</span>
                                                                        </span>
                                                                    </Button>
                                                                </div>
                                                            </form>
                                                            <DisplayMessage content={message} type={messageType} heading={heading} />
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
            </TableContainer >
        </>

    )
} 