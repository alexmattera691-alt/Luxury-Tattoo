import { useEffect, useRef } from "react"

export function useMagnetic<T extends HTMLElement>(strength = 0.3, radius = 80) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < radius) {
        const moveX = dx * strength
        const moveY = dy * strength
        el.style.transform = `translate(${moveX}px, ${moveY}px)`
      } else {
        el.style.transform = "translate(0, 0)"
      }
    }

    const handleLeave = () => {
      el.style.transform = "translate(0, 0)"
    }

    window.addEventListener("mousemove", handleMove)
    el.addEventListener("mouseleave", handleLeave)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      el.removeEventListener("mouseleave", handleLeave)
    }
  }, [strength, radius])

  return ref
}
