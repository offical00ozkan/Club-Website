"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function ProfileActions() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await fetch("/api/user/user", { method: "DELETE" });
      signOut({ callbackUrl: "/home" });
    } catch (err) {
      console.error("Hesap silinemedi", err);
    }
  };

  return (
    <div className="mt-10 sm:mt-12 flex flex-wrap gap-3 sm:gap-4">
      <button
        onClick={() => signOut({ callbackUrl: "/home" })}
        className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition"
      >
        Çıkış Yap
      </button>

      <button
        onClick={() => setModalOpen(true)}
        className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-red-600 hover:bg-red-500 transition"
      >
        Hesabı Sil
      </button>

      <ConfirmDeleteModal
        isOpen={modalOpen}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}
