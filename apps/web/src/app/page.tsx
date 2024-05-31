"use client";
import { Layout } from "@components/layout";
import Web3Auth from "@components/web3-auth";

export default function Page(): JSX.Element {
  return (
    <Layout>
      <p className="mt-4 text-6xl text-white font-koulen text-center">
        We're creating a meme <br /> ecosystem on{" "}
        <span className="text-[#FF9100]">Rootstock</span>.
      </p>
      <p className="text-center text-4xl text-white font-koulen mt-12">
        Connect your Wallet to check
        <br /> your <span className="text-primary">$MAD</span> airdrop status
      </p>
      <div className="flex items-center justify-center mt-4">
        <Web3Auth theme="dark" />
      </div>
    </Layout>
  );
}
