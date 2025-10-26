"use client";

import { searchMatchProducts } from "@/lib/fakeSearchMatch";
import ProductCard from "@/components/ProductCard";

export default function SearchMatchSection() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Search Matches</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {searchMatchProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
