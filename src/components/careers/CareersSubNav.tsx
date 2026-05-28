import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'openings', label: 'Openings' },
  { id: 'why-join', label: 'Why join' },
  { id: 'process', label: 'Process' },
  { id: 'resume-tips', label: 'Resume tips' },
  { id: 'faq', label: 'FAQ' },
  { id: 'apply', label: 'Apply' },
];

export const CareersSubNav = ({ showOpenings }: { showOpenings: boolean }) => {
  const [active, setActive] = useState('about');
  const [open, setOpen] = useState(false);
  const links = SECTIONS.filter((s) => s.id !== 'openings' || showOpenings);

  useEffect(() => {
    const handler = () => {
      let current = links[0]?.id ?? 'about';
      for (const s of links) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < 200) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [links]);

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[68px] z-40 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container-swiss flex items-center justify-between gap-4 py-3">
        <span className="text-xs uppercase tracking-widest text-muted-foreground hidden md:inline">
          Careers
        </span>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
          {links.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
                active === s.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/70 hover:text-foreground hover:bg-secondary/40'
              )}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center justify-between w-full">
          <span className="text-sm font-semibold capitalize">{active.replace('-', ' ')}</span>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open careers menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Jump to</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {links.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={cn(
                      'text-left px-3 py-3 rounded-md text-base font-medium transition-colors',
                      active === s.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary/40'
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
