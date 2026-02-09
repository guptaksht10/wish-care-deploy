"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import ReelsModal from "@/components/reels/ReelsModal";

import {
  Heart,
  Store,
  ShoppingCart,
  User2,
  Search,
  Moon,
  Sun,
  LogOut,
  Play,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const [openReels, setOpenReels] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src="/logofull_wishcare.png"
                  alt="WishCare Logo"
                  width={50}
                  height={50}
                />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  WishCare
                </h1>
              </div>
            </Link>

            {/* Nav */}
            <nav className="hidden md:flex items-center space-x-5">
              <Link
                href="/"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Home
              </Link>

              <Link
                href="/products"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Products
              </Link>

              <Link
                href="/about"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2">

            {/* Search */}
            <div className="hidden lg:flex items-center space-x-1">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="w-64 text-sm"
              />
            </div>

            {/* Reels */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-purple-50 cursor-pointer"
              onClick={() => setOpenReels(true)}
            >
              <Play className="h-5 w-5 text-purple-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
            </Button>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-purple-50 cursor-pointer"
              >
                <Heart className="h-5 w-5 text-pink-500" />
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-purple-50 cursor-pointer"
              >
                <ShoppingCart className="h-5 w-5 text-purple-500" />
              </Button>
            </Link>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>

                {/* IMPORTANT: pointer + wrapper */}
                <button
                  type="button"
                  className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-purple-50 cursor-pointer focus:outline-none"
                >
                  {session?.user?.image ? (
                    <div className="w-8 h-8 rounded-md overflow-hidden pointer-events-none">
                      <Image
                        src={session.user.image}
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <User2 className="h-5 w-5 text-gray-700 pointer-events-none" />
                  )}
                </button>

              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-44"
                align="end"
                sideOffset={6}
              >
                <DropdownMenuLabel>
                  {session?.user?.name || "Manage Account"}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/profile">My Account</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/orders">View Orders</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/wishlist">Your Wishlist</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/shop/register">
                    <span className="flex items-center gap-2">
                      <Store className="w-4 h-4" />
                      Become a Seller
                    </span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() =>
                    signOut({ callbackUrl: "/auth/login" })
                  }
                  className="text-red-500 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setTheme(theme === "light" ? "dark" : "light")
                }
                className="hover:bg-purple-50 cursor-pointer"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5 text-gray-600" />
                ) : (
                  <Sun className="h-5 w-5 text-yellow-500" />
                )}
              </Button>
            )}

          </div>

          {/* Reels Modal */}
          <ReelsModal
            open={openReels}
            onClose={() => setOpenReels(false)}
          />

        </div>
      </div>
    </header>
  );
}
