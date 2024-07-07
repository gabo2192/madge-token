import { XLogo } from "@/assets/twitter-logo";
import { MainLayout } from "@/components/layouts/main-layout";
import { Hero } from "@/components/sections/hero";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <MainLayout className="py-8 w-[90vw] mx-auto px-3 max-w-2xl flex flex-col justify-center lg:max-w-5xl min-h-screen lg:min-h-[calc(100vh-72px)]">
      <Hero />
      {children}
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
