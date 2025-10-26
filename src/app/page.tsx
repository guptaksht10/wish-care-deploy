'use client';

import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import UserFeatures from "@/components/sections/UserFeatures";
import Footer from "@/components/Footer";
import ProductCard from "@/components/sections/ProductCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: "$129.99",
      originalPrice: "$179.99",
      image: "/products/headphone1.jpg",
      rating: 5,
      reviews: 124,
      isLiked: true,
      purchasedBy: [
        "https://i.pravatar.cc/40?img=1",
        "https://i.pravatar.cc/40?img=2",
        "https://i.pravatar.cc/40?img=3",
      ],
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: "$199.99",
      originalPrice: "$249.99",
      image: "/products/smartwatch.jpg",
      rating: 4,
      reviews: 89,
      purchasedBy: [
        "https://i.pravatar.cc/40?img=4",
        "https://i.pravatar.cc/40?img=5",
      ],
    },
    {
      id: 3,
      name: "Portable Speaker",
      price: "$79.99",
      image: "/products/boatspeaker.jpg",
      rating: 5,
      reviews: 156,
      purchasedBy: [
        "https://i.pravatar.cc/40?img=6",
        "https://i.pravatar.cc/40?img=7",
        "https://i.pravatar.cc/40?img=8",
      ],
    },
    {
      id: 4,
      name: "Laptop Stand",
      price: "$49.99",
      originalPrice: "$69.99",
      image: "/products/laptopmac.jpg",
      rating: 4,
      reviews: 67,
      purchasedBy: ["https://i.pravatar.cc/40?img=9"],
    },
    {
      id: 5,
      name: "Wireless Charger",
      price: "$39.99",
      image: "/products/wirelesscharger.jpg",
      rating: 5,
      reviews: 203,
      isLiked: true,
      purchasedBy: [
        "https://i.pravatar.cc/40?img=10",
        "https://i.pravatar.cc/40?img=11",
      ],
    },
    {
      id: 6,
      name: "Smart Home Hub",
      price: "$159.99",
      originalPrice: "$199.99",
      image: "/products/smartsoap.jpg",
      rating: 4,
      reviews: 91,
      purchasedBy: [
        "https://i.pravatar.cc/40?img=12",
        "https://i.pravatar.cc/40?img=13",
      ],
    },
  ];

  return (
    <section className="py-20 bg-white" id="featured">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most loved products, carefully selected for quality and
            value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:ml-10">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Checking authentication...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <FeaturedProducts />
      <UserFeatures />
      <Footer />
    </div>
  );
}
