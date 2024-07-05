"use client";
import { Button } from "@/components/ui/button";
import config from "@/lib/contracts-config";
import { MadgeClaimToken__factory } from "@/typechain-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { toast } from "../ui/use-toast";

interface Props {
  amount: bigint;
  proof: `0x${string}`[];
}

export function ClaimButton({ amount, proof }: Props) {
  const [loading, setLoading] = useState(false);
  const [hasClaimed, setClaimed] = useState(false);
  const {
    data: hash,
    isPending,
    writeContract,
    isError,
    error,
  } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash,
  });
  console.log({ error });
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
    const handleUpdateUser = async () => {
      try {
        await axios.put("/api/user");
      } catch (e) {
        console.error(e);
      }
    };
    if (isConfirmed) {
      toast({
        title: "Success!",
        description: "You have claimed your tokens successfully!",
      });
      setClaimed(true);
      handleUpdateUser();
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
      {error?.name && error.name == "ContractFunctionExecutionError" && (
        <p className="text-red-500 max-w-64">
          {(error?.cause as any)?.data?.errorName === "ClaimError"
            ? "Tokens already claimed"
            : "Error claiming tokens"}
        </p>
      )}
      {transactionError && (
        <p className="text-red-500 max-w-64">
          {(transactionError?.cause as any)?.details ||
            transactionError.message}
        </p>
      )}
    </>
  );
}
