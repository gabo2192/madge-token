import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

import { config as dotEnvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
dotEnvConfig();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  typechain: {
    outDir: "../web/src/typechain-types",
  },
  networks: {
    rskTestnet: {
      url: "https://public-node.testnet.rsk.co",
      accounts: [process.env.TESTNET_WALLET!],
    },
    rsk: {
      url: "https://public-node.rsk.co",
      accounts: [process.env.MAINNET_WALLET!],
    },
  },
};

export default config;
