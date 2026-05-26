import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, ExternalLink, Check } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';

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
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    if (!carouselApi) return;

    const updateCurrentSlide = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap() + 1);
    };

    updateCurrentSlide();
    carouselApi.on('select', updateCurrentSlide);
    carouselApi.on('reInit', updateCurrentSlide);

    return () => {
      carouselApi.off('select', updateCurrentSlide);
      carouselApi.off('reInit', updateCurrentSlide);
    };
  }, [carouselApi]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] sm:w-full max-h-[92vh] overflow-y-auto overflow-x-hidden p-0 rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-4 sm:px-8 pt-6 sm:pt-8 pb-4 text-left">
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
        <div className="relative overflow-hidden bg-muted/40 py-6 border-y border-border">
          <div className="flex items-center justify-between px-4 sm:px-8 mb-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Preview
            </h3>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs text-muted-foreground tabular-nums">
                {currentSlide}/{screenshots.length}
              </span>
              <div className="hidden sm:flex gap-2">
              <button
                onClick={() => carouselApi?.scrollPrev()}
                className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => carouselApi?.scrollNext()}
                className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              </div>
            </div>
          </div>

          <Carousel
            setApi={setCarouselApi}
            opts={{ align: 'center', loop: screenshots.length > 1 }}
            className="w-full px-4 sm:px-8"
          >
            <CarouselContent className="-ml-3 sm:-ml-4">
              {screenshots.map((src, i) => (
                <CarouselItem
                  key={src}
                  className="pl-3 sm:pl-4 basis-[78%] sm:basis-[48%] lg:basis-[34%]"
                >
                  <div className="aspect-[9/19.5] rounded-[2rem] bg-foreground p-1.5 shadow-xl">
                    <img
                      src={src}
                      alt={`${title} screenshot ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top rounded-[1.6rem]"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* About */}
        <div className="px-4 sm:px-8 py-6">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <section className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground">
              About this app
            </h3>
            <p className="max-w-prose text-sm sm:text-base text-muted-foreground leading-7 sm:leading-8">
              {details.about}
            </p>
          </section>

          <section className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold mb-3 text-foreground">
              How it makes your work easy
            </h3>
            <ul className="space-y-3">
              {details.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm sm:text-base text-foreground/90">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                  <span className="leading-7 sm:leading-8">{feature}</span>
                </li>
              ))}
            </ul>
          </section>
          </div>


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
