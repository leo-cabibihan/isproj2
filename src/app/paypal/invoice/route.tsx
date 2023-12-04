
import fetch, { Response } from "node-fetch";
import path from "path";
import { getAccessToken } from "@/app/utils/paypal";
import { handleResponse } from "@/app/utils/paypal";
import { NextResponse } from "next/server";
const client_id = process.env.PAYPAL_CLIENT_ID
const client_secret = process.env.PAYPAL_CLIENT_SECRET
const base = "https://api-m.sandbox.paypal.com";

const createInvoice = async (amount: any) => {
    const accessToken = await getAccessToken();
    const url = `${base}/v2/invoicing/invoices`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({
            "detail": {
                "invoice_number": "#123",
                "reference": "deal-ref",
                "invoice_date": "2018-11-12",
                "currency_code": "USD",
                "note": "Thank you for your business.",
                "term": "No refunds after 30 days.",
                "memo": "This is a long contract",
                "payment_term": {
                    "term_type": "NET_10",
                    "due_date": "2018-11-22"
                }
            }, "invoicer": {
                "name": {
                    "given_name": "David",
                    "surname": "Larusso"
                },
                "address": {
                    "address_line_1": "1234 First Street",
                    "address_line_2": "337673 Hillside Court",
                    "admin_area_2": "Anytown",
                    "admin_area_1": "CA",
                    "postal_code": "98765",
                    "country_code": "US"
                },
                "email_address": "givemore.isproj2@gmail.com",
                "website": "www.test.com",
                "tax_id": "ABcNkWSfb5ICTt73nD3QON1fnnpgNKBy- Jb5SeuGj185MNNw6g",
                "logo_url": "https://example.com/logo.PNG",
                "additional_notes": "2-4"
            }, "primary_recipients": [
                {
                    "billing_info": {
                        "name": {
                            "given_name": "Stephanie",
                            "surname": "Meyers"
                        },
                        "address": {
                            "address_line_1": "1234 Main Street",
                            "admin_area_2": "Anytown",
                            "admin_area_1": "CA",
                            "postal_code": "98765",
                            "country_code": "US"
                        },
                        "email_address": "gaboparinas78@gmail.com",
                        // "phones": [{
                        //     "country_code": "063",
                        //     "national_number": "4884551234",
                        //     "phone_type": "HOME"
                        // }],
                        "additional_info_value": "add-info"
                    }
                    // "shipping_info": {
                    //     "name": {
                    //         "given_name": "Stephanie", "surname": "Meyers"
                    //     }, "address": { "address_line_1": "1234 Main Street", "admin_area_2": "Anytown", "admin_area_1": "CA", "postal_code": "98765", "country_code": "US" }
                    // }
                }],
            "items": [
                {
                    "name": "Cash Donation",
                    "description": "Elastic mat to practice yoga.",
                    "quantity": "1",
                    "unit_amount": {
                        "currency_code": "USD",
                        "value": `${amount}`
                    }
                }],
        })
    });

    return handleResponse(response);
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
        const amount = requestData.amount;
        console.log(`INVOICE AMOUNT ${amount}`)
        const jsonResponse = await createInvoice(amount);
        const invoice = jsonResponse.jsonResponse
        const to_send = await sendInvoice(invoice!.id)
        return NextResponse.json(invoice, { status: 200 })
        // return res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        return NextResponse.json({ error: "Failed to create order." }, { status: 500 })

        // return res.status(500).json({ error: "Failed to create order." });
    }

}