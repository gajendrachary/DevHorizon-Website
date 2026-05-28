import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JobCard, JobOpening } from './JobCard';

interface Props {
  jobs: JobOpening[];
  onApply: (title: string, type: string) => void;
}

export const OpeningsSection = ({ jobs, onApply }: Props) => {
  const [q, setQ] = useState('');
  const [type, setType] = useState('all');
  const [dept, setDept] = useState('all');
  const [exp, setExp] = useState('all');

  const departments = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.department))),
    [jobs],
  );
  const experiences = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.experience_level))),
    [jobs],
  );

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return jobs.filter((j) => {
      if (type !== 'all' && j.job_type !== type) return false;
      if (dept !== 'all' && j.department !== dept) return false;
      if (exp !== 'all' && j.experience_level !== exp) return false;
      if (!term) return true;
      const hay = [j.title, ...j.skills, j.department, j.description].join(' ').toLowerCase();
      return hay.includes(term);
    });
  }, [jobs, q, type, dept, exp]);

  return (
    <section id="openings" className="py-14 md:py-20 bg-secondary/20">
      <div className="container-swiss">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Open positions</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-3">Roles we're hiring for</h2>
          <p className="text-muted-foreground">
            {jobs.length} role{jobs.length === 1 ? '' : 's'} open. Don't see a fit? Send a general
            application below.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_auto_auto] gap-3 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search role or skill"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="md:w-[160px]"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dept} onValueChange={setDept}>
            <SelectTrigger className="md:w-[180px]"><SelectValue placeholder="Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={exp} onValueChange={setExp}>
            <SelectTrigger className="md:w-[160px]"><SelectValue placeholder="Experience" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              {experiences.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-10">
            No roles match your filters. Try clearing them.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((j) => <JobCard key={j.id} job={j} onApply={onApply} />)}
          </div>
        )}
      </div>
    </section>
  );
};
