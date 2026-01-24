"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Event } from "@/types/event";

export default function EventCard({ event }: { event: Event }) {

  const [popupOpen, setPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [kvkkConfirmed, setKvkkConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!kvkkConfirmed) {
      setError("KVKK onayı şart.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/user/participant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          name,
          surname,
          email,
          code: event.code,
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setError("Bu etkinliğe daha önce katıldınız.");
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || "Katılım eklenemedi.");
      }

      setSuccess("Katılım başarıyla eklendi 🎉");

      setTimeout(() => {
        setPopupOpen(false);
        setKvkkConfirmed(false);
        setName("");
        setSurname("");
        setEmail("");
        setSuccess("");
      }, 1200);

    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="bg-white/10 backdrop-blur-xl overflow-hidden wrap-break-word border border-white/20 p-6 rounded-2xl shadow-xl flex flex-col gap-4"
      >
        <div className="relative w-full h-40 rounded-xl overflow-hidden">
          <Image src={event.image ?? "/logo.png"} alt={event.title} fill className="object-cover" />
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">{event.title}</h3>
          <span className={`px-3 py-1 text-xs rounded-full ${event.isActive ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"}`}>
            {event.isActive ? "Aktif" : "Tamamlandı"}
          </span>
        </div>

        <p className="text-gray-300 text-sm">{event.description}</p>
        
        <p className="text-gray-400 text-xs">
          📅 {formatDate(event.date)}
        </p>

        {event.isActive && (
          <button
            onClick={() => setPopupOpen(true)}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg"
          >
            Etkinliğe Katıl
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {popupOpen && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-md text-white">
              <h2 className="text-xl font-bold mb-4">Etkinliğe Katıl</h2>

              <div className="flex flex-col gap-3 mb-4">
                <input 
                  placeholder="Adınız"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 rounded bg-white/5 text-white border border-white/10" 
                />
                <input 
                  placeholder="Soyadınız"
                  value={surname} 
                  onChange={(e) => setSurname(e.target.value)}
                  className="p-2 rounded bg-white/5 text-white border border-white/10" 
                />

                <input 
                  placeholder="Email Adresiniz"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 rounded bg-white/5 text-white border border-white/10" 
                />

                <p className="text-xs text-gray-300 leading-relaxed">
                  Paylaştığınız bilgiler, KVKK kapsamında yalnızca etkinliğe katılan kişilerin sayısını ve isimlerini kaydetmek amacıyla kullanılacaktır.
                </p>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={kvkkConfirmed}
                    onChange={(e) => setKvkkConfirmed(e.target.checked)}
                    className="accent-green-500"
                  />
                  Bilgilerimin işlenmesine izin veriyorum.
                </label>
              </div>

              {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
              {success && <p className="text-green-400 text-sm mb-2">{success}</p>}

              <div className="flex justify-end gap-2">
                <button onClick={() => setPopupOpen(false)} className="px-4 py-2 bg-gray-600 rounded">Vazgeç</button>
                <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 bg-blue-600 rounded">
                  {loading ? "Gönderiliyor..." : "Katıl"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}