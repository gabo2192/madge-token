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
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function CasinoButtons() {
  return (
    <div className="flex mt-4 gap-4 justify-end">
      <BalanceButton />
      <GameLink />
    </div>
  );
}

function AddBalance({
  className,
  setOpen,
}: React.ComponentProps<"form"> & { setOpen: (open: boolean) => void }) {
  const { balance, updateBalance } = useUserContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("balance"));
    const newBalance = Number(formData.get("balance"));
    updateBalance(newBalance);
    setOpen(false);
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

      <Button type="submit">Add Balance</Button>
    </form>
  );
}

export function BalanceButton() {
  const { balance } = useUserContext();
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={balance !== 0 ? "ghost" : "default"}
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
          <AddBalance setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={balance !== 0 ? "ghost" : "default"}>
          Add Balance
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Balance</DrawerTitle>
          <DrawerDescription>
            Your tokens will still remain in you account, this will only approve
            transactions to be made between your wallet and our contract.
          </DrawerDescription>
        </DrawerHeader>
        <AddBalance className="px-4" setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
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
