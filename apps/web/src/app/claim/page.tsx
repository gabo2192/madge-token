import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { ButtonLink } from "@components/button-link";
import { Layout } from "@components/layout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CheckEligibility() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
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

  const { data: whitelistData, error: whitelistError } = await supabase
    .from("whitelist")
    .select("*")
    .eq("address", user.address);

  if (error) {
    return redirect("/error");
  }
  if (!whitelistData || whitelistData.length === 0) {
    return redirect("/not-eligible");
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
      <ButtonLink href="/success" size="lg" className="text-2xl">
        Claim Airdrop
      </ButtonLink>
    </Layout>
  );
}
