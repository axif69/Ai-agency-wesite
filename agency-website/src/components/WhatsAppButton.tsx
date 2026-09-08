"use client";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/971545866094"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Asif Digital on WhatsApp"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-4 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
    </motion.a>
  );
}
