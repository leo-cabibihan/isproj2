import { redirect } from "next/navigation";

export function DisplayError (URL: any, error: any) {
    //CHECKS FOR ERRORS
    if (error) {
        //DISPLAYS ERROR MESSAGE IN PAGE
        return redirect(URL)
      }
}