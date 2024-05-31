import { Layout } from "@components/layout";
import Web3Auth from "@components/web3-auth";

export default async function CheckEligibility() {
  return (
    <Layout>
      <p className="text-lg mt-12 mb-4 text-primary text-center">
        😿 You’re not eligible. 😿
      </p>
      <p className="text-lg mb-4 text-primary text-center">
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
