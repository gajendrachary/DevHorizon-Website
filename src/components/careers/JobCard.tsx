import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  job_type: string;
  experience_level: string;
  location: string;
  work_mode: string;
  skills: string[];
  description: string;
  eligibility_criteria: string | null;
  responsibilities: string | null;
  status: string;
  created_at: string;
}

interface Props {
  job: JobOpening;
  onApply: (title: string, type: string) => void;
}

export const JobCard = ({ job, onApply }: Props) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-soft hover:shadow-medium transition-shadow"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            {job.department}
          </div>
          <h3 className="text-xl md:text-2xl font-bold leading-tight">{job.title}</h3>
        </div>
        <Badge variant="outline" className="text-xs">{job.job_type}</Badge>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground mb-4">
        <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>
        <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-4 w-4" />{job.experience_level}</span>
        <span className="inline-flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{job.work_mode}</span>
      </div>

      <p className="text-sm md:text-base text-foreground/80 leading-relaxed mb-4">
        {job.description}
      </p>

      {job.eligibility_criteria && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Eligibility</h4>
          <p className="text-sm text-foreground/75 leading-relaxed">{job.eligibility_criteria}</p>
        </div>
      )}

      {job.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {job.skills.slice(0, 5).map((skill) => (
            <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-secondary/40 border border-border text-foreground/80">
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-border">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Actively hiring · {job.work_mode}
        </span>
        <Button size="sm" onClick={() => onApply(job.title, job.job_type)}>
          Apply <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.article>
  );
};
