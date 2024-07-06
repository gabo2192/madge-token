import { XLogo } from "@/assets/twitter-logo";
import { ClaimButton } from "@/components/client/claim-button";
import { ConnectWallet } from "@/components/client/connect-wallet";
import { MainLayout } from "@/components/layouts/main-layout";
import { Hero } from "@/components/sections/hero";
import { getUser } from "@/lib/user/get-user";
import { checkUserSession } from "@/utils/check-session";
import { generateProof } from "@/utils/generate-proof";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await checkUserSession();
  if (!session) {
    return redirect("/");
  }
  // check eligibility
  let proof: `0x${string}`[];
  let value: number;
  try {
    const res = generateProof(session.pubkey);

    if (!res) {
      return redirect("/not-eligible");
    }
    proof = res.proof as `0x${string}`[];
    value = res.values[1];
  } catch {
    return redirect("/not-eligible");
  }

  const { data, error } = await getUser(session.pubkey);

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
    <MainLayout className="py-8 w-[90vw] mx-auto px-3 max-w-2xl flex flex-col justify-center lg:max-w-5xl min-h-screen lg:min-h-[calc(100vh-72px)]">
      <Hero />
      <h2 className="font-koulen text-5xl text-center mb-4 max-w-lg mx-auto">
        Congratulations!
      </h2>
      <p className="text-base font-medium text-center mb-8 max-w-sm mx-auto">
        You are eligible for the 1st wave of the
        <span className="text-brand">$MAD</span> airdrop!
      </p>
      <div className="flex justify-center items-center mb-10 flex-col gap-4 mx-auto">
        <ConnectWallet />
        <ClaimButton amount={BigInt(value)} proof={proof} />
      </div>
      <p className="text-base font-medium text-center mb-10 max-w-sm mx-auto">
        You need <span className="text-accentBrand">$RBTC</span> to claim your
        tokens. Get it{" "}
        <a
          href="https://app.symbiosis.finance/swap"
          target="_blank"
          className="underline"
        >
          here
        </a>
        .
      </p>
      <div className=" md:mt-auto">
        <div className="text-base font-medium items-center flex flex-col gap-2">
          Contact
          <a href="https://x.com/madgeymooo" target="_blank" rel="noreferrer">
            <XLogo className="size-10" />
          </a>
        </div>
      </div>
    </MainLayout>
  );
}
