import { SessionProvider } from "@/components/providers/session-provider";
import { UserProvider } from "@/components/providers/user-provider";
import Web3Provider from "@/components/providers/web3-providers";
import { Toaster } from "@/components/ui/toaster";
import "@rainbow-me/rainbowkit/styles.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { Koulen, Roboto_Mono } from "next/font/google";
import "./globals.css";

const roboto = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto" });

const koulen = Koulen({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-koulen",
});

export const metadata: Metadata = {
  title:
    "Madge Coin | We're building a Memecoin Ecosystem on Bitcoin | RootStock",
  description: "The 1st memecoin on Rootstock",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html
      className={clsx("h-full antialiased", roboto.variable, koulen.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground dark">
        <SessionProvider>
          <Web3Provider>
            <UserProvider>{children}</UserProvider>
          </Web3Provider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
