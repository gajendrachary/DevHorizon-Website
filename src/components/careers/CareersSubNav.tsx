import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const SECTIONS = [
  { to: '/careers/about', label: 'About' },
  { to: '/careers/openings', label: 'Openings' },
  { to: '/careers/why-join', label: 'Why join' },
  { to: '/careers/process', label: 'Process' },
  { to: '/careers/resume-tips', label: 'Resume tips' },
  { to: '/careers/faq', label: 'FAQ' },
  { to: '/careers/apply', label: 'Apply' },
];

export const CareersSubNav = ({ showOpenings = true }: { showOpenings?: boolean }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const links = SECTIONS.filter((s) => s.to !== '/careers/openings' || showOpenings);
  const current = links.find((l) => l.to === location.pathname)?.label ?? 'Careers';

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'text-foreground/70 hover:text-foreground hover:bg-secondary/40'
    );

  return (
    <div className="sticky top-[68px] z-40 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container-swiss flex items-center justify-between gap-4 py-3">
        <NavLink to="/careers" className="text-xs uppercase tracking-widest text-muted-foreground hidden md:inline hover:text-foreground">
          Careers
        </NavLink>

        <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
          {links.map((s) => (
            <NavLink key={s.to} to={s.to} end className={linkClass}>
              {s.label}
            </NavLink>
          ))}
        </nav>

        <div className="md:hidden flex items-center justify-between w-full">
          <span className="text-sm font-semibold">{current}</span>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open careers menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Careers</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                <NavLink to="/careers" end onClick={() => setOpen(false)} className={linkClass}>
                  Overview
                </NavLink>
                {links.map((s) => (
                  <NavLink
                    key={s.to}
                    to={s.to}
                    end
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'text-left px-3 py-3 rounded-md text-base font-medium transition-colors',
                        isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary/40'
                      )
                    }
                  >
                    {s.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
