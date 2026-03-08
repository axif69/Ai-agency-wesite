import { motion } from "motion/react";

export default function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1.5 }}
    >
      <motion.div
        className="text-4xl md:text-6xl font-bold text-white tracking-tighter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        ASIF KHAN
      </motion.div>
    </motion.div>
  );
}
