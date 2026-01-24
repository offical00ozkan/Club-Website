export default function ProfileEvents({ events }: { events: any[] }) {
  return (
    <div className="mt-12">
      <h2 className="text-lg font-semibold mb-4">
        Katıldığım Etkinlikler
      </h2>

      {events.length === 0 ? (
        <p className="text-sm text-white/50">
          Henüz katıldığınız bir etkinlik yok.
        </p>
      ) : (
        <ul className="space-y-3">
          {events.map((item) => (
            <li
              key={item.event.id}
              className="p-4 rounded-xl flex justify-between bg-white/5 border border-white/10"
            >
              <p className="font-medium">
                {item.event.title}
              </p>
              <p className="text-xs text-white/50 mt-1">
                {new Date(item.event.date).toLocaleDateString("tr-TR")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
