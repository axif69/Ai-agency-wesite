import { motion } from "motion/react";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 rounded-full border-t-2 border-white animate-spin" />
        <div className="text-2xl md:text-3xl font-serif font-bold text-white tracking-widest text-center animate-pulse">
          ASIF KHAN.
        </div>
      </div>
    </div>
  );
}
