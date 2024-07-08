import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { HamburgerMenu } from "./hamburger-menu";
import { Navigation } from "./navigation";

interface Props {
  className?: string;
}

const mainNavigation = [
  {
    label: "Home",
    href: "/",
  },
  // {
  //   label: "Documentation",
  //   href: "/docs",
  // },
  // {
  //   label: "Madge Casino",
  //   href: "/casino",
  // },
];

export function Header({ className }: Props) {
  return (
    <header className={cn("flex", className)}>
      <HamburgerMenu />
      <div className="hidden md:block">
        <Navigation items={mainNavigation} />
      </div>
      <div className="ml-auto flex flex-row gap-4">
        <ConnectButton />
      </div>
    </header>
  );
}
