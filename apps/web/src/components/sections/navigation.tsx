"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface Props {
  items: {
    label: string;
    href: string;
    active?: boolean;
  }[];
}

export function Navigation({ items }: Props) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item, index) => (
          <NavigationMenuItem key={index}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                active={item.active || false}
                className={navigationMenuTriggerStyle()}
              >
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
