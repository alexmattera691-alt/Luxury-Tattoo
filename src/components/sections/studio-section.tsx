import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { studioFeatures, studio } from "@/data/studio"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

export function StudioSection({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from("[data-studio-headline]", {
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: "[data-studio-intro]",
          start: "top 80%",
        },
      })
      gsap.utils.toArray<HTMLElement>("[data-studio-feature]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section ref={root} id="studio" className="bg-background">
      <div
        data-studio-intro
        className="relative h-[60vh] w-full overflow-hidden"
      >
        <img
          src="/studio-interior.webp"
          alt="ENCRE atelier interior"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 md:px-10">
          <span className="text-[0.65rem] tracking-micro uppercase text-muted-foreground">
            05 — Studio
          </span>
          <div className="mt-4 overflow-hidden">
            <h2
              data-studio-headline
              className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tighter-2"
            >
              The <span className="italic text-copper">atelier.</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {studio.location.district}. A converted 19th-century print house.
          Concrete, oak, and north light. Every surface is medical-grade. Every
          tool is single-use or autoclave-sterilized. The space is the first
          promise we make.
        </p>

        <div className="mt-16 flex flex-col gap-16 md:gap-24">
          {studioFeatures.map((feature) => (
            <div
              key={feature.id}
              data-studio-feature
              className="group grid grid-cols-1 gap-8 lg:grid-cols-12"
            >
              <div
                data-cursor="view"
                className="relative aspect-[16/10] overflow-hidden rounded-lg lg:col-span-8"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-end lg:col-span-4">
                <h3 className="font-display text-2xl tracking-tighter-2 md:text-3xl">
                  {feature.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-border/40 pt-12 md:grid-cols-4">
          <div>
            <span className="text-[0.6rem] tracking-micro uppercase text-muted-foreground">Address</span>
            <p className="mt-2 text-sm">{studio.location.address}</p>
          </div>
          <div>
            <span className="text-[0.6rem] tracking-micro uppercase text-muted-foreground">Hours</span>
            <p className="mt-2 text-sm">{studio.contact.hours}</p>
          </div>
          <div>
            <span className="text-[0.6rem] tracking-micro uppercase text-muted-foreground">Email</span>
            <p className="mt-2 text-sm">{studio.contact.email}</p>
          </div>
          <div>
            <span className="text-[0.6rem] tracking-micro uppercase text-muted-foreground">Phone</span>
            <p className="mt-2 text-sm">{studio.contact.phone}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
