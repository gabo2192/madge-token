"use client";
import { XLogo } from "@/assets/twitter-logo";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function HamburgerMenu() {
  return (
    <Drawer>
      <DrawerTrigger className="md:hidden">
        <HamburgerMenuIcon className="size-6" />
        <span className="sr-only">Open Menu</span>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh]">
        <h3 className="text-xl font-bold px-4 mb-2 mt-10">Madge Coin</h3>

        <ul className="px-8 list-disc mb-8 font-medium">
          <li className="py-2">
            <Link href="/docs">Docs</Link>
          </li>
          <li className="py-2">
            <Link href="/claim">Claim</Link>
          </li>
        </ul>
        <h3 className="text-xl font-bold px-4 mb-2">Madge Casino</h3>
        <ul className="px-8 list-disc mb-4 font-medium">
          <li className="py-2">
            <Link href="/casino/coin-flipper">Coin Flipper</Link>
          </li>
          <li className="py-2">
            <Link href="/casino/lottery">Lottery</Link>
          </li>
        </ul>
        <DrawerFooter>
          <div className="text-base font-medium items-center flex flex-col gap-2">
            Contact
            <a href="https://x.com/madgeymooo" target="_blank" rel="noreferrer">
              <XLogo className="size-10" />
            </a>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
