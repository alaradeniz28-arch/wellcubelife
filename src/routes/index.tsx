import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { buildPackage, type Answers, type Goal } from "@/lib/wellcube";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wellcube — Find Your Wellness Package" },
      { name: "description", content: "Answer five quick questions and get a personal wellness package from Wellcube's 650+ services." },
      { property: "og:title", content: "Wellcube — Find Your Wellness Package" },
      { property: "og:description", content: "Five questions. One package built for you from 650+ wellness services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const GOALS: { id: Goal; label: string; hint: string }[] = [
  { id: "stress", label: "Calm my mind", hint: "Stress, anxiety, focus" },
  { id: "sleep", label: "Sleep better", hint: "Rest & recovery" },
  { id: "fitness", label: "Get stronger", hint: "Fitness & energy" },
  { id: "pain", label: "Ease my body", hint: "Pain, posture, mobility" },
  { id: "beauty", label: "Glow", hint: "Skin & self-care" },
  { id: "nutrition", label: "Eat well", hint: "Nutrition & gut health" },
];

const STEPS = ["goals", "energy", "time", "format", "budget"] as const;

function Index() {
  const [step, setStep] = useState(-1);
  const [a, setA] = useState<Answers>({ goals: [], energy: 3, time: "3", format: "both", budget: "balanced" });
  const done = step >= STEPS.length;
  const canNext = step !== 0 || a.goals.length > 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <button onClick={() => setStep(-1)} className="font-display text-2xl">wellcube</button>
        <span className="text-sm text-muted-foreground">650+ services · one plan</span>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-24 pt-8">
        {step === -1 && (
          <div className="animate-rise text-center">
            <p className="eyebrow">Your wellness, curated</p>
            <h1 className="font-display mt-4 text-5xl leading-tight md:text-7xl">
              Five questions.<br /><em className="text-primary">One package</em> made for you.
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
              We match you with the right mix of yoga, therapy, massage, nutrition and more — from over 650 Wellcube services.
            </p>
            <button className="btn-primary mt-10" onClick={() => setStep(0)}>Start — takes 1 minute</button>
          </div>
        )}

        {step >= 0 && !done && (
          <div key={step} className="animate-rise">
            <div className="mb-10 flex gap-2">
              {STEPS.map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`} />
              ))}
            </div>
            <p className="eyebrow">Question {step + 1} of {STEPS.length}</p>

            {STEPS[step] === "goals" && (
              <Q title="What would you like to focus on?" sub="Pick up to three.">
                <div className="grid gap-3 sm:grid-cols-2">
                  {GOALS.map((g) => {
                    const on = a.goals.includes(g.id);
                    return (
                      <button key={g.id} data-on={on} className="choice"
                        onClick={() => setA({ ...a, goals: on ? a.goals.filter((x) => x !== g.id) : a.goals.length < 3 ? [...a.goals, g.id] : a.goals })}>
                        <span className="font-display text-xl">{g.label}</span>
                        <span className="text-sm text-muted-foreground">{g.hint}</span>
                      </button>
                    );
                  })}
                </div>
              </Q>
            )}

            {STEPS[step] === "energy" && (
              <Q title="How intense do you like it?" sub="From slow and restorative to sweaty and challenging.">
                <input type="range" min={1} max={5} value={a.energy} onChange={(e) => setA({ ...a, energy: +e.target.value })} className="w-full accent-primary" />
                <div className="mt-3 flex justify-between text-sm text-muted-foreground"><span>Gentle</span><span>Intense</span></div>
              </Q>
            )}

            {STEPS[step] === "time" && (
              <Choices title="How much time can you give each week?" value={a.time} onPick={(v) => setA({ ...a, time: v as Answers["time"] })}
                options={[["1", "About 1 hour", "A light start"], ["3", "2–3 hours", "A steady rhythm"], ["5", "4+ hours", "All in"]]} />
            )}

            {STEPS[step] === "format" && (
              <Choices title="Where would you like your sessions?" value={a.format} onPick={(v) => setA({ ...a, format: v as Answers["format"] })}
                options={[["inperson", "In person", "Studios & clinics"], ["online", "Online", "From home"], ["both", "A mix", "Whatever fits"]]} />
            )}

            {STEPS[step] === "budget" && (
              <Choices title="What feels right per session?" value={a.budget} onPick={(v) => setA({ ...a, budget: v as Answers["budget"] })}
                options={[["light", "Up to ₺800", "Essentials"], ["balanced", "Up to ₺1,400", "Balanced"], ["premium", "No limit", "Premium care"]]} />
            )}

            <div className="mt-12 flex justify-between">
              <button className="btn-ghost" onClick={() => setStep(step - 1)}>Back</button>
              <button className="btn-primary" disabled={!canNext} onClick={() => setStep(step + 1)}>
                {step === STEPS.length - 1 ? "See my package" : "Next"}
              </button>
            </div>
          </div>
        )}

        {done && <Result a={a} onRestart={() => setStep(0)} />}
      </section>
    </main>
  );
}

function Q({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display mt-3 text-4xl md:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Choices({ title, value, onPick, options }: { title: string; value: string; onPick: (v: string) => void; options: [string, string, string][] }) {
  return (
    <Q title={title}>
      <div className="grid gap-3 sm:grid-cols-3">
        {options.map(([v, l, h]) => (
          <button key={v} data-on={value === v} className="choice" onClick={() => onPick(v)}>
            <span className="font-display text-xl">{l}</span>
            <span className="text-sm text-muted-foreground">{h}</span>
          </button>
        ))}
      </div>
    </Q>
  );
}

function Result({ a, onRestart }: { a: Answers; onRestart: () => void }) {
  const p = buildPackage(a);
  const fmt = (n: number) => "₺" + n.toLocaleString("tr-TR");
  return (
    <div className="animate-rise">
      <p className="eyebrow">Your Wellcube package</p>
      <h2 className="font-display mt-3 text-5xl">Made for you.</h2>
      {p.services.length === 0 ? (
        <p className="mt-6 text-muted-foreground">No exact match — try a different budget or session type.</p>
      ) : (
        <>
          <ul className="mt-10 space-y-3">
            {p.services.map((s, i) => (
              <li key={s.id} className="card-soft flex items-center justify-between gap-4" style={{ animationDelay: `${i * 80}ms` }}>
                <div>
                  <p className="eyebrow">{s.category}</p>
                  <p className="font-display mt-1 text-2xl">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.minutes} min · {s.online ? "Online or in person" : "In person"} · weekly</p>
                </div>
                <p className="whitespace-nowrap font-medium">{fmt(s.price)}</p>
              </li>
            ))}
          </ul>
          <div className="card-accent mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm opacity-80">Monthly bundle · 15% off</p>
              <p className="font-display text-4xl">{fmt(p.discounted)} <span className="text-lg line-through opacity-60">{fmt(p.monthly)}</span></p>
            </div>
            <button className="btn-light">Book this package</button>
          </div>
        </>
      )}
      <button className="btn-ghost mt-8" onClick={onRestart}>Retake the quiz</button>
    </div>
  );
}
