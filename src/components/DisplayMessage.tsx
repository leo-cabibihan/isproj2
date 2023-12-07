
'use client'
import Success from "./modals/Success";
import Failure from "./modals/Failure";

function Message({ content, type, heading }: any) {

    if (type == 'ERROR') {

        return (
            <Success heading={heading} content={content} />
        );
    }
    else if (type == 'SUCCESS') {

        return (
            <Failure heading={heading} content={content} />
        );
    }
}

export function DisplayMessage({ content, type, heading }: any) {

    return (
        <>
            <Message content={content} type={type} heading={heading} />
        </>
    )
}