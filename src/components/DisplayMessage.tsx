
'use client'
import { Failure, Success } from "./Feedback";
import { useRouter } from 'next/router';

function Message({ content, type, heading }: any) {

    const router = useRouter()

    const handleRefresh = () => {
        router.reload();
    };

    if (type == 'ERROR') {
        handleRefresh
        return <Failure heading={heading} content={content} />;
    }
    else if (type == 'SUCCESS') {
        handleRefresh
        return <Success heading={heading} content={content} />;
    }
}

export function DisplayMessage({ content, type, heading }: any) {

    return (
        <>
            <Message content={content} type={type} heading={heading} />
        </>
    )
}