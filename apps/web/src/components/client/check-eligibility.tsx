"use client";
import { Button } from "@/components/ui/button";
import useLogin from "@/hooks/useLogin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export function CheckEligibility() {
  const { status } = useSession();
  const { address } = useAccount();

  const { login } = useLogin();

  const router = useRouter();

  const handleSignIn = async () => {
    if (status === "authenticated") {
      router.push("/claim");
      return;
    }
    await login("/claim");
  };

  if (!address) {
    return <></>;
  }

  return (
    <Button onClick={handleSignIn} disabled={status === "loading"}>
      {status === "loading" ? "Checking..." : "Check Eligibility"}
    </Button>
  );
}
