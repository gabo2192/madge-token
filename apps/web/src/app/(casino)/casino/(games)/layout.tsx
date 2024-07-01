import { CasinoBalance } from "@/components/client/casino-balance";
import { CasinoNav } from "@/components/client/casino-nav";
import { MainLayout } from "@/components/layouts/main-layout";
import { checkUserSession } from "@/utils/check-session";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}
export default async function Layout({ children }: Props) {
  const user = await checkUserSession();
  if (!user) redirect("/casino");
  return (
    <MainLayout className="px-0 w-full flex flex-col pb-0">
      <div className="flex gap-4 items-center my-10 px-4">
        <Avatar className="size-16">
          <AvatarImage src={user.image} />
          <AvatarFallback>0X</AvatarFallback>
        </Avatar>
        <h1 className="font-koulen text-5xl">Let's play some games!</h1>
      </div>
      <div className="mx-auto mb-4">
        <CasinoNav />
      </div>
      <div className="bg-accent/90 flex-1 pt-12 px-3 rounded-t-[64px] md:flex-grow-0 md:pb-10 md:rounded-md">
        <CasinoBalance />
        {children}
      </div>
    </MainLayout>
  );
}
