"use client";

import { useState } from "react";
import AddToCartModal from "@/components/cart/AddToCartModal";

export function AddToCartButton({
  product,
  inCart = false,
  onAdd,
}: {
  product: any;
  inCart: boolean;
  onAdd?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);

  const handleClick = () => {
    if (inCart) return;

    // Optional external logic (Redux / API)
    onAdd?.();

    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={inCart}
        className="w-full py-4 rounded-xl font-semibold shadow transition
                   bg-gradient-to-r from-pink-500 to-purple-600
                   text-white hover:opacity-90
                   disabled:opacity-60"
      >
        {inCart ? "Added to Cart" : "Add to Cart"}
      </button>

      {/* BLURRED MODAL */}
      <AddToCartModal
        open={open}
        onClose={() => setOpen(false)}
        product={{
          title: product.title,
          price: product.price,
          image: product.images[0],
        }}
        quantity={qty}
        setQuantity={setQty}
      />
    </>
  );
}
