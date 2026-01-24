"use client";

import { motion } from "framer-motion";
import { CalendarCheck, CheckCircle, HeartHandshake } from "lucide-react";

const stats = [
  { number: "36", label: "Yapılan Etkinlik", icon: CalendarCheck },
  { number: "4", label: "Tamamlanan Proje", icon: CheckCircle },
  { number: "2", label: "Sosyal Sorumluluk Projesi", icon: HeartHandshake },
];

export default function ClubStats() {
  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-3xl font-bold text-white mb-4 drop-shadow"
        >
          Rakamlarla Kulübümüz
        </motion.h2>

        <p className="text-gray-200 text-sm max-w-xl mx-auto mb-16">
          Yaptığımız etkinlikler, projeler ve sosyal sorumluluk çalışmalarıyla büyümeye devam ediyoruz.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_22px_rgba(0,0,0,0.15)] hover:bg-white/15 hover:shadow-[0_10px_32px_rgba(0,0,0,0.22)] transition-all"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 rounded-xl bg-white/20 border border-white/30 text-white backdrop-blur">
                    <Icon size={36} />
                  </div>
                </div>

                <h3 className="text-4xl font-bold text-white drop-shadow-md mb-1">
                  {item.number}
                </h3>

                <p className="text-gray-200 text-sm tracking-wide">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
