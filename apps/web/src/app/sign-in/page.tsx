import { authOptions } from "@/lib/auth";
import { Layout } from "@components/layout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { VerifyMessage } from "./components/verify-message";

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/check-eligibility");
  }
  return (
    <Layout>
      <h2 className="text-3xl mt-12 mb-4">Sign in</h2>
      <VerifyMessage />
    </Layout>
  );
}
