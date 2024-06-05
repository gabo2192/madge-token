"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import clsx from "clsx";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAccount, useSignMessage } from "wagmi";
import { Button } from "./button";

function Web3Auth({ theme }: { theme: "light" | "dark" }) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { status, data } = useSession();

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const csrf = await getCsrfToken();
      if (!address || !csrf) {
        return;
      }
      const message = `Sign this message to sign in to the app ${csrf}`;

      const signature = await signMessageAsync({ message });
      await signIn("credentials", {
        message: message,
        redirect: false,
        signature: signature,
      });
      router.push("/claim");
    } catch (error) {
      console.error(error);
    }
  };

  if (address && !data && status !== "loading") {
    return (
      <>
        <div className="flex flex-col gap-4">
          <ConnectButton />
          <Button
            size="lg"
            className={clsx("text-2xl mt-4", {
              "bg-white hover:bg-black hover:text-white": theme === "light",
            })}
            onClick={handleSignIn}
          >
            Check Eligibility
          </Button>
        </div>
      </>
    );
  }

  if (address && status === "authenticated") {
    return (
      <>
        <ConnectButton />
      </>
    );
  }

  return (
    <div>
      <ConnectButton />
    </div>
  );
}

export default Web3Auth;
