import { getAccessToken, handleResponse } from "@/app/utils/paypal";
import { NextResponse } from "next/server";

const base = "https://api-m.sandbox.paypal.com";
const PLAN_ID = "ERRSUB033"

const createSubscription = async (userAction = "SUBSCRIBE_NOW") => {
    const url = `${base}/v1/billing/subscriptions`;
    const accessToken = await getAccessToken();
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            Prefer: "return=representation",
        },
        body: JSON.stringify({
            plan_id: PLAN_ID,
            application_context: {
                user_action: userAction,
            },
        }),
    });

    return handleResponse(response);
};

export async function POST(req: Request) {
    try {
        // use the cart information passed from the front-end to calculate the order amount detals
        // const requestData = await req.json();
        // const purchase_units = requestData.purchase_units
        // const intent = requestData.intent
        // console.log(`PURCHASE UNITS ${purchase_units}`)
        const { jsonResponse, httpStatusCode } = await createSubscription();
        return NextResponse.json(jsonResponse, { status: httpStatusCode })
        // return res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        return NextResponse.json({ error: "Failed to create order." }, { status: 500 })

        // return res.status(500).json({ error: "Failed to create order." });
    }
}
