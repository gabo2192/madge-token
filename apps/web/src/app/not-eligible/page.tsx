import { Layout } from "@components/layout";

export default async function CheckEligibility() {
  return (
    <Layout>
      <h2 className="text-3xl mt-12 mb-4">
        Sorry you are not eligible for this airdrop.
      </h2>
    </Layout>
  );
}
