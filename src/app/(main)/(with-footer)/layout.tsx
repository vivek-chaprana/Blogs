import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function FooterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Footer classes="justify-center border-t py-5 " />
    </>
  );
}
