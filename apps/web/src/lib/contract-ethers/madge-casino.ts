import config from "@/lib/contracts-config";
import { MadgeCasino__factory } from "@/typechain-types";

import { ethers } from "ethers";

export async function madgeCasinoContract() {
  const provider = new ethers.JsonRpcProvider(config.rpcURL);
  const contract = new ethers.Contract(
    config.casinoContract,
    MadgeCasino__factory.abi,
    provider
  );
  return { contract, provider };
}
