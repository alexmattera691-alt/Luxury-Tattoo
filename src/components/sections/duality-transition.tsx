import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

export function DualityTransition({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 0.5,
        },
      })

      tl.to("[data-tattoo-half]", { xPercent: -30, ease: "none" }, 0)
      tl.to("[data-piercing-half]", { xPercent: 30, ease: "none" }, 0)
      tl.fromTo(
        "[data-bridge]",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, ease: "none" },
        0.3
      )
      tl.to("[data-bridge-text]", { opacity: 1, ease: "none" }, 0.5)
    }, root)

    return () => ctx.revert()
  }, [ready])

  return (
    <section
      ref={root}
      className="relative flex h-svh items-center overflow-hidden bg-background"
    >
      <div className="flex w-full items-center justify-center gap-0">
        <div
          data-tattoo-half
          className="relative h-svh w-1/2 overflow-hidden"
        >
          <img
            src="/tattoo-blackwork.webp"
            alt="Tattoo — ink and skin"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-background/10" />
          <span className="absolute left-8 top-1/2 -translate-y-1/2 text-[0.65rem] tracking-micro uppercase text-background">
            Tattoo
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div
            data-bridge
            className="h-px w-16 origin-center bg-foreground"
          />
          <span
            data-bridge-text
            className="mt-4 text-[0.65rem] tracking-micro uppercase text-muted-foreground opacity-0"
          >
            The Art Continues
          </span>
        </div>

        <div
          data-piercing-half
          className="relative h-svh w-1/2 overflow-hidden"
        >
          <img
            src="/piercing-jewelry-macro.webp"
            alt="Piercing — metal and light"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background/40 to-background/10" />
          <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[0.65rem] tracking-micro uppercase text-background">
            Piercing
          </span>
        </div>
      </div>
    </section>
  )
}
