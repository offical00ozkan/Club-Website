"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { Event } from "@/types/event";

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/event");
        if (!res.ok) throw new Error("Etkinlikler yüklenemedi.");
        const data: Event[] = await res.json();

        const upcoming = data
          .filter((e) => e.isActive)
          .map((e) => ({ ...e, dateObj: new Date(e.date) }))
          .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
          .slice(0, 3);

        setEvents(upcoming);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <section className="w-full py-10">
      <div className="mx-auto px-11">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-3xl font-bold text-white text-center mb-4"
        >
          Yaklaşan Etkinlikler
        </motion.h2>

        <p className="text-gray-200 text-center text-sm max-w-2xl mx-auto mb-14">
          Önümüzdeki etkinlikleri buradan takip edebilirsiniz.
        </p>

        {loading ? (
          <p className="text-center text-white mt-12">Yükleniyor...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-12">{error}</p>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <CalendarDays size={48} className="text-gray-400" />
            <p className="text-white text-lg">Yaklaşan etkinlik bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((ev, index) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col lg:flex-row gap-6 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_6px_24px_rgba(0,0,0,0.25)] hover:bg-white/15 transition-all"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white">{ev.title}</h3>
                  <p className="text-gray-300 wrap-break-word text-sm leading-relaxed line-clamp-3 max-w-2xl">{ev.description}</p>
                </div>

                <div className="flex flex-row justify-between lg:justify-center gap-4 text-gray-300 text-sm min-w-[220px]">
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <CalendarDays size={16} />
                    {new Date(ev.date).toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" })}
                  </span>

                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <Clock size={16} />
                    {new Date(ev.date).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                  </span>

                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <MapPin size={16} />
                    {ev.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
