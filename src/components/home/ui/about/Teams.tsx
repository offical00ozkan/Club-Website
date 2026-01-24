"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";
import type { MemberProps } from "@/types/member";

export default function Teams({ team }: MemberProps) {
  return (
    <div className="w-full max-w-6xl mx-auto py-24 px-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          viewport={{ once: true }}
          className="relative group p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-[0_8px_35px_rgba(0,0,0,0.15)] overflow-hidden"
        >

          <div className="relative w-full h-48 rounded-xl overflow-hidden">
            <Image src={m.photo} alt="Profil" fill className="object-cover" />
          </div>

          <div className="mt-5 flex flex-col">
            <h3 className="text-xl font-bold text-white tracking-wide">{m.name}</h3>
            <p className="text-blue-200 text-sm">{m.role}</p>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <Link href={`mailto:${m.email}`} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
              <Mail size={20} className="text-blue-200" />
            </Link>

            <Link href={m.linkedIn} target="_blank" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
              <Linkedin size={20} className="text-blue-200" />
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        </motion.div>
      ))}
    </div>
  );
}
