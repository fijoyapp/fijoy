import { expect, test } from "vitest";

import { getPrettyTime } from "./time";

test("Never", () => {
  expect(getPrettyTime(new Date(0))).toBe("Never");
});
