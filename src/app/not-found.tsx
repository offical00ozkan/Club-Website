"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center w-full justify-center min-h-screen px-6 text-center">
      
      <motion.h1
        className="text-9xl font-extrabold text-white mb-6 select-none"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-white/90 text-lg md:text-xl mb-8 max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Aradığın sayfa bulunamadı. Adres yanlış olabilir veya sayfa taşınmış olabilir.
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Link
          href="/home"
          className="px-6 py-3 bg-white/90 text-cyan-950 font-semibold rounded-lg shadow-lg hover:bg-white transition"
        >
          Ana Sayfaya Dön
        </Link>
      </motion.div>

      <motion.div
        className="mt-16 w-full max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 0.5, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-48">
          <circle cx="100" cy="100" r="80" fill="white" />
        </svg>
      </motion.div>
    </div>
  );
}
