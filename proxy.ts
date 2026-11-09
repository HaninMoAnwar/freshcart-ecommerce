import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const ProtectedPaths = ["/cart", "/profile", "/settings", "/wishlist"];
const AuthPaths = ["/signup", "/login"];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET, secureCookie: process.env.NODE_ENV === "production" })

  // !token && (cart ||  profile || settings || wishlist)
  if (!token && ProtectedPaths.some((path) => path.startsWith(pathname))) {
    // redirect login
    return NextResponse.redirect(new URL('/login', request.url))
  }


  // token && (login || signup)
  if (token && AuthPaths.some((path) => path.startsWith(pathname))) {
    // redirect home
    return NextResponse.redirect(new URL('/', request.url))
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/wishlist/:path*",
    "/signup/:path*",
    "/login/:path*",
  ],
}