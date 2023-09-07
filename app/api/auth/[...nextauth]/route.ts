import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                // console.log("credentials", credentials);

                try {
                    const res = await fetch(
                        "http://localhost:4000/api/v1/auth/login",
                        {
                            method: "POST",
                            body: JSON.stringify(credentials),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (res.status === 401) {
                        console.log(res.statusText);
                        return null;
                    }

                    const user = await res.json();
                    console.log("user", user);
                    return user;
                } catch (error) {
                    console.error("Authentication error:", error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },

    callbacks: {
        async jwt({ token, user }) {
            // console.log({ token, user });
            if (user) return { ...token, ...user };
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            session.access_token = token.access_token;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
