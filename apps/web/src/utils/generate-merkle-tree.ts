import values from "@/data/accounts.json";
import values2 from "@/data/accounts2.json";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import * as fs from "fs";

import { getAddress } from "ethers";
import { MerkleTree } from "./merkleTree";
const vals = [...values, ...values2];

export const generateMerkleTreeRoot = () => {
  const merkleTree = new MerkleTree(vals);
  const root = merkleTree.getHexRoot();
  return root;
};

export const generateMerkleTreeProof = (address: string) => {
  // const merkleTree = new MerkleTree(vals);
  // const proof = merkleTree.getHexProof(address);

  const proof = vals.find((v) => v.toLowerCase() === address.toLowerCase());

  return proof;
};

export const generateMerkleTreeRoot2 = () => {
  const badAddresses = [];
  const data = vals
    .map((v) => {
      try {
        const address = getAddress(v.toLowerCase());
        return [address, "100"];
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
  const tree = StandardMerkleTree.of(data, ["address", "uint"]);

  console.log("Merkle Root:", tree.root);
  fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));
};

export const generateProof = (address: string) => {
  const tree = StandardMerkleTree.load(
    JSON.parse(fs.readFileSync("tree.json", "utf8"))
  );
  for (const [i, v] of tree.entries()) {
    if (v[0] === address) {
      // (3)
      const proof = tree.getProof(i);
      console.log("Proof:", proof);
      console.log("Value", v);
      if (proof) return proof;
    }
  }
};
