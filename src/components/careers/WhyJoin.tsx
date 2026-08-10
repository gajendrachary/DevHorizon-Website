import { Rocket, BookOpen, Users, Crown, TrendingUp, Cpu } from 'lucide-react';

const BENEFITS = [
  { icon: Rocket, title: 'Real project work', desc: 'Ship features used by real customers from week one. No throwaway tickets.' },
  { icon: BookOpen, title: 'Learning-driven', desc: 'Books, courses, conferences — we invest in growing your craft.' },
  { icon: Users, title: 'Direct mentorship', desc: 'Pair daily with senior engineers who care about your growth.' },
  { icon: Crown, title: 'Ownership', desc: 'You own outcomes end-to-end — design, build, ship, measure.' },
  { icon: TrendingUp, title: 'Fast growth', desc: 'Small team, big surface area. Your impact compounds quickly.' },
  { icon: Cpu, title: 'Modern stack', desc: 'React, Node, Python, AWS, the LLM stack. Use the right tool for the job.' },
];

export const WhyJoin = () => (
  <section id="why-join" className="py-14 md:py-20">
    <div className="container-swiss">
      <div className="mb-10 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Why Join Us</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">Why work at DevHorizon</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {BENEFITS.map((b) => (
          <div key={b.title} className="rounded-xl border border-border bg-card p-6 shadow-soft hover:shadow-medium transition-shadow">
            <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mb-4">
              <b.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
