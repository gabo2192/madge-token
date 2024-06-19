"use client";
import config from "@/app/config";
import {
  MadgeClaimToken__factory,
  MadgeCoin__factory,
} from "@/typechain-types";
import { generateMerkleTreeRoot } from "@/utils/generate-merkle-tree";
import { Button } from "@components/button";
import { useSession } from "next-auth/react";
import { useReadContract, useWriteContract } from "wagmi";

export const UpdateMerkleRoot = () => {
  const merkleRoot = generateMerkleTreeRoot();
  const { writeContract, data, error, isPending } = useWriteContract();
  const { data: user } = useSession();
  const handleUpdateMerkleRoot = async () => {
    writeContract({
      abi: MadgeClaimToken__factory.abi,
      functionName: "updateMerkleRoot",
      args: [merkleRoot as any],
      address: config.claimableContract,
    });
  };
  const test = useReadContract({
    abi: MadgeCoin__factory.abi,
    address: config.tokenContract,
    functionName: "balanceOf",
    args: [user?.user.pubkey as `0x${string}`],
  });

  if (!user) <></>;
  return (
    <>
      <Button disabled={isPending} onClick={handleUpdateMerkleRoot}>
        Update Merkle Root
      </Button>
      {data && <p className="text-success">{data}</p>}
      {error && <p className="text-danger">{error.message}</p>}
      {test.data && (
        <p>Balance: {(Number(test.data) / 10 ** 8).toLocaleString()}</p>
      )}
    </>
  );
};
