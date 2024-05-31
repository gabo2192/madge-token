"use client";

import { Button } from "@components/button";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";

export function VerifyMessage() {
  const { address } = useAccount();
  const router = useRouter();
  const { error, isPending, signMessageAsync } = useSignMessage();

  useEffect(() => {
    if (!address) {
      router.push("/");
    }
  }, [address]);

  const handleSignIn = async () => {
    try {
      const csrf = await getCsrfToken();
      if (!address || !csrf) {
        return;
      }

      const message = `Sign this message to sign in to the app ${csrf}`;
      const signature = await signMessageAsync({ message, account: address });

      await signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature: signature,
      });
      router.push("/check-eligibility");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button size="lg" onClick={handleSignIn} disabled={!!error || isPending}>
      Verify Message
    </Button>
  );
}
