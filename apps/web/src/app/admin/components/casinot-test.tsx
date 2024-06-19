"use client";
import config from "@/app/config";
import { MadgeCasino__factory, MadgeCoin__factory } from "@/typechain-types";
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
      args: [BigInt(value * 10 ** 8), config.tokenContract],
      address: config.casinoContract,
    });
  };
  const casinoBalance = useReadContract({
    abi: MadgeCasino__factory.abi,
    address: config.casinoContract,
    functionName: "treasuryBalance",
  });

  const handleDeposit = async () => {
    //approve
    writeContract({
      abi: MadgeCoin__factory.abi,
      functionName: "approve",
      args: [config.casinoContract, BigInt(200 * 10 ** 8)],
      address: config.tokenContract,
    });
    writeContract({
      abi: MadgeCasino__factory.abi,
      functionName: "deposit",
      args: [BigInt(200 * 10 ** 8)],
      address: config.casinoContract,
    });
  };

  const seeBalance = useReadContract({
    abi: MadgeCasino__factory.abi,
    address: config.casinoContract,
    functionName: "balances",
    args: [user?.user.pubkey as `0x${string}`],
  });
  console.log({ config: casinoBalance.data });

  const handleUpdateBalance = async () => {
    writeContract({
      abi: MadgeCasino__factory.abi,
      functionName: "updateUserBalance",
      args: [BigInt(200 * 10 ** 8 * -1), user?.user.pubkey as `0x${string}`],
      address: config.casinoContract,
    });
  };
  const handleWithdraw = async () => {
    writeContract({
      abi: MadgeCasino__factory.abi,
      functionName: "withdraw",
      args: [BigInt(600 * 10 ** 8)],
      address: config.casinoContract,
    });
  };

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
      <Button disabled={isPending} onClick={handleDeposit}>
        Deposit $MAD
      </Button>
      {seeBalance.data && (
        <p>
          Your Balance: {(Number(seeBalance.data) / 10 ** 8).toLocaleString()}
        </p>
      )}
      <Button onClick={handleUpdateBalance}>Update balance</Button>
      <Button onClick={handleWithdraw}>Withdraw</Button>
    </>
  );
};
