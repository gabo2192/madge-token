"use client";
import { Button } from "@/components/ui/button";
import config from "@/lib/contracts-config";
import { MadgeClaimToken__factory } from "@/typechain-types";
import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { toast } from "../ui/use-toast";

interface Props {
  amount: bigint;
  proof: `0x${string}`[];
}

export function ClaimButton({ amount, proof }: Props) {
  console.log({ amount, proof });
  const [loading, setLoading] = useState(false);
  const {
    data: hash,
    isPending,
    writeContract,
    isError,
    error,
  } = useWriteContract();
  console.log({ error });
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash,
  });
  const handleClaim = () => {
    setLoading(true);
    try {
      writeContract({
        abi: MadgeClaimToken__factory.abi,
        functionName: "claim",
        address: config.claimableContract,
        args: [proof, amount],
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      toast({
        title: "Success!",
        description: "You have claimed your tokens successfully!",
      });
    }
  }, [isConfirmed]);

  return (
    <>
      <Button
        disabled={loading || isPending || isConfirming}
        onClick={handleClaim}
      >
        {loading || isPending || isConfirming ? "Claiming..." : "Claim now!"}
      </Button>
      {isError && (
        <p className="text-red-500 max-w-64">
          {(error?.cause as any)?.shortMessage || error.message}
        </p>
      )}
      {transactionError && (
        <p className="text-red-500 max-w-64">
          {(transactionError?.cause as any)?.shortMessage ||
            transactionError.message}
        </p>
      )}
    </>
  );
}
