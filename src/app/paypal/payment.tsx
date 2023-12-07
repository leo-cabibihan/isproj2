//@ts-nocheck
'use client'

import { ImageUpload } from "@/components/ImgUpload";
import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import supabase from "../utils/supabase";
import { SelectField, TextField } from "@/components/Fields";
import { useRouter } from "next/navigation";
import { NumberValidation } from "../utils/input_validation";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";

function Failure({ heading, content }: any) {
    return (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{heading}</h3>
                    <div className="mt-2 text-sm text-red-700">
                        <p>
                            {content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Success({ heading, content }: any) {
    return (
        <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">{heading}</h3>
                    <div className="mt-2 text-sm text-green-700">
                        <p>
                            {content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Message({ content, type, heading }: any) {
    if (type == 'ERROR') {
        return <Failure heading={heading} content={content} />;
    }
    else if (type == 'SUCCESS') {
        return <Success heading={heading} content={content} />;
    }
}

function schizoAmount(amount: any) {
    const funds = amount
    console.log("YEAH???", funds, `${amount}`)
    sessionStorage.setItem("amount", `${amount}`)
    return funds
}

export default function TestPage({ ID, UserID }: any) {

    const router = useRouter()

    const [eventslist, setEventsList] = useState<any>([])
    const [eventID, setEventID] = useState('')
    const [amount, setAmount] = useState(0)
    const moneh = schizoAmount(amount)
    const test_amount = 500.00
    const createHandle = (amount: any) => {
        console.log("curry", amount)

    }

    sessionStorage.setItem("eventID", `${eventID}`)

    console.log("DOES THE SCHIZO WAY WORK? ", moneh, amount, eventID)

    const handle = async () => {
        try {

            console.log(`ACTUAL AMOUNT: ${moneh}. TEST AMOUNT: ${test_amount}`)
            const funds = sessionStorage.getItem("amount")
            console.log("DOES SESSION STORAGE WORK? ", funds)

            const funds_input = Number(funds)
            const valid_funds = NumberValidation(funds_input)

            if (valid_funds) {

                const payload = {
                    "intent": "CAPTURE",
                    "purchase_units": [
                        {
                            "amount": {
                                "currency_code": "USD",
                                "value": funds
                            }
                        }],
                }

                console.log(payload)

                const event = sessionStorage.getItem("eventID")
                console.log(`EVENT IS ${event}`)
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

            }
            else {

                setMessage("Amount must be non-negative");
                setMessageType('ERROR');
                setHeading('Invalid Input');

            }

        } catch (error) {
            console.error(error);
            setMessage(`Could not initiate PayPal Checkout...${error}`);
            setMessageType('ERROR');
            setHeading('Transaction Failed');
        }
    }

    const handler = handle

    const initialOptions = {
        "client-id": "Acdo2IOJiiihwISa_-GfchSLPkA4rdf9JrtbWWHyG6y_dKJOg-8Zh7zNp9DGLIX9eRAyxcTx9DFe_gqu",
        "enable-funding": "paylater,venmo,card",
        "disable-funding": "",
        "data-sdk-integration-source": "integrationbuilder_sc",
    };

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [heading, setHeading] = useState("");

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

    const submit = async (amount: any, receipt: any, transaction_id: any) => {
        const event_id = sessionStorage.getItem("eventID")
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
                    event_id: event_id,
                    receipt_data: receipt,
                    transaction_id: transaction_id
                }),
            },
        )
        router.push('/thankyou')
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
                            <option value={null}>Select an Event</option>
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
                    createOrder={handler}
                    onApprove={async (data, actions) => {
                        try {
                            const response = await fetch(
                                `/paypal/orders/${data.orderID}`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
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
                                    `Thank you for your donation! Please check your email inbox for the transaction receipt.`,
                                );
                                setMessageType('SUCCESS');
                                setHeading('Transaction Successful!')
                                console.log(
                                    "Capture result",
                                    orderData,
                                    JSON.stringify(orderData, null, 2),
                                );
                                const amount_paid = Number(orderData!.purchase_units[0]!.payments!.captures[0]!.amount!.value)
                                const transaction_id = orderData!.id
                                console.log(`WILL THIS WORK? MAYBE. THE AMOUNT IS: ${amount_paid}`)
                                submit(amount_paid, orderData, transaction_id);

                            }
                        } catch (error) {
                            console.error(error);
                            setMessage(
                                `Sorry, your transaction could not be processed...${error}`,
                            );
                            setMessageType('ERROR');
                            setHeading('Transaction Failed.');
                        }
                    }}
                />
            </PayPalScriptProvider>
            <Message content={message} type={messageType} heading={heading} />
        </>
    )

} 