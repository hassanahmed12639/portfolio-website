"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

/**
 * Custom hook for GSAP animations
 * Handles cleanup automatically on unmount
 */
export function useGSAP(callback: () => void | (() => void), dependencies: any[] = []) {
  const contextRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Cleanup previous context
    if (contextRef.current) {
      contextRef.current.revert();
    }

    // Create new context
    contextRef.current = gsap.context(() => {
      const cleanup = callback();
      if (cleanup) {
        cleanupRef.current = cleanup;
      }
    });

    // Cleanup on unmount
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      if (contextRef.current) {
        contextRef.current.revert();
        contextRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return contextRef;
}
