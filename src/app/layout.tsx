import type { Metadata } from "next";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: {
    default: "Pamvest Özel",
    template: "%s | Pamvest Özel",
  },
  description:
    "Pamvest Özel’de güncel içerikler, özel paylaşımlar ve ayrıcalıklı deneyimler seni bekliyor.",
  metadataBase: new URL("https://www.pamvestozel.club"),

  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Pamvest Özel",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pamvest Özel",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="flex">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
