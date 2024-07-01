import { XLogo } from "@/assets/twitter-logo";
import { CheckEligibility } from "@/components/client/check-eligibility";
import { ConnectWallet } from "@/components/client/connect-wallet";
import { MainLayout } from "@/components/layouts/main-layout";
import { Hero } from "@/components/sections/hero";

export default function Page() {
  return (
    <MainLayout className=" flex flex-col justify-center">
      <Hero />
      <h2 className="font-koulen text-5xl text-center mb-4 max-w-lg mx-auto">
        We're creating a mem ecosystem on{" "}
        <span className="text-accentBrand">Rootstock</span>
      </h2>
      <p className="text-base font-medium text-center mb-8 max-w-sm mx-auto">
        Connect your wallet to check your{" "}
        <span className="text-brand">$MAD</span> airdrop status
      </p>
      <div className="flex justify-center items-center mb-10 flex-col gap-4 w-max mx-auto">
        <ConnectWallet />
        <CheckEligibility />
      </div>
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
