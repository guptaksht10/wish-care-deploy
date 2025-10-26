import { Product } from "./types";

export const searchMatchProducts: Product[] = [
  {
    id: "prod_501",
    name: "Blue Light Blocking Glasses",
    description: "Protects your eyes from screen exposure.",
    price: 499,
    image: "/products/sunglasses.jpg",
    rating: 4.2,
    category: "fashion",
    tags: ["glasses", "blue light", "eye protection"]
  },
  {
    id: "prod_502",
    name: "Laptop Stand",
    description: "Ergonomic and foldable laptop stand.",
    price: 899,
    image: "/products/laptopmac.jpg",
    rating: 4.3,
    category: "electronics",
    tags: ["laptop", "stand", "ergonomic"]
  }
];
