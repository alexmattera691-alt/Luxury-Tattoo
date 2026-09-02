import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type CursorState = "default" | "view" | "explore" | "drag"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CursorState>("default")
  const [visible, setVisible] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    setEnabled(true)

    let raf = 0
    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!visible) setVisible(true)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
      }

      const target = e.target as HTMLElement
      const cursorAttr = target.closest<HTMLElement>("[data-cursor]")
      if (cursorAttr) {
        setState(cursorAttr.dataset.cursor as CursorState)
      } else {
        setState("default")
      }
    }

    const onLeave = () => setVisible(false)

    const animate = () => {
      rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(raf)
    }
  }, [visible])

  if (!enabled) return null

  const labels: Record<CursorState, string> = {
    default: "",
    view: "VIEW",
    explore: "EXPLORE",
    drag: "DRAG",
  }

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
      aria-hidden
    >
      <div
        ref={dotRef}
        className="fixed left-0 top-0 size-1.5 rounded-full bg-foreground"
      />
      <div
        ref={ringRef}
        className={cn(
          "fixed left-0 top-0 flex items-center justify-center rounded-full border border-foreground/40 transition-[width,height,background-color,border-color] duration-300",
          state === "default" ? "size-8" : "size-20 bg-foreground/5 border-foreground/20"
        )}
      >
        {labels[state] && (
          <span className="text-[0.6rem] font-medium tracking-micro uppercase text-foreground">
            {labels[state]}
          </span>
        )}
      </div>
    </div>
  )
}
