"use client";
import config from "@/app/config";
import { MadgeCasino__factory } from "@/typechain-types";
import { Button } from "@components/button";
import { useSession } from "next-auth/react";
import { useReadContract, useWriteContract } from "wagmi";

export const CasinoTest = () => {
  const { writeContract, data, error, isPending } = useWriteContract();
  const value = 3000;
  const { data: user } = useSession();
  const handleFundCasino = async () => {
    writeContract({
      abi: MadgeCasino__factory.abi,
      functionName: "fundTreasury",
      args: [BigInt(value * 10 ** 8)],
      address: config.casinoContract,
    });
  };
  const casinoBalance = useReadContract({
    abi: MadgeCasino__factory.abi,
    address: config.casinoContract,
    functionName: "treasuryBalance",
  });

  return (
    <>
      <Button disabled={isPending} onClick={handleFundCasino}>
        Fund Casino
      </Button>
      {data && <p className="text-success">{data}</p>}
      {error && <p className="text-danger">{error.message}</p>}
      {casinoBalance.data && (
        <p>
          Casino Balance:{" "}
          {(Number(casinoBalance.data) / 10 ** 8).toLocaleString()} $MAD
        </p>
      )}
    </>
  );
};
