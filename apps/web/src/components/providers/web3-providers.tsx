"use client";

import { config } from "@/lib/wagmi-config";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export default function Web3Provider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    // <ThemeProvider attribute="class" disableTransitionOnChange>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#58DC57",
            accentColorForeground: "#010006",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
    // </ThemeProvider>
  );
}
