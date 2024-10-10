import { expect, test } from "vitest";
import { getCurrencyDisplay } from "./money";

test("Format USD in en-US", () => {
  const money = "1.23";
  const code = "USD";
  const locale = "en-US";
  const opts = { compact: false, isDebt: false };
  expect(getCurrencyDisplay(money, code, locale, opts)).toBe("$1.23");
});

test("Format USD in en-CA", () => {
  const money = "1.23";
  const code = "USD";
  const locale = "en-CA";
  const opts = { compact: false, isDebt: false };
  expect(getCurrencyDisplay(money, code, locale, opts)).toBe("US$1.23");
});

test("Format CAD in en-US", () => {
  const money = "1.23";
  const code = "CAD";
  const locale = "en-US";
  const opts = { compact: false, isDebt: false };
  expect(getCurrencyDisplay(money, code, locale, opts)).toBe("CA$1.23");
});

test("The isDebt opt should invert", () => {
  const money = "1.23";
  const code = "CAD";
  const locale = "en-US";
  const opts = { compact: false, isDebt: true };
  expect(getCurrencyDisplay(money, code, locale, opts)).toBe("-CA$1.23");
});

test("Compact format CAD", () => {
  const money = "69000.42";
  const code = "CAD";
  const locale = "en-CA";
  const opts = { compact: true, isDebt: true };
  expect(getCurrencyDisplay(money, code, locale, opts)).toBe("-$69K");
});
