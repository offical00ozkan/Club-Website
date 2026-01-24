"use client";

export default function AuditSearch({ value, onChange }: AuditSearchProps) {
  return (
    <input
      type="text"
      placeholder="Audit kaydı ara..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mb-6 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:bg-white/20 transition"
    />
  );
}
