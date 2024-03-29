// @ts-nocheck 
import supabase from "./supabase";

export async function DisplayImage(folder1: any, charityID: any, recordID: any) {
    const { data: images, error: image_error } = await supabase
        .storage
        .from('uploads')
        .list(folder1?.toString() + "/" + charityID?.toString() + "/" + recordID?.toString(), {
            limit: 1,
            offset: 0,
            sortBy: { column: "created_at", order: "asc" },
        })
    const img_name = images?.map(image => image.name)

    const CDNURL = "https://dkvtrmaiscnbjtfxpurj.supabase.co/storage/v1/object/public/uploads/" + folder1 + "/" + charityID + "/" + recordID + "/" + img_name
    return CDNURL as string
} 

export function DownloadImage(path: any) {

    const { data } = supabase
        .storage
        .from('uploads')
        .getPublicUrl(path?.toString(), {
            download: true,
        })
} 