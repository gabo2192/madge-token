import { BalanceButton } from "@/components/client/casino-buttons";
import { CoinFlip } from "@/components/client/coin-flip";

export default async function Page() {
  return (
    <>
      <div className="flex justify-center">
        <BalanceButton />
      </div>
      <div className="mt-8">
        <CoinFlip />
      </div>
    </>
  );
}
