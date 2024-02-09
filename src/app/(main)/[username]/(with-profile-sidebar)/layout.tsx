import ProfileSidebar from "@/components/ProfileSidebar";

export default function UserLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { username: string };
}>) {
  return (
    <main className="max-w-6xl mx-auto min-h-screen my-10 gap-10 flex relative">
      <section className="min-w-3xl max-w-3xl min-h-screen flex-shrink-0">
        {children}
      </section>
      <ProfileSidebar />
    </main>
  );
}
