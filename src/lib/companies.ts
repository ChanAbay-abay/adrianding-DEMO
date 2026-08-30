/**
 * Companies Adrian Ding / Maximum Impact PH have trained, for the "Companies
 * Served" marquee (landing + corporate-training pages).
 *
 * Logos are the cleaned set in `public/images/` (prefix `co-`). Categories are a
 * best-guess grouping of the supplied logos into the PRD's buckets.
 * TODO: confirm the exact category split + full client list with the client.
 */

export type CompanyLogo = {
  name: string
  /** Path under /public. */
  src: string
}

export type CompanyGroup = {
  category: string
  logos: CompanyLogo[]
}

export const COMPANY_GROUPS: CompanyGroup[] = [
  {
    category: "Multinationals",
    logos: [
      { name: "HSBC", src: "/images/co-hsbc.svg" },
      { name: "Wipro", src: "/images/co-wipro.svg" },
      { name: "Nestlé", src: "/images/co-nestle.svg" },
      { name: "Unilever", src: "/images/co-unilever.svg" },
      { name: "Mercedes-Benz", src: "/images/co-mercedes-benz.svg" },
      { name: "Toyota", src: "/images/co-toyota.svg" },
      { name: "adidas", src: "/images/co-adidas.svg" },
      { name: "GSK", src: "/images/co-gsk.png" },
      { name: "Kohler", src: "/images/co-kohler.svg" },
      { name: "NTT", src: "/images/co-ntt.svg" },
      { name: "Optum", src: "/images/co-optum.svg" },
      { name: "Timex", src: "/images/co-timex.svg" },
      { name: "Yara", src: "/images/co-yara.svg" },
    ],
  },
  {
    category: "Industrial & Manufacturing",
    logos: [
      { name: "Bombardier", src: "/images/co-bombardier.svg" },
      { name: "Alstom", src: "/images/co-alstom.svg" },
      { name: "Autoliv", src: "/images/co-autoliv.svg" },
      { name: "Lear", src: "/images/co-lear.svg" },
      { name: "Teradyne", src: "/images/co-teradyne.svg" },
      { name: "bioMérieux", src: "/images/co-biomerieux.svg" },
      { name: "Tsuneishi", src: "/images/co-tsuneishi.svg" },
      { name: "NKC", src: "/images/co-nkc.svg" },
    ],
  },
  {
    category: "Banking & Finance",
    logos: [
      { name: "Global Payments", src: "/images/co-global-payments.svg" },
      { name: "Worldpay", src: "/images/co-worldpay.svg" },
      { name: "Global Pacific", src: "/images/co-global-pacific.png" },
    ],
  },
  {
    category: "Energy & Infrastructure",
    logos: [
      { name: "AboitizPower", src: "/images/co-aboitizpower.svg" },
      { name: "Petron", src: "/images/co-petron.svg" },
      { name: "Energy Development Corp", src: "/images/co-edc.png" },
      { name: "Vivant", src: "/images/co-vivant.svg" },
      { name: "PLDT", src: "/images/co-pldt.svg" },
      {
        name: "Mactan-Cebu Int'l Airport",
        src: "/images/co-mactan-cebu-airport.svg",
      },
    ],
  },
  {
    category: "Retail & Pharma",
    logos: [
      { name: "Jollibee", src: "/images/co-jollibee.svg" },
      { name: "Metro Retail", src: "/images/co-metro-retail.svg" },
      { name: "Rose Pharmacy", src: "/images/co-rose-pharmacy.png" },
      { name: "Southstar Drug", src: "/images/co-southstar-drug.png" },
      { name: "The Generics Pharmacy", src: "/images/co-tgp.png" },
      { name: "Unilab", src: "/images/co-unilab.svg" },
    ],
  },
  {
    category: "Healthcare",
    logos: [
      { name: "Chong Hua Hospital", src: "/images/co-chong-hua.jpg" },
      { name: "Cebu Orthopedic", src: "/images/co-cebu-orthopedic.png" },
      { name: "Hi-Precision Diagnostics", src: "/images/co-hi-precision.png" },
      { name: "IPI", src: "/images/co-ipi.png" },
    ],
  },
  {
    category: "SMEs & Family Businesses",
    logos: [
      { name: "BSA Solutions", src: "/images/co-bsa-solutions.jpg" },
      { name: "KMC Solutions", src: "/images/co-kmc-solutions.png" },
      { name: "Athena", src: "/images/co-athena.svg" },
      { name: "RISE", src: "/images/co-rise.svg" },
    ],
  },
]

/** Flat list, handy for a single continuous marquee row. */
export const ALL_COMPANIES: CompanyLogo[] = COMPANY_GROUPS.flatMap(
  (g) => g.logos
)
