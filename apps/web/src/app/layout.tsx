import Web3ModalProvider from "@/context/web3-provider";
import "@repo/ui/styles.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter, Koulen } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
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
  title: "Madge Coin",
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
        <Web3ModalProvider>
          <Providers>{children}</Providers>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
