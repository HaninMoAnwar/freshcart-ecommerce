"use server"

import { shippingInfoFormSchema } from "@/app/schema/shippingInfo.schema";
import { getAccessToken, getUserId } from "@/lib/serverUtils";
import { revalidateTag, updateTag } from "next/cache";

const baseUrl = process.env.BASE_URL;


export async function onlineCheckoutHandler(cartId: string, shippingInfo: shippingInfoFormSchema) {
    const accessToken = await getAccessToken();
    const { paymentMethod, ...shippingData } = shippingInfo;
    const params = new URLSearchParams();
    params.append("url",process.env.NEXTAUTH_URL!)

    const response = await fetch(`${baseUrl}/api/v1/orders/checkout-session/${cartId}?${params}`
        , {
            method: "POST",
            headers: {
                token: accessToken || "",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                shippingAddress: {
                    ...shippingData
                }
            }),
            cache: 'force-cache'
        });

    const data = await response.json();
    if (data.status === "success") {
        updateTag("userCartDetails");
        updateTag("userOrders");
    }
    return data;
}
export async function cashCheckoutHandler(cartId: string, shippingInfo: shippingInfoFormSchema) {
    const accessToken = await getAccessToken();
    const { paymentMethod, ...shippingData } = shippingInfo;
    const response = await fetch(`${baseUrl}/api/v2/orders/${cartId}`
        , {
            method: "POST",
            headers: {
                token: accessToken || "",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                shippingAddress: {
                    ...shippingData
                }
            }),
            cache: 'force-cache'
        });

    const data = await response.json();
    if (data.status === "success") {
        updateTag("userCartDetails");
        updateTag("userOrders");
    }
    return data;
}
export async function getUserOrders() {
    const accessToken = await getAccessToken();
    const userId = await getUserId();
    const response = await fetch(`${baseUrl}/api/v1/orders/user/${userId}`
        , {
            method: "GET",
            headers: {
                token: accessToken || "",
                "Content-Type": "application/json",
            },
            next: { tags: ["userOrders"] },
            cache: 'force-cache'
        });

    const data = await response.json();

    return data;
}