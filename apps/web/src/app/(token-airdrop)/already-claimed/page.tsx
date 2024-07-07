import { ConnectWallet } from "@/components/client/connect-wallet";

export default function Page() {
  return (
    <>
      <h2 className="font-koulen text-5xl text-center mb-4 max-w-lg mx-auto">
        You have already claim your tokens
      </h2>
      <div className="flex justify-center items-center mb-10 flex-col gap-4 w-max mx-auto">
        <ConnectWallet />
      </div>
    </>
  );
}
