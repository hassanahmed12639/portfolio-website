"use client";

import { useEffect } from "react";
import { initLenis } from "@/lib/lenis";

/**
 * Provider component that initializes Lenis smooth scrolling
 * Should be placed at the root of the app
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenisInstance = initLenis();

    // Cleanup on unmount
    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
