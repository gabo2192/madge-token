import { Layout } from "@components/layout";
import Web3Auth from "@components/web3-auth";

export default async function CheckEligibility() {
  return (
    <Layout>
      <p className="text-6xl mt-12 mb-4 text-white text-center">
        😿 You’re not eligible. 😿
      </p>
      <p className="text-4xl mb-4 text-white text-center">
        If you think we’ve got that wrong, <br />
        contact us on{" "}
        <a
          href="https://x.com/madgeymooo"
          target="_blank"
          className="underline"
        >
          {" "}
          Twitter
        </a>
        , and let’s try to fix it!
      </p>
      <Web3Auth theme="dark" />
    </Layout>
  );
}
