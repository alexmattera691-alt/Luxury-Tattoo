import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { studio } from "@/data/studio"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"
import { ArrowDown } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function Hero({ ready, onBook }: { ready: boolean; onBook: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-line]", {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        delay: 0.2,
      })
      gsap.from("[data-hero-meta]", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.8,
      })
      gsap.from("[data-hero-img]", {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.2,
        ease: "expo.out",
        delay: 0.3,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      })
      tl.to(imgRef.current, { yPercent: 15, ease: "none" }, 0)
      tl.to(
        headlineRef.current,
        { yPercent: -20, opacity: 0.3, ease: "none" },
        0
      )
    }, root)

    return () => ctx.revert()
  }, [ready])

  return (
    <section
      ref={root}
      id="top"
      className="relative h-svh min-h-[640px] w-full overflow-hidden bg-background"
    >
      <div
        ref={imgRef}
        data-hero-img
        className="absolute inset-0 z-0"
      >
        <img
          src="/hero-main.webp"
          alt="Large-scale editorial tattoo on a back"
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 py-24 md:px-10 md:py-28">
        <div className="flex justify-between">
          <span
            data-hero-meta
            className="text-[0.65rem] tracking-micro uppercase text-muted-foreground"
          >
            {studio.descriptor}
          </span>
          <span
            data-hero-meta
            className="hidden text-[0.65rem] tracking-micro uppercase text-muted-foreground md:block"
          >
            Est. {studio.founded}
          </span>
        </div>

        <div className="max-w-3xl">
          <h1
            ref={headlineRef}
            className="font-display text-[clamp(3rem,11vw,11rem)] leading-[0.88] tracking-tighter-2 text-foreground"
          >
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                Body as
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block italic text-copper">
                Canvas.
              </span>
            </span>
          </h1>
          <p
            data-hero-meta
            className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            {studio.manifesto}
          </p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onBook}
              data-cursor="explore"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-xs tracking-micro uppercase text-background transition-all hover:bg-copper hover:text-copper-foreground"
            >
              Book a Consultation
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <a
              href="#artists"
              data-cursor="explore"
              className="group inline-flex items-center gap-3 rounded-full border border-foreground/30 px-7 py-3.5 text-xs tracking-micro uppercase text-foreground transition-all hover:border-foreground hover:bg-foreground/5"
            >
              Explore Artists
            </a>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[0.65rem] tracking-micro uppercase text-muted-foreground">
              {studio.location.city}, {studio.location.country}
            </span>
            <ArrowDown className="size-4 animate-bounce text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  )
}
