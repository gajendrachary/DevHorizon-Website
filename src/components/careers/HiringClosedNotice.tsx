import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  HIRING_CLOSED_MESSAGE,
  HIRING_CLOSED_TITLE,
  HIRING_CONTACT_EMAIL,
} from '@/lib/careersConfig';

export const HiringClosedNotice = ({ showBack = true }: { showBack?: boolean }) => (
  <div className="rounded-2xl border border-border bg-card p-8 md:p-12 shadow-soft text-center max-w-2xl mx-auto">
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border text-xs font-medium text-muted-foreground mb-5">
      Hiring paused
    </span>
    <h2 className="text-2xl md:text-3xl font-bold mb-4">{HIRING_CLOSED_TITLE}</h2>
    <p className="text-muted-foreground leading-relaxed mb-7">{HIRING_CLOSED_MESSAGE}</p>
    <div className="flex flex-wrap justify-center gap-3">
      <Button asChild size="lg">
        <a href={`mailto:${HIRING_CONTACT_EMAIL}`}>
          <Mail className="mr-2 h-4 w-4" /> Contact us
        </a>
      </Button>
      {showBack && (
        <Button asChild size="lg" variant="outline">
          <Link to="/careers">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
          </Link>
        </Button>
      )}
    </div>
  </div>
);
