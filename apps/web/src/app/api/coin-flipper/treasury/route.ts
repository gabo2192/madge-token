import { supabase } from "@/lib/supabase";
import { checkUserSession } from "@/utils/check-session";
import { NextRequest, NextResponse } from "next/server";
interface PostBody {
  tokenAddress: string;
  tokenName: string;
  tokenTicker: string;
}

interface PutBody {
  id: string;
  status: string;
}

export async function POST(request: NextRequest) {
  const body: PostBody = await request.json();
  const session = await checkUserSession();
  if (!session) return NextResponse.json({}, { status: 401 });

  const { data, error } = await supabase
    .from("coin_flipper_treasuries")
    .insert({
      token_address: body.tokenAddress,
      token_name: body.tokenName,
      token_ticker: body.tokenTicker,
      owner_address: session!.pubkey,
      balance: "0",
      status: "pending",
    })
    .select("id");
  if (error) return NextResponse.json({ error }, { status: 500 });
  const response = data[0];
  return NextResponse.json(response.id);
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
