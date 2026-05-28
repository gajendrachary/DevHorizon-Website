const TIPS = [
  { t: 'Lead with outcomes', d: 'Numbers and shipped impact > responsibilities. "Reduced p95 latency 40%" beats "worked on backend".' },
  { t: 'One page if under 3 years', d: "Recruiters scan in 20 seconds. Tighten ruthlessly until you have <3 yrs experience." },
  { t: 'Link to GitHub & demos', d: 'A live demo or a clean repo carries more signal than a bullet list.' },
  { t: 'List specific tools & versions', d: '"React 18, TypeScript, Postgres 15" — be precise. Skip "familiar with various technologies".' },
  { t: 'Skip generic objectives', d: 'No "seeking a challenging role to grow my skills" — start with what you do and what you\'ve shipped.' },
];

export const ResumeTips = () => (
  <section id="resume-tips" className="py-14 md:py-20">
    <div className="container-swiss max-w-3xl">
      <div className="mb-10">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Resume tips</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">Help your application stand out</h2>
      </div>
      <ol className="space-y-4">
        {TIPS.map((tip, i) => (
          <li key={tip.t} className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="h-9 w-9 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
              {i + 1}
            </div>
            <div>
              <h3 className="font-semibold mb-1">{tip.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tip.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
