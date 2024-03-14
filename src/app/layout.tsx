import AuthProvider from "@/components/AuthProvider";
import { fallbackMetadata } from "@/lib/constants";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  ...fallbackMetadata,
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#111827",
};

const brandFont = localFont({
  src: "fonts/BemirsDemoVersionRegular.ttf",
  display: "swap",
  variable: "--font-brand",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <AuthProvider>
        <body className={`bg-white ${brandFont.variable}`}>
          {children}
          <Toaster position="bottom-right" />
        </body>
      </AuthProvider>
    </html>
  );
}
