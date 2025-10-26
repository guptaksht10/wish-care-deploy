"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  LogOut,
  Pencil,
  ShoppingCart,
  Heart,
  PackageSearch,
  Users,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Checking authentication...
      </div>
    );
  }

  if (!session) return null; // Prevent rendering before redirect

  const user = {
    name: session.user?.name || "User",
    image: session.user?.image || "/avatars/placeholder.png",
    bio: "Manifesting my wishlist, one like at a time.",
    followers: 140,
    following: 85,
    friends: 50,
    address: {
      name: session.user?.name || "User",
      line: "A-23, Sector 62, Noida, Uttar Pradesh",
      pincode: "201301",
      phone: "+91-9876543210",
    },
  };

  const quickSections = [
    {
      title: "Wishlist",
      count: 6,
      icon: <Heart className="w-5 h-5 inline mr-1 text-pink-600" />,
      gradient: "from-pink-700 to-purple-700",
      link: "/wishlist",
    },
    {
      title: "Cart",
      count: 3,
      icon: <ShoppingCart className="w-5 h-5 inline mr-1 text-pink-600" />,
      gradient: "from-purple-700 to-pink-700",
      link: "/cart",
    },
    {
      title: "Orders",
      count: 12,
      icon: <PackageSearch className="w-5 h-5 inline mr-1 text-pink-600" />,
      gradient: "from-pink-700 to-purple-700",
      link: "/orders",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 px-6 py-14">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* 🧑 Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6 rounded-xl shadow-md"
          >
            <Image
              src={user.image}
              alt="Profile"
              width={150}
              height={150}
              className="rounded-full border-4 border-pink-400 shadow-md object-cover"
            />
            <div className="text-center md:text-left space-y-3">
              <h2 className="text-4xl font-bold text-purple-700">{user.name}</h2>
              <p className="text-gray-600 text-base">{user.bio}</p>
              <div className="flex gap-4 justify-center md:justify-start text-sm text-gray-700">
                <span><strong>Followers:</strong> {user.followers}</span>
                <span><strong>Following:</strong> {user.following}</span>
                <span
                  onClick={() => router.push("/friends")}
                  className="cursor-pointer text-purple-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <Users className="w-4 h-4" />
                  <strong>Friends:</strong> {user.friends}
                </span>
              </div>

              {/* 🔐 Buttons */}
              <div className="flex gap-3 mt-2 justify-center md:justify-start">
                <Button
                  variant="outline"
                  className="border-pink-300 text-pink-600 hover:bg-pink-100 cursor-pointer"
                  onClick={() => router.push("/edit-profile")}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-500 border border-red-300 hover:bg-red-100 cursor-pointer"
                  onClick={() => signOut({ callbackUrl: "/auth/login" })}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>

          {/* 🧾 Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {quickSections.map((item) => (
              <Card
                key={item.title}
                onClick={() => router.push(item.link)}
                className={`cursor-pointer hover:scale-110 transition-all duration-300 p-6 text-center rounded-xl shadow-md border border-purple-100 bg-gradient-to-br from-purple-500/50 to-pink-500/50`}
              >
                <h3
                  className={`text-xl font-semibold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                >
                  {item.icon}
                  {item.title}
                </h3>
                <p className="text-3xl font-bold mt-2 text-purple-700">{item.count}</p>
              </Card>
            ))}
          </div>

          {/* 📦 Shipping Address */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-700">Shipping Address</h3>
            <div className="p-4 bg-white rounded-lg shadow space-y-1 border border-gray-100">
              <p><strong>Name:</strong> {user.address.name}</p>
              <p><strong>Address:</strong> {user.address.line}</p>
              <p><strong>Pincode:</strong> {user.address.pincode}</p>
              <p><strong>Phone:</strong> {user.address.phone}</p>
            </div>
          </div>

          {/* 🚀 CTA */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg shadow-md hover:scale-105 transition cursor-pointer"
              onClick={() => router.push("/")}
            >
              Go to Explore
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
