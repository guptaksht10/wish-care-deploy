"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Icons
import StorefrontIcon from "@mui/icons-material/Storefront";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  slug: string;
};

type Shop = {
  id: string;
  name: string;
  slug: string;
  owner: {
    username: string;
    image?: string;
  };
  products: Product[];
};

type ErrorType = "FORBIDDEN" | "NOT_FOUND" | "UNKNOWN" | null;

export default function ShopDashboardPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchShop = async () => {
      try {
        const res = await fetch(`/api/shops/${slug}`);

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        if (res.status === 403) {
          setError("FORBIDDEN");
          return;
        }

        if (res.status === 404) {
          setError("NOT_FOUND");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed");
        }

        const data = await res.json();
        setShop(data);
      } catch (err) {
        console.error(err);
        setError("UNKNOWN");
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [slug, router]);

  /* -------------------- LOADING -------------------- */
  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading dashboard...</p>
        </main>
        <Footer />
      </>
    );
  }

  /* -------------------- ERROR PAGE -------------------- */
  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {error === "FORBIDDEN" && "Access Denied"}
              {error === "NOT_FOUND" && "Shop Not Found"}
              {error === "UNKNOWN" && "Something Went Wrong"}
            </h1>

            <p className="text-gray-500">
              {error === "FORBIDDEN" &&
                "You don’t have permission to view this shop dashboard."}
              {error === "NOT_FOUND" &&
                "The shop you’re trying to access does not exist."}
              {error === "UNKNOWN" &&
                "An unexpected error occurred. Please try again later."}
            </p>

            <Button variant="outline" onClick={() => router.push("/")}>
              Go Home
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!shop) return null;

  /* -------------------- STATS -------------------- */
  const stats = [
    {
      label: "Products",
      value: shop.products.length,
      icon: <Inventory2Icon className="text-pink-500" />,
    },
    {
      label: "Orders",
      value: 0,
      icon: <ShoppingBagIcon className="text-purple-500" />,
    },
    {
      label: "Likes",
      value: 0,
      icon: <FavoriteIcon className="text-red-500" />,
    },
    {
      label: "Growth",
      value: "+0%",
      icon: <TrendingUpIcon className="text-green-500" />,
    },
  ];

  /* -------------------- DASHBOARD -------------------- */
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 px-6 py-20">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* SHOP HEADER */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 p-10 text-white shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="p-4 rounded-2xl bg-white/20">
                  <StorefrontIcon fontSize="large" />
                </div>

                <div>
                  <h1 className="text-3xl font-extrabold">
                    {shop.name}
                  </h1>
                  <p className="text-sm opacity-90">
                    @{shop.owner.username}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-white text-purple-600">
                  <AddIcon className="mr-2" />
                  Add Product
                </Button>

                <Button
                  variant="outline"
                  className="border-white text-white"
                >
                  <SettingsIcon className="mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </motion.section>

          {/* STATS */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="rounded-2xl">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      {stat.label}
                    </p>
                    <h3 className="text-2xl font-bold">
                      {stat.value}
                    </h3>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-100">
                    {stat.icon}
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* PRODUCTS */}
          <section>
            <h2 className="text-xl font-bold mb-4">
              Products
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shop.products.map((product) => (
                <Card key={product.id} className="rounded-xl">
                  <CardContent className="p-4">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      ₹{product.price}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
