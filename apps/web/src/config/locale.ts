import { ok, err } from "neverthrow";

export function getUserLocales() {
  return navigator.languages;
}

const languageNames = new Intl.DisplayNames([navigator.language], {
  type: "language",
});

export function localeCodeToName(localeCode: string) {
  const name = languageNames.of(localeCode);
  if (!name) {
    return err(`Invalid locale code: ${localeCode}`);
  }

  return ok(name);
}
