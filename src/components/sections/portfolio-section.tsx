import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { portfolio } from "@/data/studio"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioSection({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-work-panel]")

      sections.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        })

        gsap.from(panel.querySelector("[data-work-meta]"), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 75%",
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [ready])

  // Show/hide dots based on section visibility
  useEffect(() => {
    if (!ready) return
    const section = root.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [ready])

  return (
    <section ref={root} id="work" className="bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex items-baseline justify-between">
          <span className="text-[0.65rem] tracking-micro uppercase text-muted-foreground">
            04 — Signature Work
          </span>
          <span className="hidden text-[0.65rem] tracking-micro uppercase text-muted-foreground md:block">
            {portfolio.length} Pieces
          </span>
        </div>
        <h2 className="mt-8 font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tighter-2">
          The <span className="italic text-copper">collection.</span>
        </h2>
      </div>

      <div className="relative">
        {portfolio.map((work, i) => (
          <div
            key={work.id}
            data-work-panel
            className="relative flex min-h-[500px] items-center justify-center overflow-hidden md:h-[85vh]"
          >
            <div data-work-img className="absolute inset-0 z-0">
              <img
                src={work.image}
                alt={work.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
            </div>

            <div
              data-work-meta
              className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col justify-between px-8 py-20 md:h-full md:px-24 md:py-32"
            >
              <div className="flex items-start justify-between">
                <span className="text-[0.65rem] tracking-micro uppercase text-foreground/80">
                  {String(i + 1).padStart(2, "0")} / {String(portfolio.length).padStart(2, "0")}
                </span>
                <span className="rounded-full border border-foreground/30 bg-background/20 px-4 py-1.5 text-[0.6rem] tracking-micro uppercase text-foreground backdrop-blur-sm">
                  {work.discipline}
                </span>
              </div>

              <div className="self-end text-right text-foreground">
                <h3 className="font-display text-[clamp(1.8rem,5vw,4rem)] leading-[0.9] tracking-tighter-2">
                  {work.title}
                </h3>
                <div className="mt-5 flex flex-col gap-1.5 text-[0.65rem] tracking-micro uppercase">
                  <span>{work.artist}</span>
                  <span>{work.style} — {work.placement}</span>
                  <span>{work.year}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {inView && (
        <div className="fixed bottom-8 left-1/2 z-50 hidden -translate-x-1/2 md:block">
          <div className="flex items-center gap-1.5 rounded-full bg-background/60 px-4 py-2 backdrop-blur-md">
            {portfolio.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  active === i ? "w-8 bg-foreground" : "w-1.5 bg-foreground/30"
                )}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
