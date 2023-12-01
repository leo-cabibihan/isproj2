
import fetch, { Response } from "node-fetch";
import path from "path";
import { getAccessToken } from "@/app/utils/paypal";
import { handleResponse } from "@/app/utils/paypal";
import { NextResponse } from "next/server";
const client_id = process.env.PAYPAL_CLIENT_ID
const client_secret = process.env.PAYPAL_CLIENT_SECRET
const base = "https://api-m.sandbox.paypal.com";

const createOrder = async (purchase_units: any, intent: any) => {
  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    intent,
    purchase_units,
  );

  const accessToken = await getAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: intent,
    purchase_units: purchase_units,
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};


// app.post("/api/orders", async (req, res) => {
//     try {
//         // use the cart information passed from the front-end to calculate the order amount detals
//         const { cart } = req.body;
//         const { jsonResponse, httpStatusCode } = await createOrder(cart);
//         res.status(httpStatusCode).json(jsonResponse);
//     } catch (error) {
//         console.error("Failed to create order:", error);
//         res.status(500).json({ error: "Failed to create order." });
//     }
// });


export async function POST(req: Request) {

  
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const requestData = await req.json();
    const purchase_units = requestData.purchase_units
    const intent = requestData.intent
    const { jsonResponse, httpStatusCode } = await createOrder(purchase_units, intent);
    return NextResponse.json(jsonResponse, {status: httpStatusCode})
    // return res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "Failed to create order." }, {status: 500})

    // return res.status(500).json({ error: "Failed to create order." });
  }

}