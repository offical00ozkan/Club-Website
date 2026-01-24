"use client";

import Link from "next/link";
import { Menu, X, User, UserCircle } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const menuItems = [
    { title: "Anasayfa", href: "/home" },
    { title: "Hakkımızda", href: "/home/about" },
    { title: "Etkinlikler", href: "/home/event" },
  ];

  const isLoggedIn = !!session?.user;

  return (
    <header className="w-full z-30 select-text backdrop-blur-lg fixed px-6 py-4 flex items-center justify-between bg-transparent">
      <Link href="/home" className="text-2xl font-bold tracking-wide">
        <Image
          src="/logo.png"
          width={45}
          height={45}
          alt="logo"
          className="object-cover"
        />
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex items-center gap-4">
        {isLoggedIn ? (
          <Link
            href="/home/profile"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/10 hover:bg-white/20 transition"
          >
            <UserCircle className="w-5 h-5" />
            Profil
          </Link>
        ) : (
          <Link href="/home/auth/login">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/10">
              <User className="w-4 h-4" />
              Giriş Yap
            </button>
          </Link>
        )}
      </div>

      <button onClick={() => setOpen(!open)} className="md:hidden">
        {open ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-16 left-0 w-full bg-[#222437] p-6 flex flex-col gap-4 md:hidden border-t border-white/10"
          >
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            <div className="flex items-center gap-3 pt-3 border-t border-white/10 mt-2">
              {isLoggedIn ? (
                <Link
                  href="/home/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/10 w-full justify-center"
                >
                  <UserCircle className="w-5 h-5" />
                  Profil
                </Link>
              ) : (
                <Link
                  href="/home/auth/login"
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/10 w-full justify-center">
                    <User className="w-4 h-4" />
                    Giriş Yap
                  </button>
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
