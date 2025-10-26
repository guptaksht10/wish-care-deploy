"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative rounded-xl overflow-hidden border bg-white hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isNew && (
          <Badge className="absolute top-2 left-2 bg-green-600 text-white">New</Badge>
        )}
        {product.isBestSeller && (
          <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">Best Seller</Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-md font-semibold text-gray-800 group-hover:text-purple-700 transition">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-purple-600">₹{product.price}</p>
          <Button variant="ghost" size="icon" className="hover:bg-purple-50">
            <ShoppingCart className="h-5 w-5 text-purple-600" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
