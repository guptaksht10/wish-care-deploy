"use client";

import { trendingProducts } from "@/lib/fakeTrending";
import ProductCard from "@/components/ProductCard";

export default function TrendingSection() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Trending Now</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {trendingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
