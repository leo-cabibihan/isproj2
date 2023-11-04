// @ts-nocheck 
import supabase from "@/app/utils/supabase"

export default async function Page() {

    console.log("THIS IS A USER: " + await supabase.auth.getUser())
    console.log("THIS IS A SESSION: " + await supabase.auth.getSession())
    return (
        <>
            <div className="sm:flex sm:items-center py-9">
                <div className="sm:flex-auto">
                </div>
            </div>
            <p>Hello World</p>
        </>

    )
}