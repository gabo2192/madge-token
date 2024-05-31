"use client";
import { Layout } from "@components/layout";
import Web3Auth from "@components/web3-auth";

export default function Page(): JSX.Element {
  return (
    <Layout>
      <h2 className="text-3xl mt-12 mb-4">Connect your Wallet</h2>
      <Web3Auth />
    </Layout>
  );
}
