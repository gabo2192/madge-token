import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import data from "../../tree.json";

// const vals = [...values, ...values2];

// export const generateMerkleTreeRoot = () => {
//   const merkleTree = new MerkleTree(vals);
//   const root = merkleTree.getHexRoot();
//   return root;
// };

// export const generateMerkleTreeProof = (address: string) => {
//   // const merkleTree = new MerkleTree(vals);
//   // const proof = merkleTree.getHexProof(address);

//   const proof = vals.find((v) => v.toLowerCase() === address.toLowerCase());

//   return proof;
// };

export const generateProof = (address: string) => {
  const tree = StandardMerkleTree.load(data as any);

  for (const [i, v] of tree.entries()) {
    if (v[0] === address) {
      // (3)
      const proof = tree.getProof(i);
      if (proof) {
        return { proof, values: v };
      }
    }
  }
};

export const verifyProof = (proof: string[], value: string[]) => {
  const tree = StandardMerkleTree.load(data as any);
  console.log(value);
  const leaf = tree.leafHash(value);
  console.log(leaf);
  return tree.verify(value, proof);
};
