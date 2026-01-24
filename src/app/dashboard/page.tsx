"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserStar, Calendar, Users } from "lucide-react";

export default function DashboardPage() {
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [activeEvents, setActiveEvents] = useState(0);
  const [newMembers, setNewMembers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const participantsRes = await fetch("/api/admin/participant");
        const participantsData = await participantsRes.json();
        setTotalParticipants(Array.isArray(participantsData) ? participantsData.length : 0);

        const eventsRes = await fetch("/api/event");
        const eventsData = await eventsRes.json();
        const activeCount = Array.isArray(eventsData)
          ? eventsData.filter((e) => e.isActive).length
          : 0;
        setActiveEvents(activeCount);

        const membersRes = await fetch("/api/member");
        const membersData = await membersRes.json();
        const newMemberCount = Array.isArray(membersData)
          ? membersData.filter((m) => {
              const joinedDate = new Date(m.createdAt);
              const now = new Date();
              const diffDays = (now.getTime() - joinedDate.getTime()) / (1000 * 60 * 60 * 24);
              return diffDays;
            }).length
          : 0;
        setNewMembers(newMemberCount);

      } catch (error) {
        console.error("İstatistikler alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { title: "Toplam Katılımcı", value: loading ? "..." : totalParticipants, icon: <Users className="w-6 h-6" /> },
    { title: "Aktif Etkinlik", value: loading ? "..." : activeEvents, icon: <Calendar className="w-6 h-6" /> },
    { title: "Aktif Üye", value: loading ? "..." : newMembers, icon: <UserStar className="w-6 h-6" /> },
  ];

  return (
    <div className="p-8 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex items-center gap-4 hover:bg-white/20 transition"
          >
            <div className="p-3 bg-blue-500/30 rounded-full">{stat.icon}</div>
            <div>
              <p className="text-gray-300 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
