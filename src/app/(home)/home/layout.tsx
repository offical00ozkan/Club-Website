import Header from "@/components/home/layout/Header";
import Footer from "@/components/home/layout/Footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full">
      <Header />
        <div className="w-full min-h-screen flex mt-20">
            {children}
        </div>
      <Footer />
    </div>
  );
}
