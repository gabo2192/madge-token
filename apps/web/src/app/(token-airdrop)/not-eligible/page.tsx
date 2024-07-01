import { XLogo } from "@/assets/twitter-logo";
import { ConnectWallet } from "@/components/client/connect-wallet";
import { MainLayout } from "@/components/layouts/main-layout";
import { Hero } from "@/components/sections/hero";

export default function Page() {
  return (
    <MainLayout className="py-8 w-[90vw] mx-auto px-3 max-w-2xl flex flex-col justify-center lg:max-w-5xl min-h-screen lg:min-h-[calc(100vh-72px)]">
      <Hero />
      <h2 className="font-koulen text-5xl text-center mb-4 max-w-lg mx-auto">
        😿 You’re not eligible. 😿
      </h2>
      <div className="flex justify-center items-center mb-10 flex-col gap-4 w-max mx-auto">
        <ConnectWallet />
      </div>
      <p className="text-base font-medium text-center mb-108 max-w-sm mx-auto">
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
