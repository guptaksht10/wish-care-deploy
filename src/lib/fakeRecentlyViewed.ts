import { Product } from "./types";

export const recentlyViewedProducts: Product[] = [
  {
    id: "prod_401",
    name: "Wireless Charging Pad",
    description: "Fast wireless charger compatible with all devices.",
    price: 699,
    image: "/products/wirelesscharger2.jpg",
    rating: 4.1,
    category: "electronics",
    tags: ["wireless", "charging", "pad"]
  },
  {
    id: "prod_402",
    name: "Essential Oil Diffuser",
    description: "Creates a relaxing ambiance with aroma therapy.",
    price: 899,
    image: "/products/oildiffuser2.jpg",
    rating: 4.4,
    category: "home-decor",
    tags: ["oil", "diffuser", "aroma"]
  }
];
