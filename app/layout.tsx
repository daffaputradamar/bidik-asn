import type { Metadata } from "next";
import { Nunito_Sans } from 'next/font/google'
import "./globals.css";
import RootProviders from "@/providers/RootProvider";
import { Toaster } from "@/components/ui/sonner";

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
              {children}
          <Toaster richColors position="bottom-right" />
        </RootProviders>
      </body>
    </html>
  );
}
