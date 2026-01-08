"use client";

import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";

export default function SellerCard({ seller }: any) {
  return (
    <div className="bg-white border border-purple-100 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={seller.avatar}
          className="w-12 h-12 rounded-full border"
        />
        <div>
          <div className="flex items-center gap-1 font-semibold text-gray-800">
            {seller.name}
            <VerifiedIcon fontSize="small" className="text-purple-600" />
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <StarIcon fontSize="small" className="text-yellow-500" />
            {seller.rating} Seller Rating
          </div>
        </div>
      </div>
    </div>
  );
}
