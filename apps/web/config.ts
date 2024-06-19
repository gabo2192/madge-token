import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { hardhat, rootstock, rootstockTestnet } from "wagmi/chains";

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

// declare module "wagmi" {
//   interface Register {
//     config: typeof config;
//   }
// }
const chains = () => {
  console.log(process.env.NEXT_PUBLIC_WALLET_ENVIRONMENT);

  if (process.env.NEXT_PUBLIC_WALLET_ENVIRONMENT === "prod") {
    console.log("here");
    return rootstock;
  } else if (process.env.NEXT_PUBLIC_WALLET_ENVIRONMENT === "preview") {
    return rootstockTestnet;
  } else {
    return hardhat;
  }
};

// Create wagmiConfig
export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [chains()],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
