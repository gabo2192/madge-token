import "dotenv";
import { config as dotEnvConfig } from "dotenv";
import { ethers } from "hardhat";

dotEnvConfig();
async function main() {
  // Deploy MadgeCoin
  const [owner] = await ethers.getSigners();
  const madgeAddress = process.env.NEXT_PUBLIC_TOKEN_CONTRACT!;
  const merkleRoot = process.env.MERKLE_ROOT!;
  console.log({ merkleRoot });

  const tokens = 3000000 * 10 ** 8;
  // Deploy MadgeAirdrop, passing in MadgeCoin address and other params
  const MadgeClaimTokenFactory =
    await ethers.getContractFactory("MadgeClaimToken");
  const madgeClaimToken = await (MadgeClaimTokenFactory as any).deploy(
    merkleRoot
  );
  await madgeClaimToken.waitForDeployment(); // Approve transfer of tokens
  const madgeCoin = await ethers.getContractAt("MadgeCoin", madgeAddress);
  const madgeClaimTokenAddress = await madgeClaimToken.getAddress();
  await madgeCoin.approve(madgeClaimTokenAddress, tokens);

  await madgeClaimToken.initialize(madgeAddress, owner.address);
  console.log(`MadgeCoin deployed to: ${madgeAddress}`);
  console.log(`MadgeClaimToken deployed to: ${madgeClaimTokenAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
