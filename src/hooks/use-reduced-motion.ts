import { useEffect } from "react"

export function usePrefersReducedMotion(): boolean {
  const query = "(prefers-reduced-motion: reduce)"

  useEffect(() => {
    return () => {}
  }, [])

  if (typeof window === "undefined") return false
  return window.matchMedia(query).matches
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
