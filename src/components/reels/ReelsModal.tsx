"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReelsFeed from "./ReelsFeed";

export default function ReelsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full text-white"
          >
            <X />
          </button>

          <ReelsFeed />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
