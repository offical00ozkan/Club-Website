"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WelcomePage() {
  return (
    <main className="relative h-screen w-full flex flex-col bg-[#0b0e1a] text-white overflow-hidden">

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.2 }} 
        className="absolute -left-48 top-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:w-[520px] lg:h-[520px] bg-indigo-600/20 rounded-full blur-[120px]" 
      />

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.4 }} 
        className="absolute -right-48 top-1/3 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[480px] lg:h-[480px] bg-purple-600/20 rounded-full blur-[120px]" 
      />

      <header className="relative z-10 flex justify-center items-center py-4 sm:py-6">
        <motion.div 
          initial={{ opacity: 0, y: -12 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
        >
          <Image src="/logo.png" alt="Kulüp Logosu" width={120} height={120} className="w-[72px] h-[72px] sm:w-[96px] sm:h-[96px] md:w-[120px] md:h-[120px]" priority />
        </motion.div>
      </header>

      <section className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-indigo-400/80">
              Etkinlik & Münazara Kulübü
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight">
              Düşünce
              <span className="block font-serif italic text-indigo-200/90">
                Sahneye Çıkar
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-md leading-relaxed">
              Tartışmanın, fikrin ve üretmenin merkezine hoş geldiniz. Burada konuşmak cesaret ister, dinlemek erdemdir.
            </p>

            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.96 }} 
              className="pt-2"
            >
              <Link href="/home" className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-500">
                <span className="text-xs sm:text-sm uppercase tracking-widest font-medium">
                  İçeri Gir
                </span>
                <span className="text-xl">→</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            className="hidden lg:flex flex-col items-end space-y-4 text-white/40"
          >
            <p className="text-xs tracking-widest uppercase">Think</p>
            <div className="w-12 h-px bg-white/20" />
            <p className="text-xs tracking-widest uppercase">Speak</p>
          </motion.div>

        </div>
      </section>

      <footer className="relative z-10 flex flex-col items-center gap-3 pb-4 sm:pb-6">
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6, duration: 0.8 }} 
          className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-white/30 text-center px-4"
        >
          Fikirler sustuğunda dünya küçülür
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 8 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.8, duration: 0.6 }} 
          className="border-t border-white/10 text-white/60 w-full items-center text-center pt-3"
        >
          <Link 
            href="/home/policy/" 
            className="hover:text-white duration-200"
            rel="noopener noreferrer"
            target="_blank"
          >
            Politikalar ve Sözleşmeler
          </Link>
        </motion.div>
      </footer>

    </main>
  );
}
