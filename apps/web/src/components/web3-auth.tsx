// pages/index.js or a custom auth component
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { Button } from "./button";

function Web3Auth() {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (address) {
      router.push("/sign-in");
    }
  }, [address]);

  return (
    <div>
      <Button size="lg" onClick={() => open()}>
        Connect wallet
      </Button>
    </div>
  );
}

export default Web3Auth;
