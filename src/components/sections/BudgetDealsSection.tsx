"use client";

import { budgetDealProducts } from "@/lib/fakeBudgetDeals";
import ProductCard from "@/components/ProductCard";

export default function BudgetDealsSection() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Budget Deals</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {budgetDealProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
