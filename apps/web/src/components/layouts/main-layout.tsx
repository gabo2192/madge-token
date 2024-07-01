import { Header } from "@/components/sections/header";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: Props) {
  return (
    <>
      <Header className="h-[72px] py-4 w-[90vw] mx-auto max-w-2xl lg:max-w-5xl" />
      <main
        className={cn(
          "py-8 w-[90vw] mx-auto max-w-2xl lg:max-w-5xl min-h-[calc(100vh-72px)]",
          className
        )}
      >
        {children}
      </main>
    </>
  );
}
