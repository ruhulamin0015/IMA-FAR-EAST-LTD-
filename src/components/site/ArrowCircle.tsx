import { ArrowRight } from 'lucide-react';

export function ArrowCircle({
  className = '',
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:translate-x-1 ${
        dark ? 'bg-foreground/10 text-foreground' : 'glass text-ink-foreground'
      } ${className}`.trim()}
      aria-hidden={true}
    >
      <ArrowRight className="size-4" />
    </span>
  );
}
