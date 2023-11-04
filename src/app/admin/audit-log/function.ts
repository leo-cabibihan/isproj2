// @ts-nocheck
import supabase from "@/app/utils/supabase";
import { GetUID } from "@/app/utils/user_id";

export async function AdminLog(action: any) {

    const userID = await GetUID()

    console.log("AUDITOR ID IS " + userID)

    const log = {
        admin_id: userID,
        action: action
    }

    const { data, error } = await supabase.from('admin_audit_log').insert(log)
    console.log("ERROR IS: ", error)
}

export async function CharityLog(action: any, crud_error: any) {
    const userID = await GetUID()
    const { data: charity_member, error: error_2 } = await supabase.from('charity_member').select('*, charity ( id, name )').eq('user_uuid', userID as string)
    const charity_id = charity_member?.map(member => member.charity?.id)

    const charityId = charity_id![0]

    if (!crud_error) {
        const log = {
            member_id: userID,
            action: action,
            charity_id: charityId
        }

        const { data, error } = await supabase.from('charity_audit_log').insert(log)
        console.log("ERROR IS: ", error)
    }
    else if (crud_error) {
        console.log("U suck lmao.")
    }
}
