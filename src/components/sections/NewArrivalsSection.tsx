"use client";

import { newArrivalProducts } from "@/lib/fakeNewArrivals";
import ProductCard from "@/components/ProductCard";

export default function NewArrivalsSection() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">New Arrivals</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {newArrivalProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
