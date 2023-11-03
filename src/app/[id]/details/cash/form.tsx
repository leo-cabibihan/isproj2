'use server'
import { ShowImg } from "@/components/DisplayImg";

export async function ShowQr (ID : any , recordID : any) {
    return (
        <ShowImg folder1={"charity"} charityID={ID} recordID={recordID}/>
    )
}