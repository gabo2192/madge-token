import config from "@/lib/contracts-config";
import { supabase } from "@/lib/supabase";
import { MadgeCasino__factory } from "@/typechain-types";
import { checkUserSession } from "@/utils/check-session";
import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";
interface PostBody {
  tokenAddress: string;
  tokenName: string;
  tokenTicker: string;
  imageURL: string;
  slug: string;
}

interface PutBody {
  id: string;
  status: string;
}

export async function POST(request: NextRequest) {
  const body: PostBody = await request.json();
  const session = await checkUserSession();
  if (!session) return NextResponse.json({}, { status: 401 });
  // check if the user has a treasury
  const provider = new ethers.JsonRpcProvider(config.rpcURL);
  const contract = new ethers.Contract(
    config.casinoContract,
    MadgeCasino__factory.abi,
    provider
  );
  const treasuryOnChain = await contract.treasuries(
    session.pubkey,
    body.tokenAddress
  );
  if (treasuryOnChain[0] === session.pubkey)
    return NextResponse.json(
      {},
      { status: 400, statusText: "User already has a treasury " }
    );

  const dbTreasury = await supabase
    .from("coin_flipper_treasuries")
    .select("*")
    .eq("owner_address", session.pubkey)
    .eq("token_address", body.tokenAddress);
  if (dbTreasury.data && dbTreasury.data.length > 0) {
    return NextResponse.json({ id: dbTreasury.data[0].id });
  }

  // create a new treasury
  const { data, error } = await supabase
    .from("coin_flipper_treasuries")
    .insert({
      token_address: body.tokenAddress,
      token_name: body.tokenName,
      token_ticker: body.tokenTicker,
      owner_address: session!.pubkey,
      image_url: body.imageURL,
      slug: body.slug,
      balance: "0",
      status: "pending",
    })
    .select("id");
  if (error) return NextResponse.json({ error }, { status: 500 });
  const response = data[0];
  return NextResponse.json(response, { status: 200 });
}

export async function PUT(request: NextRequest) {
  const body: PutBody = await request.json();
  console.log(body);
  const session = await checkUserSession();
  if (!session) return NextResponse.json({}, { status: 401 });
  const { data, error } = await supabase
    .from("coin_flipper_treasuries")
    .update({
      status: body.status,
    })
    .eq("id", Number(body.id));
  if (error) return NextResponse.json({ error }, { status: 500 });
  console.log({ data });
  return NextResponse.json({}, { status: 200 });
}
