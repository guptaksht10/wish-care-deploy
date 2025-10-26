"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Trash2, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const initialWishlist = [
  {
    id: 1,
    name: "Noise Smartwatch",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.5,
    image: "/products/watch.png",
    badge: "Trending",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.2,
    image: "/products/earbuds.png",
    badge: "Best Seller",
  },
  {
    id: 3,
    name: "Fitness Tracker Band",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    image: "/products/band.png",
    badge: "New",
  },
]

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist)
  const [sortKey, setSortKey] = useState("default")

  const handleRemove = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  const sortedWishlist = [...wishlist].sort((a, b) => {
    switch (sortKey) {
      case "price-asc": return a.price - b.price
      case "price-desc": return b.price - a.price
      case "rating": return b.rating - a.rating
      case "name": return a.name.localeCompare(b.name)
      default: return 0
    }
  })

  return (
    <>
    <Header />

    <main className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-purple-50 px-6 py-12">
      <section className="max-w-7xl mx-auto space-y-12">
        {/* Title + Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-4xl font-bold text-pink-600">
            💖 Your Wishlist <span className="text-gray-500">({wishlist.length})</span>
          </h1>

          <Select onValueChange={(v) => setSortKey(v)}>
            <SelectTrigger className="w-56 border-pink-300">
              Sort by
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Wishlist Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedWishlist.map((product) => (
            <div key={product.id} className="relative group">
              {/* Remove Button */}
              <button
                className="absolute top-3 right-3 z-10 p-2 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition"
                onClick={() => handleRemove(product.id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <Card className="rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 overflow-hidden">
                <div className="relative w-full h-48 bg-gradient-to-tr from-pink-100 to-purple-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      {product.badge}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-800">${product.price.toFixed(2)}</span>{" "}
                      <span className="line-through ml-2 text-gray-400">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center text-yellow-500 text-sm font-medium">
                      <Star className="w-4 h-4 fill-yellow-400 mr-1" />
                      {product.rating}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:brightness-110 transition">
                    <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}