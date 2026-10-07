import { describe, it, expect } from "vitest";
import { buildPackage } from "@/lib/wellcube";

const base = { goals: ["stress" as const], energy: 2, budget: "premium" as const, format: "both" as const, time: "3" as const };

describe("buildPackage", () => {
  it("online-only never includes in-person services", () => {
    expect(buildPackage({ ...base, format: "online" }).services.every((s) => s.online)).toBe(true);
  });
  it("light budget caps sessions at 800", () => {
    expect(buildPackage({ ...base, budget: "light" }).services.every((s) => s.price <= 800)).toBe(true);
  });
  it("3 hours/week gives 3 services", () => {
    expect(buildPackage(base).services).toHaveLength(3);
  });
  it("bundle discount is 15%", () => {
    const p = buildPackage(base);
    expect(p.discounted).toBe(Math.round(p.monthly * 0.85));
  });
});
