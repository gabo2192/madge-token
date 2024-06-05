import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { generateMerkleTreeProof } from "@/utils/generate-merkle-tree";
import { Layout } from "@components/layout";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { ClaimButton } from "./components/claim-button";

const merkleTree = {
  message: {
    format: "standard-v1",
    tree: [
      "0x37eee72f8340d39242bc4a89e4e69dd130223758745d247a228ef701960e1da9",
      "0x4a3b83394da18dd9ada80892ed8d2e473e160565ee682cdaba2614a87d512583",
      "0xdb05cdb83f61f82532304a50736a9852bd797bf67ec2f5d58761b45f4643594b",
      "0xa4243e93974c86c8a46af9e4a0af5da9400aa219b87ff8c251b61d8537ee236c",
      "0x66bfc844d85b69baa5b1e32837488d5cfa42fce3247f6659340fbe49151ff483",
    ],
    values: [
      {
        value: ["0x69AC3CA03500EdB313225f8C3E3C832bdDa1B54A", "1000000000"],
        treeIndex: 2,
      },
      {
        value: ["0xe0Be033b9Ec0c2AE077315b1BFdbB1b39F05B6F4", "1000000000"],
        treeIndex: 4,
      },
      {
        value: ["0x187eaE39Fc8CD088714A40B56b3572e30210338F", "1000000000"],
        treeIndex: 3,
      },
    ],
    leafEncoding: ["address", "uint256"],
  },
};

export default async function CheckEligibility() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  if (!session?.user?.pubkey) {
    signOut();
    return redirect("/");
  }
  try {
    const proof = generateMerkleTreeProof(session?.user?.pubkey);
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
