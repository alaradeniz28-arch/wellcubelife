import { describe, it, expect } from "vitest";
import { buildPackage, CATALOGUE, GOALS, type Answers } from "@/lib/wellcube";

const base: Answers = {
  goal: "weight", secondary: null, age: "45-59", sex: "female", flags: [],
  approach: "balanced", openness: ["aesthetics", "injectables"], duration: "fortnight",
};
const ids = (a: Answers) => buildPackage(a).items.map((i) => i.service.id);

describe("Wellcube package engine", () => {
  it("female 45 weight loss combines Ayurveda, aesthetics, nutrition and assessment", () => {
    const p = ids(base);
    expect(p).toEqual(expect.arrayContaining(["abhyanga", "aes_core", "dietitian", "bca"]));
  });

  it("peptides are flagged as a catalogue gap, never recommended", () => {
    const pkg = buildPackage(base);
    expect(pkg.gaps.map((g) => g.title)).toContain("Peptide therapy");
    expect(pkg.items.some((i) => /peptide/i.test(i.service.name))).toBe(false);
  });

  it("pregnancy removes HBOT, colon hydrotherapy, aesthetics and abhyanga", () => {
    for (const goal of Object.keys(GOALS) as Answers["goal"][]) {
      const p = ids({ ...base, goal, flags: ["pregnant"] });
      for (const banned of ["hbot", "colon", "aes_core", "aes_body", "aes_skin", "abhyanga", "contrast"]) {
        expect(p).not.toContain(banned);
      }
    }
  });

  it("heart condition removes cold plunge contrast circuit and HBOT", () => {
    const p = ids({ ...base, goal: "performance", flags: ["cardio"] });
    expect(p).not.toContain("contrast");
    expect(p).not.toContain("hbot");
  });

  it("opting out of aesthetics removes all aesthetic treatments", () => {
    const p = buildPackage({ ...base, goal: "skin", openness: [] });
    expect(p.items.some((i) => i.service.aesthetic)).toBe(false);
  });

  it("every protocol candidate exists in the catalogue", () => {
    for (const g of Object.values(GOALS)) for (const s of g.slots) for (const id of s.candidates) expect(CATALOGUE[id]).toBeDefined();
  });

  it("clinical services always come with a medical consultation", () => {
    const p = ids({ ...base, age: "30-44" });
    expect(p).toContain("medcons");
  });
});
