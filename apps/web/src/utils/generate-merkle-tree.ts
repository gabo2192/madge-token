import values from "@/data/accounts.json";
import values2 from "@/data/accounts2.json";

import { MerkleTree } from "./merkleTree";
const vals = [...values, ...values2];

export const generateMerkleTreeRoot = () => {
  const merkleTree = new MerkleTree(vals);
  const root = merkleTree.getHexRoot();
  return root;
};

export const generateMerkleTreeProof = (address: string) => {
  const merkleTree = new MerkleTree(vals);
  const proof = merkleTree.getHexProof(address);
  return proof;
};
