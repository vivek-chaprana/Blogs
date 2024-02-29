import AuthProvider from "@/components/AuthProvider";
import { fallbackMetadata } from "@/lib/constants";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = fallbackMetadata;

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
          <link
            rel="apple-touch-icon"
            href="/apple-touch-icon.png"
            sizes="180x180"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          {children}
          <Toaster position="bottom-right" />
        </body>
      </AuthProvider>
    </html>
  );
}
