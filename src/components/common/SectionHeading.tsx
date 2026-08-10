import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-3xl',
        className
      )}
    >
      {eyebrow && (
        <span className={cn('eyebrow mb-4', align === 'center' && 'justify-center')}>
          [ {eyebrow} ]
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-3">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
