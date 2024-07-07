import { ConnectWallet } from "@/components/client/connect-wallet";

export default function Page() {
  return (
    <>
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
    </>
  );
}
