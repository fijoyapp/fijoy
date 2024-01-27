export const accountTypes = [
  "chequing",
  "savings",
  "credit",
  "investment",
  "loan",
  "mortgage",
  "other_asset",
  "other_debt",
] as const;

type AccountType = {
  isDebt: boolean;
  name: string;
  description: string;
};

export const accountTypeConfig: Record<
  (typeof accountTypes)[number],
  AccountType
> = {
  chequing: { isDebt: false, name: "Chequing", description: "Chequing" },
  savings: { isDebt: false, name: "Savings", description: "Savings" },
  credit: { isDebt: true, name: "Credit", description: "Credit" },
  investment: { isDebt: false, name: "Investment", description: "Investment" },
  loan: { isDebt: true, name: "Loan", description: "Loan" },
  mortgage: { isDebt: true, name: "Mortgage", description: "Mortgage" },
  other_asset: {
    isDebt: false,
    name: "Other Asset",
    description: "Other Asset",
  },
  other_debt: { isDebt: true, name: "Other Debt", description: "Other Debt" },
};

type Institution = {
  logo: string;
  name: string;
};

export const institutions = [
  "amex",
  "bmo",
  "canadiantire",
  "cibc",
  "desjardins",
  "eq",
  "laurentian",
  "mbna",
  "nationalbank",
  "pcfinancial",
  "questtrade",
  "rbc",
  "scotiabank",
  "simplii",
  "tangerine",
  "td",
  "wealthsimple",
] as const;

export const institutionConfig: Record<
  (typeof institutions)[number],
  Institution
> = {
  amex: { name: "American Express", logo: "/logos/amex.webp" },
  bmo: { name: "BMO", logo: "/logos/bmo.webp" },
  canadiantire: {
    name: "Canadian Tire",
    logo: "/logos/canadiantire.webp",
  },
  cibc: { name: "CIBC", logo: "/logos/cibc.webp" },
  desjardins: { name: "Desjardins", logo: "/logos/desjardins.webp" },
  eq: { name: "EQ Bank", logo: "/logos/eq.webp" },
  laurentian: { name: "Laurentian Bank", logo: "/logos/laurentian.webp" },
  mbna: { name: "MBNA", logo: "/logos/mbna.webp" },
  nationalbank: { name: "National Bank", logo: "/logos/nationalbank.webp" },
  pcfinancial: { name: "PC Financial", logo: "/logos/pcfinancial.webp" },
  questtrade: { name: "Questtrade", logo: "/logos/questtrade.webp" },
  rbc: { name: "RBC", logo: "/logos/rbc.webp" },
  scotiabank: { name: "Scotiabank", logo: "/logos/scotiabank.webp" },
  simplii: { name: "Simplii", logo: "/logos/simplii.webp" },
  tangerine: { name: "Tangerine", logo: "/logos/tangerine.webp" },
  td: { name: "TD", logo: "/logos/td.webp" },
  wealthsimple: { name: "Wealthsimple", logo: "/logos/wealthsimple.webp" },
} as const;
