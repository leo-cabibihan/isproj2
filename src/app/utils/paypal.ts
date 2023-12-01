//@ts-nocheck
import fetch, { Response } from "node-fetch";
import path from "path";

const client_id = process.env.PAYPAL_CLIENT_ID
const client_secret = process.env.PAYPAL_CLIENT_SECRET
const base = "https://api-m.sandbox.paypal.com";

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */

export async function getAccessToken() {
    try {
        if (!client_id || !client_secret) {
            throw new Error("MISSING_API_CREDENTIALS");
        }
        const auth = Buffer.from(
            client_id + ":" + client_secret,
        ).toString("base64");
        const response = await fetch(`${base}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
    }
}