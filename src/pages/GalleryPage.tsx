import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  MapPin,
  Pause,
  Play,
  Sparkles,
  X,
} from 'lucide-react';
import { GALLERY_ITEMS, IMAGES } from '../data/machines';
import { Link } from '../router';
import { Button } from '../components/ui/button';

const SLIDE_DURATION_MS = 5500;

export function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentItem = GALLERY_ITEMS[currentIndex] ?? GALLERY_ITEMS[0];

  useEffect(() => {
    if (!isPlaying || lightboxOpen) return;
    const timer = window.setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
    }, SLIDE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [currentIndex, isPlaying, lightboxOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
      } else if (e.key === 'Escape' && lightboxOpen) {
        setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  return (
    <>
      {/* Full-Viewport Cinematic One-by-One Exhibition Stage */}
      <section className="relative min-h-[100svh] overflow-hidden bg-ink text-ink-foreground flex flex-col justify-between pt-24 pb-10">
        {/* Ambient Blurred Backdrop of Active Image */}
        <div key={`backdrop-${currentItem.id}`} className="pointer-events-none absolute inset-0">
          <img
            src={currentItem.src}
            alt=""
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover opacity-25 blur-3xl scale-110 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/60 to-ink" />
        </div>

        {/* Top Bar inside Stage */}
        <div className="site-container relative z-10 flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <img
              src={IMAGES.ifelLogo}
              alt="IFEL Logo"
              referrerPolicy="no-referrer"
              className="size-12 object-contain drop-shadow-md"
            />
            <div>
              <p className="eyebrow text-signal flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> Cinematic Exhibition & Leadership Gallery
              </p>
              <p className="text-xs text-ink-muted">
                Showing one by one · Frame {String(currentIndex + 1).padStart(2, '0')} of{' '}
                {String(GALLERY_ITEMS.length).padStart(2, '0')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-ink-foreground hover:bg-glass-strong cursor-pointer"
            >
              {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              {isPlaying ? 'Auto-Advancing' : 'Paused'}
            </button>
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-ink-foreground hover:bg-glass-strong cursor-pointer"
            >
              <Expand className="size-3.5" /> Fullscreen
            </button>
          </div>
        </div>

        {/* Main Centerpiece Image + Story Card */}
        <div className="site-container relative z-10 my-auto py-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.45fr_0.85fr]">
            {/* Cinematic Image Frame with Ken Burns */}
            <div className="relative overflow-hidden rounded-3xl border border-ink-border bg-ink-soft shadow-[0_30px_90px_rgba(0,0,0,0.75)]">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  key={currentItem.id}
                  src={currentItem.src}
                  alt={currentItem.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover animate-ken-burns"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />

                {/* Floating Frame Counter Badge */}
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-ink/80 px-4 py-1.5 text-xs font-medium backdrop-blur-md border border-ink-border">
                  <span className="text-signal">
                    {String(currentIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-ink-muted">/</span>
                  <span>{String(GALLERY_ITEMS.length).padStart(2, '0')}</span>
                </div>

                {/* Prev / Next Overlay Controls */}
                <div className="absolute bottom-5 right-5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="glass inline-flex size-11 items-center justify-center rounded-full text-ink-foreground transition-colors hover:bg-glass-strong cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="glass inline-flex size-11 items-center justify-center rounded-full text-ink-foreground transition-colors hover:bg-glass-strong cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Caption & Narrative Panel */}
            <div key={`caption-${currentItem.id}`} className="space-y-6 animate-slide-title">
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-border bg-ink-soft px-3.5 py-1.5 text-xs text-ink-muted">
                <MapPin className="size-3.5 text-signal" />
                {currentItem.location}
              </div>

              <div>
                <p className="eyebrow text-signal">{currentItem.subtitle}</p>
                <h1 className="display-md mt-3">{currentItem.title}</h1>
              </div>

              <p className="text-base leading-relaxed text-ink-muted">
                {currentItem.description}
              </p>

              {/* Progress Bar for Current Slide */}
              <div className="space-y-2 pt-2">
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-ink-foreground/15">
                  <div
                    key={`prog-${currentIndex}-${isPlaying}`}
                    className="h-full origin-left bg-signal"
                    style={{
                      animation: `progress-fill ${SLIDE_DURATION_MS}ms linear both`,
                      animationPlayState: isPlaying && !lightboxOpen ? 'running' : 'paused',
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-ink-muted">
                  <span>Cinematic Reel</span>
                  <span>Click any thumbnail below to jump</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="button" variant="signal" size="lg" onClick={goNext}>
                  Next Frame <ChevronRight className="size-4" />
                </Button>
                <Button asChild variant="glass" size="lg">
                  <Link to="/about">Read About Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filmstrip Thumbnail Selector */}
        <div className="site-container relative z-10 pt-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {GALLERY_ITEMS.map((item, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`group relative overflow-hidden rounded-2xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'border-signal ring-2 ring-signal scale-[1.02]'
                      : 'border-ink-border opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-ink-soft">
                    <img
                      src={item.src}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-ink/90 p-2.5">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-signal">
                      Frame 0{idx + 1}
                    </p>
                    <p className="truncate text-xs text-ink-foreground">{item.title}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Secondary Editorial Storyboard Section */}
      <section className="site-container py-24">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-signal">Complete Visual Archive</p>
            <h2 className="display-lg mt-2">Moments of leadership & partnership.</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Click any photograph to launch it in the cinematic theatre player above.
          </p>
        </div>

        <div className="space-y-16">
          {GALLERY_ITEMS.map((item, idx) => (
            <article
              key={item.id}
              className="grid items-center gap-8 rounded-3xl border border-border bg-muted/40 p-6 sm:p-10 lg:grid-cols-12"
            >
              <div
                className={`overflow-hidden rounded-2xl lg:col-span-7 ${
                  idx % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onClick={() => {
                    setCurrentIndex(idx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-105 cursor-pointer shadow-lg"
                />
              </div>
              <div
                className={`space-y-4 lg:col-span-5 ${
                  idx % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <span className="eyebrow text-signal">
                  0{idx + 1} · {item.location}
                </span>
                <h3 className="display-md">{item.title}</h3>
                <p className="text-sm font-medium text-foreground">{item.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                <div className="pt-2">
                  <Button
                    type="button"
                    variant="ink"
                    size="sm"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setLightboxOpen(true);
                    }}
                  >
                    <Expand className="size-3.5" /> View Fullscreen
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink/95 p-6 text-ink-foreground backdrop-blur-xl animate-fade-in"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="flex items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="eyebrow text-ink-muted">
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(GALLERY_ITEMS.length).padStart(2, '0')} — {currentItem.title}
            </p>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="glass inline-flex size-10 items-center justify-center rounded-full hover:bg-glass-strong cursor-pointer"
              aria-label="Close fullscreen"
            >
              <X className="size-5" />
            </button>
          </div>

          <div
            className="relative my-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={goPrev}
              className="glass absolute left-2 z-10 inline-flex size-12 items-center justify-center rounded-full hover:bg-glass-strong cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6" />
            </button>
            <img
              src={currentItem.src}
              alt={currentItem.title}
              referrerPolicy="no-referrer"
              className="max-h-[78vh] max-w-[88vw] rounded-2xl object-contain shadow-2xl"
            />
            <button
              type="button"
              onClick={goNext}
              className="glass absolute right-2 z-10 inline-flex size-12 items-center justify-center rounded-full hover:bg-glass-strong cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          <div
            className="mx-auto max-w-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-display text-xl">{currentItem.title}</p>
            <p className="mt-1 text-sm text-ink-muted">{currentItem.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
