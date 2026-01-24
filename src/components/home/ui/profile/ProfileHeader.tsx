import Image from "next/image";

export default function ProfileHeader({ user }: { user: any }) {
  return (
    <div className="flex items-center gap-6">
      <div className="relative w-24 h-24 rounded-full overflow-hidden border border-white/20">
        <Image
          src={user.image || "/avatar-placeholder.png"}
          alt="Profil Fotoğrafı"
          fill
          className="object-cover"
        />
      </div>

      <div>
        <h1 className="text-2xl font-semibold">
          {user.name || "İsimsiz Kullanıcı"}
        </h1>
        <p className="text-sm text-white/60">{user.email}</p>

        <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-indigo-500/20 border border-indigo-500/30">
          {user.role}
        </span>
      </div>
    </div>
  );
}
