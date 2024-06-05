"use client";
import config from "@/app/config";
import { MadgeClaimToken__factory } from "@/typechain-types";
import { generateMerkleTreeRoot } from "@/utils/generate-merkle-tree";
import { Button } from "@components/button";
import { useWriteContract } from "wagmi";

export const UpdateMerkleRoot = () => {
  const merkleRoot = generateMerkleTreeRoot();
  const { writeContract, data, error, isPending } = useWriteContract();
  const handleUpdateMerkleRoot = async () => {
    writeContract({
      abi: MadgeClaimToken__factory.abi,
      functionName: "updateMerkleRoot",
      args: [merkleRoot as any],
      address: config.claimableContract,
    });
  };
  return (
    <>
      <Button disabled={isPending} onClick={handleUpdateMerkleRoot}>
        Update Merkle Root
      </Button>
      {data && <p className="text-success">{data}</p>}
      {error && <p className="text-danger">{error.message}</p>}
    </>
  );
};
