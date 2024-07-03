import { FundTreasury } from "@/components/client/fund-treasury";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TreasuryDB } from "@/types/treasury";

interface Props {
  treasury: TreasuryDB;
  pubkey: string;
}
export function TreasuryItem({ treasury, pubkey }: Props) {
  const balance = Number(treasury.balance);
  return (
    <div className="flex flex-col gap-4 bg-black/50 px-3 text-ellipsis overflow-hidden rounded-lg py-2">
      <div className="flex flex-row gap-4 items-center">
        <Avatar>
          <AvatarImage src={treasury.image_url} alt={treasury.token_name} />
          <AvatarFallback>{treasury.token_ticker}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-2xl font-koulen">
            {treasury.token_name} {treasury.token_ticker}
          </h3>
        </div>
      </div>
      <p className="truncate">Token Address: {treasury.token_address}</p>
      <p>
        Treasury Balance: {Number(treasury.balance) / 10 ** 8}{" "}
        {treasury.token_ticker}
      </p>
      <div className="flex gap-2">
        {pubkey === treasury.owner_address && (
          <FundTreasury treasury={treasury} />
        )}
        <Button className="w-full" disabled={balance === 0}>
          Play
        </Button>
      </div>
      <div className="flex gap-2">
        {pubkey === treasury.owner_address && (
          <Button variant={"secondary"} className="w-full">
            Withdraw
          </Button>
        )}
        {pubkey === treasury.owner_address && (
          <Button variant={"destructive"} className="w-full">
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
