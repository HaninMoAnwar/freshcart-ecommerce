"use server"

import { getAccessToken } from "@/lib/serverUtils";
import { updateTag } from "next/cache";

const baseUrl = process.env.BASE_URL;
export async function getUserCart() {
    const accessToken = await getAccessToken();
    const response = await fetch(`${baseUrl}/api/v2/cart`
        , {
            headers: {
                token: accessToken || "",

            },
            cache: 'no-cache',
            next: { tags: ["userCartDetails"] }
        });
    const data = await response.json();
    return data;

}
export async function updateCartProductQnt(productId: string, count: number) {
    const accessToken = await getAccessToken();
    const response = await fetch(`${baseUrl}/api/v2/cart/${productId}`
        , {
            method: "PUT",
            headers: {
                token: accessToken || "",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ count: count }),
            cache: 'force-cache',

        });
    const data = await response.json();
    if (data.status === "success") {
        updateTag("userCartDetails")
    }
    return data;

}

export async function addToCart(productId: string) {
    const accessToken = await getAccessToken();
    const response = await fetch(`${baseUrl}/api/v2/cart`
        , {
            method: "POST",
            headers: {
                token: accessToken || "",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }),
            cache: 'force-cache'
        });
    const data = await response.json();
    return data;

}
export async function deleteProductFromCart(productId: string) {
    const accessToken = await getAccessToken();
    const response = await fetch(`${baseUrl}/api/v2/cart/${productId}`
        , {
            method: "DELETE",
            headers: {
                token: accessToken || "",
                "Content-Type": "application/json",
            },
            cache: 'force-cache'
        });
    const data = await response.json();
    if (data.status === "success") {
        updateTag("userCartDetails")
    }
    return data;

}
export async function deleteCart() {
    const accessToken = await getAccessToken();
    const response = await fetch(`${baseUrl}/api/v2/cart`
        , {
            method: "DELETE",
            headers: {
                token: accessToken || "",
                "Content-Type": "application/json",
            },
            cache: 'force-cache'
        });
    const data = await response.json();
    if (data.status === "success") {
        updateTag("userCartDetails")
    }
    return data;

}
