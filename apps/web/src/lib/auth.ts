import { ethers } from "ethers";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { supabase } from "./supabase";

export const secret = process.env.NEXTAUTH_SECRET!;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Rootstock",
      credentials: {
        message: {
          label: "Message",
          type: "text",
        },
        signature: {
          label: "Signature",
          type: "text",
        },
      },
      async authorize(credentials, req) {
        try {
          const csrfToken = await getCsrfToken({ req: { ...req, body: null } });

          if (!csrfToken || !credentials?.message || !credentials?.signature)
            return null;
          const walletAddress = ethers.verifyMessage(
            credentials?.message as string,
            credentials?.signature as string
          );
          if (!walletAddress) return null;
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("address", walletAddress);
          if (error) return null;
          if (!data || data.length === 0) {
            const { error } = await supabase
              .from("users")
              .insert([{ address: walletAddress }])
              .select("*");

            if (error) {
              return null;
            }
          }
          return {
            id: walletAddress,
          };
        } catch (e) {
          console.log({ e });
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore
      session.publicKey = token.sub;
      if (session.user) {
        session.user.pubkey = token.sub;
        session.user.image = `https://cat-avatars.vercel.app/api/cat?name=${token.sub}`;
      }
      return session;
    },
  },
} satisfies NextAuthOptions;

export const handler = NextAuth(authOptions);
