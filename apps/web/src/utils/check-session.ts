import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface User {
  pubkey: string;
  image: string;
}

export async function checkUserSession(): Promise<User | null> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  return {
    pubkey: session?.user?.pubkey as string,
    image: session?.user?.image as string,
  };
}
