import { Product } from "./types";

export const newArrivalProducts: Product[] = [
  {
    id: "prod_201",
    name: "Glow Boost Sheet Mask",
    description: "Hydrating mask with hyaluronic acid and aloe vera.",
    price: 99,
    image: "/products/oildiffuser.jpg",
    rating: 4.2,
    category: "skincare",
    isNew: true,
    tags: ["mask", "hydrating", "aloe"]
  },
  {
    id: "prod_202",
    name: "Smart LED Strip Lights",
    description: "Color-changing lights controlled via app and voice.",
    price: 799,
    image: "/products/smartstrip.jpg",
    rating: 4.3,
    category: "electronics",
    isNew: true,
    tags: ["led", "smart", "decor"]
  }
];
