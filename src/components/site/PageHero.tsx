import React from 'react';

export interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro?: string;
  machine?: string;
  machineAlt?: string;
  watermark?: string;
  children?: React.ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  intro,
  machine,
  machineAlt = '',
  watermark,
  children,
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[86svh] items-end overflow-hidden bg-ink text-ink-foreground">
      <div className="absolute inset-0 studio" />
      {watermark && (
        <p
          aria-hidden={true}
          className="wordmark pointer-events-none absolute inset-x-0 top-[16%] select-none whitespace-nowrap text-center text-[clamp(4rem,14vw,15rem)] leading-none text-ink-foreground/[0.05] animate-fade-in"
        >
          {watermark}
        </p>
      )}
      {machine && (
        <div className="absolute inset-0 flex items-center justify-center px-[6vw] pb-[30vh] pt-[14vh] md:justify-end md:pb-[12vh] md:pr-[5vw]">
          <img
            src={machine}
            alt={machineAlt}
            referrerPolicy="no-referrer"
            className="machine-shadow machine-reflect max-h-[50vh] w-full max-w-[900px] object-contain animate-slide-machine md:w-[58%]"
          />
        </div>
      )}
      <div className="absolute inset-0 shade-hero" />
      <div className="site-container relative pb-[10vh] pt-32">
        <p className="eyebrow mb-5 text-ink-muted animate-slide-title">{eyebrow}</p>
        <h1
          className="display-hero max-w-4xl animate-slide-title"
          style={{ animationDelay: '0.1s' }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="mt-6 max-w-2xl text-lg font-light text-ink-muted animate-slide-title"
            style={{ animationDelay: '0.25s' }}
          >
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
