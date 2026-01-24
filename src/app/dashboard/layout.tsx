import Header from "@/components/admin/layout/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <main className="md:pt-0 md:ml-80 md:px-0 transition-all">
        {children}
      </main>
    </div>
  );
}
