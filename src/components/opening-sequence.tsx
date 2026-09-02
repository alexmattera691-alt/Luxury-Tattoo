import { useEffect, useState } from "react"
import { studio } from "@/data/studio"
import { cn } from "@/lib/utils"

export function OpeningSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduce) {
      setDone(true)
      onComplete()
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setPhase(1), 200))
    timers.push(setTimeout(() => setPhase(2), 900))
    timers.push(setTimeout(() => setPhase(3), 1700))
    timers.push(
      setTimeout(() => {
        setPhase(4)
      }, 2400)
    )
    timers.push(
      setTimeout(() => {
        setDone(true)
        onComplete()
      }, 3200)
    )

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity duration-700",
        phase >= 4 ? "pointer-events-none opacity-0" : "opacity-100"
      )}
      aria-hidden={done}
    >
      <div className="relative flex flex-col items-center gap-6">
        <div
          className={cn(
            "h-px bg-foreground transition-all duration-1000 ease-out",
            phase >= 1 ? "w-16 opacity-100" : "w-0 opacity-0",
            phase >= 2 ? "w-24" : ""
          )}
        />
        <div className="overflow-hidden">
          <div
            className={cn(
              "font-display text-2xl tracking-tighter-2 transition-transform duration-1000 ease-out",
              phase >= 2 ? "translate-y-0" : "translate-y-full"
            )}
          >
            {studio.name}
          </div>
        </div>
        <div className="overflow-hidden">
          <p
            className={cn(
              "text-[0.6rem] tracking-micro uppercase text-muted-foreground transition-transform duration-700 ease-out",
              phase >= 3 ? "translate-y-0" : "translate-y-full"
            )}
          >
            {studio.descriptor}
          </p>
        </div>
      </div>
    </div>
  )
}
