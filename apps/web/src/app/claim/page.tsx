import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { generateMerkleTreeProof } from "@/utils/generate-merkle-tree";
import { Layout } from "@components/layout";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { ClaimButton } from "./components/claim-button";

export default async function CheckEligibility() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  if (!session?.user?.pubkey) {
    signOut();
    return redirect("/");
  }
  console.log({ session });
  try {
    const proof = generateMerkleTreeProof(session?.user?.pubkey);
    console.log({ proof });
    if (!proof) {
      return redirect("/not-eligible");
    }
  } catch {
    return redirect("/not-eligible");
  }
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("address", session?.user?.pubkey);
  if (error) {
    return redirect("/error");
  }

  if (!data || data.length === 0) {
    redirect("/");
  }

  const user = data[0];

  if (user.claimed) {
    return redirect("/already-claimed");
  }

  if (error) {
    return redirect("/error");
  }

  return (
    <Layout>
      <p className="text-6xl mt-12 mb-4 text-white text-center">
        🎉 Congratulations! 🎉
      </p>
      <p className="text-4xl mb-4 text-white text-center">
        You are eligible for the <br />
        1st wave of the $MAD airdrop!
      </p>
      <ClaimButton />
    </Layout>
  );
}
