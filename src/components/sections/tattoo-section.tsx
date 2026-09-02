import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { tattooStyles } from "@/data/studio"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

export function TattooSection({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return

      const scrollWidth = track.scrollWidth - window.innerWidth + 80

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-tattoo-scroll]",
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
        },
      })

      gsap.from("[data-tattoo-headline]", {
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: "[data-tattoo-intro]",
          start: "top 80%",
        },
      })
    }, root)

    return () => ctx.revert()
  }, [ready])

  return (
    <section ref={root} id="tattoo" className="relative bg-background">
      <div
        data-tattoo-intro
        className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="flex items-baseline justify-between">
          <span className="text-[0.65rem] tracking-micro uppercase text-muted-foreground">
            01 — Tattoo
          </span>
          <span className="hidden text-[0.65rem] tracking-micro uppercase text-muted-foreground md:block">
            Ink · Line · Texture · Skin
          </span>
        </div>
        <div className="mt-8 overflow-hidden">
          <h2
            data-tattoo-headline
            className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tighter-2"
          >
            Line. Shadow. <span className="italic text-copper">Skin.</span>
          </h2>
        </div>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Eight disciplines, one philosophy. Every style is a different language
          for the same conversation — between the hand, the needle, and the
          skin that holds the work.
        </p>
      </div>

      <div
        data-tattoo-scroll
        className="relative h-svh overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex h-full items-center gap-6 px-10"
          style={{ width: "max-content" }}
        >
          {tattooStyles.map((style, i) => (
            <article
              key={style.id}
              data-cursor="view"
              className="group relative h-[70vh] w-[75vw] shrink-0 overflow-hidden rounded-lg md:w-[40vw] lg:w-[32vw]"
            >
              <img
                src={style.image}
                alt={style.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-[0.6rem] tracking-micro uppercase text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-3xl tracking-tighter-2 md:text-4xl">
                  {style.name}
                </h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  {style.description}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="pointer-events-none absolute bottom-8 left-10 text-[0.6rem] tracking-micro uppercase text-muted-foreground">
          Scroll to explore →
        </div>
      </div>
    </section>
  )
}
