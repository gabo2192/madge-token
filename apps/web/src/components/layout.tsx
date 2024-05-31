import Image from "next/image";
import Link from "next/link";
import image from "../../public/symbiosis-finance.png";
import { Logo } from "./logo";
import { XLogo } from "./twitter-logo";
import Web3Auth from "./web3-auth";

export function Layout({ children }: { children: React.ReactNode }) {
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
          {children}
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
          <h1 className="text-7xl/tight text-center mb-4 ">
            <span className="text-white">Claim </span>$MAD
          </h1>
          <Web3Auth theme="light" />
          <ul className="list-disc mt-14 text-2xl">
            <li>Connect your wallet to sign-in</li>
            <li>check eligibility</li>
            <li>claim your $mad tokens - network fees apply </li>
          </ul>
          <p className="text-white text-2xl leading-relaxed mt-24 text-center">
            you need <span className="text-[#FF9100]">$rBTC</span> to claim your
            tokens.
            <br /> Get it{" "}
            <a
              href="https://app.symbiosis.finance/swap"
              target="_blank"
              className="underline"
            >
              here
            </a>
            .
          </p>
          <a
            href="https://app.symbiosis.finance/swap"
            target="_blank"
            className="p-3 bg-black rounded-full mt-4"
          >
            <Image
              src={image}
              alt="Symbiosis Finance"
              width={300}
              height={300}
              className="size-24 rounded-full"
            />
          </a>
          <a
            href="https://x.com/madgeymooo"
            target="_blank"
            className="  mt-40 text-center flex flex-col items-center"
          >
            <span className="block text-lg mb-4 ">Contact</span>
            <span className="size-8">
              <XLogo />
            </span>
          </a>
        </main>
      </div>
    </>
  );
}
