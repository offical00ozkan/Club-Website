import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileHeader from "./ProfileHeader";
import ProfileEvents from "./ProfileEvents";
import ProfileActions from "./ProfileActions";

export default async function ProfileContainer() {
  const session = await auth();

  if (!session?.user) {
    redirect("/home/auth/login");
  }

  const user = session.user;

  if (!user.email) {
    throw new Error("Kullanıcı email bulunamadı");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/user/user-event?email=${user.email}`,
    {
      cache: "no-store",
      credentials: "include"
    }
  );

  let events: any[] = [];

  if (res.ok) {
    const data = await res.json();
    events = data.events ?? [];
  }

  return (
    <div className="w-full min-h-screen flex justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
        <ProfileHeader user={user} />
        <ProfileEvents events={events} />
        <ProfileActions />
      </div>
    </div>
  );
}
