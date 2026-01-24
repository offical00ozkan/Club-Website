"use client";

import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, Archive } from "lucide-react";
import Link from "next/link";

export default function FinancePage() {
  const buttons = [
    { title: "Güncel Stok Durumu", icon: <Archive className="w-6 h-6" />, href: "/future" },
    { title: "Satış Başlat", icon: <ShoppingCart className="w-6 h-6" />, href: "/future" },
    { title: "Tüm Satışlar", icon: <DollarSign className="w-6 h-6" />, href: "/future" },
  ];

  return (
    <div className="p-8 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Finans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {buttons.map((btn) => (
          <Link key={btn.title} href={btn.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex items-center gap-4 hover:bg-white/20 transition cursor-pointer"
            >
              <div className="p-3 bg-green-500/30 rounded-full">{btn.icon}</div>
              <div>
                <p className="text-gray-300 text-sm">{btn.title}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
