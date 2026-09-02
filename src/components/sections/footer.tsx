import { studio } from "@/data/studio"

export function Footer({ onBook }: { onBook: () => void }) {
  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.85] tracking-tighter-2">
              Make it <span className="italic text-copper">yours.</span>
            </h2>
            <button
              onClick={onBook}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-xs tracking-micro uppercase text-background transition-all hover:bg-copper hover:text-copper-foreground"
            >
              Book a Consultation
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-6 md:grid-cols-3">
            <div>
              <span className="text-[0.6rem] tracking-micro uppercase text-muted-foreground">Visit</span>
              <p className="mt-3 text-sm leading-relaxed">
                {studio.location.address}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {studio.location.city}, {studio.location.country}
              </p>
            </div>
            <div>
              <span className="text-[0.6rem] tracking-micro uppercase text-muted-foreground">Contact</span>
              <p className="mt-3 text-sm">{studio.contact.email}</p>
              <p className="mt-1 text-sm">{studio.contact.phone}</p>
            </div>
            <div>
              <span className="text-[0.6rem] tracking-micro uppercase text-muted-foreground">Hours</span>
              <p className="mt-3 text-sm">{studio.contact.hours}</p>
              <p className="mt-1 text-sm text-muted-foreground">Closed Sun & Mon</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-[0.6rem] tracking-micro uppercase text-muted-foreground">
            © {new Date().getFullYear()} {studio.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href={`https://instagram.com/${studio.contact.instagram.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="text-[0.6rem] tracking-micro uppercase text-muted-foreground transition-colors hover:text-foreground"
            >
              {studio.contact.instagram}
            </a>
            <span className="text-[0.6rem] tracking-micro uppercase text-muted-foreground">
              Est. {studio.founded}
            </span>
          </div>
        </div>
      </div>

      {/* Oversized watermark */}
      <div className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-8 text-center font-display text-[18vw] leading-none tracking-tighter-2 text-foreground/[0.03]">
          {studio.name}
        </p>
      </div>
    </footer>
  )
}
