"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import contracts from "@/lib/contracts-config";
import { MadgeCoin__factory } from "@/typechain-types";
import { parseBigNumber } from "@/utils/parse-big-number";
import { signOut, useSession } from "next-auth/react";
import { useAccount, useReadContract } from "wagmi";

interface UserContext {
  balance: number;
  updateBalance: (balance: number) => void;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}

const UserContext = createContext<UserContext>({
  balance: 0,
  updateBalance: () => {},
  setBalance: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount();
  const { status } = useSession();
  const [balance, setBalance] = useState<number>(0);
  const { toast } = useToast();
  const { data, status: balanceOfStatus } = useReadContract({
    abi: MadgeCoin__factory.abi,
    address: contracts.tokenContract,
    functionName: "allowance",
    args: [address!, contracts.casinoContract],
  });

  const updateBalance = (balance: number) => {
    setBalance(balance);
    toast({
      title: "Balance updated",
      description: "Your balance was updated successfully",
    });
  };

  useEffect(() => {
    if (!address && status === "authenticated") {
      signOut({
        callbackUrl: "/",
      });
    }
  }, [address]);

  useEffect(() => {
    if (balanceOfStatus === "success") {
      console.log({ data });
      const number = parseBigNumber(data);
      setBalance(number);
    }
  }, [balanceOfStatus]);

  return (
    <UserContext.Provider value={{ balance, updateBalance, setBalance }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  if (!useContext(UserContext)) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
