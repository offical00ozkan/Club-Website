import { Calendar, Lightbulb } from "lucide-react";

export default function Hero() {
  const time = new Date().toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <section className="text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 flex items-center justify-between bg-gradient-to-br from-blue-900/40 to-transparent">
            <div>
              <h3 className="text-gray-400 text-sm font-semibold uppercase mb-1">
                Kuruluşumuzdan Bu Yana
              </h3>
              <p className="text-2xl font-bold">
                Eğitim ve yaratıcılıkla her gün büyüyoruz
              </p>
            </div>
            <Lightbulb size={48} className="text-yellow-400" />
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-purple-900/40 to-transparent flex items-center justify-between">
            <div>
              <h3 className="text-purple-300 text-sm font-semibold uppercase mb-1">
                Tarih
              </h3>
              <p className="text-lg font-bold">{time}</p>
            </div>
            <Calendar size={42} className="text-purple-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
