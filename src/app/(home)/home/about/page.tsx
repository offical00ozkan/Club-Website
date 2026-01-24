"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Teams from "@/components/home/ui/about/Teams";
import type { Member } from "@/types/member";

export default function AboutPage() {
  const [team, setTeam] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch("/api/member");
        if (!res.ok) throw new Error("Üyeler yüklenemedi.");
        const data: Member[] = await res.json();
        setTeam(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          setShowErrorPopup(true);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  return (
    <div className="w-full flex flex-col items-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Hakkımızda</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Kulübümüz; üretmeyi, öğrenmeyi ve birlikte değer oluşturmayı
          amaçlayan gençlerden oluşur. Dergi, Sinema ve Girişimcilik
          birimlerimizle onlarca projeye imza atıyor, okulumuz içinde
          ve dışında aktif rol alıyoruz.
        </p>
      </motion.div>

      {loading ? (
        <p className="text-center text-white mt-10">Yükleniyor...</p>
      ) : team.length === 0 && !error ? (
        <p className="text-center text-gray-300 mt-10">Takım üyeleri bulunamadı.</p>
      ) : (
        <Teams team={team} />
      )}

      <AnimatePresence>
        {showErrorPopup && error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-red-600 text-white rounded-xl p-6 max-w-sm w-full text-center shadow-lg"
            >
              <p className="mb-4">{error}</p>
              <button
                onClick={() => setShowErrorPopup(false)}
                className="px-4 py-2 bg-white text-red-600 rounded hover:bg-gray-100"
              >
                Kapat
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
