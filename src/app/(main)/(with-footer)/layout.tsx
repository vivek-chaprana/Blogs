import Footer from "@/components/Footer";

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
