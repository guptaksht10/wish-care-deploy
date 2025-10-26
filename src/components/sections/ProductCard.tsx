'use client';
import { Heart, MoreHorizontal, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image?: string; // now supports actual image URL
  rating: number;
  reviews: number;
  isLiked?: boolean;
  purchasedBy?: string[];
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image = "",
  rating,
  reviews,
  isLiked = false,
  purchasedBy = [],
}: ProductCardProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [isHovered, setIsHovered] = useState(false);

  const fallbackImage = "https://via.placeholder.com/300x250.png?text=Product+Image";

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group w-full max-w-sm border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={image || fallbackImage}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : ""
          }`}
        />

        {/* Hover Action Icons */}
        {isHovered && (
          <>
            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 ${
                liked ? "text-red-500" : "text-gray-600"
              }`}
              onClick={() => setLiked(!liked)}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            </Button>

            {/* Star Rating */}
            <div className="absolute top-3 left-3 flex items-center space-x-1 bg-black/60 text-white px-2 py-1 rounded-full">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating ? "text-yellow-400 fill-current" : "text-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Add to Cart */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300">
              <Button className="bg-white text-gray-800 hover:bg-gray-100 px-4 py-2">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Info Section */}
      <div className="p-5 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-800 text-lg group-hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>

          {/* More Options Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="text-gray-500 hover:bg-gray-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>🔗 Share</DropdownMenuItem>
              <DropdownMenuItem>❤️ View Wishlist</DropdownMenuItem>
              <DropdownMenuItem>🛒 Add to Cart</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Pricing */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-purple-600">{price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
          )}
        </div>

        {/* Reviews */}
        <div className="text-xs text-gray-500">{reviews} reviews</div>

        {/* Purchased Avatars */}
        {purchasedBy.length > 0 && (
          <div className="flex items-center space-x-2 pt-2">
            <span className="text-xs text-gray-500">Purchased by:</span>
            <div className="flex -space-x-2">
              {purchasedBy.slice(0, 4).map((src, i) => (
                <div
                  key={i}
                  className="h-7 w-7 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 p-0.5"
                >
                  <Avatar className="h-full w-full border-2 border-white">
                    <AvatarImage
                      src={src || `https://i.pravatar.cc/40?img=${i + 10}`}
                      alt={`Purchased by user ${i + 1}`}
                    />
                    <AvatarFallback>P</AvatarFallback>
                  </Avatar>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
