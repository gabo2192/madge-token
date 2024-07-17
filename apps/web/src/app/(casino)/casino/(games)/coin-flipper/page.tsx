import { GamePage } from "@/components/coin-flip/game-page";
import { supabase } from "@/lib/supabase";
import { TreasuryDB } from "@/types/treasury";
import { checkUserSession } from "@/utils/check-session";

export default async function Page() {
  const user = await checkUserSession();
  if (!user) return <></>;
  const { data } = await supabase
    .from("coin_flipper_treasuries")
    .select("*")
    .eq("status", "active");
  const { data: _privateGames } = await supabase
    .from("coin_flipper_treasuries")
    .select("*")
    .eq("owner_address", user.pubkey);
  const treasuries = data as TreasuryDB[];
  const privateGames = _privateGames as TreasuryDB[];
  console.log(_privateGames);
  return (
    <GamePage
      games={treasuries}
      pubkey={user.pubkey}
      privateGames={privateGames}
    />
  );
}
