import AuthProvider from "@/components/AuthProvider";
import { fallbackMetadata } from "@/lib/constants";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  ...fallbackMetadata,
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
  ],
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
