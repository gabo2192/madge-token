import Link from "next/link";
import { Logo } from "../../components/logo";
import { XLogo } from "../../components/twitter-logo";
import Web3Auth from "../../components/web3-auth";
import { Balance } from "./components/balance";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid lg:grid-cols-2 font-koulen uppercase min-h-screen">
        <div className=" bg-black flex items-center justify-center flex-col py-12 h-full">
          <h1 className="text-white text-6xl font-koulen text-center">
            MADGE COIN
          </h1>
          <h2 className="text-primary text-lg text-center font-koulen uppercase">
            The 1st memecoin on Rootstock.
          </h2>
          <div>
            <Link href="/">
              <Logo className="inline-block  w-auto rounded-full" />
            </Link>
          </div>
          <Web3Auth theme="dark" />
          <Balance />
          <a
            href="https://x.com/madgeymooo"
            target="_blank"
            className="  mt-40 text-center flex flex-col items-center"
          >
            <span className="block text-lg mb-4 ">Contact</span>
            <span className="size-8 text-white">
              <XLogo />
            </span>
          </a>
        </div>
        <main className="flex items-center justify-center flex-col text-black py-12 px-3 h-full">
          {children}
        </main>
      </div>
    </>
  );
}
