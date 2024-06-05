"use client";
import { createContext, useContext, useEffect } from "react";

import { signOut, useSession } from "next-auth/react";
import { useAccount } from "wagmi";

interface UserContext {
  user: null;
}

// Create a new context
const UserContext = createContext<UserContext>({
  user: null,
});

// Create a provider component
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount();
  const { status } = useSession();

  useEffect(() => {
    if (!address && status === "authenticated") {
      signOut({
        callbackUrl: "/",
      });
    }
  }, [address]);

  // Provide the context value to the children components
  return (
    <UserContext.Provider value={{ user: null }}>
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
