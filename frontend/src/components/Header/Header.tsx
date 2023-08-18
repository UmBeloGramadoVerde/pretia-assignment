"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/ui/button";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/ui/dropdown-menu";

const Header = () => {
  return (
    <div className="p-5 flex justify-between items-center border-b border-border">
      <h1 className="text-2xl">Pretia Assesment</h1>
      <section className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="gap-3">
            <NavigationMenuItem>
              <Link href="/login">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/all-posts">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  All Posts
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/write">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  New Post
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/profile">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  My Profile
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>
      <section className="block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="px-3 py-1" variant="outline">
              <MenuIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <Link href="/">
                <DropdownMenuItem>Home</DropdownMenuItem>
              </Link>
              <Link href="/transactions">
                <DropdownMenuItem>Transactions</DropdownMenuItem>
              </Link>
              <Link href="/summary">
                <DropdownMenuItem>Summary</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </div>
  );
};

export default Header;
