"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import ProductGallery from "@/components/product/ProductGallery";
import SellerCard from "@/components/product/SellerCard";
import AvatarStack from "@/components/product/AvatarStack";
import LikedByModal from "@/components/product/LikedByModal";
import RightDetailsPanel from "@/components/product/RightDetailsPannel";
import FeedbackSection from "@/components/product/FeedbackSection";

const product = {
  id: "1",
  title: "HMTR Quartz Day And Date Working Analog Watch For Men",
  price: 286,
  originalPrice: 2999,
  rating: 3.9,
  reviews: 53,
  seller: {
    name: "WishCare Verified Seller",
    rating: 4.6,
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  images: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
  ],
  likedBy: [
    { id: 1, avatar: "https://i.pravatar.cc/40?img=1", name: "Rahul" },
    { id: 2, avatar: "https://i.pravatar.cc/40?img=2", name: "Ankit" },
    { id: 3, avatar: "https://i.pravatar.cc/40?img=3", name: "Neha" },
  ],
};

export default function ProductDetailsPage() {
  const [openLikes, setOpenLikes] = useState(false);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-br 
                       from-pink-50 via-purple-50 to-white
                       px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto
                     grid lg:grid-cols-2 gap-12"
        >
          {/* LEFT */}
          <div className="space-y-6 lg:sticky lg:top-24 h-fit">
            <div className="bg-white border border-purple-100
                            rounded-2xl p-6 shadow-lg">
              <ProductGallery images={product.images} />
            </div>

            <SellerCard seller={product.seller} />

            <div
              onClick={() => setOpenLikes(true)}
              className="cursor-pointer"
            >
              <AvatarStack users={product.likedBy} />
            </div>
          </div>

          {/* RIGHT */}
          <RightDetailsPanel product={product} />
        </motion.div>

        {/* FEEDBACK */}
        <div className="max-w-7xl mx-auto mt-20">
          <FeedbackSection />
        </div>
      </main>

      <Footer />

      {/* LIKED BY */}
      <LikedByModal
        open={openLikes}
        onClose={() => setOpenLikes(false)}
        users={product.likedBy}
      />
    </>
  );
}
