import { AddTreasury } from "@/components/forms/add-treasury";
import { TreasuryItem } from "@/components/sections/treasury-item";
import { supabase } from "@/lib/supabase";
import { TreasuryDB } from "@/types/treasury";
import { checkUserSession } from "@/utils/check-session";

export default async function Page() {
  const { data } = await supabase
    .from("coin_flipper_treasuries")
    .select("*")
    .eq("status", "active");
  const user = await checkUserSession();
  if (!user) return <></>;
  const treasuries = data as TreasuryDB[];

  const myTreasuries = treasuries.filter(
    (t) => t.owner_address === user.pubkey
  );
  if (!data || data.length < 1) {
    return (
      <>
        <AddTreasury />
      </>
    );
  }

  return (
    <div>
      {treasuries.map((treasury) => (
        <TreasuryItem
          treasury={treasury}
          pubkey={user.pubkey}
          key={treasury.id}
        />
      ))}
    </div>
  );

  // return (
  //   <>
  //     <div className="size-40 mx-auto rounded-full overflow-clip border-4 border-accentBrand">
  //       <Logo />
  //     </div>
  //     <div className="flex flex-col md:flex-col-reverse md:items-center">
  //       <TransactionsTable />
  //       <CasinoButtons />
  //     </div>
  //   </>
  // );
}
