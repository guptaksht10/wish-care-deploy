import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {prisma} from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


export const runtime = "nodejs";

const authOptions = {
    session: {
        strategy: "jwt"
    },

    pages: {
        signIn: "/auth/login"
    },

    providers: [
        GoogleProvider(
            {
                clientId: process.env.GOOGLE_CLIENT_ID !,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET !
            }
        ),

        CredentialsProvider(
            {
                name: "credentials",

                credentials: {
                    identifier: {
                        label: "Email or Username",
                        type: "text",
                        placeholder: "you@example.com"
                    },

                    password: {
                        label: "Password",
                        type: "password"
                    }
                },

                async authorize(credentials) {
                    if (!credentials ?. identifier || !credentials ?. password) {
                        throw new Error("Missing credentials");
                    }

                    const user = await prisma.user.findFirst({
                        where: {
                            OR: [
                                {
                                    email: credentials.identifier
                                }, {
                                    username: credentials.identifier
                                },
                            ]
                        }
                    });

                    if (! user || ! user.password) {
                        throw new Error("User not found");
                    }

                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                    if (! isPasswordValid) {
                        throw new Error("Invalid password");
                    }


                    return {
                        id: user.id,
                        name: user.name ?? "",
                        email: user.email ?? "",
                        image: user.image ?? "", // important

                        username: user.username ?? "",
                        role: user.role ?? "USER"
                    };


                }
            }
        ),
    ],

    callbacks: {
        async jwt(
            {token, user} : any
        ) {
            if (user) {
                const dbUser = await prisma.user.findUnique({
                    where: {
                        email: user.email
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        username: true,
                        image: true,
                        role: true
                    }
                });

                if (dbUser) {
                    token = {
                        ...token,
                        ... dbUser
                    };
                } else {
                    const newUser = await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            image: user.image
                        }
                    });

                    token.id = newUser.id;
                }
            }

            return token;
        },

        async session(
            {session, token} : any
        ) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.username = token.username;
                session.user.image = token.image;
                session.user.role = token.role;
            }

            return session;
        },

        redirect(
            {url, baseUrl} : any
        ) {
            if (url.startsWith("/")) 
                return `${baseUrl}${url}`;
            


            if (url.startsWith(baseUrl)) 
                return url;
            


            return baseUrl;
        }
    }
};

const handler = NextAuth(authOptions as any);

export {
    handler as GET,
    handler as POST
};
