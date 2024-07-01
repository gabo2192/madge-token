"use client";

import { useUserContext } from "@/components/providers/user-provider";

export function CasinoBalance() {
  const { balance } = useUserContext();
  return (
    <div>
      <h2 className="text-3xl font-koulen text-center mb-4">
        Balance: {balance.toLocaleString()} $MAD
      </h2>
    </div>
  );
}
