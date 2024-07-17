import { FundTreasury } from "@/components/client/fund-treasury";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import config from "@/lib/contracts-config";
import { MadgeCasino__factory } from "@/typechain-types/factories/contracts/MadgeCasino__factory";
import { TreasuryDB } from "@/types/treasury";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import { Loading } from "../ui/loading";

interface Props {
  treasury: TreasuryDB;
  pubkey: string;
}
export function TreasuryItem({ treasury, pubkey }: Props) {
  const balance = Number(treasury.balance);
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState<number | null>(null);

  const {
    data: hash,
    writeContract,
    error,
    isPending,
    isError,
  } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useWatchContractEvent({
    address: config.casinoContract,
    abi: MadgeCasino__factory.abi,
    eventName: "TreasuryCreated",
    onLogs(logs) {
      console.log({ logs });
      const userData = logs.find((log) => log.args.owner === pubkey);
      if (userData && userData.args.requestId) {
        updateTreasuryStatus(userData.args.requestId);
      }
    },
    enabled: true,
    onError: (error) => console.error(error),
  });

  const publishGame = async () => {
    setLoading(true);
    writeContract({
      abi: MadgeCasino__factory.abi,
      address: config.casinoContract,
      functionName: "createTreasury",
      args: [treasury.id, pubkey as `0x${string}`],
    });
  };

  async function updateTreasuryStatus(requestId: number) {
    try {
      await axios.put("/api/coin-flipper/treasury", {
        id: requestId,
        status: "active",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setRequestId(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    if ((isError || transactionError) && loading) {
      setLoading(false);
    }
  }, [isError]);

  return (
    <>
      <div className="flex flex-col gap-4 border w-full border-background px-3 md:px-6 md:py-10 text-ellipsis overflow-hidden rounded-lg py-2">
        <div className="flex flex-row gap-4 items-center">
          <Avatar>
            <AvatarImage src={treasury.image_url} alt={treasury.token_name} />
            <AvatarFallback>{treasury.token_ticker}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-koulen">
              {treasury.token_name} {treasury.token_ticker}
            </h3>
          </div>
        </div>
        <p className="truncate">Token Address: {treasury.token_address}</p>
        <p>
          Treasury Balance: {Number(treasury.balance) / 10 ** 8}{" "}
          {treasury.token_ticker}
        </p>
        {treasury.status === "active" ? (
          <>
            {" "}
            <div className="flex gap-2">
              {pubkey === treasury.owner_address && (
                <FundTreasury treasury={treasury} />
              )}
              <Button className="w-full" disabled={balance === 0}>
                Play
              </Button>
            </div>
            <div className="flex gap-2">
              {pubkey === treasury.owner_address && (
                <Button variant={"secondary"} className="w-full">
                  Withdraw
                </Button>
              )}
              {pubkey === treasury.owner_address && (
                <Button variant={"destructive"} className="w-full">
                  Delete
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-2">
              {pubkey === treasury.owner_address && (
                <Button variant={"destructive"} className="w-full">
                  Delete
                </Button>
              )}
              {pubkey === treasury.owner_address && (
                <Button className="w-full" onClick={publishGame}>
                  Publish game
                </Button>
              )}
            </div>
          </>
        )}
      </div>
      {(loading || isPending || isConfirming) && (
        <div className="fixed inset-0 h-screen w-screen grid place-items-center">
          <div className="absolute inset-0 h-screen w-screen bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-black/40  to-black"></div>
          <Loading />
        </div>
      )}
    </>
  );
}
