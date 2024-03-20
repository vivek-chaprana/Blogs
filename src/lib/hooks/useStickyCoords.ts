"use client";

import { useEffect, useRef, useState } from "react";

export default function useStickyCoords() {
  const ref = useRef<HTMLDivElement>(null);
  const [yCoords, setYCoords] = useState(0);

  useEffect(() => {
    const heightDifference =
      (ref.current?.getBoundingClientRect().height as number) -
      window.innerHeight;

    if (typeof heightDifference === "number") {
      setYCoords(heightDifference);
    }
  }, []);

  return {
    ref,
    yCoords,
  };
}
