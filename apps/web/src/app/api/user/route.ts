import { supabase } from "@/lib/supabase";
import { checkUserSession } from "@/utils/check-session";
import { NextResponse } from "next/server";

export async function PUT() {
  const user = await checkUserSession();
  if (!user) return NextResponse.json({}, { status: 401 });
  const { data, error } = await supabase
    .from("users")
    .update({
      claimed: true,
    })
    .eq("address", user.pubkey);
  if (error) {
    console.error(error);
    return NextResponse.json({}, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}
