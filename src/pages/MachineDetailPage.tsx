import { Download, FileText } from 'lucide-react';
import { MACHINES, SITE_INFO, getMachineBySlug } from '../data/machines';
import { Link } from '../router';
import { MachineSpotlightCard } from '../components/site/MachineCards';
import { Button } from '../components/ui/button';

export function MachineDetailPage({ slug }: { slug: string }) {
  const machine = getMachineBySlug(slug);

  if (!machine) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 bg-ink px-4 pt-24 text-center text-ink-foreground">
        <h1 className="display-lg">Machine not found.</h1>
        <Button asChild variant="signal" size="xl">
          <Link to="/machines">View all machines</Link>
        </Button>
      </div>
    );
  }

  const sameCategory = MACHINES.filter(
    (m) => m.slug !== machine.slug && m.category === machine.category
  ).slice(0, 3);
  const relatedMachines =
    sameCategory.length >= 3
      ? sameCategory
      : [
          ...sameCategory,
          ...MACHINES.filter((m) => m.slug !== machine.slug && m.category !== machine.category),
        ].slice(0, 3);

  const fullSpecs = [
    ...machine.specs,
    { label: 'Principal Brand', value: machine.brand ?? 'IMA SpA' },
    { label: 'Origin', value: machine.origin ?? 'Brescia, Italy' },
    { label: 'Service SLA', value: '24/7 · ≤ 2 h on-site in Dhaka zone (26 In-House Engineers)' },
  ].filter((spec, idx, arr) => arr.findIndex((s) => s.label === spec.label) === idx);

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-ink text-ink-foreground">
        <div className="absolute inset-0 studio-luxury" />
        <p
          aria-hidden={true}
          className="wordmark pointer-events-none absolute inset-x-0 top-[18%] select-none whitespace-nowrap px-4 text-center text-[clamp(2.2rem,7.2vw,9rem)] tracking-[0.22em] leading-none text-ink-foreground/[0.05]"
        >
          {machine.family}
        </p>
        <div className="relative flex min-h-[100svh] flex-col">
          <div className="site-container pt-32 text-center">
            <p className="eyebrow text-ink-muted animate-slide-title">
              {machine.brand ?? 'IMA SpA'} · {machine.badge} · {machine.category}
            </p>
            <h1
              className="display-hero mt-4 animate-slide-title"
              style={{ animationDelay: '0.1s' }}
            >
              {machine.headline}
            </h1>
            {machine.floatingFeatures && machine.floatingFeatures.length > 0 && (
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {machine.floatingFeatures.map((feat, idx) => (
                  <span
                    key={feat}
                    style={{ animationDelay: `${idx * 0.6}s` }}
                    className="animate-float-badge glass rounded-full px-3.5 py-1 text-xs font-medium text-white"
                  >
                    ✦ {feat}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="relative flex flex-1 items-center justify-center px-[6vw] py-8">
            <div className="pointer-events-none absolute size-80 rounded-full bg-signal/20 blur-3xl animate-pulse-halo" />
            <div className="pointer-events-none absolute size-64 rounded-full bg-[#009246]/15 blur-3xl" />
            <div className="relative flex w-full max-w-[1040px] items-center justify-center rounded-3xl p-6 sm:p-10">
              <img
                key={machine.slug}
                src={machine.image}
                alt={machine.name}
                referrerPolicy="no-referrer"
                className="machine-shadow machine-reflect animate-float-machine max-h-[48vh] w-full object-contain"
              />
            </div>
          </div>
          <div className="site-container grid grid-cols-2 gap-y-8 pb-14 lg:grid-cols-4">
            {machine.specs.map((spec) => (
              <div key={spec.label} className="border-l border-ink-border pl-5">
                <p className="font-display text-[clamp(1.4rem,2.4vw,2.25rem)]">{spec.value}</p>
                <p className="mt-1 text-sm text-ink-muted">{spec.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container grid gap-12 py-28 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow text-signal">
            {machine.brand ?? 'IMA SpA'} · {machine.origin ?? 'Italy'}
          </p>
          <h2 className="display-lg mt-2">{machine.tagline}</h2>
        </div>
        <div>
          <p className="text-xl font-light leading-relaxed text-muted-foreground">
            {machine.description}
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Delivered direct from {machine.origin ?? 'Europe'} to Dhaka, commissioned on your floor
            and supported 24/7 by our 26 in-house engineers — with genuine OEM spares in stock in
            our Dhaka warehouse.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="ink" size="xl">
              <Link to="/contact">Request a quote</Link>
            </Button>
            {machine.pdfUrl && (
              <Button asChild variant="signal" size="xl">
                <a
                  href={machine.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="size-4" />{' '}
                  {machine.pdfTitle ?? 'View Official PDF Brochure'}
                </a>
              </Button>
            )}
            <Button asChild variant="outline" size="xl">
              <a href={SITE_INFO.phoneHref}>Call {SITE_INFO.phone}</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="site-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-signal">Studio &amp; Technical Sheets</p>
              <h2 className="display-md mt-2">In detail.</h2>
            </div>
            {machine.pdfUrl && (
              <a
                href={machine.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
              >
                <Download className="size-4 text-signal" /> Download Complete PDF Catalogue
              </a>
            )}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {machine.gallery.map((imgUrl, idx) => (
              <div
                key={imgUrl + idx}
                className={`studio-luxury relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 p-6 shadow-xl ${
                  idx === 0
                    ? 'aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto'
                    : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${machine.name} detail ${idx + 1}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="machine-shadow max-h-full w-full rounded-lg object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container py-24">
        <h2 className="display-md mb-10">Technical specifications.</h2>
        <dl className="divide-y divide-border border-y border-border">
          {fullSpecs.map((spec) => (
            <div key={spec.label} className="grid grid-cols-2 gap-4 py-5">
              <dt className="text-muted-foreground">{spec.label}</dt>
              <dd className="text-lg">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-ink py-24 text-ink-foreground">
        <div className="site-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="display-md">More from the fleet.</h2>
            <Button asChild variant="glass" size="xl">
              <Link to="/machines">All machines ({MACHINES.length})</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedMachines.map((rel) => (
              <MachineSpotlightCard key={rel.slug} machine={rel} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
