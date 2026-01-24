"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventSection from "@/components/home/ui/event/EventSection";
import type { Event } from "@/types/event";
import { CalendarOff } from "lucide-react";

export default function Page() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/event");
        if (!res.ok) throw new Error("Etkinlikler yüklenemedi.");
        const data: Event[] = await res.json();
        setEvents(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          setShowErrorPopup(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const activeEvents = events.filter((e) => e.isActive);
  const pastEvents = events.filter((e) => !e.isActive);

  if (loading)
    return <p className="text-center text-white">Yükleniyor...</p>;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-center text-4xl font-bold text-white mb-16">
        Etkinlikler
      </h1>

      {events.length === 0 ? (
        <div className="flex flex-col items-center w-full justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <CalendarOff size={48} className="text-gray-400" />
            <h2 className="text-2xl font-bold text-white">
              Şu anda etkinlik bulunmamaktadır
            </h2>
            <p className="text-gray-300 max-w-md text-center">
              Henüz aktif veya geçmiş etkinlik kaydı yok. Yeni etkinlikler eklendiğinde burada görebilirsiniz.
            </p>
          </motion.div>
        </div>
      ) : (
        <>
          {activeEvents.length > 0 ? (
            <EventSection title="🎉 Aktif Etkinlikler" events={activeEvents} />
          ) : (
            <motion.p
              className="text-center text-gray-300 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Aktif etkinlik bulunmamaktadır.
            </motion.p>
          )}

          {pastEvents.length > 0 ? (
            <EventSection title="📚 Daha Önce Yapılanlar" events={pastEvents} />
          ) : (
            <motion.p
              className="text-center text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Daha önce yapılmış etkinlik bulunmamaktadır.
            </motion.p>
          )}
        </>
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
