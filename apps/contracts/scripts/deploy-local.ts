import { ethers } from "hardhat";

async function main() {
  // Deploy MadgeCoin
  const [owner] = await ethers.getSigners();

  const MadgeCoinFactory = await ethers.getContractFactory("MadgeCoin");
  const merkleRoot = process.env.MERKLE_ROOT!;
  const madgeCoin = await MadgeCoinFactory.deploy();
  await madgeCoin.waitForDeployment();

  const tokens = 4000000 * 10 ** 8;

  // Deploy MadgeAirdrop, passing in MadgeCoin address and other params
  const MadgeClaimTokenFactory =
    await ethers.getContractFactory("MadgeClaimToken");
  const madgeClaimToken = await (MadgeClaimTokenFactory as any).deploy(
    merkleRoot
  );
  await madgeClaimToken.waitForDeployment();

  // Approve transfer of tokens
  const madgeClaimTokenAddress = await madgeClaimToken.getAddress();
  const totalSupply = await madgeCoin.totalSupply();
  await madgeCoin.approve(madgeClaimTokenAddress, tokens);

  const madgeAddress = await madgeCoin.getAddress();
  await madgeClaimToken.initialize(madgeAddress, owner.address);
  console.log(`MadgeCoin deployed to: ${madgeAddress}`);
  console.log(`MadgeClaimToken deployed to: ${madgeClaimTokenAddress}`);

  const MadgeCasinoFactory = await ethers.getContractFactory("MadgeCasino");
  console.log("Deploying MadgeCasino...");
  const madgeCasino = await MadgeCasinoFactory.deploy();

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
