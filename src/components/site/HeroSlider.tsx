import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Pause, Play } from 'lucide-react';
import { MACHINES, getMachineBySlug } from '../../data/machines';
import { Link } from '../../router';
import { Button } from '../ui/button';

const SLIDE_DURATION = 3000;

const HERO_SLIDE_SLUGS = [
  'typhoon-70',
  'zephiro-50',
  'tempest-plus',
  '892-mithos',
  '890b-phoenix',
  '890h-heavy-duty',
  'syncro-modular-line',
  'ima-839-multilevel-conveyor',
  'rotondi-fp-touch-series',
  'rotondi-sr3100-arsh-shirt-finishing',
  'framis-mxc-205-d-se-weld-cut',
  'framis-mu-281-ultrasonic',
  'framis-mc201z-mphk40-mphk18-presses',
  'newtech-2025-2250-jacket-pocket-welting',
  'newtech-3000-11-back-pocket-setter',
  'newtech-3500-20-kangaroo-3000-13-knit-pocket',
  'nexia-ns420-520-alltogether-washer',
  'nexia-nray4-dual-laser-mannequin',
];

export function HeroSlider() {
  const heroMachines = HERO_SLIDE_SLUGS.map((s) => getMachineBySlug(s)).filter(
    (m): m is NonNullable<typeof m> => Boolean(m)
  );
  const slides = heroMachines.length > 0 ? heroMachines : MACHINES.slice(0, 12);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = slides[index] ?? slides[0];

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(
      () => setIndex((prev) => (prev + 1) % slides.length),
      SLIDE_DURATION
    );
    return () => window.clearTimeout(timer);
  }, [index, paused, slides.length]);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-[100svh] min-h-[720px] overflow-hidden bg-ink text-ink-foreground">
      <div key={`bg-${index}`} className="absolute inset-0 studio-luxury animate-fade-in" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] border-t border-ink-border/40" />
      <p
        key={`wm-${index}`}
        aria-hidden={true}
        className="wordmark pointer-events-none absolute inset-x-0 top-[14%] select-none whitespace-nowrap px-4 text-center text-[clamp(2rem,6.5vw,8rem)] tracking-[0.22em] leading-none text-ink-foreground/[0.05] animate-fade-in"
      >
        {current.family}
      </p>

      {/* Full Machine Visual Stage — Clean Transparent Cutout Floating on Dark Luxury Stage */}
      <div className="absolute inset-0 flex items-center justify-center px-[5vw] pb-[22vh] pt-[12vh] lg:justify-end lg:pr-[6vw]">
        <div
          key={`m-${index}`}
          className="relative flex w-full max-w-[960px] items-center justify-center animate-slide-machine lg:w-[60%]"
        >
          <div className="pointer-events-none absolute size-80 rounded-full bg-signal/20 blur-3xl animate-pulse-halo" />
          <div className="pointer-events-none absolute size-64 rounded-full bg-[#009246]/15 blur-3xl" />
          <img
            src={current.image}
            alt={current.name}
            referrerPolicy="no-referrer"
            className="machine-shadow machine-reflect animate-float-machine h-auto max-h-[52vh] w-full object-contain"
            fetchPriority={index === 0 ? 'high' : 'auto'}
          />
        </div>
      </div>

      <div className="absolute inset-0 shade-hero" />

      <div className="site-container absolute inset-x-0 bottom-[17vh] md:bottom-[15vh]">
        <div key={`t-${index}`} className="max-w-2xl">
          <div
            className="mb-3 flex flex-wrap items-center gap-2.5 animate-slide-title"
            style={{ animationDelay: '0.03s' }}
          >
            <span className="rounded-full bg-signal px-3 py-1 text-xs font-medium uppercase tracking-wider text-signal-foreground">
              {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <span className="rounded-full border border-[#009246]/50 bg-[#009246]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              {current.brand ?? 'IMA SpA'} · {current.origin ?? 'Italy'}
            </span>
            <span className="eyebrow text-ink-muted">
              {current.category} · {current.badge}
            </span>
          </div>

          <h2 className="display-hero animate-slide-title" style={{ animationDelay: '0.08s' }}>
            {current.headline}
          </h2>

          <p
            className="mt-3 max-w-xl text-base sm:text-lg font-light text-ink-muted animate-slide-title"
            style={{ animationDelay: '0.14s' }}
          >
            {current.tagline}
          </p>

          <div
            className="mt-5 hidden flex-wrap gap-6 border-l border-ink-border pl-4 sm:flex animate-slide-title"
            style={{ animationDelay: '0.2s' }}
          >
            {current.specs.slice(0, 3).map((spec) => (
              <div key={spec.label}>
                <p className="font-display text-lg text-ink-foreground">{spec.value}</p>
                <p className="text-xs text-ink-muted">{spec.label}</p>
              </div>
            ))}
          </div>

          <div
            className="mt-6 flex flex-wrap gap-3 animate-slide-title"
            style={{ animationDelay: '0.25s' }}
          >
            <Button asChild variant="signal" size="xl">
              <Link to="/machines/$slug" params={{ slug: current.slug }}>
                Inspect {current.headline.replace('.', '')}
              </Link>
            </Button>
            {current.pdfUrl && (
              <Button asChild variant="glass" size="xl" className="hidden sm:inline-flex">
                <a href={current.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="size-4" /> Official PDF
                </a>
              </Button>
            )}
            <Button asChild variant="outlineLight" size="xl" className="hidden sm:inline-flex">
              <Link to="/contact">Request a quote</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Fast-Preview Progress Strip */}
      <div className="site-container absolute inset-x-0 bottom-5 flex items-end gap-4">
        <ol className="grid flex-1 grid-cols-8 gap-1.5 sm:grid-cols-16 md:gap-2">
          {slides.map((machine, i) => (
            <li key={machine.slug} className="min-w-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group block w-full text-left cursor-pointer"
                aria-label={`Show ${machine.name}`}
                aria-current={i === index}
              >
                <span
                  className={`mb-1 hidden truncate text-[10px] transition-colors xl:block ${
                    i === index
                      ? 'font-semibold text-white'
                      : 'text-ink-muted group-hover:text-ink-foreground'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')} {machine.headline.replace('.', '')}
                </span>
                <span className="relative block h-[3px] overflow-hidden rounded-full bg-ink-foreground/20">
                  {i < index && <span className="absolute inset-0 bg-ink-foreground" />}
                  {i === index && (
                    <span
                      key={`p-${index}`}
                      className="absolute inset-0 origin-left bg-signal"
                      style={{
                        animation: `progress-fill ${SLIDE_DURATION}ms linear both`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                    />
                  )}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            className="glass inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-glass-strong cursor-pointer"
            aria-label="Previous machine"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setPaused((prev) => !prev)}
            className="glass inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-glass-strong cursor-pointer"
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
          >
            {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="glass inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-glass-strong cursor-pointer"
            aria-label="Next machine"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
