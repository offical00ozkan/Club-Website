"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Link as LinkIcon, Edit, Trash2, Plus } from "lucide-react";
import type { Member } from "@/types/member";
import type { MemberForm } from "@/types/member";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [popupOpen, setPopupOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState<MemberForm>({
    name: "",
    email: "",
    linkedIn: "",
    role: "",
  });

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/member");
      if (!res.ok) throw new Error("Üyeler yüklenemedi.");
      const data: Member[] = await res.json();
      setMembers(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAddClick = () => {
    setFormData({ name: "", email: "", linkedIn: "", role: "" });
    setEditMember(null);
    setPopupOpen(true);
  };

  const handleEditClick = (member: Member) => {
    setFormData({
      name: member.name,
      email: member.email,
      linkedIn: member.linkedIn ?? "",
      role: member.role ?? "",
    });
    setEditMember(member);
    setPopupOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const submitForm = async () => {
    if (!formData.linkedIn.trim()) {
      alert("LinkedIn alanı zorunludur.");
      return;
    }

    try {
      const url = "/api/admin/member";
      const method = editMember ? "PUT" : "POST";
      const body = editMember
        ? { id: editMember.id, ...formData }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "İşlem başarısız.");
      }

      await fetchMembers();
      setPopupOpen(false);
      setEditMember(null);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/member?id=${deleteId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Silme işlemi başarısız.");
      }
      await fetchMembers();
      setDeleteId(null);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Takım Üyeleri</h1>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition"
        >
          <Plus size={16} /> Üye Ekle
        </button>
      </div>

      {(loading || error || (!loading && !error && members.length === 0)) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-md text-center ${
            error ? "text-red-500" : "text-gray-300"
          }`}
        >
          {loading ? "Yükleniyor..." : error ? error : "Takım üyesi bulunmamaktadır."}
        </motion.div>
      )}

      {!loading && !error && members.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {members.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <User size={28} className="text-white" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white">{member.name}</h2>
                  <p className="text-gray-300 text-sm">{member.role ?? "Rol belirtilmemiş"}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(member)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(member.id)}
                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="text-gray-300 text-sm space-y-1">
                <p>Email: {member.email}</p>
                {member.linkedIn && (
                  <p className="flex items-center gap-1">
                    <LinkIcon size={14} />
                    <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                      LinkedIn
                    </a>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {popupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-md text-white"
          >
            <h2 className="text-xl font-bold mb-4">{editMember ? "Üye Düzenle" : "Yeni Üye Ekle"}</h2>
            <div className="flex flex-col gap-3 mb-4">
              <input
                type="text"
                placeholder="İsim"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-2 rounded bg-white/10 text-white placeholder-gray-300"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="p-2 rounded bg-white/10 text-white placeholder-gray-300"
              />
              <input
                type="text"
                placeholder="LinkedIn"
                value={formData.linkedIn}
                onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                className="p-2 rounded bg-white/10 text-white placeholder-gray-300"
              />
              <input
                type="text"
                placeholder="Rol (opsiyonel)"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="p-2 rounded bg-white/10 text-white placeholder-gray-300"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setPopupOpen(false)} className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600">
                Vazgeç
              </button>
              <button onClick={submitForm} className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600">
                Tamam
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-sm text-white text-center"
          >
            <p className="mb-4">Bu üyeyi silmek istediğinize emin misiniz?</p>
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
