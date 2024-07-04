import accountsLocal from "@/data/account.local.json";
import accountsTest from "@/data/account.test.json";
import accounts1 from "@/data/accounts.json";
import accounts2 from "@/data/accounts2.json";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { getAddress } from "ethers";
import * as fs from "fs";

export const generateMerkleTreeRoot = () => {
  const environment = process.env.NEXT_PUBLIC_WALLET_ENVIRONMENT;

  const accounts: string[] = [];

  if (environment === "prod") {
    accounts.push(...accounts1, ...accounts2);
  } else if (environment === "preview") {
    accounts.push(...accountsTest);
  } else {
    accounts.push(...accountsLocal);
  }

  const value = (1000 * 10 ** 8).toString();

  const badAddresses = [];
  const data = accounts
    .map((v) => {
      try {
        const address = getAddress(v.toLowerCase());
        return [address, value];
      } catch (error) {
        if ((error as any).code === "INVALID_ARGUMENT") {
          badAddresses.push(v);
          return null;
          // Handle the error appropriately (e.g., skip the address, log it, etc.)
        } else {
          console.log({ v });
          return null;
        }
      }
    })
    .filter((v) => v !== null);
  const tree = StandardMerkleTree.of(data, ["address", "uint256"], {
    sortLeaves: true,
  });

  console.log("Merkle Root:", tree.root);
  fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));
};

generateMerkleTreeRoot();
