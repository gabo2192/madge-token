"use client";
import { usePathname } from "next/navigation";
import { Navigation } from "../sections/navigation";

export function CasinoNav() {
  const pathname = usePathname();
  return (
    <Navigation
      items={[
        {
          label: "Coin Flipper",
          href: "/casino/coin-flipper",
          active: pathname.includes("/casino/coin-flipper"),
        },
        {
          label: "Lottery",
          href: "/casino/lottery",
          active: pathname.includes("/casino/lottery"),
        },
      ]}
    />
  );
}
