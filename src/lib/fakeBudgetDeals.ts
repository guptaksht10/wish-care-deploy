import { Product } from "./types";

export const budgetDealProducts: Product[] = [
  {
    id: "prod_301",
    name: "Reusable Cotton Pads",
    description: "Eco-friendly makeup removal pads.",
    price: 199,
    image: "/products/cottonpad.jpg",
    rating: 4.1,
    category: "beauty",
    isBudgetDeal: true,
    tags: ["eco", "makeup", "cotton"]
  },
  {
    id: "prod_302",
    name: "Mini Portable Fan",
    description: "USB powered personal fan for desk or travel.",
    price: 299,
    image: "/products/portablefan.jpg",
    rating: 4.0,
    category: "electronics",
    isBudgetDeal: true,
    tags: ["fan", "mini", "portable"]
  }
];
