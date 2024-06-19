import { ethers } from "hardhat";

async function main() {
  // Deploy madgeCasino
  const tokens = 4000000 * 10 ** 8;
  const madgeAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const madgeCoin = await ethers.getContractAt("MadgeCoin", madgeAddress);

  const MadgeCasinoFactory = await ethers.getContractFactory("MadgeCasino");
  const madgeCasino = await MadgeCasinoFactory.deploy();
  await madgeCasino.waitForDeployment();

  const madgeCasinoAddress = await madgeCasino.getAddress();
  await madgeCoin.approve(madgeCasinoAddress, tokens);
  console.log(`MadgeCasino deployed to: ${madgeCasinoAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
