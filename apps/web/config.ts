import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { rootstock } from "wagmi/chains";

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

// Create wagmiConfig
export const config = getDefaultConfig({
  appName: "MadgeToken",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  chains: [rootstock],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
