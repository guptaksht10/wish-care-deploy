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

export default function ExploreTagPage() {
  const params = useParams();
  const tag = (params?.tag as string) || "";

  const allProducts = [
    ...trendingProducts,
    ...newArrivalProducts,
    ...topRatedProducts,
    ...budgetDealProducts,
    ...recentlyViewedProducts,
  ];

  const filteredProducts = allProducts.filter((product) => {
    const tagMap: Record<string, keyof typeof product> = {
      "trending": "isTrending",
      "new-arrivals": "isNew",
      "best-sellers": "isBestSeller",
      "budget-deals": "isBudgetDeal",
      "top-rated": "isTopRated",
    };

    const prop = tagMap[tag];
    return prop && product[prop as keyof typeof product] === true;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen pt-6 pb-16 px-4">
        <h1 className="text-2xl font-bold text-center text-purple-700 capitalize mb-8">
          Showing results for: {tag.replace("-", " ")}
        </h1>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found for this tag.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
