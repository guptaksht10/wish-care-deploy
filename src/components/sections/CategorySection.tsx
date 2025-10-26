"use client";

import { categories } from "@/lib/fakeCategoryData";

export default function CategorySection() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border rounded-md p-2 flex flex-col items-center text-center"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
