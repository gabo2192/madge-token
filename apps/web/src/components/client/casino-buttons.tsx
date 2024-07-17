"use client";
import { useUserContext } from "@/components/providers/user-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { MadgeCoin__factory } from "@/typechain-types/factories/contracts";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import contracts from "@/lib/contracts-config";
import { TreasuryDB } from "@/types/treasury";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { toast } from "../ui/use-toast";

export function CasinoButtons() {
  return (
    <div className="flex mt-4 gap-4 justify-end">
      <GameLink />
    </div>
  );
}

function AddBalance({
  className,
  setOpen,
  balance,
}: React.ComponentProps<"form"> & {
  setOpen: (open: boolean) => void;
  balance: number;
}) {
  const [loading, setLoading] = useState(false);

  const { data: hash, writeContract, isError, error } = useWriteContract();
  console.log({ hash, isError, error });
  const {
    isLoading,
    isError: isTxError,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  });
  const router = useRouter();
  console.log({ isLoading, isTxError, isSuccess });

  useEffect(() => {
    if (isSuccess || isTxError || isError) {
      setLoading(false);
      setOpen(false);
      toast({
        title: "Balance updated",
        description: "Your balance was updated successfully",
      });
    }
  }, [isSuccess, isTxError, isError]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newBalance = Number(formData.get("balance"));
    writeContract({
      abi: MadgeCoin__factory.abi,
      address: contracts.tokenContract,
      functionName: "approve",
      args: [contracts.casinoContract, BigInt(newBalance * 10 ** 8)],
    });
  };

  return (
    <form
      className={cn("grid items-start gap-8", className)}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row gap-2 items-center">
        <Label htmlFor="email">Balance</Label>
        <Input
          type="number"
          name="balance"
          id="balance"
          defaultValue={balance}
        />
      </div>

      <Button type="submit" disabled={isLoading || loading}>
        Add Balance
      </Button>
    </form>
  );
}

export function BalanceButton({ treasury }: { treasury: TreasuryDB }) {
  const { data: session } = useSession();

  const { data: _balance, status: balanceOfStatus } = useReadContract({
    abi: MadgeCoin__factory.abi,
    address: contracts.tokenContract,
    functionName: "allowance",
    args: [
      session?.user.pubkey! as `0x${string}`,
      contracts.casinoContract as `0x${string}`,
    ],
  });

  const balance = _balance ? Number(_balance) / 10 ** 8 : 0;

  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (balanceOfStatus === "pending") {
    return (
      <div className="w-full flex flex-col gap-4">
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-9 " />
      </div>
    );
  }

  if (isDesktop) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="">Your balance is {Number(balance)}</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant={Number(balance) !== 0 ? "ghost" : "default"}
              className="flex gap-2"
            >
              <PlusIcon /> Add Balance
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Balance</DialogTitle>
              <DialogDescription>
                Your tokens will still remain in you account, this will only
                approve transactions to be made between your wallet and our
                contract.
              </DialogDescription>
            </DialogHeader>
            <AddBalance setOpen={setOpen} balance={Number(balance)} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant={Number(balance) !== 0 ? "ghost" : "default"}>
            Add Balance
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Add Balance</DrawerTitle>
            <DrawerDescription>
              Your tokens will still remain in you account, this will only
              approve transactions to be made between your wallet and our
              contract.
            </DrawerDescription>
          </DrawerHeader>
          <AddBalance
            className="px-4"
            setOpen={setOpen}
            balance={Number(balance)}
          />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function GameLink() {
  const pathname = usePathname();
  const { balance } = useUserContext();

  return (
    <Button
      variant={balance === 0 ? "ghost" : "default"}
      disabled={balance === 0}
    >
      <Link href={pathname + "/game"}>Play</Link>
    </Button>
  );
}
