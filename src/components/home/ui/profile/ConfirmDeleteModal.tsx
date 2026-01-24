"use client";

import { useState } from "react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  const [confirmationText, setConfirmationText] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Hesabınızı kalıcı olarak silmek istediğinize emin misiniz?
        </h2>
        <p className="mb-4 text-sm text-gray-700">
          Devam etmek için lütfen aşağıya <strong>Hesabımı silmek istiyorum</strong> yazın.
        </p>
        <input
          type="text"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          placeholder="Hesabımı silmek istiyorum"
          className="w-full border text-gray-900 border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="text-gray-700 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
          >
            Vazgeç
          </button>
          <button
            disabled={confirmationText !== "Hesabımı silmek istiyorum"}
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md text-white transition ${
              confirmationText === "Hesabımı silmek istiyorum"
                ? "bg-red-600 hover:bg-red-500"
                : "bg-red-300 cursor-not-allowed"
            }`}
          >
            Hesabı Sil
          </button>
        </div>
      </div>
    </div>
  );
}
