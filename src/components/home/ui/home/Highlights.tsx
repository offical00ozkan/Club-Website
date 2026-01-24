"use client";

import { motion } from "framer-motion";
import { Megaphone, Users, Calendar } from "lucide-react";

export default function Highlights() {
  const cards = [
    { icon: Megaphone, title: "Günün Mesajı", desc: "Okulumuzda bugün pozitif enerji günü! Birine iyi bir söz söylemeyi unutma.", color: "from-pink-500/20 to-pink-500/5" },
    { icon: Users, title: "Toplam Öğrenci", desc: "160 öğrenci, 2 öğretmen, 1 büyük aile!", color: "from-blue-500/20 to-blue-500/5" },
    { icon: Calendar, title: "Her zaman buradayız", desc: "Yeni fikirlere ve eleştirilere açık bir topluluk.", color: "from-purple-500/20 to-purple-500/5" },
  ];

  return (
    <section className="text-white mt-10 sm:mt-14 lg:mt-20 px-4 sm:px-6 lg:px-8 w-full flex justify-center">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-center">Öne Çıkanlar</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-items-center w-full">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className={`glass-card w-full max-w-sm sm:max-w-none p-4 sm:p-5 lg:p-6 bg-gradient-to-br ${card.color} rounded-xl shadow-lg hover:scale-[1.03] transition text-center cursor-pointer`}
            >
              <card.icon size={28} className="mb-3 sm:mb-4 text-white/80 mx-auto" />
              <h3 className="font-bold text-base sm:text-lg mb-1">{card.title}</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
