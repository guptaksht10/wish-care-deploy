"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  product: {
    title: string;
    price: number;
    image: string;
  };
  quantity: number;
  setQuantity: (q: number) => void;
}

export default function AddToCartModal({
  open,
  onClose,
  product,
  quantity,
  setQuantity,
}: Props) {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const handleAddToCart = () => {
    // 👉 Later: Redux / API call here

    setAlert({
      open: true,
      message: "Added to cart successfully 🎉",
      severity: "success",
    });

    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* BLURRED BACKDROP */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-md"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* MODAL */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="fixed z-50 top-1/2 left-1/2
                         -translate-x-1/2 -translate-y-1/2
                         w-[90%] max-w-md rounded-2xl
                         bg-gradient-to-br from-purple-50 via-pink-50 to-white
                         p-6 shadow-2xl
                         border border-purple-200"
            >
              {/* HEADER */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow">
                  <ShoppingCartIcon />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Added to Cart
                </h2>
              </div>

              {/* PRODUCT */}
              <div className="flex gap-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={90}
                  height={90}
                  className="rounded-xl object-cover border border-purple-100"
                />

                <div className="flex-1">
                  <p className="font-medium text-gray-800 line-clamp-2">
                    {product.title}
                  </p>

                  <p className="text-purple-600 font-semibold mt-1">
                    ₹{product.price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        setQuantity(Math.max(1, quantity - 1))
                      }
                      className="w-8 h-8 rounded-full border border-purple-300 hover:bg-purple-50 transition"
                    >
                      −
                    </button>

                    <span className="font-medium">{quantity}</span>

                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full border border-purple-300 hover:bg-purple-50 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="flex-1 py-2 rounded-xl border border-purple-300 font-medium hover:bg-purple-50 transition"
                >
                  Continue Shopping
                </button>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2 rounded-xl
                             bg-gradient-to-r from-pink-500 to-purple-600
                             text-white font-semibold
                             hover:opacity-90 transition"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={() => setAlert({ ...alert, open: false })}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={() => setAlert({ ...alert, open: false })}
        severity={alert.severity}
        variant="filled"
        sx={{
          width: "100%",
          background: "linear-gradient(135deg, #ec4899, #8b5cf6)", // pink → purple
          color: "#fff",
          fontWeight: 500,
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          borderRadius: "12px",
        }}
      >
        {alert.message}
      </Alert>
    </Snackbar>

    </>
  );
}
