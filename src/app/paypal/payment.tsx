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

export default function TestPage({ ID, UserID }: any) {

    const [eventslist, setEventsList] = useState<any>([])
    const [eventID, setEventID] = useState('')
    const [amount, setAmount] = useState(0)
    const moneh = "100.00"



    const initialOptions = {
        "client-id": "Acdo2IOJiiihwISa_-GfchSLPkA4rdf9JrtbWWHyG6y_dKJOg-8Zh7zNp9DGLIX9eRAyxcTx9DFe_gqu",
        "enable-funding": "paylater,venmo,card",
        "disable-funding": "",
        "data-sdk-integration-source": "integrationbuilder_sc",
    };

    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('event')
                .select('*')
                .eq('charity_id', ID)
                .eq('is_ongoing', true)
                .eq('approval_status', 'APPROVED').order('id', { ascending: true })
            setEventsList(data!)

            setEventsList(data!)

            console.log("DEBUG RESULTS FOR THE CASH FORM: ", data + ". ERROR IS: ", error)
        }

        fetchData()
    }, [])

    const submit = async (e: any) => {
        e.preventDefault()
        const rawResponse = await fetch(
            `https://isproj2.vercel.app/${ID}/details/cash`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    charity_id: ID,
                    donor_id: UserID,
                    is_external: false,
                    event_id: eventID,
                }),
            },
        )
    }

    return (
        <>
            <form className="mt-10 grid grid-cols-1 gap-y-8">
                <div className="space-y-12"></div>
                <div className="border-b border-gray-900/10 pb-12"></div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Donate Cash
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <TextField
                            label="Amount"
                            name="amount"
                            type="number"
                            autoComplete="number"
                            step="0.01"
                            min="100"
                            max="100000"
                            placeholder="0.00"
                            required
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        <SelectField
                            className="col-span-full py-5"
                            label="Choose Event to Donate to"
                            name="event_id"
                            onChange={(e) => setEventID(e.target.value)}
                            required
                        >
                            {eventslist?.map((form: any) => (
                                <option key={form.id} value={form.id}>
                                    {form.name}
                                </option>
                            ))}
                        </SelectField>
                    </div>
                </div>
            </form>
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={{
                        shape: "pill",
                        layout: "vertical",
                    }}
                    createOrder={async () => {
                        try {

                            console.log(JSON.stringify(
                                {
                                    "intent": "CAPTURE",
                                    "purchase_units": [
                                        {
                                            "amount": {
                                                "currency_code": "USD",
                                                "value": `${moneh}`
                                            }
                                        }],
                                }))

                            console.log(JSON.stringify(
                                {
                                    "intent": "CAPTURE",
                                    "purchase_units": [
                                        {
                                            "amount": {
                                                "currency_code": "USD",
                                                "value": "100"
                                            }
                                        }],
                                }))

                            const payload = {
                                "intent": "CAPTURE",
                                "purchase_units": [
                                    {
                                        "amount": {
                                            "currency_code": "USD",
                                            "value": `${moneh}`
                                        }
                                    }],
                            }

                            console.log(payload)
                            console.log(`AMOUNT BEING PASSED IN IS - USD ${moneh}`)

                            const response = await fetch("/paypal/orders", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                // use the "body" param to optionally pass additional order information
                                // like product ids and quantities
                                body: JSON.stringify(payload)
                            });

                            const orderData = await response.json();

                            if (orderData.id) {
                                return orderData.id;
                            } else {
                                const errorDetail = orderData?.details?.[0];
                                const errorMessage = errorDetail
                                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                                    : JSON.stringify(orderData);

                                throw new Error(errorMessage);
                            }
                        } catch (error) {
                            console.error(error);
                            setMessage(`Could not initiate PayPal Checkout...${error}`);
                        }
                    }}
                    onApprove={async (data, actions) => {
                        try {
                            const response = await fetch(
                                `/paypal/orders/capture`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        ID: data.orderID
                                    })
                                },
                            );

                            const orderData = await response.json();
                            // Three cases to handle:
                            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                            //   (2) Other non-recoverable errors -> Show a failure message
                            //   (3) Successful transaction -> Show confirmation or thank you message

                            const errorDetail = orderData?.details?.[0];

                            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                                return actions.restart();
                            } else if (errorDetail) {
                                // (2) Other non-recoverable errors -> Show a failure message
                                throw new Error(
                                    `${errorDetail.description} (${orderData.debug_id})`,
                                );
                            } else {
                                // (3) Successful transaction -> Show confirmation or thank you message
                                // Or go to another URL:  actions.redirect('thank_you.html');
                                const transaction =
                                    orderData.purchase_units[0].payments.captures[0];
                                setMessage(
                                    `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
                                );
                                console.log(
                                    "Capture result",
                                    orderData,
                                    JSON.stringify(orderData, null, 2),
                                );
                            }
                        } catch (error) {
                            console.error(error);
                            setMessage(
                                `Sorry, your transaction could not be processed...${error}`,
                            );
                        }
                    }}
                />
            </PayPalScriptProvider>
            <Message content={message} />
        </>
    )

} 