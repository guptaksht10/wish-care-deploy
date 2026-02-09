import { getServerSession } from "next-auth";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",

      credentials: {
        identifier: {
          label: "Email or Username",
          type: "text",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials: any) {
        if (!credentials?.identifier || !credentials?.password) return null;

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          },
        });

        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!valid) return null;

        return user;
      },
    }),
  ],
};

export const getAuthSession = () => getServerSession(authOptions);
