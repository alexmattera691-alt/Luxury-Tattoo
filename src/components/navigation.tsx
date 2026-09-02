import { useEffect, useState } from "react"
import { studio, nav } from "@/data/studio"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation({ visible, onBook }: { visible: boolean; onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
          scrolled && !menuOpen
            ? "bg-background/70 backdrop-blur-xl border-b border-border/40"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 md:px-10">
          <a
            href="#top"
            className="font-display text-lg tracking-tighter-2"
            aria-label={studio.name}
          >
            {studio.name}
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-xs tracking-micro uppercase text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onBook}
              className="hidden rounded-full border-foreground/30 text-xs tracking-micro uppercase md:inline-flex"
            >
              {nav.cta.label}
            </Button>
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[110] bg-background transition-all duration-500 md:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <span className="font-display text-lg tracking-tighter-2">
            {studio.name}
          </span>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-2 px-6 pt-12">
          {nav.links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-border/40 py-5 font-display text-3xl tracking-tighter-2 transition-colors hover:text-copper"
              style={{
                transitionDelay: `${i * 50}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
          <Button
            size="lg"
            onClick={() => {
              setMenuOpen(false)
              onBook()
            }}
            className="mt-8 w-full rounded-full text-sm tracking-micro uppercase"
          >
            {nav.cta.label} a Consultation
          </Button>
        </nav>
        <div className="absolute bottom-8 left-6 right-6 space-y-1 text-xs tracking-micro uppercase text-muted-foreground">
          <p>{studio.location.city}, {studio.location.country}</p>
          <p>{studio.contact.hours}</p>
        </div>
      </div>
    </>
  )
}
