import type { Metadata } from "next";
import { Nunito_Sans } from 'next/font/google'
import "./globals.css";
import RootProviders from "@/providers/RootProvider";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/sidebar/sidebar";
import SidebarToggler from "@/components/sidebar/sidebar-toggler";
import { Button } from "@/components/ui/button";
import Header from "@/components/header/header";

const nunito = Nunito_Sans({ subsets: ['latin'], display: 'swap', adjustFontFallback: false })

export const metadata: Metadata = {
  title: "Bidik ASN",
  description: "Website Bidik ASN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased bg-gray-100/60`}
      >
        <RootProviders>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Header */}
              <Header />
              <div>
                {children}
              </div>
            </div>
          </div>
          <Toaster richColors position="bottom-right" />
        </RootProviders>
      </body>
    </html>
  );
}
