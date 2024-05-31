"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import clsx from "clsx";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { Button } from "./button";

function Web3Auth({ theme }: { theme: "light" | "dark" }) {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { status, data } = useSession();
  console.log({ data: data?.user.pubkey });
  console.log({ address });
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

  const handleLogout = () => {
    console.log("logout");
    disconnect();
    signOut({
      callbackUrl: "/",
    });
  };

  if (address && !data && status !== "loading") {
    return (
      <Button
        size="lg"
        className={clsx("text-2xl mt-4", {
          "bg-white hover:bg-black hover:text-white": theme === "light",
        })}
        onClick={handleSignIn}
      >
        Check Eligibility
      </Button>
    );
  }

  if (address && status === "authenticated") {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={clsx("text-2xl", {
                "bg-white hover:bg-black hover:text-white": theme === "light",
              })}
              size="lg"
            >{`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white p-4 text-lg">
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer w-full text-black"
            >
              Disconnect wallet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }

  return (
    <div>
      <Button
        size="lg"
        className={clsx("text-2xl", {
          "bg-white hover:bg-black hover:text-white": theme === "light",
        })}
        onClick={() => open()}
      >
        Connect wallet
      </Button>
    </div>
  );
}

export default Web3Auth;
