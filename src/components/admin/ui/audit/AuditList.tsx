"use client";

import { useEffect, useMemo, useState } from "react";
import AuditItem from "./AuditItem";
import AuditSearch from "./AuditSearch";

export default function AuditList() {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAudits() {
      try {
        const res = await fetch("/api/admin/audit", {
          credentials: "include"
        });
        console.log(res)
        if (!res.ok) throw new Error("Audit verileri yüklenemedi.");
        const data: Audit[] = await res.json();
        setAudits(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAudits();
  }, []);

  const filteredAudits = useMemo(() => {
    const q = search.toLowerCase();
    return audits.filter((a) =>
      [
        a.action,
        a.description,
        a.member?.name,
        a.event?.title,
        a.performedBy?.name,
      ]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(q))
    );
  }, [audits, search]);

  if (loading)
    return <p className="text-center text-white">Yükleniyor...</p>;

  if (error)
    return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Audit Kayıtları
      </h2>

      <AuditSearch value={search} onChange={setSearch} />

      {filteredAudits.length === 0 ? (
        <div className="p-6 rounded-2xl bg-white/10 border border-white/20 text-center text-gray-300">
          Sonuç bulunamadı.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAudits.map((audit) => (
            <AuditItem key={audit.id} audit={audit} />
          ))}
        </div>
      )}
    </div>
  );
}
