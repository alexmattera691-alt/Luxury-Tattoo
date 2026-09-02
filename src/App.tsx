import { useState, useCallback, useEffect } from "react"
import { OpeningSequence } from "@/components/opening-sequence"
import { Navigation } from "@/components/navigation"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Hero } from "@/components/sections/hero"
import { TattooSection } from "@/components/sections/tattoo-section"
import { DualityTransition } from "@/components/sections/duality-transition"
import { PiercingSection } from "@/components/sections/piercing-section"
import { ArtistsSection } from "@/components/sections/artists-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { StudioSection } from "@/components/sections/studio-section"
import { BookingDialog } from "@/components/sections/booking-dialog"
import { Footer } from "@/components/sections/footer"

export function App() {
  const [introDone, setIntroDone] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  const handleIntroComplete = useCallback(() => setIntroDone(true), [])
  const openBooking = useCallback(() => setBookingOpen(true), [])

  // Lock scroll during intro
  useEffect(() => {
    if (introDone) {
      document.body.style.overflow = ""
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = "hidden"
    }
  }, [introDone])

  return (
    <>
      <OpeningSequence onComplete={handleIntroComplete} />
      <CustomCursor />
      <SmoothScroll ready={introDone}>
        <Navigation visible={introDone} onBook={openBooking} />
        <main className="grain relative">
          <Hero ready={introDone} onBook={openBooking} />
          <TattooSection ready={introDone} />
          <DualityTransition ready={introDone} />
          <PiercingSection ready={introDone} />
          <ArtistsSection ready={introDone} onBook={openBooking} />
          <PortfolioSection ready={introDone} />
          <StudioSection ready={introDone} />
          <Footer onBook={openBooking} />
        </main>
      </SmoothScroll>
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  )
}

export default App
