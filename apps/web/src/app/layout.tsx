import "@rainbow-me/rainbowkit/styles.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter, Koulen } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { SessionProvider } from "@/context/session-provider";
import { UserProvider } from "@/context/user-provider";
import Providers from "./providers";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const koulen = Koulen({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-koulen",
});

const monaSans = localFont({
  src: "../fonts/Mona-Sans.var.woff2",
  display: "swap",
  variable: "--font-mona-sans",
  weight: "200 900",
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
      className={clsx(
        "h-full antialiased",
        inter.variable,
        koulen.variable,
        monaSans.className
      )}
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-primary">
        <SessionProvider>
          <Providers>
            <UserProvider>{children}</UserProvider>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
