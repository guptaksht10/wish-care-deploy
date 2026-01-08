"use client";

import Rating from "@mui/material/Rating";
import SellIcon from "@mui/icons-material/Sell";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import ProductActions from "./ProductActions";
import { AddToCartButton } from "./AddToCartButton";

export default function RightDetailsPanel({ product }: any) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      className="bg-gradient-to-br from-purple-100 via-pink-100 to-white
                 border border-purple-200 rounded-2xl p-8
                 shadow-xl space-y-6"
    >
      {/* TITLE */}
      <h1 className="text-2xl font-bold text-gray-900">
        {product.title}
      </h1>

      {/* PRICE */}
      <div>
        <p className="text-sm text-green-600 font-medium">
          Special Price
        </p>

        <div className="flex items-center gap-3 mt-1">
          <span className="text-3xl font-bold text-gray-900">
            ₹{product.price}
          </span>
          <span className="line-through text-gray-500">
            ₹{product.originalPrice}
          </span>
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <SellIcon fontSize="small" />
            {discount}% off
          </span>
        </div>
      </div>

      {/* RATING */}
      <div className="flex items-center gap-3">
        <Rating value={product.rating} precision={0.1} readOnly />
        <span className="text-sm text-gray-600">
          {product.rating} • {product.reviews} reviews
        </span>
        <span className="flex items-center gap-1 text-sm text-purple-600">
          <VerifiedIcon fontSize="small" />
          Assured
        </span>
      </div>

      {/* SOCIAL / WISHLIST ACTIONS */}
      <ProductActions />

      {/* COUPONS */}
      <div className="rounded-2xl p-6 shadow-sm space-y-3 bg-white/60">
        <h3 className="font-semibold text-gray-800">
          Coupons for you
        </h3>

        <div className="flex items-start gap-2 text-sm text-gray-700">
          <LocalOfferIcon
            fontSize="small"
            className="text-green-600 mt-0.5"
          />
          Get extra <b>10% off</b> up to ₹200 on prepaid orders
        </div>

        <div className="flex items-start gap-2 text-sm text-gray-700">
          <LocalOfferIcon
            fontSize="small"
            className="text-green-600 mt-0.5"
          />
          Flat ₹50 off using WishCare Coins
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-3">
        <AddToCartButton product={product} inCart={false} />

        <button
          className="w-full py-4 rounded-xl border border-purple-300
                     font-semibold hover:bg-purple-50 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
