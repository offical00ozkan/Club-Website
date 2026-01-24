"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Edit, Trash2, Plus } from "lucide-react";
import type { Event } from "@/types/event";
import type { EventForm } from "@/types/event";
import type { Participant } from "@/types/participant";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [popupOpen, setPopupOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editEvent, setEditEvent] = useState<Event | null>(null);

  const [formData, setFormData] = useState<EventForm>({
    title: "",
    description: "",
    date: "",
    isActive: true,
    image: "",
    location: "",
  });

  const [participantsPopupOpen, setParticipantsPopupOpen] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/event");
      if (!res.ok) throw new Error("Etkinlikler yüklenemedi.");
      const data: Event[] = await res.json();
      setEvents(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddClick = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      isActive: true,
      image: "",
      location: "",
    });
    setEditEvent(null);
    setPopupOpen(true);
  };

  const handleEditClick = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description ?? "",
      date: new Date(event.date).toISOString().slice(0, 16),
      isActive: event.isActive ?? true,
      image: event.image ?? "",
      location: event.location ?? "",
    });
    setEditEvent(event);
    setPopupOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const toggleActive = async (event: Event) => {
    try {
      const res = await fetch("/api/admin/event", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: event.id, isActive: !event.isActive }),
      });
      if (!res.ok) throw new Error("Güncelleme başarısız");
      await fetchEvents();
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const submitForm = async () => {
    if (!formData.title.trim() || !formData.date.trim()) {
      alert("Başlık ve tarih zorunludur.");
      return;
    }

    try {
      const method = editEvent ? "PUT" : "POST";
      const body = editEvent ? { id: editEvent.id, ...formData } : formData;

      const res = await fetch("/api/admin/event", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "İşlem başarısız.");
      }

      await fetchEvents();
      setPopupOpen(false);
      setEditEvent(null);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/event?id=${deleteId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Silme işlemi başarısız.");
      }
      await fetchEvents();
      setDeleteId(null);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const handleShowParticipants = (event: Event) => {
    setSelectedParticipants(event.participants ?? []);
    setParticipantsPopupOpen(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Etkinlikler</h1>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white"
        >
          <Plus size={16} /> Etkinlik Ekle
        </button>
      </div>

      {(loading || error || (!loading && events.length === 0)) && (
        <div className="p-6 rounded-2xl bg-white/10 text-center text-gray-300">
          {loading ? "Yükleniyor..." : error ? error : "Etkinlik yok."}
        </div>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="flex flex-col gap-6">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
            >
              <div className="overflow-hidden justify-between items-start flex flex-col">
                <div>
                  <h2 className="text-lg font-semibold text-white">{event.title}</h2>
                  <p className="text-gray-400 text-sm wrap-break-word py-1">{event.description ?? "Açıklama yok"}</p>
                  <p className="text-gray-400 text-xs">Kod: {event.code}</p>
                </div>

                <div className="flex gap-2 flex-wrap py-2 pt-4">
                  <button onClick={() => handleEditClick(event)} className="p-2 bg-white/10 rounded">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDeleteClick(event.id)} className="p-2 bg-red-500/20 rounded">
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={() => toggleActive(event)}
                    className={`p-2 rounded ${
                      event.isActive ? "bg-gray-600" : "bg-green-600"
                    }`}
                  >
                    {event.isActive ? "Pasif" : "Aktif"}
                  </button>
                  <button
                    onClick={() => handleShowParticipants(event)}
                    className="p-2 bg-white/10 rounded"
                  >
                    Katılımcılar
                  </button>
                </div>
              </div>

              <div className="mt-3 text-gray-300 text-sm space-y-1">
                <div className="flex items-center gap-1">
                  <Calendar size={14} /> {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />{" "}
                  {new Date(event.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                {event.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={14} /> {event.location}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {popupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl w-full max-w-md text-white">
            <h2 className="text-xl font-bold mb-4">
              {editEvent ? "Etkinlik Düzenle" : "Yeni Etkinlik"}
            </h2>

            <div className="flex flex-col gap-3">
              <input
                placeholder="Başlık"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="p-2 rounded bg-white/10"
              />
              <textarea
                placeholder="Açıklama"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="p-2 rounded bg-white/10 resize-none"
              />
              <input
                type="datetime-local"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="p-2 rounded bg-white/10"
              />
              <input
                placeholder="Konum"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="p-2 rounded bg-white/10"
              />
              <input
                placeholder="Resim URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="p-2 rounded bg-white/10"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setPopupOpen(false)} className="px-4 py-2 bg-gray-600 rounded">
                Vazgeç
              </button>
              <button onClick={submitForm} className="px-4 py-2 bg-blue-600 rounded">
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {participantsPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-sm text-white"
          >
            <h2 className="text-lg font-bold mb-4">Katılımcılar</h2>

            {selectedParticipants.length > 0 ? (
              <ul className="space-y-1 text-gray-300 text-sm">
                {selectedParticipants.map((p) => (
                  <li key={p.id} className="flex justify-between">
                    <span>
                      {p.name} {p.surname ?? ""}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">Henüz katılımcı yok.</p>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setParticipantsPopupOpen(false)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
              >
                Kapat
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="p-6 rounded-2xl bg-gray-700 text-white text-center">
            <p>Bu etkinliği silmek istiyor musun?</p>
            <div className="flex justify-center gap-2 mt-4">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 bg-gray-600 rounded">
                Vazgeç
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 rounded">
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
