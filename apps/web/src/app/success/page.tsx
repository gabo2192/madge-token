import { Layout } from "@components/layout";

export default async function CheckEligibility() {
  return (
    <Layout>
      <p className="mt-4 text-6xl text-white font-koulen text-center">
        🎉 Congratulations! 🎉
      </p>
      <p className="text-4xl mb-4 text-white text-center">
        Now you have $MAD tokens!
      </p>
    </Layout>
  );
}
