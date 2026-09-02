import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  piercingPlacements,
  jewelryMaterials,
  aftercare,
} from "@/data/studio"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

gsap.registerPlugin(ScrollTrigger)

export function PiercingSection({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const [activePlacement, setActivePlacement] = useState<string | null>(null)

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from("[data-piercing-headline]", {
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: "[data-piercing-intro]",
          start: "top 80%",
        },
      })
      gsap.from("[data-jewelry-card]", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "[data-jewelry-grid]",
          start: "top 85%",
        },
      })
    }, root)

    return () => ctx.revert()
  }, [ready])

  return (
    <section ref={root} id="piercing" className="bg-background">
      <div
        data-piercing-intro
        className="relative h-[80vh] w-full overflow-hidden"
      >
        <img
          src="/piercing-jewelry-macro.webp"
          alt="Macro piercing jewelry"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-10">
          <span className="text-[0.65rem] tracking-micro uppercase text-muted-foreground">
            02 — Piercing
          </span>
          <div className="mt-4 overflow-hidden">
            <h2
              data-piercing-headline
              className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tighter-2"
            >
              Placement. Precision. <span className="italic text-copper">Permanence.</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl tracking-tighter-2 md:text-3xl">
              Ear Curation
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Each placement is a decision about anatomy, light, and metal.
              Hover or tap to explore the options.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {piercingPlacements.map((p) => (
              <button
                key={p.id}
                onClick={() =>
                  setActivePlacement(activePlacement === p.id ? null : p.id)
                }
                className="group rounded-lg border border-border p-4 text-left transition-all hover:border-foreground"
              >
                <span className="text-xs tracking-micro uppercase text-muted-foreground group-hover:text-foreground">
                  {p.name}
                </span>
                {activePlacement === p.id && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {p.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10 md:pb-32">
        <h3 className="mb-8 font-display text-2xl tracking-tighter-2 md:text-3xl">
          Materials
        </h3>
        <div
          data-jewelry-grid
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {jewelryMaterials.map((m) => (
            <div
              key={m.id}
              data-jewelry-card
              data-cursor="view"
              className="group relative aspect-[3/4] overflow-hidden rounded-lg"
            >
              <img
                src={m.image}
                alt={m.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <h4 className="font-display text-lg tracking-tighter-2">
                  {m.name}
                </h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10 md:pb-32">
        <h3 className="mb-8 font-display text-2xl tracking-tighter-2 md:text-3xl">
          Aftercare
        </h3>
        <Accordion type="single" collapsible className="max-w-2xl">
          {aftercare.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-sm tracking-micro uppercase hover:no-underline">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
