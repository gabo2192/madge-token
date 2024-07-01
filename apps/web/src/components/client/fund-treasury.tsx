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
import { useMediaQuery } from "@/hooks/use-media-query";
import { TreasuryDB } from "@/types/treasury";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { FundTreasuryForm } from "../forms/fund-treasury";

interface Props {
  treasury: TreasuryDB;
}

export function FundTreasury({ treasury }: Props) {
  const { balance } = useUserContext();
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"secondary"} className="flex gap-2 w-full">
            <PlusIcon /> Fund Treasury
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Fund Treasury</DialogTitle>
            <DialogDescription>
              This tokens will be held by the contract and will be used to fund
              the treasury. You can withdraw your tokens at any time.
            </DialogDescription>
          </DialogHeader>
          <FundTreasuryForm treasury={treasury} />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"secondary"} className="flex gap-2 w-full">
          <PlusIcon /> Fund Treasury
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Fund Treasury</DrawerTitle>
          <DrawerDescription>
            This tokens will be held by the contract and will be used to fund
            the treasury. You can withdraw your tokens at any time.
          </DrawerDescription>
        </DrawerHeader>
        <FundTreasuryForm treasury={treasury} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
