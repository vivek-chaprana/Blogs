"use client";

import useStickyCoords from "@/lib/hooks/useStickyCoords";

export default function SidebarClientWrapper({
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
      className="border-l p-3 xl:px-5 flex-col gap-5 h-min w-1/3 hidden lg:flex sticky"
    >
      {children}
    </aside>
  );
}
