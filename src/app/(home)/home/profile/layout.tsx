import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/home/auth/login");
  }

  return (
    <div className="flex w-full">
      {children}
    </div>
  );
}
