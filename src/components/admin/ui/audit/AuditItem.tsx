"use client";

import { motion } from "framer-motion";
import { User, Calendar, ClipboardCheck } from "lucide-react";

export default function AuditItem({ audit }: { audit: Audit }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:bg-white/20 transition-all"
    >
      <div className="flex flex-col md:flex-row md:items-center md:gap-6">
        <span className="flex items-center gap-2 text-gray-200">
          <ClipboardCheck size={18} /> {audit.action}
        </span>

        {audit.member && (
          <span className="flex items-center gap-2 text-gray-200">
            <User size={16} /> Üye: {audit.member.name}
          </span>
        )}

        {audit.event && (
          <span className="flex items-center gap-2 text-gray-200">
            <Calendar size={16} /> Etkinlik: {audit.event.title}
          </span>
        )}

        {audit.performedBy && (
          <span className="flex items-center gap-2 text-gray-200">
            <User size={16} /> Yapılan: {audit.performedBy.name}
          </span>
        )}
      </div>

      {audit.description && (
        <p className="text-gray-300 text-sm">{audit.description}</p>
      )}
    </motion.div>
  );
}
