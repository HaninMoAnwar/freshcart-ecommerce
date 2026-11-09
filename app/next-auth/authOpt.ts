import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from 'jwt-decode';
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "freshcart",
            credentials: {
                email: { label: "email", type: "email", placeholder: "name@example.com" },
                password: { label: "password", type: "password", placeholder: "Enter your password" },

            },

            async authorize(credentials, req) {

                const baseUrl = process.env.BASE_URL;
                const response = await fetch(`${baseUrl}/api/v1/auth/signin`,
                    {
                        method: 'POST',
                        body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
                        headers: { "Content-Type": "application/json" }
                    })
                const data = await response.json()
                const decodedToken = jwtDecode<{ id: string }>(data.token);

                // If no error and we have user data, return it
                if (response.ok && data) {

                    return {
                        id: decodedToken.id,
                        name: data.user.name,
                        email: data.user.email,
                        accessToken: data.token

                    }
                }
                // Return null if user data could not be retrieved
                return null
            }
        }),

    ],

    session: {
        maxAge: 60 * 60 * 24 * 7
    },
    callbacks: {
        jwt({ token, user }) {

            if (user) {
                token.accessToken = user.accessToken;
                token.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
            return token;
        },
        session({token,session}) {
            if(token){
                session.user = token.user
            }
            return session;
        }
    },
    pages: {
        signIn: '/login'
    }
}
