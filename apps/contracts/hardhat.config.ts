import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";

import { HardhatUserConfig } from "hardhat/config";

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
      accounts: [
        "0e25339cfa6f8c696a9c0889d9d0bf70b2e702654f776d24da6548a8351c0a27",
      ],
    },
  },
};

export default config;
