"use client";

import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const social = [
    { icon: Linkedin, href: "#" },
    { icon: Instagram, href: "#" },
  ];

  return (
    <footer className="w-full bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10 md:justify-between items-center md:items-start">

        <div className="flex gap-4 items-center md:items-start">
          <Image
            src="/logo.png"
            width={90}
            height={90}
            alt="logo"
            className="object-cover"
          />

          <div className="hidden md:flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-white">
              Etkinlik ve Münazara Klübü
            </h2>
            <p className="text-sm leading-relaxed max-w-sm">
              Eğitim, teknoloji ve üretimi birleştiren topluluk.
              Projeler ve sosyal sorumluluk çalışmalarıyla büyüyoruz.
            </p>
          </div>
        </div>

        <div className="hidden md:block">
          <h3 className="text-lg font-semibold text-white mb-4">İletişim</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-gray-400" />
              Mail Adresi
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-gray-400" />
              Konum
            </li>
          </ul>
        </div>

        <div>
          <h3 className="hidden md:block text-lg font-semibold text-white mb-4">
            Sosyal Medya
          </h3>

          <div className="flex items-center gap-6">
            {social.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.href}
                  className="hover:text-white transition"
                >
                  <Icon size={28} className="opacity-80 hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">

          <span className="text-center md:text-left">
            © {new Date().getFullYear()} Ramazan Özkan — Released under the MIT License.
          </span>

          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/home/policy/" 
              className="hover:text-white duration-200"
              rel="noopener noreferrer"
              target="_blank"
            >
              Politikalar ve Sözleşmeler
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
