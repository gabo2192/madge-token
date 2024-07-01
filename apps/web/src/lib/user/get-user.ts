import { supabase } from "@/lib/supabase";

export async function getUser(address: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("address", address);
  return { data, error };
}
