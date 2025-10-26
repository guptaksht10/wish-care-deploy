"use client";

import { recentlyViewedProducts } from "@/lib/fakeRecentlyViewed";
import ProductCard from "@/components/ProductCard";

export default function RecentlyViewedSection() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {recentlyViewedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
