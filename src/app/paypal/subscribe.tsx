//@ts-nocheck
'use client'

import { ImageUpload } from "@/components/ImgUpload";
import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import supabase from "../utils/supabase";
import { SelectField, TextField } from "@/components/Fields";

function Message({ content }: any) {
    return <p>{content}</p>;
}

export default function SubscribeButton({ ID, UserID }: any) {

    const initialOptions = {
        "client-id": "Acdo2IOJiiihwISa_-GfchSLPkA4rdf9JrtbWWHyG6y_dKJOg-8Zh7zNp9DGLIX9eRAyxcTx9DFe_gqu",
        "enable-funding": "paylater,card",
        "disable-funding": "",
        "data-sdk-integration-source": "integrationbuilder_sc",
        vault: "true",
        intent: "subscription",
    };

    const [message, setMessage] = useState("");

    //HANDLES SUBSCRIPTIONS STUFF ON THE FRONTEND
    const handle = async () => {
        try {
            const response = await fetch("/paypal/subscriptions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userAction: "SUBSCRIBE_NOW" }),
            });
            const data = await response.json();
            if (data?.id) {
                setMessage(`Successful subscription...`);
                return data.id;
            } else {
                console.error(
                    { callback: "createSubscription", serverResponse: data },
                    JSON.stringify(data, null, 2),
                );
                // (Optional) The following hides the button container and shows a message about why checkout can't be initiated
                const errorDetail = data?.details?.[0];
                setMessage(
                    `Could not initiate PayPal Subscription...<br><br>${errorDetail?.issue || ""
                    } ${errorDetail?.description || data?.message || ""} ` +
                    (data?.debug_id ? `(${data.debug_id})` : ""),
                    { hideButtons: true },
                );
            }
        } catch (error) {
            console.error(error);
            setMessage(`Could not initiate PayPal Subscription...${error}`);
        }
    }

    const handler = handle

    return (
        <>
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={{
                        shape: "pill",
                        layout: "vertical",
                    }}
                    createOrder={handler}
                    onApprove={
                        async (data, actions) => {
                            /*
                              No need to activate manually since SUBSCRIBE_NOW is being used.
                              Learn how to handle other user actions from our docs:
                              https://developer.paypal.com/docs/api/subscriptions/v1/#subscriptions_create
                            */
                            if (data.orderID) {
                                setMessage(
                                    `You have successfully subscribed to the plan. Your subscription id is: ${data.subscriptionID}`,
                                );
                            } else {
                                setMessage(
                                    `Failed to activate the subscription: ${data.subscriptionID}`,
                                );
                            }
                        }
                    }
                />
            </PayPalScriptProvider>
            <Message content={message} />
        </>
    )

} 