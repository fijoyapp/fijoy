export const CURRENCIES = Intl.supportedValuesOf("currency");

export function currencyCodeToName(code: string): string {
  const name = new Intl.DisplayNames([navigator.language], {
    type: "currency",
  }).of(code);

  if (!name) {
    return "Unknown currency code";
  }
  return name;
}
