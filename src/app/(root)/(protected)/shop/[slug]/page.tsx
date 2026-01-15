"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// MUI Icons
import StorefrontIcon from "@mui/icons-material/Storefront";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";

export default function ShopDashboardPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 px-6 py-20">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* SHOP HEADER */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 p-10 text-white shadow-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="p-4 rounded-2xl bg-white/20 backdrop-blur">
                  <StorefrontIcon fontSize="large" />
                </div>

                <div>
                  <h1 className="text-3xl font-extrabold">
                    Akshat Gadgets
                  </h1>
                  <p className="text-sm opacity-90">
                    Social-first electronics store
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-white text-purple-600 hover:bg-white/90">
                  <AddIcon className="mr-2" />
                  Add Product
                </Button>

                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <SettingsIcon className="mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </motion.section>

          {/* STATS */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Products",
                value: 12,
                icon: <Inventory2Icon className="text-pink-500" />,
              },
              {
                label: "Orders",
                value: 48,
                icon: <ShoppingBagIcon className="text-purple-500" />,
              },
              {
                label: "Likes",
                value: 312,
                icon: <FavoriteIcon className="text-red-500" />,
              },
              {
                label: "Growth",
                value: "+18%",
                icon: <TrendingUpIcon className="text-green-500" />,
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="rounded-2xl shadow-md">
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
              </motion.div>
            ))}
          </section>

          {/* RECENT ACTIVITY */}
          <section className="grid lg:grid-cols-2 gap-8">
            {/* Orders */}
            <Card className="rounded-3xl shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold mb-6">
                  Recent Orders
                </h2>

                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50"
                    >
                      <div>
                        <p className="font-medium">
                          Wireless Headphones
                        </p>
                        <p className="text-xs text-gray-500">
                          Ordered by Rahul
                        </p>
                      </div>

                      <Badge className="bg-green-100 text-green-700">
                        Paid
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Products */}
            <Card className="rounded-3xl shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold mb-6">
                  Top Liked Products
                </h2>

                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50"
                    >
                      <div>
                        <p className="font-medium">
                          Smart Watch Pro
                        </p>
                        <p className="text-xs text-gray-500">
                          124 likes
                        </p>
                      </div>

                      <FavoriteIcon className="text-pink-500" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
