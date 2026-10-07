export type Goal = "stress" | "sleep" | "fitness" | "pain" | "beauty" | "nutrition";
export type Budget = "light" | "balanced" | "premium";
export type Format = "inperson" | "online" | "both";

export interface Answers {
  goals: Goal[];
  energy: number; // 1-5
  budget: Budget;
  format: Format;
  time: "1" | "3" | "5"; // hours per week
}

export interface Service {
  id: string;
  name: string;
  category: string;
  goals: Goal[];
  price: number; // TRY per session
  minutes: number;
  online: boolean;
  intensity: number; // 1 gentle - 5 intense
}

// Representative sample of the Wellcube catalog
export const SERVICES: Service[] = [
  { id: "s1", name: "Guided Breathwork", category: "Mind", goals: ["stress", "sleep"], price: 450, minutes: 45, online: true, intensity: 1 },
  { id: "s2", name: "Mindfulness Coaching", category: "Mind", goals: ["stress"], price: 700, minutes: 60, online: true, intensity: 1 },
  { id: "s3", name: "Sleep Specialist Consult", category: "Health", goals: ["sleep"], price: 1200, minutes: 50, online: true, intensity: 1 },
  { id: "s4", name: "Yin Yoga", category: "Movement", goals: ["sleep", "stress", "pain"], price: 400, minutes: 75, online: true, intensity: 2 },
  { id: "s5", name: "Vinyasa Flow", category: "Movement", goals: ["fitness", "stress"], price: 400, minutes: 60, online: true, intensity: 3 },
  { id: "s6", name: "Personal Training", category: "Movement", goals: ["fitness"], price: 1100, minutes: 60, online: false, intensity: 5 },
  { id: "s7", name: "Reformer Pilates", category: "Movement", goals: ["fitness", "pain"], price: 900, minutes: 50, online: false, intensity: 3 },
  { id: "s8", name: "HIIT Online Class", category: "Movement", goals: ["fitness"], price: 300, minutes: 30, online: true, intensity: 5 },
  { id: "s9", name: "Physiotherapy Session", category: "Health", goals: ["pain"], price: 1300, minutes: 45, online: false, intensity: 2 },
  { id: "s10", name: "Deep Tissue Massage", category: "Body", goals: ["pain", "stress"], price: 1500, minutes: 60, online: false, intensity: 2 },
  { id: "s11", name: "Turkish Hammam Ritual", category: "Body", goals: ["stress", "beauty"], price: 1800, minutes: 90, online: false, intensity: 1 },
  { id: "s12", name: "Signature Facial", category: "Beauty", goals: ["beauty"], price: 1600, minutes: 60, online: false, intensity: 1 },
  { id: "s13", name: "Skin Health Consult", category: "Beauty", goals: ["beauty", "nutrition"], price: 800, minutes: 40, online: true, intensity: 1 },
  { id: "s14", name: "Dietitian Plan", category: "Nutrition", goals: ["nutrition", "fitness"], price: 1000, minutes: 45, online: true, intensity: 1 },
  { id: "s15", name: "Gut Health Program", category: "Nutrition", goals: ["nutrition", "beauty"], price: 1400, minutes: 50, online: true, intensity: 1 },
  { id: "s16", name: "Sound Bath", category: "Mind", goals: ["sleep", "stress"], price: 500, minutes: 60, online: false, intensity: 1 },
  { id: "s17", name: "Therapy with a Psychologist", category: "Mind", goals: ["stress", "sleep"], price: 1500, minutes: 50, online: true, intensity: 1 },
  { id: "s18", name: "Mobility & Stretch", category: "Movement", goals: ["pain", "fitness"], price: 350, minutes: 40, online: true, intensity: 2 },
];

const BUDGET_CAP: Record<Budget, number> = { light: 800, balanced: 1400, premium: Infinity };
const COUNT: Record<Answers["time"], number> = { "1": 2, "3": 3, "5": 4 };

export function scoreService(s: Service, a: Answers): number {
  if (a.format === "online" && !s.online) return -1;
  if (a.format === "inperson" && s.online && s.category !== "Nutrition" && s.goals.length < 2) return -1;
  if (s.price > BUDGET_CAP[a.budget]) return -1;
  const goalHits = s.goals.filter((g) => a.goals.includes(g)).length;
  if (goalHits === 0) return -1;
  const fit = 5 - Math.abs(s.intensity - a.energy);
  return goalHits * 10 + fit;
}

export function buildPackage(a: Answers) {
  const ranked = SERVICES.map((s) => ({ s, score: scoreService(s, a) }))
    .filter((x) => x.score >= 0)
    .sort((x, y) => y.score - x.score);
  const picks: Service[] = [];
  const cats = new Set<string>();
  for (const { s } of ranked) {
    if (picks.length >= COUNT[a.time]) break;
    if (cats.has(s.category) && ranked.length > COUNT[a.time] * 2) continue;
    picks.push(s);
    cats.add(s.category);
  }
  for (const { s } of ranked) {
    if (picks.length >= COUNT[a.time]) break;
    if (!picks.includes(s)) picks.push(s);
  }
  const monthly = picks.reduce((sum, s) => sum + s.price * 4, 0);
  return { services: picks, monthly, discounted: Math.round(monthly * 0.85) };
}
