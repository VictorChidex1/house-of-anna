import { useEffect, useState } from "react";

export function useScrollY(threshold: number): boolean {
  const [crossed, setCrossed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCrossed(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return crossed;
}
