import { Logo } from "@/assets/logo";
import { CasinoSession } from "@/components/client/casino-session";
import { MainLayout } from "@/components/layouts/main-layout";
import { SunIcon } from "@radix-ui/react-icons";

export default function Page() {
  return (
    <MainLayout>
      <h1 className="font-koulen text-6xl text-center">
        Welcome to <span className="text-brand"> $MAD casino</span>
      </h1>
      <div className="flex justify-center">
        <Logo />
      </div>
      <div className="w-4/5 ml-auto bg-slate-900 px-3 py-2 rounded-lg flex gap-2 items-top md:mx-auto max-w-md">
        <SunIcon className="flex-shrink-0 size-6 mt-2" />
        <p className="text-left text-white">
          Welcome to the $MAD casino! We offer a variety of games for you to
          play. To get started, sign in with your wallet.
        </p>
      </div>
      <CasinoSession />
    </MainLayout>
  );
}
