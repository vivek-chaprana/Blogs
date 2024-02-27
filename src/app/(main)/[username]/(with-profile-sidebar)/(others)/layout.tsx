import BreadcrumbsUserProfile from "@/components/BreadcrumbsUserProfile";

export default function UserOtherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <BreadcrumbsUserProfile />
      {children}
    </div>
  );
}
