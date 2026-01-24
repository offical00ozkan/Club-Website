"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import type { Participant } from "@/types/participant";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/participant");
      if (!res.ok) throw new Error("Katılımcılar yüklenemedi.");
      const data: Participant[] = await res.json();
      setParticipants(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/participant?id=${deleteId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Silme işlemi başarısız.");
      }
      await fetchParticipants();
      setDeleteId(null);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Katılımcılar</h1>

      {(loading || error || (!loading && !error && participants.length === 0)) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-md text-center ${
            error ? "text-red-500" : "text-gray-300"
          }`}
        >
          {loading ? "Yükleniyor..." : error ? error : "Katılımcı bulunmamaktadır."}
        </motion.div>
      )}

      {!loading && !error && participants.length > 0 && (
        <div className="flex flex-col w-full gap-6">
          {participants.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/10 w-full backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold text-white">{p.name} {p.surname}</h2>
                <p className="text-gray-300 text-sm">Etkinlik: {p.event.title}</p>
              </div>
              <button
                onClick={() => handleDeleteClick(p.id)}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-sm text-white text-center"
          >
            <p className="mb-4">Bu katılımcıyı silmek istediğinize emin misiniz?</p>
            <div className="flex justify-center gap-2">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600">
                Vazgeç
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 rounded bg-red-500 hover:bg-red-600">
                Sil
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
