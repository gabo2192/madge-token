"use client";

import { Button } from "@/components/ui/button";
import useLogin from "@/hooks/useLogin";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { ConnectWallet } from "./connect-wallet";

export function CasinoSession() {
  const { status } = useSession();
  const { address } = useAccount();
  const { login } = useLogin();
  const router = useRouter();

  async function handleLogin() {
    await login({ address, redirect: "/casino/coin-flipper" });
  }

  if (!address) {
    return (
      <div className="mt-20 flex justify-end md:justify-center">
        <ConnectWallet />
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <Link
        href="/casino/coin-flipper"
        className="block mt-20 text-right md:text-center"
      >
        <Button>Play now!</Button>
      </Link>
    );
  }

  return (
    <div className="mt-20 text-right md:text-center">
      <Button onClick={handleLogin}>Sign in</Button>
    </div>
  );
}
