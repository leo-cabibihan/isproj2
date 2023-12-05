
import fetch, { Response } from "node-fetch";
import path from "path";
import { getAccessToken } from "@/app/utils/paypal";
import { handleResponse } from "@/app/utils/paypal";
import { NextResponse } from "next/server";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import { CashReceiptEmail, ReceiptEmail } from "@/components/email-template";
const client_id = process.env.PAYPAL_CLIENT_ID
const client_secret = process.env.PAYPAL_CLIENT_SECRET
const base = "https://api-m.sandbox.paypal.com";

const plunk = new Plunk('sk_23f017252b1ab41fe645a52482d6925706539b7c70be37db')

const createInvoice = async (data: any) => {
    const raw_data = data
    const body = render(
        <CashReceiptEmail
            heading={"YOUR DONATION RECEIPT"}
            content={raw_data}
        />
    )
};

const sendInvoice = async (invoiceID: any) => {

    const accessToken = await getAccessToken();
    const url = `${base}/v2/invoicing/invoices/${invoiceID}/send`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'PayPal-Request-Id': 'b1d1f06c7246c'
        },
        body: JSON.stringify({ "send_to_invoicer": true })
    });

}

export async function POST(req: Request) {


    try {
        // use the cart information passed from the front-end to calculate the order amount detals
        const requestData = await req.json();
        const data = requestData.data;
        console.log(`INVOICE DETAILS ${data}`)
        const jsonResponse = await createInvoice(data);
        // return res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        return NextResponse.json({ error: "Failed to create order." }, { status: 500 })

        // return res.status(500).json({ error: "Failed to create order." });
    }

}