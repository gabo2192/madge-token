import { Layout } from "@components/layout";

export default async function CheckEligibility() {
  return (
    <Layout>
      <p className="text-lg mt-12 mb-4 text-primary text-center">
        🎉 Congratulations! 🎉
      </p>
      <p className="text-lg mb-4 text-primary text-center">
        Now you have $MAD tokens!
      </p>
    </Layout>
  );
}
