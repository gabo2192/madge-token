"use client";

import { Button } from "@components/button";
import clsx from "clsx";

export function ClaimButton() {
  // const { address } = useAccount();
  // const [loading, setLoading] = useState(false);
  // const { data: hash, writeContract, isPending, error } = useWriteContract();
  // const router = useRouter();
  // const {
  //   isLoading: isConfirming,
  //   isSuccess: isConfirmed,
  //   error: transactionError,
  // } = useWaitForTransactionReceipt({
  //   hash,
  // });

  // const handleClaim = async () => {
  //   if (!address) return;
  //   setLoading(true);
  //   const proof = generateMerkleTreeProof(address);
  //   try {
  //     writeContract({
  //       abi: MadgeClaimToken__factory.abi,
  //       address: config.claimableContract,
  //       functionName: "claim",
  //       args: [address, proof],
  //       chain: rootstockTestnet,
  //     });
  //   } catch (e) {
  //     alert(e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (isConfirmed) {
  //     router.push("/success");
  //   }
  // }, [isConfirmed]);

  return (
    <>
      <Button
        size="lg"
        className={clsx("text-2xl mt-4")}
        onClick={() => {}}
        disabled={true}
        // disabled={loading || isPending || isConfirming}
      >
        {/* {loading || isPending || isConfirming ? "Claiming..." : "Coming Soon"} */}
        Comming Soon
      </Button>
      {/* {error && <p className="text-danger">{error.message}</p>}
      {transactionError && (
        <p className="text-danger">{transactionError.message}</p>
      )} */}
    </>
  );
}
