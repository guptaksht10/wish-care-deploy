export type Product = {
  id: string;                   // Unique product ID
  name: string;                 // Product title/name
  description?: string;         // Optional product description
  price: number;                // Price in rupees
  image: string;                // Image URL
  rating: number;               // Rating out of 5
  category?: string;            // Category name (like skincare, fashion etc.)
  isNew?: boolean;              // Whether it's a new arrival
  isBestSeller?: boolean;       // Whether it's a best seller
  isTrending?: boolean;         // Whether it's trending
  isTopRated?: boolean;         // For top-rated section
  isBudgetDeal?: boolean;       // For budget deals section
  tags?: string[];              // Extra tags for search/matching
};
