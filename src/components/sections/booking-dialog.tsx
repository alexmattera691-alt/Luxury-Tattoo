import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  artists,
  tattooStyles,
  piercingPlacements,
  jewelryMaterials,
  tattooBookingSteps,
  piercingBookingSteps,
  type Discipline,
} from "@/data/studio"
import { Check, ArrowLeft, ArrowRight } from "lucide-react"

const tattooSchema = z.object({
  artist: z.string().min(1, "Select an artist"),
  style: z.string().min(1, "Select a style"),
  placement: z.string().min(1, "Required"),
  size: z.string().min(1, "Required"),
  description: z.string().min(10, "Tell us about your idea"),
  date: z.string().min(1, "Select a date"),
  name: z.string().min(2, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Required"),
})

const piercingSchema = z.object({
  type: z.string().min(1, "Select a type"),
  placement: z.string().min(1, "Select a placement"),
  jewelry: z.string().min(1, "Select a preference"),
  material: z.string().min(1, "Select a material"),
  date: z.string().min(1, "Select a date"),
  name: z.string().min(2, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Required"),
})

type TattooForm = z.infer<typeof tattooSchema>
type PiercingForm = z.infer<typeof piercingSchema>

export function BookingDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [discipline, setDiscipline] = useState<Discipline | null>(null)
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const tattooForm = useForm<TattooForm>({
    resolver: zodResolver(tattooSchema),
    mode: "onTouched",
    defaultValues: {
      artist: "", style: "", placement: "", size: "",
      description: "", date: "", name: "", email: "", phone: "",
    },
  })
  const piercingForm = useForm<PiercingForm>({
    resolver: zodResolver(piercingSchema),
    mode: "onTouched",
    defaultValues: {
      type: "", placement: "", jewelry: "", material: "",
      date: "", name: "", email: "", phone: "",
    },
  })

  const steps = discipline === "tattoo" ? tattooBookingSteps : piercingBookingSteps
  const totalSteps = steps.length
  const progress = discipline ? ((step + 1) / totalSteps) * 100 : 0

  const reset = () => {
    setDiscipline(null)
    setStep(0)
    setSubmitted(false)
    tattooForm.reset()
    piercingForm.reset()
  }

  const handleClose = (v: boolean) => {
    onOpenChange(v)
    if (!v) setTimeout(reset, 300)
  }

  const next = async () => {
    if (discipline === "tattoo") {
      const fields: (keyof TattooForm)[] = [
        "artist", "style", "placement", "size", "description", "date", "name", "email",
      ]
      const currentField = fields[step]
      const valid = await tattooForm.trigger(currentField)
      if (valid) setStep((s) => Math.min(s + 1, totalSteps - 1))
    } else {
      const fields: (keyof PiercingForm)[] = [
        "type", "placement", "jewelry", "material", "date", "name", "email",
      ]
      const currentField = fields[step]
      const valid = await piercingForm.trigger(currentField)
      if (valid) setStep((s) => Math.min(s + 1, totalSteps - 1))
    }
  }

  const back = () => setStep((s) => Math.max(s - 1, 0))

  const onSubmit = async () => {
    setSubmitted(true)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="flex h-svh max-w-none flex-col gap-0 overflow-hidden rounded-none border-0 bg-background p-0">
        <DialogTitle className="sr-only">Book a Consultation</DialogTitle>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/40 px-6 py-4 md:px-10">
          <button
            onClick={() => (discipline ? setDiscipline(null) : handleClose(false))}
            className="flex items-center gap-2 text-xs tracking-micro uppercase text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back
          </button>
          <span className="font-display text-lg tracking-tighter-2">ENCRE</span>
          <button
            onClick={() => handleClose(false)}
            className="text-xs tracking-micro uppercase text-muted-foreground transition-colors hover:text-foreground"
          >
            Close
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-foreground text-background">
              <Check className="size-6" />
            </div>
            <div>
              <h2 className="font-display text-3xl tracking-tighter-2 md:text-4xl">
                Request received.
              </h2>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                We review every consultation request personally. You will hear
                from us within 48 hours to schedule your appointment.
              </p>
            </div>
            <Button
              onClick={() => handleClose(false)}
              variant="outline"
              className="rounded-full text-xs tracking-micro uppercase"
            >
              Close
            </Button>
          </div>
        ) : !discipline ? (
          /* Step 0: Choose discipline */
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
              <span className="text-[0.65rem] tracking-micro uppercase text-muted-foreground">
                Consultation
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] leading-[0.9] tracking-tighter-2 text-center">
                Choose your <span className="italic text-copper">discipline.</span>
              </h2>
              <p className="mt-4 max-w-md text-center text-sm text-muted-foreground">
                Every appointment begins with a private consultation. Tell us
                what you envision.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-0 border-t border-border/40 md:grid-cols-2">
              <button
                onClick={() => setDiscipline("tattoo")}
                data-cursor="explore"
                className="group relative flex flex-col items-center justify-center gap-4 p-12 transition-colors hover:bg-foreground/5 md:border-r md:border-border/40"
              >
                <span className="text-[0.65rem] tracking-micro uppercase text-muted-foreground">
                  01
                </span>
                <span className="font-display text-[clamp(2rem,4vw,3.5rem)] tracking-tighter-2 transition-transform duration-500 group-hover:scale-105">
                  Tattoo
                </span>
                <span className="text-xs tracking-micro uppercase text-muted-foreground">
                  Ink · Line · Skin
                </span>
              </button>
              <button
                onClick={() => setDiscipline("piercing")}
                data-cursor="explore"
                className="group relative flex flex-col items-center justify-center gap-4 p-12 transition-colors hover:bg-foreground/5"
              >
                <span className="text-[0.65rem] tracking-micro uppercase text-muted-foreground">
                  02
                </span>
                <span className="font-display text-[clamp(2rem,4vw,3.5rem)] tracking-tighter-2 transition-transform duration-500 group-hover:scale-105">
                  Piercing
                </span>
                <span className="text-xs tracking-micro uppercase text-muted-foreground">
                  Metal · Light · Precision
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* Multi-step form */
          <form
            onSubmit={discipline === "tattoo" ? tattooForm.handleSubmit(onSubmit) : piercingForm.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col"
          >
            {/* Progress bar */}
            <div className="border-b border-border/40 px-6 py-4 md:px-10">
              <div className="flex items-center justify-between">
                <span className="text-[0.65rem] tracking-micro uppercase text-muted-foreground">
                  {discipline === "tattoo" ? "Tattoo Consultation" : "Piercing Consultation"}
                </span>
                <span className="text-[0.65rem] tracking-micro uppercase text-muted-foreground">
                  {step + 1} / {totalSteps}
                </span>
              </div>
              <Progress value={progress} className="mt-3 h-px rounded-none" />
              <div className="mt-2 flex gap-2">
                {steps.map((s, i) => (
                  <span
                    key={s.id}
                    className={cn(
                      "text-[0.55rem] tracking-micro uppercase transition-colors",
                      i === step ? "text-foreground" : "text-muted-foreground/40"
                    )}
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Step content */}
            <div className="flex flex-1 items-center px-6 py-12 md:px-10">
              <div className="mx-auto w-full max-w-2xl">
                {discipline === "tattoo" && <TattooStepContent step={step} form={tattooForm} />}
                {discipline === "piercing" && <PiercingStepContent step={step} form={piercingForm} />}
              </div>
            </div>

            {/* Footer controls */}
            <div className="flex items-center justify-between border-t border-border/40 px-6 py-4 md:px-10">
              <Button
                type="button"
                variant="ghost"
                onClick={back}
                disabled={step === 0}
                className="text-xs tracking-micro uppercase"
              >
                <ArrowLeft className="size-3.5" />
                Previous
              </Button>
              {step < totalSteps - 1 ? (
                <Button
                  type="button"
                  onClick={next}
                  className="rounded-full text-xs tracking-micro uppercase"
                >
                  Continue
                  <ArrowRight className="size-3.5" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="rounded-full text-xs tracking-micro uppercase"
                >
                  Submit Request
                  <ArrowRight className="size-3.5" />
                </Button>
              )}
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

function ChoiceGrid({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: { id: string; name: string; description?: string }[]
  value: string
  onChange: (v: string) => void
  columns?: number
}) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.name)}
          className={cn(
            "rounded-lg border p-4 text-left transition-all",
            value === opt.name
              ? "border-foreground bg-foreground/5"
              : "border-border hover:border-foreground/50"
          )}
        >
          <span className="text-sm font-medium">{opt.name}</span>
          {opt.description && (
            <span className="mt-1 block text-xs text-muted-foreground">
              {opt.description}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="font-display text-3xl tracking-tighter-2 md:text-4xl">
        {children}
      </h3>
    </div>
  )
}

function TattooStepContent({
  step,
  form,
}: {
  step: number
  form: ReturnType<typeof useForm<TattooForm>>
}) {
  const { register, watch, setValue, formState } = form
  const values = watch()

  switch (step) {
    case 0:
      return (
        <div>
          <StepTitle>Choose your artist.</StepTitle>
          <ChoiceGrid
            options={artists.filter((a) => a.discipline === "tattoo").map((a) => ({ id: a.id, name: a.name, description: a.specialty }))}
            value={values.artist}
            onChange={(v) => setValue("artist", v, { shouldValidate: true })}
            columns={2}
          />
          {formState.errors.artist && <p className="mt-3 text-xs text-destructive">{formState.errors.artist.message}</p>}
        </div>
      )
    case 1:
      return (
        <div>
          <StepTitle>Select a style.</StepTitle>
          <ChoiceGrid
            options={tattooStyles.map((s) => ({ id: s.id, name: s.name, description: s.description }))}
            value={values.style}
            onChange={(v) => setValue("style", v, { shouldValidate: true })}
            columns={3}
          />
          {formState.errors.style && <p className="mt-3 text-xs text-destructive">{formState.errors.style.message}</p>}
        </div>
      )
    case 2:
      return (
        <div>
          <StepTitle>Where on the body?</StepTitle>
          <Input placeholder="e.g. Inner forearm, left side" {...register("placement")} className="h-14 text-base" />
          {formState.errors.placement && <p className="mt-3 text-xs text-destructive">{formState.errors.placement.message}</p>}
        </div>
      )
    case 3:
      return (
        <div>
          <StepTitle>Approximate size.</StepTitle>
          <ChoiceGrid
            options={[
              { id: "xs", name: "Minimal", description: "Under 5cm" },
              { id: "sm", name: "Small", description: "5—10cm" },
              { id: "md", name: "Medium", description: "10—20cm" },
              { id: "lg", name: "Large", description: "20cm+" },
            ]}
            value={values.size}
            onChange={(v) => setValue("size", v, { shouldValidate: true })}
            columns={4}
          />
          {formState.errors.size && <p className="mt-3 text-xs text-destructive">{formState.errors.size.message}</p>}
        </div>
      )
    case 4:
      return (
        <div>
          <StepTitle>Reference images.</StepTitle>
          <div className="rounded-lg border border-dashed border-border p-12 text-center">
            <p className="text-sm text-muted-foreground">
              Drag reference images here, or link to inspiration.
            </p>
            <p className="mt-2 text-xs text-muted-foreground/60">
              Optional — you can also share references after booking.
            </p>
          </div>
        </div>
      )
    case 5:
      return (
        <div>
          <StepTitle>Describe your vision.</StepTitle>
          <Textarea
            placeholder="Tell us about the concept, mood, elements, references..."
            {...register("description")}
            className="min-h-32 text-base"
          />
          {formState.errors.description && <p className="mt-3 text-xs text-destructive">{formState.errors.description.message}</p>}
        </div>
      )
    case 6:
      return (
        <div>
          <StepTitle>Preferred date.</StepTitle>
          <Input type="date" {...register("date")} className="h-14 text-base" />
          {formState.errors.date && <p className="mt-3 text-xs text-destructive">{formState.errors.date.message}</p>}
        </div>
      )
    case 7:
      return (
        <div className="space-y-6">
          <StepTitle>Your contact.</StepTitle>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-[0.65rem] tracking-micro uppercase">Name</Label>
              <Input id="name" {...register("name")} className="mt-1.5 h-12" />
              {formState.errors.name && <p className="mt-1.5 text-xs text-destructive">{formState.errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="text-[0.65rem] tracking-micro uppercase">Email</Label>
              <Input id="email" type="email" {...register("email")} className="mt-1.5 h-12" />
              {formState.errors.email && <p className="mt-1.5 text-xs text-destructive">{formState.errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="phone" className="text-[0.65rem] tracking-micro uppercase">Phone</Label>
              <Input id="phone" type="tel" {...register("phone")} className="mt-1.5 h-12" />
              {formState.errors.phone && <p className="mt-1.5 text-xs text-destructive">{formState.errors.phone.message}</p>}
            </div>
          </div>
        </div>
      )
    default:
      return null
  }
}

function PiercingStepContent({
  step,
  form,
}: {
  step: number
  form: ReturnType<typeof useForm<PiercingForm>>
}) {
  const { register, watch, setValue, formState } = form
  const values = watch()

  switch (step) {
    case 0:
      return (
        <div>
          <StepTitle>Piercing type.</StepTitle>
          <ChoiceGrid
            options={[
              { id: "ear", name: "Ear", description: "Lobe, cartilage, curated" },
              { id: "facial", name: "Facial", description: "Nostril, septum, lip" },
              { id: "body", name: "Body", description: "Navel, surface" },
            ]}
            value={values.type}
            onChange={(v) => setValue("type", v, { shouldValidate: true })}
            columns={3}
          />
          {formState.errors.type && <p className="mt-3 text-xs text-destructive">{formState.errors.type.message}</p>}
        </div>
      )
    case 1:
      return (
        <div>
          <StepTitle>Placement.</StepTitle>
          <ChoiceGrid
            options={piercingPlacements.map((p) => ({ id: p.id, name: p.name, description: p.description }))}
            value={values.placement}
            onChange={(v) => setValue("placement", v, { shouldValidate: true })}
            columns={4}
          />
          {formState.errors.placement && <p className="mt-3 text-xs text-destructive">{formState.errors.placement.message}</p>}
        </div>
      )
    case 2:
      return (
        <div>
          <StepTitle>Jewelry preference.</StepTitle>
          <ChoiceGrid
            options={[
              { id: "stud", name: "Stud", description: "Classic, minimal" },
              { id: "ring", name: "Ring", description: "Seamless hoop" },
              { id: "barbell", name: "Barbell", description: "Straight or curved" },
              { id: "curated", name: "Curated", description: "Let us decide" },
            ]}
            value={values.jewelry}
            onChange={(v) => setValue("jewelry", v, { shouldValidate: true })}
            columns={4}
          />
          {formState.errors.jewelry && <p className="mt-3 text-xs text-destructive">{formState.errors.jewelry.message}</p>}
        </div>
      )
    case 3:
      return (
        <div>
          <StepTitle>Material.</StepTitle>
          <ChoiceGrid
            options={jewelryMaterials.map((m) => ({ id: m.id, name: m.name, description: m.description.split(".")[0] }))}
            value={values.material}
            onChange={(v) => setValue("material", v, { shouldValidate: true })}
            columns={2}
          />
          {formState.errors.material && <p className="mt-3 text-xs text-destructive">{formState.errors.material.message}</p>}
        </div>
      )
    case 4:
      return (
        <div>
          <StepTitle>Preferred date.</StepTitle>
          <Input type="date" {...register("date")} className="h-14 text-base" />
          {formState.errors.date && <p className="mt-3 text-xs text-destructive">{formState.errors.date.message}</p>}
        </div>
      )
    case 5:
      return (
        <div className="space-y-6">
          <StepTitle>Your contact.</StepTitle>
          <div className="space-y-4">
            <div>
              <Label htmlFor="p-name" className="text-[0.65rem] tracking-micro uppercase">Name</Label>
              <Input id="p-name" {...register("name")} className="mt-1.5 h-12" />
              {formState.errors.name && <p className="mt-1.5 text-xs text-destructive">{formState.errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="p-email" className="text-[0.65rem] tracking-micro uppercase">Email</Label>
              <Input id="p-email" type="email" {...register("email")} className="mt-1.5 h-12" />
              {formState.errors.email && <p className="mt-1.5 text-xs text-destructive">{formState.errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="p-phone" className="text-[0.65rem] tracking-micro uppercase">Phone</Label>
              <Input id="p-phone" type="tel" {...register("phone")} className="mt-1.5 h-12" />
              {formState.errors.phone && <p className="mt-1.5 text-xs text-destructive">{formState.errors.phone.message}</p>}
            </div>
          </div>
        </div>
      )
    default:
      return null
  }
}
