import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { UpdateMerkleRoot } from "./components/update-merkle-root";

export default async function Admin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  if (session?.user?.pubkey !== process.env.OWNER_ADDRESS) {
    signOut();
    return redirect("/");
  }

  return (
    <div className="bg-black h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-xl">Admin</h1>
        <UpdateMerkleRoot />
      </div>
    </div>
  );
}
