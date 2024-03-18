"use client";
import useStickyCoords from "@/lib/hooks/useStickyCoords";

export default function ProfileSidebarClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ref, yCoords } = useStickyCoords();

  return (
    <aside
      ref={ref}
      style={{
        top: `-${yCoords}px`,
      }}
      className="border-l p-3 px-2 ld:px-5 flex-col gap-5  h-min  sticky w-[30%] hidden md:flex"
    >
      {children}
    </aside>
  );
}
