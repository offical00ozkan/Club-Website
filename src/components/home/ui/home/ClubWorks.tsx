"use client";

import { motion } from "framer-motion";
import { BookOpen, Film, Rocket } from "lucide-react";

const items = [
  { title: "Dergi Çalışmaları", desc: "Yazarlık, editörlük ve içerik üretimi üzerine projeler.", icon: BookOpen },
  { title: "Sinema Kulübü", desc: "Film analizleri, kısa film projeleri ve gösterimler.", icon: Film },
  { title: "Girişimcilik", desc: "Startup fikirleri, sunumlar ve iş geliştirme workshopları.", icon: Rocket },
];

export default function ClubWorks() {
  return (
    <section className="w-full py-24">
      <div className="max-w-6xl mx-auto px-6">
        
        <h2 className="text-4xl font-bold text-center mb-4 text-white drop-shadow-md">
          Kulüp Çalışmaları
        </h2>

        <p className="text-center text-gray-200 mb-16 max-w-2xl mx-auto text-sm">
          Aktif, yenilikçi ve üretken projeler yürütüyoruz.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] hover:bg-white/15 transition-all duration-300 hover:scale-[1.03]"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-5 rounded-2xl bg-white/20 border border-white/30 shadow-inner backdrop-blur-md text-white">
                    <Icon size={42} strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-center mb-2 text-white drop-shadow-sm">
                  {item.title}
                </h3>

                <p className="text-gray-200 text-center text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
