import config from "@/lib/contracts-config";
import { supabase } from "@/lib/supabase";
import { MadgeCasino__factory } from "@/typechain-types";
import { TreasuryDB } from "@/types/treasury";
import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id } = body;
  console.log({ id });
  //   const user = checkUserSession();
  //   if (!user) return NextResponse.json({}, { status: 401 });

  const { data, error } = await supabase
    .from("coin_flipper_treasuries")
    .select("*")
    .eq("id", Number(id));

  if (error) return NextResponse.json({ error }, { status: 500 });

  const treasury = data[0] as TreasuryDB;

  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const contract = new ethers.Contract(
    config.casinoContract,
    MadgeCasino__factory.abi,
    provider
  );
  const treasuryOnChain = await contract.treasuries(
    treasury.owner_address,
    treasury.token_address
  );
  const balance = treasuryOnChain[2];
  await supabase
    .from("coin_flipper_treasuries")
    .update({
      balance: balance.toString(),
    })
    .eq("id", Number(id));
  return NextResponse.json({}, { status: 200 });
}
