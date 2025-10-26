"use client";

import { topRatedProducts } from "@/lib/fakeTopRated";
import ProductCard from "@/components/ProductCard";

export default function TopRatedSection() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Top Rated</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {topRatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
