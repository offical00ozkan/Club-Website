"use client";

import { motion } from "framer-motion";
import EventCard from "./EventCard";
import type { Event } from "@/types/event";

export default function EventSection({
  title,
  events,
}: {
  title: string;
  events: Event[];
}) {
  return (
    <div className="mb-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-white mb-8"
      >
        {title}
      </motion.h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
}
