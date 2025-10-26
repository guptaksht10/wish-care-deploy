import { Product } from "./types";

export const topRatedProducts: Product[] = [
  {
    id: "prod_101",
    name: "Aesthetic Wooden Wall Clock",
    description: "Minimalistic decor piece for modern homes.",
    price: 649,
    image: "/products/wallclock1.jpg",
    rating: 4.7,
    category: "home-decor",
    isTopRated: true,
    tags: ["home", "decor", "clock", "wood"]
  },
  {
    id: "prod_102",
    name: "Vitamin C Foaming Facewash",
    description: "Brightens and detoxifies dull skin naturally.",
    price: 499,
    image: "/products/vitaminc2.jpg",
    rating: 4.4,
    category: "skincare",
    isTopRated: true,
    tags: ["facewash", "vitamin c", "brightening"]
  },
  {
    id: "prod_103",
    name: "Ergonomic Office Chair",
    description: "Comfortable chair with lumbar support and wheels.",
    price: 3499,
    image: "/products/chair.jpg",
    rating: 4.8,
    category: "home-decor",
    isTopRated: true,
    tags: ["chair", "office", "comfort"]
  }
];
