"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function FeaturesComingSoon() {

  const goBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-4"
      >
        <Clock size={64} className="text-white/90" />
        <h1 className="text-5xl font-extrabold text-white">Yakında!</h1>
        <p className="text-white/80 max-w-lg">
          Harika özellikler üzerinde çalışıyoruz. Çok yakında sizinle paylaşacağız!
        </p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12"
      >
        <button
          onClick={goBack}
          className="px-6 py-3 bg-white/90 text-cyan-950 font-semibold rounded-lg shadow-lg hover:bg-white transition"
        >
          Geri Dön
        </button>
      </motion.div>
    </div>
  );
}
