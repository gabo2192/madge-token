import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";

import { HardhatUserConfig } from "hardhat/config";

// const TESTNET_WALLET = vars.get("TESTNET_WALLET");
// const MAINNET_WALLET = vars.get("MAINNET_WALLET");
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
  // networks: {
  //   rskTestnet: {
  //     url: "https://public-node.testnet.rsk.co",
  //     accounts: [TESTNET_WALLET],
  //   },
  //   rsk: {
  //     url: "https://public-node.rsk.co",
  //     accounts: [MAINNET_WALLET],
  //   },
  // },
};

export default config;
