import values from "@/data/accounts.json";

import { MerkleTree } from "./merkleTree";

export const generateMerkleTreeRoot = () => {
  const merkleTree = new MerkleTree(values);
  const root = merkleTree.getHexRoot();
  return root;
};

export const generateMerkleTreeProof = (address: string) => {
  const merkleTree = new MerkleTree(values);
  const proof = merkleTree.getHexProof(address);
  return proof;
};
