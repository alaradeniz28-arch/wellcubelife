import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  buildPackage, GOALS, STAGE_ORDER, SITE, CONCIERGE_WA,
  type Answers, type Goal, type Flag, type Openness,
} from "@/lib/wellcube";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Build Your Wellcube Package — Arrive. Transform. Thrive." },
      { name: "description", content: "Answer a few questions and get an integrative wellness package from Wellcube's services in Dubai, ready to review with an advisor." },
      { property: "og:title", content: "Build Your Wellcube Package" },
      { property: "og:description", content: "An integrative wellness package built from Wellcube's services, ready to review with a Wellcube advisor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type StepId = "goal" | "secondary" | "about" | "health" | "approach" | "openness" | "duration";
const STEPS: StepId[] = ["goal", "secondary", "about", "health", "approach", "openness", "duration"];
const GOAL_IDS = Object.keys(GOALS) as Goal[];

const initial: Answers = {
  goal: "weight", secondary: null, age: "30-44", sex: "na", flags: [],
  approach: "balanced", openness: [], duration: "fortnight",
};

function Index() {
  const [step, setStep] = useState(-1);
  const [a, setA] = useState<Answers>(initial);
  const [goalPicked, setGoalPicked] = useState(false);
  const [healthAnswered, setHealthAnswered] = useState(false);
  const done = step >= STEPS.length;
  const id = STEPS[step];
  const canNext = (id !== "goal" || goalPicked) && (id !== "health" || healthAnswered);
  const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <button onClick={() => setStep(-1)} className="font-display text-2xl tracking-tight">wellcube<span className="text-accent">.</span>life</button>
        <span className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground sm:block">Tranquil Wellness Tower · Dubai</span>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-24 pt-6">
        {step === -1 && <Intro onStart={() => setStep(0)} />}

        {step >= 0 && !done && (
          <div key={step} className="animate-rise">
            <div className="mb-10 flex gap-1.5">
              {STEPS.map((_, i) => <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-border"}`} />)}
            </div>
            <p className="eyebrow">Step {step + 1} of {STEPS.length}</p>

            {id === "goal" && (
              <Q title="What brings you to Wellcube?" sub="Choose the one that matters most right now.">
                <Grid cols={2}>
                  {GOAL_IDS.map((g) => (
                    <Choice key={g} on={goalPicked && a.goal === g} label={GOALS[g].label} hint={GOALS[g].hint}
                      onClick={() => { setA({ ...a, goal: g, secondary: a.secondary === g ? null : a.secondary }); setGoalPicked(true); }} />
                  ))}
                </Grid>
              </Q>
            )}

            {id === "secondary" && (
              <Q title="Anything else you'd like to work on?" sub="A second focus helps us create a more complete, holistic plan. Optional.">
                <Grid cols={2}>
                  <Choice on={a.secondary === null} label="Just my main goal" hint="Keep it focused" onClick={() => setA({ ...a, secondary: null })} />
                  {GOAL_IDS.filter((g) => g !== a.goal).map((g) => (
                    <Choice key={g} on={a.secondary === g} label={GOALS[g].label} hint={GOALS[g].hint} onClick={() => setA({ ...a, secondary: g })} />
                  ))}
                </Grid>
              </Q>
            )}

            {id === "about" && (
              <Q title="A little about you" sub="Different ages and life stages need different care.">
                <p className="label">Age</p>
                <Grid cols={4}>
                  {(["18-29", "30-44", "45-59", "60+"] as const).map((v) => <Choice key={v} on={a.age === v} label={v} onClick={() => setA({ ...a, age: v })} />)}
                </Grid>
                <p className="label mt-8">Sex</p>
                <Grid cols={3}>
                  {([["female", "Female"], ["male", "Male"], ["na", "Prefer not to say"]] as const).map(([v, l]) => <Choice key={v} on={a.sex === v} label={l} onClick={() => setA({ ...a, sex: v })} />)}
                </Grid>
              </Q>
            )}

            {id === "health" && (
              <Q title="Does any of this apply to you?" sub="This lets us leave out treatments that may not be safe for you. Your answers stay on this device.">
                <Grid cols={2}>
                  {([
                    ["pregnant", "Pregnant or breastfeeding", "Or trying to conceive"],
                    ["cardio", "Heart or blood pressure condition", "Including medication for it"],
                    ["injury", "Recent surgery or injury", "Within the last 6 months"],
                  ] as [Flag, string, string][]).map(([v, l, h]) => (
                    <Choice key={v} on={a.flags.includes(v)} label={l} hint={h}
                      onClick={() => { setA({ ...a, flags: toggle(a.flags, v) }); setHealthAnswered(true); }} />
                  ))}
                  <Choice on={healthAnswered && a.flags.length === 0} label="None of these" hint="Continue"
                    onClick={() => { setA({ ...a, flags: [] }); setHealthAnswered(true); }} />
                </Grid>
              </Q>
            )}

            {id === "approach" && (
              <Q title="Which approach appeals to you?" sub="Wellcube combines ancient healing with modern science. Tell us where to lean.">
                <Grid cols={3}>
                  {([
                    ["ancient", "Ancient wisdom", "Ayurveda, TCM, sound & breath"],
                    ["balanced", "A balance of both", "Our integrative default"],
                    ["modern", "Modern science", "Diagnostics, biohacking, tech"],
                  ] as const).map(([v, l, h]) => <Choice key={v} on={a.approach === v} label={l} hint={h} onClick={() => setA({ ...a, approach: v })} />)}
                </Grid>
              </Q>
            )}

            {id === "openness" && (
              <Q title="Are you open to clinical treatments?" sub="These are medical services. A doctor or specialist always assesses you before any session.">
                <Grid cols={2}>
                  {([
                    ["aesthetics", "Non-invasive aesthetics", "Body contouring, skin & face treatments"],
                    ["injectables", "IV & injectable therapies", "Including IV nutrients or peptides"],
                  ] as [Openness, string, string][]).map(([v, l, h]) => (
                    <Choice key={v} on={a.openness.includes(v)} label={l} hint={h} onClick={() => setA({ ...a, openness: toggle(a.openness, v) })} />
                  ))}
                </Grid>
                <p className="mt-4 text-sm text-muted-foreground">Leave both unselected for a fully non-clinical package.</p>
              </Q>
            )}

            {id === "duration" && (
              <Q title="How would you like to experience it?" sub="This decides which Wellcube programme fits around your package.">
                <Grid cols={2}>
                  {([
                    ["day", "A single day", "Day pass or designed experience"],
                    ["week", "Under a week", "A short reset stay"],
                    ["fortnight", "1–2 weeks", "Deeper restoration"],
                    ["transform", "3 weeks or more", "Full transformation"],
                    ["local", "Regular visits", "I live in or near Dubai"],
                  ] as const).map(([v, l, h]) => <Choice key={v} on={a.duration === v} label={l} hint={h} onClick={() => setA({ ...a, duration: v })} />)}
                </Grid>
              </Q>
            )}

            <div className="mt-12 flex items-center justify-between">
              <button className="btn-ghost" onClick={() => setStep(step - 1)}>← Back</button>
              <button className="btn-primary" disabled={!canNext} onClick={() => setStep(step + 1)}>
                {step === STEPS.length - 1 ? "Build my package" : "Continue"}
              </button>
            </div>
          </div>
        )}

        {done && <Result a={a} onEdit={() => setStep(0)} />}
      </section>
    </main>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="animate-rise pt-8 text-center">
      <p className="eyebrow">Arrive · Transform · Thrive</p>
      <h1 className="font-display mt-5 text-5xl leading-[1.05] md:text-7xl">
        Your wellness,<br /><em className="text-primary">designed</em>, not prescribed.
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
        Answer seven short questions. We'll combine clinical expertise, Ayurveda, movement, nutrition and recovery from across Wellcube's services into one integrative package.
      </p>
      <button className="btn-primary mt-10" onClick={onStart}>Begin — about 2 minutes</button>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4 text-left">
        {[["01", "Tell us about you", "Goals, life stage and health"], ["02", "See your package", "Every recommendation explained"], ["03", "Talk to an advisor", "Your package is confirmed in a consultation"]].map(([n, t, d]) => (
          <div key={n} className="border-t border-border pt-4">
            <p className="font-display text-accent">{n}</p>
            <p className="mt-1 font-medium">{t}</p>
            <p className="text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Q({ title, sub, children }: { title: string; sub?: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display mt-3 text-4xl leading-tight md:text-5xl">{title}</h2>
      {sub && <p className="mt-3 max-w-xl text-muted-foreground">{sub}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Grid({ cols, children }: { cols: 2 | 3 | 4; children: ReactNode }) {
  const c = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "grid-cols-2 sm:grid-cols-4" }[cols];
  return <div className={`grid gap-3 ${c}`}>{children}</div>;
}

function Choice({ on, label, hint, onClick }: { on: boolean; label: string; hint?: string; onClick: () => void }) {
  return (
    <button data-on={on} aria-pressed={on} className="choice" onClick={onClick}>
      <span className="font-display text-lg leading-snug">{label}</span>
      {hint && <span className="text-sm text-muted-foreground">{hint}</span>}
    </button>
  );
}

function Result({ a, onEdit }: { a: Answers; onEdit: () => void }) {
  const p = buildPackage(a);
  const goals = [a.goal, a.secondary].filter(Boolean).map((g) => GOALS[g as Goal].label);
  const summary = `Hi Wellcube, I built a suggested package on your website.\nFocus: ${goals.join(" + ")}\nProgramme: ${p.programme.name}\nServices: ${p.items.map((i) => i.service.name).join(", ")}${p.gaps.length ? `\nQuestions about: ${p.gaps.map((g) => g.title).join(", ")}` : ""}\nI'd like to book a consultation.`;
  const wa = `https://wa.me/${CONCIERGE_WA}?text=${encodeURIComponent(summary)}`;

  return (
    <div className="animate-rise">
      <p className="eyebrow">Your suggested package</p>
      <h2 className="font-display mt-3 text-5xl leading-tight">{goals.join(" & ")}</h2>

      <div className="notice mt-6">
        <strong className="font-medium">This is a suggestion, not a diagnosis or treatment plan.</strong>{" "}
        A Wellcube doctor or wellness advisor will review your health history and confirm what's right for you before any treatment. Clinical services are only given after an assessment.
      </div>

      <a href={SITE + p.programme.path} target="_blank" rel="noreferrer" className="card-accent mt-8 block">
        <p className="text-xs uppercase tracking-[0.2em] opacity-75">Suggested programme</p>
        <p className="font-display mt-1 text-3xl">{p.programme.name}</p>
        <p className="mt-2 text-sm opacity-85">{p.programme.detail}</p>
      </a>

      {STAGE_ORDER.map((stage) => {
        const items = p.items.filter((i) => i.service.stage === stage);
        if (!items.length) return null;
        return (
          <div key={stage} className="mt-10">
            <p className="label">{stage}</p>
            <ul className="mt-3 space-y-3">
              {items.map((i, n) => (
                <li key={i.service.id} className="card-soft" style={{ animationDelay: `${n * 70}ms` }}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{i.service.pillar}</p>
                      <a href={SITE + i.service.path} target="_blank" rel="noreferrer" className="font-display mt-1 block text-2xl hover:text-primary">{i.service.name}</a>
                    </div>
                    {i.service.clinical && <span className="tag">Consultation first</span>}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{i.why}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {p.safetyNotes.length > 0 && (
        <div className="mt-10">
          <p className="label">Adjusted for your safety</p>
          <ul className="mt-3 space-y-2">{p.safetyNotes.map((s) => <li key={s} className="notice">{s}</li>)}</ul>
        </div>
      )}

      {p.gaps.length > 0 && (
        <div className="mt-10">
          <p className="label">Not on our current menu</p>
          <ul className="mt-3 space-y-3">
            {p.gaps.map((g) => (
              <li key={g.title} className="card-gap">
                <p className="font-display text-xl">{g.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{g.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card-soft mt-12 text-center">
        <p className="font-display text-3xl">Next step: a consultation</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Send this package to our Wellness Concierge. An advisor will review it with you and arrange your medical consultation.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={wa} target="_blank" rel="noreferrer" className="btn-primary">Book a consultation via WhatsApp</a>
          <a href={`mailto:wellness.concierge@wellcube.life?subject=My Wellcube package&body=${encodeURIComponent(summary)}`} className="btn-ghost">Email instead</a>
        </div>
      </div>

      <button className="btn-ghost mt-8" onClick={onEdit}>← Change my answers</button>
    </div>
  );
}
