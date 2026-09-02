export type Discipline = "tattoo" | "piercing"

export const studio = {
  name: "ENCRE",
  tagline: "Body as Canvas",
  descriptor: "Tattoo & Piercing Atelier",
  manifesto:
    "We treat skin as a living medium. Every line is deliberate. Every placement is considered. This is not decoration. This is identity, worn.",
  location: {
    city: "Milan",
    district: "Brera Design District",
    address: "Via Solferino 14, 20121 Milano",
    country: "Italy",
    coordinates: { lat: 45.4684, lng: 9.1859 },
  },
  contact: {
    email: "atelier@encre.studio",
    phone: "+39 02 8734 5601",
    instagram: "@encre.atelier",
    hours: "Tue—Sat, 11:00—20:00",
  },
  founded: 2019,
}

export const nav = {
  links: [
    { label: "Work", href: "#work" },
    { label: "Artists", href: "#artists" },
    { label: "Tattoo", href: "#tattoo" },
    { label: "Piercing", href: "#piercing" },
    { label: "Studio", href: "#studio" },
  ],
  cta: { label: "Book", href: "#book" },
}

export type Artist = {
  id: string
  name: string
  specialty: string
  style: string
  bio: string
  portrait: string
  workImage: string
  discipline: Discipline
}

export const artists: Artist[] = [
  {
    id: "elena-marchetti",
    name: "Elena Marchetti",
    specialty: "Fine Line & Botanical",
    style: "Delicate, organic, illustrative",
    bio: "I draw the way roots grow — searching for the path of least resistance. My work lives in the space between a sketch and a scar, where the line is just barely enough to hold the form. Every piece begins on paper and ends as something you carry for life.",
    portrait: "/artist-1.webp",
    workImage: "/portfolio-1.webp",
    discipline: "tattoo",
  },
  {
    id: "marco-silvestri",
    name: "Marco Silvestri",
    specialty: "Blackwork & Geometry",
    style: "Bold, structural, precise",
    bio: "Geometry is the language I think in. Symmetry, weight, negative space — these are not choices but laws. I build tattoos the way an architect builds: from the bones outward. What looks simple took the longest to arrive at.",
    portrait: "/artist-2.webp",
    workImage: "/portfolio-2.webp",
    discipline: "tattoo",
  },
  {
    id: "sofia-conti",
    name: "Sofia Conti",
    specialty: "Piercing & Curation",
    style: "Considered, curated, refined",
    bio: "A piercing is a tiny act of architecture on the body. I approach each placement as a composition — balancing anatomy, metal, and light. The jewelry is not an accessory; it is the point. Precision is not optional.",
    portrait: "/artist-3.webp",
    workImage: "/portfolio-3.webp",
    discipline: "piercing",
  },
  {
    id: "davide-russo",
    name: "Davide Russo",
    specialty: "Realism & Custom",
    style: "Painterly, detailed, narrative",
    bio: "I translate photographs into skin. Light, shadow, texture — the same tools a painter uses, only permanent. My custom work is a conversation that can take months. I will not rush what you will wear forever.",
    portrait: "/artist-4.webp",
    workImage: "/portfolio-4.webp",
    discipline: "tattoo",
  },
]

export type TattooStyle = {
  id: string
  name: string
  description: string
  image: string
}

export const tattooStyles: TattooStyle[] = [
  {
    id: "fine-line",
    name: "Fine Line",
    description: "Single-needle delicacy. The line is the entire statement.",
    image: "/tattoo-fineline.webp",
  },
  {
    id: "blackwork",
    name: "Blackwork",
    description: "Solid black fields and bold contrast. Structure as art.",
    image: "/tattoo-blackwork.webp",
  },
  {
    id: "realism",
    name: "Realism",
    description: "Photographic depth in black and grey. Light made permanent.",
    image: "/tattoo-realism.webp",
  },
  {
    id: "japanese",
    name: "Japanese",
    description: "Traditional irezumi. Flowing composition, bold saturation.",
    image: "/tattoo-japanese.webp",
  },
  {
    id: "geometric",
    name: "Geometric",
    description: "Sacred symmetry. Precision as a visual language.",
    image: "/geometric-tattoo.webp",
  },
  {
    id: "illustrative",
    name: "Illustrative",
    description: "Painterly drawing on skin. Story over symbol.",
    image: "/illustrative-tattoo.webp",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "One line. One mark. Nothing wasted.",
    image: "/minimal-tattoo.webp",
  },
  {
    id: "custom",
    name: "Custom",
    description: "Bespoke composition. No two pieces alike.",
    image: "/custom-tattoo.webp",
  },
]

export type PiercingPlacement = {
  id: string
  name: string
  description: string
  healingWeeks: string
}

export const piercingPlacements: PiercingPlacement[] = [
  { id: "lobe", name: "Lobe", description: "The classic. Lower ear, versatile jewelry.", healingWeeks: "6—8" },
  { id: "helix", name: "Helix", description: "Upper cartilage rim. A statement of edge.", healingWeeks: "6—12" },
  { id: "tragus", name: "Tragus", description: "Small flap near the canal. Subtle and sharp.", healingWeeks: "8—16" },
  { id: "conch", name: "Conch", description: "Inner cartilage bowl. Bold and architectural.", healingWeeks: "6—12" },
  { id: "daith", name: "Daith", description: "Innermost fold. Intricate and intimate.", healingWeeks: "6—12" },
  { id: "rook", name: "Rook", description: "Upper inner fold. Distinct and deliberate.", healingWeeks: "6—12" },
  { id: "nostril", name: "Nostril", description: "The nose as canvas. Elegant and expressive.", healingWeeks: "8—16" },
  { id: "septum", name: "Septum", description: "Center column. Bold, reversible, precise.", healingWeeks: "6—8" },
]

export type JewelryMaterial = {
  id: string
  name: string
  description: string
  image: string
}

export const jewelryMaterials: JewelryMaterial[] = [
  {
    id: "titanium",
    name: "Implant-Grade Titanium",
    description: "ASTM F-136. Hypoallergenic, lightweight, matte or polished. The standard for initial piercings.",
    image: "/titanium-jewelry.webp",
  },
  {
    id: "gold",
    name: "18k Solid Gold",
    description: "Warm, biocompatible, enduring. For healed piercings and lifetime wear.",
    image: "/gold-jewelry.webp",
  },
  {
    id: "steel",
    name: "Surgical Steel",
    description: "ASTM F-138. Durable and accessible. For healed piercings and everyday wear.",
    image: "/piercing-jewelry-macro.webp",
  },
  {
    id: "niobium",
    name: "Niobium",
    description: "Anodizable, reactive, vivid. For color without coating. A specialist material.",
    image: "/piercing-ear-curation.webp",
  },
]

export type AftercareItem = {
  id: string
  title: string
  content: string
}

export const aftercare: AftercareItem[] = [
  {
    id: "clean",
    title: "Cleaning",
    content: "Twice daily with sterile saline. No alcohol, no ointments, no over-cleaning. Hands washed before any contact.",
  },
  {
    id: "sleep",
    title: "Sleeping",
    content: "Avoid pressure on the piercing for the first two weeks. Use a travel pillow for ear piercings to relieve contact.",
  },
  {
    id: "water",
    title: "Water",
    content: "No pools, hot tubs, lakes, or oceans for the full healing period. Showers are fine. Submersion is not.",
  },
  {
    id: "jewelry",
    title: "Jewelry Changes",
    content: "Initial jewelry stays for the full healing period. We perform all changes in-studio to ensure sterility and fit.",
  },
  {
    id: "signs",
    title: "Signs of Healing",
    content: "Mild swelling, redness, and secretion are normal for the first weeks. Sharp pain, heat, or spreading redness is not — contact us immediately.",
  },
]

export type PortfolioWork = {
  id: string
  title: string
  artist: string
  style: string
  placement: string
  year: string
  image: string
  discipline: Discipline
}

export const portfolio: PortfolioWork[] = [
  {
    id: "w1",
    title: "Botanical Wrist",
    artist: "Elena Marchetti",
    style: "Fine Line",
    placement: "Inner Wrist",
    year: "2025",
    image: "/portfolio-1.webp",
    discipline: "tattoo",
  },
  {
    id: "w2",
    title: "Sacred Geometry",
    artist: "Marco Silvestri",
    style: "Blackwork",
    placement: "Forearm",
    year: "2025",
    image: "/portfolio-2.webp",
    discipline: "tattoo",
  },
  {
    id: "w3",
    title: "Gold Nostril",
    artist: "Sofia Conti",
    style: "Piercing",
    placement: "Nostril",
    year: "2025",
    image: "/portfolio-3.webp",
    discipline: "piercing",
  },
  {
    id: "w4",
    title: "Animal Portrait",
    artist: "Davide Russo",
    style: "Realism",
    placement: "Shoulder",
    year: "2024",
    image: "/portfolio-4.webp",
    discipline: "tattoo",
  },
  {
    id: "w5",
    title: "Ear Constellation",
    artist: "Sofia Conti",
    style: "Piercing Curation",
    placement: "Multi-Ear",
    year: "2025",
    image: "/portfolio-5.webp",
    discipline: "piercing",
  },
  {
    id: "w6",
    title: "Irezumi Sleeve",
    artist: "Davide Russo",
    style: "Japanese",
    placement: "Full Arm",
    year: "2024",
    image: "/portfolio-6.webp",
    discipline: "tattoo",
  },
]

export type StudioFeature = {
  id: string
  title: string
  description: string
  image: string
}

export const studioFeatures: StudioFeature[] = [
  {
    id: "space",
    title: "The Space",
    description: "A converted 19th-century print house in Brera. Concrete, oak, and north light. Private rooms for every appointment.",
    image: "/studio-interior.webp",
  },
  {
    id: "tools",
    title: "The Tools",
    description: "Single-use needles. Autoclave-sterilized equipment. Medical-grade surfaces. No compromises, ever.",
    image: "/studio-tools.webp",
  },
  {
    id: "rooms",
    title: "The Rooms",
    description: "Each artist works from a dedicated space. Piercing takes place in a separate sterile suite. Your privacy is the architecture.",
    image: "/studio-space.webp",
  },
]

export type BookingStep = {
  id: string
  label: string
}

export const tattooBookingSteps: BookingStep[] = [
  { id: "artist", label: "Artist" },
  { id: "style", label: "Style" },
  { id: "placement", label: "Placement" },
  { id: "size", label: "Size" },
  { id: "reference", label: "Reference" },
  { id: "description", label: "Description" },
  { id: "date", label: "Date" },
  { id: "contact", label: "Contact" },
]

export const piercingBookingSteps: BookingStep[] = [
  { id: "type", label: "Type" },
  { id: "placement", label: "Placement" },
  { id: "jewelry", label: "Jewelry" },
  { id: "material", label: "Material" },
  { id: "date", label: "Date" },
  { id: "contact", label: "Contact" },
]
