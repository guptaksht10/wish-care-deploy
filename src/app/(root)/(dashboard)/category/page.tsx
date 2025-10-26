"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShoppingBag, Brush, MonitorSmartphone, Home } from "lucide-react";

const categories = [
  { name: "Skincare", slug: "skincare", icon: <Brush className="w-8 h-8 text-pink-500" /> },
  { name: "Electronics", slug: "electronics", icon: <MonitorSmartphone className="w-8 h-8 text-blue-500" /> },
  { name: "Fashion", slug: "fashion", icon: <ShoppingBag className="w-8 h-8 text-purple-500" /> },
  { name: "Home Decor", slug: "home-decor", icon: <Home className="w-8 h-8 text-yellow-500" /> },
];

export default function AllCategoriesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-purple-700 mb-4 text-center">Explore Categories</h1>
          <p className="text-center text-gray-600 mb-12 text-lg">Browse through our wide range of product categories to find what suits you best!</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat) => (
              <Link href={`/category/${cat.slug}`} key={cat.slug}>
                <div className="group p-6 bg-white shadow-lg hover:shadow-xl transition rounded-xl border border-purple-100 cursor-pointer hover:scale-105 duration-300">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-purple-100 p-4 rounded-full group-hover:bg-purple-200 transition">
                      {cat.icon}
                    </div>
                    <h2 className="text-lg font-semibold text-purple-700 group-hover:text-purple-900">
                      {cat.name}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
