"use client";

import { Heart, Bookmark, Share2 } from "lucide-react";

export default function ProductActions() {
  return (
    <div className="flex gap-4">
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-white transition">
        <Heart size={18} /> Like
      </button>

      <button className="flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-white transition">
        <Bookmark size={18} /> Wishlist
      </button>

      <button className="flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-white transition">
        <Share2 size={18} /> Share
      </button>
    </div>
  );
}
