import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { artists, type Artist } from "@/data/studio"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export function ArtistsSection({ ready, onBook }: { ready: boolean; onBook: () => void }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-artist-row]").forEach((row) => {
        gsap.from(row, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section ref={root} id="artists" className="bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex items-baseline justify-between">
          <span className="text-[0.65rem] tracking-micro uppercase text-muted-foreground">
            03 — Artists
          </span>
          <span className="hidden text-[0.65rem] tracking-micro uppercase text-muted-foreground md:block">
            The Roster
          </span>
        </div>
        <h2 className="mt-8 font-display text-[clamp(2rem,6vw,5rem)] leading-[0.9] tracking-tighter-2">
          The hands behind <span className="italic text-copper">the work.</span>
        </h2>
      </div>

      <div className="flex flex-col">
        {artists.map((artist, i) => (
          <ArtistRow key={artist.id} artist={artist} index={i} onBook={onBook} />
        ))}
      </div>
    </section>
  )
}

function ArtistRow({ artist, index, onBook }: { artist: Artist; index: number; onBook: () => void }) {
  const [hovered, setHovered] = useState(false)
  const isEven = index % 2 === 0

  return (
    <div
      data-artist-row
      className="group relative border-t border-border/40"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-8 px-6 py-12 md:px-10 md:py-20 lg:grid-cols-2",
          isEven ? "" : "lg:[direction:rtl]"
        )}
      >
        <div className={cn("relative", isEven ? "lg:order-1" : "lg:order-2")}>
          <div
            data-cursor="view"
            className="relative aspect-[4/5] overflow-hidden rounded-lg"
          >
            <img
              src={artist.portrait}
              alt={artist.name}
              className="h-full w-full object-cover transition-all duration-700 ease-out"
              style={{
                opacity: hovered ? 0 : 1,
              }}
              loading="lazy"
            />
            <img
              src={artist.workImage}
              alt={`${artist.name} — work`}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              style={{
                opacity: hovered ? 1 : 0,
              }}
              loading="lazy"
            />
          </div>
        </div>

        <div className={cn(isEven ? "lg:order-2" : "lg:order-1 lg:[direction:ltr]")}>
          <span className="text-[0.65rem] tracking-micro uppercase text-muted-foreground">
            {String(index + 1).padStart(2, "0")} / {String(artists.length).padStart(2, "0")}
          </span>
          <h3 className="mt-4 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-tighter-2">
            {artist.name}
          </h3>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <span className="text-xs tracking-micro uppercase text-copper">
              {artist.specialty}
            </span>
            <span className="text-xs tracking-micro uppercase text-muted-foreground">
              {artist.style}
            </span>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {artist.bio}
          </p>
          <button
            type="button"
            onClick={onBook}
            className="group/link mt-8 inline-flex items-center gap-2 text-sm tracking-micro uppercase"
          >
            <span className="relative">
              Book with {artist.name.split(" ")[0]}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover/link:w-full" />
            </span>
            <span className="transition-transform group-hover/link:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
