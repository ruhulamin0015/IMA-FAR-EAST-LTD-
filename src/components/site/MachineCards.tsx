import { Link } from '../../router';
import { Machine } from '../../data/machines';
import { ArrowCircle } from './ArrowCircle';

export function MachineShowcaseCard({ machine }: { machine: Machine }) {
  return (
    <Link
      to="/machines/$slug"
      params={{ slug: machine.slug }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-ink-soft text-ink-foreground shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/35 hover:shadow-2xl"
    >
      <div className="absolute inset-0 studio-luxury" />

      {/* Subtle Italian Flag Luxury Top Accent Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[3px] bg-gradient-to-r from-[#009246] via-white/90 to-[#CE2B37] opacity-80 transition-opacity group-hover:opacity-100" />

      {/* Top Header Bar: Brand, Origin & Category */}
      <div className="relative z-10 flex items-center justify-between gap-2 px-5 pt-5">
        <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-white">
          <span className="size-1.5 rounded-full bg-[#009246]" />
          {machine.brand ?? 'IMA SpA'} · {machine.category}
        </span>
        <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-0.5 text-[10px] font-medium text-white/80">
          {machine.badge}
        </span>
      </div>

      {/* Studio Pedestal Stage — Full Uncut Transparent Machine View */}
      <div className="relative z-10 mx-5 my-4 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl">
        {/* Ambient Floating Halo */}
        <div className="pointer-events-none absolute size-48 rounded-full bg-signal/20 blur-3xl animate-pulse-halo" />
        <div className="pointer-events-none absolute size-36 rounded-full bg-[#009246]/15 blur-2xl" />

        <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-b from-white/[0.06] to-black/35 p-4 ring-1 ring-white/15 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <img
            src={machine.image}
            alt={machine.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="machine-shadow animate-float-machine max-h-full max-w-full object-contain"
          />
        </div>

        {/* Floating Feature Callout Chips at Bottom of Stage */}
        {machine.floatingFeatures && machine.floatingFeatures.length > 0 && (
          <div className="pointer-events-none absolute inset-x-2.5 bottom-2.5 z-20 flex flex-wrap justify-between gap-1.5">
            {machine.floatingFeatures.slice(0, 2).map((feat, idx) => (
              <span
                key={feat}
                style={{ animationDelay: `${idx * 0.8}s` }}
                className="animate-float-badge rounded-full border border-white/25 bg-ink/85 px-2.5 py-0.5 text-[10px] font-medium text-white shadow-lg backdrop-blur-md"
              >
                ✦ {feat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer Info & Specs */}
      <div className="relative z-10 flex flex-col justify-between border-t border-white/10 bg-ink/60 px-5 pb-5 pt-4 backdrop-blur-sm">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {machine.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] text-white/85"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg sm:text-xl text-white leading-snug">
              {machine.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs text-white/75">{machine.tagline}</p>
            {machine.specs[0] && (
              <p className="mt-2 text-[11px] text-emerald-400 font-medium">
                {machine.specs[0].label}: <span className="text-white">{machine.specs[0].value}</span>
              </p>
            )}
          </div>
          <ArrowCircle />
        </div>
      </div>
    </Link>
  );
}

export function MachineSpotlightCard({ machine }: { machine: Machine }) {
  return (
    <Link
      to="/machines/$slug"
      params={{ slug: machine.slug }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-ink text-ink-foreground shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="absolute inset-0 studio-luxury" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] bg-gradient-to-r from-[#009246] via-white to-[#CE2B37]" />

      <div className="relative z-10 flex items-center justify-between px-5 pt-4">
        <span className="glass rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
          {machine.brand ?? 'IMA SpA'} · {machine.badge}
        </span>
        <span className="text-[11px] font-medium text-white/65">{machine.category}</span>
      </div>

      <div className="relative z-10 mx-5 my-3.5 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl">
        <div className="pointer-events-none absolute size-40 rounded-full bg-signal/20 blur-2xl animate-pulse-halo" />
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-b from-white/[0.06] to-black/35 p-3.5 ring-1 ring-white/15 transition-transform duration-700 group-hover:scale-[1.04]">
          <img
            src={machine.image}
            alt={machine.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="machine-shadow animate-float-machine max-h-full max-w-full object-contain"
          />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between gap-4 border-t border-white/10 bg-ink/70 px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl text-white truncate">{machine.name}</p>
          <p className="mt-0.5 line-clamp-1 text-xs text-white/75">{machine.tagline}</p>
        </div>
        <ArrowCircle />
      </div>
    </Link>
  );
}

export function MachineCatalogCard({ machine }: { machine: Machine }) {
  return (
    <Link
      to="/machines/$slug"
      params={{ slug: machine.slug }}
      className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-3.5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div>
        <div className="studio-luxury relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl p-3">
          <span className="glass absolute left-3 top-3 z-20 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            {machine.brand ?? 'IMA SpA'}
          </span>
          <span className="glass absolute right-3 top-3 z-20 rounded-full px-2.5 py-0.5 text-[10px] font-medium text-white/90">
            {machine.category}
          </span>
          <div className="flex h-full w-full items-center justify-center rounded-lg p-3 pt-7 transition-transform duration-700 group-hover:scale-[1.04]">
            <img
              src={machine.image}
              alt={machine.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="machine-shadow animate-float-machine max-h-full max-w-full object-contain"
            />
          </div>
        </div>
        <div className="px-2 pt-4">
          <p className="eyebrow text-signal">{machine.badge}</p>
          <h3 className="mt-1.5 font-display text-xl sm:text-2xl text-foreground">
            {machine.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
            {machine.tagline}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border px-2 pt-3">
        <div className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">
            {machine.specs[0]?.value}
          </span>{' '}
          · {machine.specs[0]?.label}
        </div>
        <ArrowCircle dark={true} />
      </div>
    </Link>
  );
}

export function DiscoverCard({
  to,
  image,
  alt,
  title,
}: {
  to: string;
  image: string;
  alt: string;
  title: string;
}) {
  return (
    <Link
      to={to}
      className="group relative block aspect-square overflow-hidden rounded-2xl text-ink-foreground"
    >
      <div className="absolute inset-0 studio transition-transform duration-[1200ms] group-hover:scale-105" />
      <div className="absolute inset-0 flex items-center justify-center px-[10%] pb-[18%]">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="machine-shadow max-h-[62%] w-full object-contain transition-transform duration-[1200ms] group-hover:scale-[1.06]"
        />
      </div>
      <div className="absolute inset-0 shade-card" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7">
        <p className="font-display text-2xl leading-tight">{title}</p>
        <ArrowCircle />
      </div>
    </Link>
  );
}
