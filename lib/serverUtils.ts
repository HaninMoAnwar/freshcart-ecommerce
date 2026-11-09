import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getAccessToken() {
    const encodedToken = (await cookies()).get("next-auth.session-token")?.value;
    const decoded = await decode({ secret: process.env.NEXTAUTH_SECRET!, token: encodedToken });
    const accessToken = decoded?.accessToken as string | undefined;

    return accessToken;
}
export async function getUserId() {
    const encodedToken = (await cookies()).get("next-auth.session-token")?.value;
    const decoded = await decode({ secret: process.env.NEXTAUTH_SECRET!, token: encodedToken });
    const userId = decoded?.sub as string | undefined;
    
    return userId;
}