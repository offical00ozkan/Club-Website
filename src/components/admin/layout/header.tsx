"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Users,
  Calendar,
  Settings,
  User,
  UserCheck,
  ReceiptText,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { title: "Takım Üyeleri", icon: Users, href: "/dashboard/team" },
  { title: "Etkinlikler", icon: Calendar, href: "/dashboard/event" },
  { title: "İşlemler", icon: Settings, href: "/dashboard/audit" },
  { title: "Kullanıcılar", icon: User, href: "/future" },
  { title: "Katılımcılar", icon: UserCheck, href: "/dashboard/participant" },
  { title: "Finans", icon: ReceiptText, href: "/dashboard/finance" },
];

export default function AdminHeader() {
  const [active, setActive] = useState(menuItems[0].title);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const userName =
    session?.user?.name ||
    session?.user?.email?.split("@")[0] ||
    "Admin";

  const Sidebar = (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="w-72 h-full flex flex-col backdrop-blur-xl bg-white/10 border-white/20 p-6"
    >
      <div className="mb-10 text-center">
        <h1 className="text-xl font-bold text-white">{userName}</h1>
        <p className="text-xs text-gray-300 mt-1">Admin Panel</p>
      </div>

      <nav className="flex flex-col gap-3 overflow-y-auto hide-scrollbar pr-1">
        {menuItems.map((item) => (
          <Link key={item.title} href={item.href}>
            <motion.div
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setActive(item.title);
                setOpen(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                ${
                  active === item.title
                    ? "bg-white/20 text-white"
                    : "text-gray-300 hover:bg-white/10"
                }
              `}
            >
              <item.icon size={20} />
              <span>{item.title}</span>
            </motion.div>
          </Link>
        ))}
      </nav>
    </motion.div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur text-white"
      >
        <Menu size={22} />
      </button>

      <div className="hidden md:block fixed left-4 top-4 bottom-4 z-40 rounded-xl overflow-hidden">
        {Sidebar}
      </div>

      <AnimatePresence>
        {open && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div
              className="flex-1 bg-black/50"
              onClick={() => setOpen(false)}
            />
            <div className="h-full">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 text-white"
              >
                <X size={22} />
              </button>
              {Sidebar}
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
