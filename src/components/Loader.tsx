"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function HeartLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-white">
      <motion.div
        animate={{
          scale: [0.75, 1.15, 0.75],
          boxShadow: [
            "0 0 0px rgba(236,72,153,0.25)",
            "0 0 30px rgba(168,85,247,0.6)",
            "0 0 0px rgba(236,72,153,0.25)",
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
        className="rounded-full bg-gradient-to-br from-pink-400 to-purple-600 p-7"
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <Heart className="w-10 h-10 text-white fill-white" />
        </motion.div>
      </motion.div>

    </div>
  );
}
