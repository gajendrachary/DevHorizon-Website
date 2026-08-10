import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { HIRING_OPEN } from '@/lib/careersConfig';

const SECTIONS = [
  { to: '/careers/about', label: 'About' },
  { to: '/careers/why-join', label: 'Why Join Us' },
  { to: '/careers/process', label: 'Process' },
  { to: '/careers/resume-tips', label: 'Resume tips' },
  { to: '/careers/faq', label: 'FAQ' },
  { to: '/careers/apply', label: 'Apply', hiringOnly: true },
];

export const CareersSubNav = ({ showOpenings = true }: { showOpenings?: boolean }) => {
  const location = useLocation();
  const links = SECTIONS.filter((s) => {
    if (s.hiringOnly && !HIRING_OPEN) return false;
    if (s.to === '/careers/openings' && !showOpenings) return false;
    return true;
  });

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
        <NavLink to="/careers" className="text-xs uppercase tracking-widest text-muted-foreground inline hover:text-foreground">
          Careers
        </NavLink>

        <nav className="flex items-center gap-1 overflow-x-auto">
          {links.map((s) => (
            <NavLink key={s.to} to={s.to} end className={linkClass}>
              {s.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};
