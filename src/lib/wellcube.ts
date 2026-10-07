/**
 * Wellcube package engine.
 * Catalogue entries are taken from wellcube.life pillar pages (Oct 2026).
 * Packages are built from advisor-style protocol templates, then filtered by
 * safety flags and preferences. Nothing outside CATALOGUE is ever recommended.
 */

export type Goal =
  | "weight" | "stress" | "sleep" | "pain" | "gut" | "skin" | "performance" | "longevity";
export type Flag = "pregnant" | "cardio" | "injury";
export type Approach = "ancient" | "modern" | "balanced";
export type Openness = "aesthetics" | "injectables";
export type Duration = "day" | "week" | "fortnight" | "transform" | "local";
export type Stage = "Discover" | "Heal" | "Nourish" | "Move" | "Restore";

export interface Answers {
  goal: Goal;
  secondary: Goal | null;
  age: "18-29" | "30-44" | "45-59" | "60+";
  sex: "female" | "male" | "na";
  flags: Flag[];
  approach: Approach;
  openness: Openness[];
  duration: Duration;
}

export interface Service {
  id: string;
  name: string;
  pillar: string;
  path: string; // wellcube.life page
  stage: Stage;
  tradition: "ancient" | "modern";
  clinical?: boolean; // requires doctor/specialist consultation first
  aesthetic?: boolean;
  avoid?: Flag[];
}

const S = (s: Service) => s;
export const CATALOGUE: Record<string, Service> = Object.fromEntries(
  [
    S({ id: "medcons", name: "Comprehensive Medical Consultation", pillar: "WellHeal", path: "/programmes", stage: "Discover", tradition: "modern", clinical: true }),
    S({ id: "genomics", name: "Genomics Precision Panels", pillar: "Genomics", path: "/genomics", stage: "Discover", tradition: "modern" }),
    S({ id: "bca", name: "Precision Body Composition Analysis", pillar: "Nutrition Science", path: "/nutrition-science", stage: "Discover", tradition: "modern" }),
    S({ id: "biowell", name: "Bio-Well Scan & Ayurvedic Consultation", pillar: "Ancient Eastern Wisdom", path: "/ancient-eastern-wisdom", stage: "Discover", tradition: "ancient" }),
    S({ id: "cognitome", name: "Cognitome Diagnostic Mapping", pillar: "Master Your Mind", path: "/master-your-mind", stage: "Discover", tradition: "modern" }),
    S({ id: "posture", name: "360° Movement & Ergonomic Diagnostics", pillar: "Posture & Mobility", path: "/posture-mobility", stage: "Discover", tradition: "modern" }),

    S({ id: "dietitian", name: "1-on-1 Dietitian Plan", pillar: "Nutrition Science", path: "/nutrition-science", stage: "Nourish", tradition: "modern" }),
    S({ id: "wellfood", name: "WellFood Nutrigenomic Dining", pillar: "WellFood", path: "/wellfood", stage: "Nourish", tradition: "modern" }),
    S({ id: "colon", name: "Signature Colon Hydrotherapy", pillar: "Gut & Metabolic", path: "/gut-metabolic", stage: "Heal", tradition: "modern", avoid: ["pregnant", "cardio", "injury"] }),
    S({ id: "iv", name: "IV Nutrient Support", pillar: "WellHeal", path: "/programmes", stage: "Heal", tradition: "modern", clinical: true, avoid: ["pregnant"] }),

    S({ id: "abhyanga", name: "Abhyangam Warm-Oil Massage", pillar: "Ancient Eastern Wisdom", path: "/ancient-eastern-wisdom", stage: "Heal", tradition: "ancient", avoid: ["pregnant"] }),
    S({ id: "shirodhara", name: "Shirodhara", pillar: "Ancient Eastern Wisdom", path: "/ancient-eastern-wisdom", stage: "Heal", tradition: "ancient" }),
    S({ id: "kadeevasti", name: "Kadeevasti Lower-Back Therapy", pillar: "Ancient Eastern Wisdom", path: "/ancient-eastern-wisdom", stage: "Heal", tradition: "ancient", avoid: ["pregnant"] }),
    S({ id: "januvasti", name: "Januvasti Knee Therapy", pillar: "Ancient Eastern Wisdom", path: "/ancient-eastern-wisdom", stage: "Heal", tradition: "ancient" }),
    S({ id: "pinda", name: "Choorna Pinda Sweda", pillar: "Ancient Eastern Wisdom", path: "/ancient-eastern-wisdom", stage: "Heal", tradition: "ancient", avoid: ["pregnant", "cardio"] }),
    S({ id: "acupuncture", name: "Acupuncture", pillar: "Ancient Eastern Wisdom", path: "/ancient-eastern-wisdom", stage: "Heal", tradition: "ancient", clinical: true, avoid: ["pregnant"] }),
    S({ id: "cupping", name: "Cupping Therapy", pillar: "Ancient Eastern Wisdom", path: "/ancient-eastern-wisdom", stage: "Heal", tradition: "ancient", avoid: ["pregnant"] }),
    S({ id: "physio", name: "Physiotherapy & Tension Release", pillar: "Posture & Mobility", path: "/posture-mobility", stage: "Heal", tradition: "modern", clinical: true }),
    S({ id: "chiro", name: "Chiropractic Joint Alignment", pillar: "Posture & Mobility", path: "/posture-mobility", stage: "Heal", tradition: "modern", clinical: true, avoid: ["pregnant", "injury"] }),

    S({ id: "aes_core", name: "Core & Metabolic Aesthetics", pillar: "Advanced Aesthetics", path: "/advanced-aesthetics", stage: "Heal", tradition: "modern", clinical: true, aesthetic: true, avoid: ["pregnant", "cardio"] }),
    S({ id: "aes_body", name: "Body Sculpt Aesthetics", pillar: "Advanced Aesthetics", path: "/advanced-aesthetics", stage: "Heal", tradition: "modern", clinical: true, aesthetic: true, avoid: ["pregnant", "cardio"] }),
    S({ id: "aes_skin", name: "Skin & Radiance Aesthetics", pillar: "Advanced Aesthetics", path: "/advanced-aesthetics", stage: "Heal", tradition: "modern", clinical: true, aesthetic: true, avoid: ["pregnant"] }),
    S({ id: "aes_face", name: "Face & Neck Lift Aesthetics", pillar: "Advanced Aesthetics", path: "/advanced-aesthetics", stage: "Heal", tradition: "modern", clinical: true, aesthetic: true, avoid: ["pregnant"] }),

    S({ id: "neurofit", name: "NeuroFit™ Gym Training", pillar: "Movement Hub", path: "/movement-hub", stage: "Move", tradition: "modern", avoid: ["injury"] }),
    S({ id: "pilates", name: "Reformer Pilates", pillar: "Movement Hub", path: "/movement-hub", stage: "Move", tradition: "modern" }),
    S({ id: "yoga", name: "Mindful Yoga (small group)", pillar: "Movement Hub", path: "/movement-hub", stage: "Move", tradition: "ancient" }),
    S({ id: "aqua", name: "Aqua Yoga", pillar: "Movement Hub", path: "/movement-hub", stage: "Move", tradition: "ancient" }),
    S({ id: "boxing", name: "Outdoor Boxing", pillar: "Movement Hub", path: "/movement-hub", stage: "Move", tradition: "modern", avoid: ["pregnant", "cardio", "injury"] }),

    S({ id: "hbot", name: "Hyperbaric Oxygen Therapy", pillar: "Biohacking & Longevity", path: "/biohacking-longevity", stage: "Restore", tradition: "modern", clinical: true, avoid: ["pregnant", "cardio"] }),
    S({ id: "redlight", name: "Red Light Therapy", pillar: "Biohacking & Longevity", path: "/biohacking-longevity", stage: "Restore", tradition: "modern", avoid: ["pregnant"] }),
    S({ id: "mlxi", name: "Triple Detox MLXi Dome", pillar: "Biohacking & Longevity", path: "/biohacking-longevity", stage: "Restore", tradition: "modern", avoid: ["pregnant", "cardio"] }),
    S({ id: "contrast", name: "Contrast Therapy Circuit", pillar: "Biohacking & Longevity", path: "/biohacking-longevity", stage: "Restore", tradition: "modern", avoid: ["pregnant", "cardio"] }),
    S({ id: "vibro", name: "Binaural Vibroacoustic Therapy", pillar: "Biohacking & Longevity", path: "/biohacking-longevity", stage: "Restore", tradition: "modern" }),
    S({ id: "biocharger", name: "The BioCharger", pillar: "Biohacking & Longevity", path: "/biohacking-longevity", stage: "Restore", tradition: "modern", avoid: ["pregnant"] }),
    S({ id: "psammo", name: "Psammotherapy Sand Bed", pillar: "Biohacking & Longevity", path: "/biohacking-longevity", stage: "Restore", tradition: "modern", avoid: ["pregnant", "injury"] }),
    S({ id: "dryhydro", name: "Dry Hydrotherapy", pillar: "Biohacking & Longevity", path: "/biohacking-longevity", stage: "Restore", tradition: "modern" }),
    S({ id: "breath", name: "Breathwork & Nervous System Regulation", pillar: "Mind & Spirit", path: "/mind-spirit", stage: "Restore", tradition: "ancient" }),
    S({ id: "sound", name: "Sound Healing", pillar: "Mind & Spirit", path: "/mind-spirit", stage: "Restore", tradition: "ancient" }),
    S({ id: "chakra", name: "Chakra Dome Healing", pillar: "Mind & Spirit", path: "/mind-spirit", stage: "Restore", tradition: "ancient" }),
    S({ id: "sports", name: "Sports Massage", pillar: "Spa & Salon", path: "/spa-salon", stage: "Restore", tradition: "modern" }),
    S({ id: "deeptissue", name: "Deep Tissue Massage", pillar: "Spa & Salon", path: "/spa-salon", stage: "Restore", tradition: "modern", avoid: ["pregnant"] }),
    S({ id: "antenatal", name: "Antenatal Soothing Massage", pillar: "Spa & Salon", path: "/spa-salon", stage: "Restore", tradition: "modern" }),
    S({ id: "aroma", name: "Aromatherapy Massage", pillar: "Spa & Salon", path: "/spa-salon", stage: "Restore", tradition: "modern", avoid: ["pregnant"] }),
  ].map((s) => [s.id, s]),
);

/** Protocol slot: ordered candidates (best first) plus advisor rationale. */
interface Slot { candidates: string[]; why: string }

export const GOALS: Record<Goal, { label: string; hint: string; slots: Slot[] }> = {
  weight: {
    label: "Weight & metabolism", hint: "Body composition, energy, metabolic health",
    slots: [
      { candidates: ["bca"], why: "Establishes a fat, muscle and water baseline so progress is measured, not guessed." },
      { candidates: ["dietitian", "wellfood"], why: "A personalised meal plan built from your body-composition data." },
      { candidates: ["neurofit", "pilates", "aqua"], why: "Structured training to preserve muscle while body fat reduces." },
      { candidates: ["abhyanga", "mlxi", "redlight"], why: "Supports circulation and lymphatic flow alongside dietary change." },
      { candidates: ["aes_core", "aes_body"], why: "Non-invasive body contouring that complements, never replaces, lifestyle change." },
    ],
  },
  stress: {
    label: "Stress & burnout", hint: "Calm, resilience, mental load",
    slots: [
      { candidates: ["cognitome", "biowell"], why: "Maps how your nervous system responds to stress." },
      { candidates: ["shirodhara", "aroma", "antenatal"], why: "A classic calming therapy for an overactive nervous system." },
      { candidates: ["breath", "sound"], why: "Teaches regulation skills you can use after your stay." },
      { candidates: ["vibro", "chakra"], why: "Low-frequency sound to help the body downshift into rest." },
      { candidates: ["yoga", "aqua"], why: "Gentle, mindful movement that lowers stress load." },
    ],
  },
  sleep: {
    label: "Sleep & recovery", hint: "Deeper, more restorative rest",
    slots: [
      { candidates: ["cognitome", "medcons"], why: "Looks at the recovery and stress patterns behind poor sleep." },
      { candidates: ["shirodhara", "antenatal"], why: "Deeply calming in the evening; traditionally used for restless sleep." },
      { candidates: ["vibro", "sound"], why: "Sound vibration that supports a shift toward slower brainwaves." },
      { candidates: ["breath"], why: "A wind-down breathing routine you take home." },
      { candidates: ["yoga", "aqua"], why: "Restorative movement that eases physical tension before bed." },
    ],
  },
  pain: {
    label: "Pain & mobility", hint: "Back, joints, posture, injury recovery",
    slots: [
      { candidates: ["posture"], why: "Finds the root cause in how you move, sit and load your joints." },
      { candidates: ["physio", "chiro"], why: "Hands-on, clinician-led treatment for the specific problem area." },
      { candidates: ["kadeevasti", "januvasti", "pinda"], why: "Targeted Ayurvedic oil therapies for back and joint comfort." },
      { candidates: ["pilates", "aqua", "yoga"], why: "Controlled movement to rebuild core strength and range of motion." },
      { candidates: ["dryhydro", "psammo", "sports"], why: "Releases deep muscle tension without loading the joints." },
    ],
  },
  gut: {
    label: "Gut health & detox", hint: "Digestion, bloating, reset",
    slots: [
      { candidates: ["genomics", "medcons"], why: "Shows how your body handles nutrients, sensitivities and detox pathways." },
      { candidates: ["colon"], why: "Wellcube's signature gut reset, paired with nutrition guidance." },
      { candidates: ["dietitian", "wellfood"], why: "Anti-inflammatory nutrition to keep the gut settled long-term." },
      { candidates: ["abhyanga", "mlxi"], why: "Supports circulation and the body's natural elimination." },
      { candidates: ["yoga", "aqua"], why: "Gentle movement that supports digestion." },
    ],
  },
  skin: {
    label: "Skin & healthy ageing", hint: "Glow, firmness, radiance",
    slots: [
      { candidates: ["genomics", "medcons"], why: "Looks at collagen, antioxidant and nutrient absorption factors." },
      { candidates: ["aes_skin", "aes_face"], why: "Non-invasive collagen-boosting treatment for texture and radiance." },
      { candidates: ["redlight"], why: "Light wavelengths that support collagen and tissue recovery." },
      { candidates: ["dietitian", "wellfood"], why: "Skin health starts with nutrition and gut health." },
      { candidates: ["abhyanga", "aroma", "antenatal"], why: "Nourishing bodywork for skin and stress, which shows on the face." },
    ],
  },
  performance: {
    label: "Performance & focus", hint: "Mental clarity, fitness, drive",
    slots: [
      { candidates: ["cognitome"], why: "Live neuro-mapping to build your focus and recovery plan." },
      { candidates: ["neurofit", "pilates", "yoga"], why: "Neurocognitive training that challenges body and brain together." },
      { candidates: ["hbot", "biocharger"], why: "Recovery and energy support between training blocks." },
      { candidates: ["contrast", "dryhydro", "sports"], why: "Hot and cold recovery to cut soreness and lift mood." },
      { candidates: ["bca", "dietitian"], why: "Fuelling matched to your body composition and training load." },
    ],
  },
  longevity: {
    label: "Longevity check-up", hint: "Proactive health, prevention",
    slots: [
      { candidates: ["medcons"], why: "Clinical baseline and doctor oversight for the whole plan." },
      { candidates: ["genomics"], why: "Eight precision panels for a lifelong biological baseline." },
      { candidates: ["bca"], why: "Muscle mass and body composition, key markers as we age." },
      { candidates: ["hbot", "redlight"], why: "Cellular recovery therapies from the longevity floor." },
      { candidates: ["pilates", "yoga", "aqua"], why: "Strength, balance and mobility to stay independent for longer." },
    ],
  },
};

/** Things visitors may expect that are NOT in the current catalogue. */
export interface Gap { title: string; detail: string }

export const PROGRAMMES: Record<Duration, { name: string; detail: string; path: string }> = {
  day: { name: "Day Pass / Designed Experience", detail: "A half- or full-day taster combining facilities with selected treatments.", path: "/day-pass" },
  week: { name: "Reset · under 7 days", detail: "Medical consultation, daily Ayurvedic therapies, tech-led treatments and training.", path: "/programmes" },
  fortnight: { name: "Restore · 7–14 days", detail: "Adds a personalised nutrition plan and regular follow-ups.", path: "/programmes" },
  transform: { name: "The Wellcube Transform · 14–21+ days", detail: "Genomic profiling, 360 health assessment and a 3-month post-stay programme.", path: "/programmes" },
  local: { name: "Ongoing sessions in Dubai", detail: "Weekly sessions with your advisor reviewing progress over time.", path: "/stay-your-way" },
};

export interface PackageItem { service: Service; why: string; goal: Goal }
export interface Package {
  items: PackageItem[];
  gaps: Gap[];
  safetyNotes: string[];
  programme: (typeof PROGRAMMES)[Duration];
  requiresDoctor: boolean;
  eligible: boolean;
}

function allowed(s: Service, a: Answers): boolean {
  if (s.avoid?.some((f) => a.flags.includes(f))) return false;
  if (s.aesthetic && !a.openness.includes("aesthetics")) return false;
  if (s.id === "iv" && !a.openness.includes("injectables")) return false;
  if (s.id === "antenatal" && !a.flags.includes("pregnant")) return false;
  return true;
}

function pick(slot: Slot, a: Answers, used: Set<string>): Service | null {
  const pool = slot.candidates.map((id) => CATALOGUE[id]).filter((s) => s && allowed(s, a) && !used.has(s.id));
  if (!pool.length) return null;
  if (a.approach === "balanced") return pool[0];
  return pool.find((s) => s.tradition === a.approach) ?? pool[0];
}

export function buildPackage(a: Answers): Package {
  const programme = PROGRAMMES[a.duration];
  const gaps: Gap[] = [];
  const safetyNotes: string[] = [];
  const used = new Set<string>();
  const items: PackageItem[] = [];

  const goals: Goal[] = [a.goal, ...(a.secondary && a.secondary !== a.goal ? [a.secondary] : [])];
  const perGoal = goals.length > 1 ? [5, 2] : [5];
  const max = a.duration === "day" ? 4 : 7;

  goals.forEach((g, gi) => {
    let added = 0;
    for (const slot of GOALS[g].slots) {
      if (added >= perGoal[gi] || items.length >= max) break;
      const s = pick(slot, a, used);
      if (s) {
        used.add(s.id);
        items.push({ service: s, why: slot.why, goal: g });
        added++;
      } else if (gi === 0 && slot.candidates.some((id) => CATALOGUE[id].aesthetic) && !a.openness.includes("aesthetics")) {
        // user opted out — not a gap
      } else if (gi === 0) {
        safetyNotes.push(`One part of the usual ${GOALS[g].label.toLowerCase()} protocol was left out for safety. Your advisor will suggest a suitable alternative.`);
      }
    }
  });

  // Holistic modifiers an advisor would add
  if (["45-59", "60+"].includes(a.age) && !used.has("medcons") && !used.has("genomics") && a.duration !== "day") {
    items.unshift({ service: CATALOGUE.medcons, why: "Recommended for all guests 45+ before an integrative programme.", goal: a.goal });
    used.add("medcons");
  }
  if (a.openness.includes("injectables") && ["weight", "gut", "performance", "longevity", "skin"].includes(a.goal) && allowed(CATALOGUE.iv, a) && a.duration !== "day") {
    items.push({ service: CATALOGUE.iv, why: "IV support may be considered after a doctor reviews your bloodwork.", goal: a.goal });
    used.add("iv");
  }

  // Explicit catalogue gaps
  if (a.openness.includes("injectables")) {
    gaps.push({
      title: "Peptide therapy",
      detail: "Peptide therapy is not on Wellcube's current published menu, so it isn't in your package. Ask your advisor if it's available or planned.",
    });
  }
  if (a.sex === "female" && ["45-59", "60+"].includes(a.age) && ["weight", "sleep", "skin", "longevity"].includes(a.goal)) {
    gaps.push({
      title: "Menopause & hormone care",
      detail: "There is no dedicated hormone therapy service on the current menu. Your consultation doctor can review hormonal factors and refer you if needed.",
    });
  }
  if (a.flags.includes("pregnant")) {
    safetyNotes.push("Because you're pregnant or breastfeeding, heat, cold, oxygen, detox and aesthetic treatments have been removed. Every session needs approval from your doctor.");
  }
  if (a.flags.includes("cardio")) {
    safetyNotes.push("Because of your heart or blood pressure condition, saunas, cold plunges, oxygen therapy and high-intensity sessions have been removed until a doctor clears you.");
  }
  if (a.flags.includes("injury")) {
    safetyNotes.push("Because of your recent surgery or injury, high-load training and spinal adjustments have been removed. Physiotherapy will guide your progression.");
  }

  const requiresDoctor = a.flags.length > 0 || items.some((i) => i.service.clinical);
  if (requiresDoctor && !used.has("medcons") && a.duration !== "day") {
    items.unshift({ service: CATALOGUE.medcons, why: "Clinical services in this package need a doctor's consultation first.", goal: a.goal });
  }

  return { items, gaps, safetyNotes: [...new Set(safetyNotes)], programme, requiresDoctor, eligible: true };
}

export const STAGE_ORDER: Stage[] = ["Discover", "Heal", "Nourish", "Move", "Restore"];
export const SITE = "https://wellcube.life";
export const CONCIERGE_WA = "971521150749";
