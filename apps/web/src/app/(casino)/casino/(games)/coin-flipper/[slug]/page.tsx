import { BalanceButton } from "@/components/client/casino-buttons";
import { CoinFlip } from "@/components/client/coin-flip";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const slug = params.slug;
  console.log({ slug });

  const { data } = await supabase
    .from("coin_flipper_treasuries")
    .select("*")
    .eq("status", "active")
    .eq("slug", slug)
    .limit(1);

  if (!data || data?.length === 0) {
    return notFound();
  }

  const game = data[0];

  return (
    <>
      <div className="flex justify-center">
        <BalanceButton treasury={game} />
      </div>
      <div className="mt-8">
        <CoinFlip treasury={game} />
      </div>
    </>
  );
}
