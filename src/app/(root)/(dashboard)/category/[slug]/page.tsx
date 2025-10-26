"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

import { trendingProducts } from "@/lib/fakeTrending";
import { newArrivalProducts } from "@/lib/fakeNewArrivals";
import { topRatedProducts } from "@/lib/fakeTopRated";
import { budgetDealProducts } from "@/lib/fakeBudgetDeals";
import { recentlyViewedProducts } from "@/lib/fakeRecentlyViewed";

const allProducts = [
  ...trendingProducts,
  ...newArrivalProducts,
  ...topRatedProducts,
  ...budgetDealProducts,
  ...recentlyViewedProducts,
];

export default function CategoryPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";

  const categoryProducts = allProducts.filter(
    (product) => product.category.toLowerCase() === slug.toLowerCase()
  );

  return (
    <>
      <Header />
      <main className="min-h-screen pt-6 pb-16 px-4">
        <h1 className="text-2xl font-bold text-center text-purple-700 capitalize mb-8">
          Showing results for: {slug}
        </h1>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found in this category.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
