import BreadcrumbsUserProfile from "@/components/BreadcrumbsUserProfile";

export default function UserOtherLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { username: string };
}>) {
  return (
    <div>
      <BreadcrumbsUserProfile />
      {children}
    </div>
  );
}
