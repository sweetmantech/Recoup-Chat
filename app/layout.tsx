import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers/Providers";
import { DESCRIPTION, TITLE } from "@/lib/consts";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Suspense } from "react";
import ArtistSettingModal from "@/components/ArtistSettingModal";
import MobileDownloadModal from "@/components/ModalDownloadModal";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: `/logo.png`,
  },
  manifest: "/manifest.json",
  icons: [{ rel: "icon", url: "/recoup.png" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <Providers>
            <div className="flex flex-col md:flex-row">
              <Sidebar />
              <Header />
              <ArtistSettingModal />
              {children}
              <MobileDownloadModal />
            </div>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
