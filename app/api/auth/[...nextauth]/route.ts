import { authOptions } from "@/app/next-auth/authOpt";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions)

export{handler as GET,handler as POST }