
'use client'
import { Failure, Success } from "./Feedback";
import { useRouter } from 'next/router';

function Message({ content, type, heading }: any) {
    if (type == 'ERROR') {
        return <Failure heading={heading} content={content} />;
    }
    else if (type == 'SUCCESS') {
        return <Success heading={heading} content={content} />;
    }
}

export function DisplayMessage({ content, type, heading }: any) {

    const message = String(content)
    const variant = String(type)
    const hed = String(heading)

    console.log(`TESTING B4 NEW STUFF: ${message}, ${variant}, ${hed}`)
    if (message.length === 0 && variant.length === 0 && hed.length === 0) {
        console.log("IT WORK")
    }
    else {
        console.log("NO WORK")
    }

    return (
        <>
            <Message content={message} type={variant} heading={hed} />
        </>
    )
}