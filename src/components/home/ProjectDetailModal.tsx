import { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, ExternalLink, Check } from 'lucide-react';

export interface ProjectDetails {
  about: string;
  features: string[];
}

export interface ProjectDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  category: string;
  icon: string;
  platforms?: string[];
  url?: string;
  screenshots: string[];
  details: ProjectDetails;
}

export const ProjectDetailModal = ({
  open,
  onOpenChange,
  title,
  category,
  icon,
  platforms,
  url,
  screenshots,
  details,
}: ProjectDetailModalProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = galleryRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-shot]');
    const step = card ? card.offsetWidth + 16 : 280;
    el.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] sm:w-full max-h-[92vh] overflow-y-auto overflow-x-hidden p-0 rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 text-left">
          <div className="flex items-center gap-4">
            <img
              src={icon}
              alt={`${title} icon`}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-md flex-shrink-0 border border-border"
            />
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl sm:text-2xl font-bold leading-tight">
                {title}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-muted-foreground">
                {category}
              </DialogDescription>
              {platforms && platforms.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {platforms.map((p) => (
                    <Badge key={p} variant="secondary" className="rounded-full text-[10px] px-2 py-0.5">
                      {p}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {url && (
              <Button
                asChild
                size="sm"
                className="hidden sm:inline-flex rounded-full font-semibold"
              >
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Visit <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
                </a>
              </Button>
            )}
          </div>
        </DialogHeader>

        {/* App Store style preview gallery */}
        <div className="relative bg-muted/40 py-6 border-y border-border">
          <div className="flex items-center justify-between px-6 sm:px-8 mb-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Preview
            </h3>
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => scrollBy(-1)}
                className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={galleryRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 sm:px-8 pb-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {screenshots.map((src, i) => (
              <div
                key={src}
                data-shot
                className="flex-shrink-0 snap-center w-[220px] sm:w-[240px] aspect-[9/19.5] rounded-[2rem] bg-foreground p-1.5 shadow-xl"
              >
                <img
                  src={src}
                  alt={`${title} screenshot ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top rounded-[1.6rem]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="px-6 sm:px-8 py-6 space-y-6">
          <section>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground">
              About this app
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {details.about}
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-bold mb-3 text-foreground">
              How it makes your work easy
            </h3>
            <ul className="space-y-2.5">
              {details.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/90">
                  <span className="mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </section>


          {url && (
            <Button asChild size="lg" className="w-full sm:hidden rounded-full font-semibold">
              <a href={url} target="_blank" rel="noopener noreferrer">
                Visit website <ExternalLink className="ml-1.5 w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
