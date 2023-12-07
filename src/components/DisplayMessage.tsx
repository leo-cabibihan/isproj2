
'use client'
import { Failure, Success } from "./Feedback";

function Message({ content, type, heading }: any) {

    if (type == 'ERROR') {

        return (

            <div className="min-h-screen flex items-end justify-center">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                <Failure heading={heading} content={content} />
            </div>

        );
    }
    else if (type == 'SUCCESS') {

        return (

            <div className="min-h-screen flex items-end justify-center">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                <Success heading={heading} content={content} />
            </div>

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