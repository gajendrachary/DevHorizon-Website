const STEPS = [
  { n: '01', title: 'Apply online', desc: 'Submit your application with resume and links.' },
  { n: '02', title: 'Resume screening', desc: 'We review every application within ~5 business days.' },
  { n: '03', title: 'Technical interview', desc: 'A working session — code, design, or system depending on the role.' },
  { n: '04', title: 'Final discussion', desc: 'Meet the team, ask anything, talk vision and compensation.' },
  { n: '05', title: 'Offer & onboarding', desc: 'Offer letter, equipment, and a structured first week.' },
];

export const HiringProcess = () => (
  <section id="process" className="py-14 md:py-20 bg-secondary/20">
    <div className="container-swiss">
      <div className="mb-10 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Process</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">How hiring works</h2>
      </div>
      <ol className="grid md:grid-cols-5 gap-5">
        {STEPS.map((s) => (
          <li key={s.n} className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="text-xs font-bold text-primary mb-3">{s.n}</div>
            <h3 className="text-base font-semibold mb-2 leading-snug">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
