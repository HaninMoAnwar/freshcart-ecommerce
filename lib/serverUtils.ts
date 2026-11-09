import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getAccessToken() {
    const encodedDevToken = (await cookies()).get("next-auth.session-token")?.value;
    const encodedProdToken = (await cookies()).get("__Secure-next-auth.session-token")?.value;
    const decoded = await decode({ secret: process.env.NEXTAUTH_SECRET!, token: encodedDevToken ? encodedDevToken : encodedProdToken });
    const accessToken = decoded?.accessToken as string | undefined;

    return accessToken;
}
export async function getUserId() {
    const encodedDevToken = (await cookies()).get("next-auth.session-token")?.value;
    const encodedProdToken = (await cookies()).get("__Secure-next-auth.session-token")?.value;
    const decoded = await decode({ secret: process.env.NEXTAUTH_SECRET!, token: encodedDevToken ? encodedDevToken : encodedProdToken });
    const userId = decoded?.sub as string | undefined;

    return userId;
}