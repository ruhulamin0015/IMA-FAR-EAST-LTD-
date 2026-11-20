import { useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Layers,
  Maximize2,
  Sparkles,
  X,
} from 'lucide-react';
import {
  ABOUT_US_TEXT,
  GALLERY_ITEMS,
  IMAGES,
  MACHINES,
  MACHINE_CATEGORIES,
  Machine,
  MachineCategory,
  getMachineBySlug,
} from '../data/machines';
import { Link } from '../router';
import { CinematicIntro } from '../components/site/CinematicIntro';
import { HeroSlider } from '../components/site/HeroSlider';
import {
  CATEGORY_COLOR_MAP,
  ExplodedBrandConstellation,
} from '../components/site/ExplodedBrandConstellation';
import {
  DiscoverCard,
  MachineShowcaseCard,
  MachineSpotlightCard,
} from '../components/site/MachineCards';
import { PrincipalPartnersSection } from '../components/site/PrincipalPartnersSection';
import { DynamicTeamSection } from '../components/site/DynamicTeamSection';
import { PdfCatalogVaultSection } from '../components/site/PdfCatalogVaultSection';
import { CorporateMachineryVideoSection } from '../components/site/CorporateMachineryVideoSection';
import { Button } from '../components/ui/button';

const SPOTLIGHT_MACHINES = [
  'typhoon-70',
  '890b-phoenix',
  '890h-heavy-duty',
  'rotondi-fp-touch-series',
  'framis-mxc-205-d-se-weld-cut',
  'newtech-3000-11-back-pocket-setter',
  'nexia-ns420-520-alltogether-washer',
  '892-mithos',
]
  .map((slug) => getMachineBySlug(slug))
  .filter((m): m is NonNullable<typeof m> => Boolean(m));

const BRAND_SHOWCASE_SECTIONS = [
  {
    id: 'brand-ima',
    number: '01',
    brandKey: 'IMA SpA',
    headline: 'IMA SpA ITALY — Automated Cutting Room, Phoenix Spreaders & Syncro Tables',
    subheadline:
      'Palazzolo sull’Oglio (Brescia), Italy · Complete CNC Cutters (Typhoon, Zephiro, Tempest), Phoenix 890 Spreaders, 892 Mithos 4x4 & Modular Syncro Tables',
    accent: 'from-emerald-500 via-teal-400 to-green-500',
    accentHex: '#10b981',
    badge: '17 Italian Cutting Room Machines',
  },
  {
    id: 'brand-rotondi',
    number: '02',
    brandKey: 'ROTONDI Group',
    headline: 'ROTONDI GROUP MILAN — Continuous Fusing Presses & Complete Shirt Finishing Line',
    subheadline:
      'Settimo Milanese (Milan), Italy · FP Touch 9-Zone Fusing Line, G & MG Series, SH-5/SH-10 Collar Fusing, SR-3100 Blowing Finisher & ARSH Double-Dummy Press',
    accent: 'from-blue-600 via-sky-400 to-indigo-500',
    accentHex: '#3b82f6',
    badge: '11 Italian Fusing & Shirt Machines',
  },
  {
    id: 'brand-framis',
    number: '03',
    brandKey: 'Framis Italia SpA',
    headline: 'FRAMIS ITALIA SpA — NoSo® Seamless Bonding, 28kHz Ultrasonic & Heat Presses',
    subheadline:
      'Gaggiano (Milan), Italy · Signature 2026 APAC MXC Weld & Cut, Edge Binding, 28kHz Ultrasonic MU 281, MR 900 Laminator, MC201Z Zipper Welder & MPHK Vacuum Chiller Presses',
    accent: 'from-rose-600 via-pink-500 to-red-500',
    accentHex: '#f43f5e',
    badge: '13 Italian Sewfree Bonding Machines',
  },
  {
    id: 'brand-newtech',
    number: '04',
    brandKey: 'New-tecH',
    headline: 'NEW-TECH SEWING SYSTEMS — Jacket, Casual & Jean (KOT) & Knitwear Automation',
    subheadline:
      'Istanbul, Turkey (Since 1972) · 3-Axis Cold-Fold Pocket Setters, 2,000/8h Jacket Pocket Welting, 14,000/Day Pocket Hemmers, Sleeve Setters, Kangaroo Pocket & Yamato Bottom Hemmers',
    accent: 'from-amber-500 via-orange-400 to-purple-500',
    accentHex: '#f59e0b',
    badge: '24 CNC Sewing Automats',
  },
  {
    id: 'brand-nexia',
    number: '05',
    brandKey: 'NEXIA',
    headline: 'NEXIA ITALY (SINCE 1871) — AllTogether® Eco Denim Laundry, Ozone, Laser & Nitrogen Dyeing',
    subheadline:
      'Rosà (Vicenza), Italy · NS 260/420/520 AllTogether® Washers (-85% Water, -87% Chemicals), Wave® & NDrop®, NEO³ Ozone, Nexstone®, NDRY Circular Energy Dryers, NRAY 4/3/2 Lasers & NITROGEN® Airless Dyeing',
    accent: 'from-cyan-400 via-teal-400 to-sky-500',
    accentHex: '#06b6d4',
    badge: '10 Italian Smart Laundry & Laser Systems',
  },
];

const STATS = [
  { value: '1977', label: 'IMA SpA founded in Brescia' },
  { value: '100+', label: 'Client factories in Bangladesh' },
  { value: `${MACHINES.length}`, label: 'Industrial machines in catalog' },
  { value: '26', label: 'Full-time in-house engineers' },
];

type FleetCategoryFilter = 'All' | MachineCategory;

export function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<FleetCategoryFilter>('All');
  const [viewMode, setViewMode] = useState<'by-brand' | 'by-category'>('by-brand');
  const [quickModalMachine, setQuickModalMachine] = useState<Machine | null>(null);
  const [selectedDetailImageIdx, setSelectedDetailImageIdx] = useState(0);
  const [isZoomedPreview, setIsZoomedPreview] = useState(false);

  const activeMachine = MACHINES[activeIndex] ?? MACHINES[0];
  const filteredGridMachines =
    categoryFilter === 'All'
      ? MACHINES
      : MACHINES.filter((m) => m.category === categoryFilter);

  const handleSelectMachine = (idx: number) => {
    setActiveIndex(idx);
    setSelectedDetailImageIdx(0);
  };

  const handlePrevMachine = () => {
    handleSelectMachine((activeIndex - 1 + MACHINES.length) % MACHINES.length);
  };

  const handleNextMachine = () => {
    handleSelectMachine((activeIndex + 1) % MACHINES.length);
  };

  const previewImages = [activeMachine.image, ...activeMachine.gallery];
  const currentPreviewImg = previewImages[selectedDetailImageIdx] ?? activeMachine.image;

  return (
    <>
      <CinematicIntro />
      <HeroSlider />

      {/* Page 2: Interactive 5-Brand & 9-Category Exploded Constellation */}
      <ExplodedBrandConstellation
        onSelectMachineForModal={(m) => setQuickModalMachine(m)}
        onJumpToBrandSection={(anchor) => {
          setViewMode('by-brand');
          const el = document.getElementById(anchor);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        onSelectCategoryFilter={(cat) => {
          setCategoryFilter(cat);
        }}
      />

      {/* Colorful Brand Identity & Principal Brand Headlines Bar */}
      <section className="relative overflow-hidden border-b border-white/15 bg-gradient-to-br from-[#061326] via-[#0b1630] to-[#120b24] text-white py-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#009246] via-cyan-400 via-50% to-[#CE2B37]" />
        <div
          className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -right-24 -bottom-24 size-72 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #f43f5e 0%, transparent 70%)' }}
        />

        <div className="site-container relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div className="flex items-center gap-4">
              <div className="relative flex size-16 items-center justify-center rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-rose-500/20 p-1.5 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                <img
                  src={IMAGES.ifelLogo}
                  alt="IFEL — IMA Far East Ltd."
                  referrerPolicy="no-referrer"
                  className="size-13 object-contain drop-shadow-md"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="wordmark text-sm sm:text-base font-bold bg-gradient-to-r from-emerald-300 via-white to-amber-300 bg-clip-text text-transparent">
                    IMA FAR EAST LTD.
                  </p>
                  <span className="inline-flex h-2 w-5 overflow-hidden rounded-xs">
                    <span className="w-1/3 bg-[#009246]" />
                    <span className="w-1/3 bg-white" />
                    <span className="w-1/3 bg-[#CE2B37]" />
                  </span>
                </div>
                <p className="mt-0.5 text-xs sm:text-sm text-cyan-100/85">
                  Official Bangladesh Liaison &amp; Technical Engineering Partner ·{' '}
                  <span className="font-semibold text-emerald-300">{MACHINES.length} Industrial Machines</span>{' '}
                  Across <span className="font-semibold text-amber-300">100+ Garment Factories</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/machines"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_8px_24px_rgba(244,63,94,0.4)] transition-transform hover:scale-[1.03]"
              >
                <Layers className="size-4" />
                Full {MACHINES.length}-Machine Matrix
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_8px_24px_rgba(16,185,129,0.4)] transition-transform hover:scale-[1.03]"
              >
                <Sparkles className="size-4" />
                About IMA Far East Ltd.
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* All Brands & Machineries Color-Coded Quick Headline Strip */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {BRAND_SHOWCASE_SECTIONS.map((b) => {
              const count = MACHINES.filter((m) => (m.brand ?? 'IMA SpA') === b.brandKey).length;
              return (
                <a
                  key={b.id}
                  href={`#${b.id}`}
                  onClick={() => setViewMode('by-brand')}
                  style={{
                    borderColor: `${b.accentHex}88`,
                    background: `linear-gradient(145deg, ${b.accentHex}2e 0%, rgba(10,18,36,0.92) 100%)`,
                    boxShadow: `0 10px 28px -10px ${b.accentHex}44`,
                  }}
                  className="group flex flex-col justify-between rounded-2xl border-2 p-4 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-[10px] font-extrabold uppercase tracking-widest"
                      style={{ color: b.accentHex }}
                    >
                      BRAND {b.number} · {b.brandKey}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-extrabold text-white shadow-sm"
                      style={{ backgroundColor: b.accentHex }}
                    >
                      {count} Machines
                    </span>
                  </div>
                  <p className="mt-2 font-display text-sm sm:text-base font-medium text-white group-hover:opacity-95 transition-opacity">
                    {b.headline.split('—')[1]?.trim() ?? b.headline}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flagship 6-Machine Multi-Brand Spotlight */}
      <section className="site-container py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-signal">Flagship Industrial Benchmark</p>
            <h2 className="display-md mt-2">
              Italian Cutting, Spreading, Fusing, Bonding, Sewing &amp; Smart Laundry.
            </h2>
          </div>
          <p className="max-w-md text-xs text-muted-foreground">
            Featuring flagship engineering from IMA SpA, ROTONDI Group, FRAMIS ITALIA, New-tecH
            Sewing Systems, and NEXIA Smart Laundry—extracted directly from official manufacturer
            dossiers.
          </p>
        </div>
        <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SPOTLIGHT_MACHINES.map((machine) => (
            <MachineSpotlightCard key={machine.slug} machine={machine} />
          ))}
        </div>
      </section>

      {/* Interactive Multi-Brand Studio Deck & Brand-by-Brand / Machine-by-Machine Showcase */}
      <section className="relative">
        <div className="site-container pb-10 pt-4">
          <p className="eyebrow text-signal">
            Complete {MACHINES.length}-Machine Luxury Industrial Fleet
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-xl max-w-5xl">
              Every Brand. Every Machine. Full Studio Preview.
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Inspect all {MACHINES.length} industrial machines across IMA SpA, ROTONDI Group,
              FRAMIS ITALIA, New-tecH, and NEXIA in our interactive Full Machine Preview Studio or
              browse every brand and machinery series below.
            </p>
          </div>
        </div>

        {/* One-by-One Interactive Floating Studio Inspector */}
        <div className="bg-ink py-16 text-ink-foreground">
          <div className="site-container">
            {/* Selector Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#009246]/40 bg-[#009246]/15 px-3 py-1 text-xs font-medium text-white">
                  <Sparkles className="size-3.5 text-[#009246]" />
                  Full Machine Preview System
                </span>
                <p className="eyebrow text-ink-muted">
                  Machine {String(activeIndex + 1).padStart(2, '0')} of{' '}
                  {String(MACHINES.length).padStart(2, '0')} · {activeMachine.brand ?? 'IMA SpA'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsZoomedPreview(true)}
                  className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-glass-strong cursor-pointer"
                >
                  <Maximize2 className="size-3.5 text-[#009246]" /> Full-Screen HD Inspect
                </button>
                <button
                  type="button"
                  onClick={handlePrevMachine}
                  className="glass inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-glass-strong cursor-pointer"
                  aria-label="Previous machine"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMachine}
                  className="glass inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-glass-strong cursor-pointer"
                  aria-label="Next machine"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Scrollable / Grid Selector Strip for All Machines */}
            <div className="mb-10 grid max-h-[240px] grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {MACHINES.map((m, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={m.slug}
                    type="button"
                    onClick={() => handleSelectMachine(idx)}
                    className={`group flex flex-col items-start rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-signal bg-ink-soft shadow-lg ring-1 ring-signal'
                        : 'border-ink-border bg-ink/50 hover:border-ink-foreground/40 hover:bg-ink-soft/60'
                    }`}
                  >
                    <span
                      className={`text-[9px] font-semibold uppercase tracking-widest ${
                        isSelected ? 'text-signal' : 'text-ink-muted'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')} · {m.brand ?? m.category}
                    </span>
                    <span className="mt-1 line-clamp-1 font-display text-xs sm:text-sm text-ink-foreground">
                      {m.headline.replace('.', '')}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Machine Floating Studio Stage — Clean Transparent Machine Cutout */}
            <div
              key={activeMachine.slug}
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-ink-soft shadow-2xl"
            >
              <div className="absolute inset-0 studio-luxury" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#009246] via-white to-[#CE2B37]" />

              <div className="relative grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1.25fr_1fr] lg:p-14">
                {/* Visual Stage + Floating Feature Callouts + Angle Switcher */}
                <div className="flex flex-col items-center">
                  <div
                    onClick={() => setIsZoomedPreview(true)}
                    className="group/stage relative flex aspect-[16/10] w-full items-center justify-center cursor-zoom-in"
                  >
                    {/* Ambient Glow Behind Floating Machine */}
                    <div className="pointer-events-none absolute size-80 rounded-full bg-signal/20 blur-3xl animate-pulse-halo" />
                    <div className="pointer-events-none absolute size-64 rounded-full bg-[#009246]/15 blur-3xl" />

                    {/* Floating Feature Callout Badges */}
                    {activeMachine.floatingFeatures &&
                      activeMachine.floatingFeatures.length > 0 && (
                        <div className="pointer-events-none absolute inset-x-3 top-3 z-20 flex flex-wrap justify-between gap-2">
                          {activeMachine.floatingFeatures.map((feat, fIdx) => (
                            <span
                              key={feat}
                              style={{ animationDelay: `${fIdx * 0.7}s` }}
                              className="animate-float-badge inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-ink/90 px-3.5 py-1.5 text-xs font-medium text-white shadow-xl backdrop-blur-md"
                            >
                              <span className="size-2 rounded-full bg-[#009246]" />
                              {feat}
                            </span>
                          ))}
                        </div>
                      )}

                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-b from-white/[0.06] to-black/35 p-6 pt-12 ring-1 ring-white/15 transition-all group-hover/stage:ring-white/35">
                      <img
                        key={currentPreviewImg}
                        src={currentPreviewImg}
                        alt={activeMachine.name}
                        referrerPolicy="no-referrer"
                        className="machine-shadow machine-reflect animate-float-machine max-h-[360px] w-full object-contain transition-transform duration-500 group-hover/stage:scale-[1.03]"
                      />
                    </div>
                  </div>

                  {/* Thumbnail Angle / Datasheet Switcher */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    {previewImages.map((imgUrl, i) => (
                      <button
                        key={imgUrl + i}
                        type="button"
                        onClick={() => setSelectedDetailImageIdx(i)}
                        className={`overflow-hidden rounded-xl border p-1.5 transition-all cursor-pointer ${
                          selectedDetailImageIdx === i
                            ? 'border-signal bg-white/15 scale-105 shadow-lg ring-1 ring-signal'
                            : 'border-white/15 bg-white/5 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${activeMachine.name} view ${i + 1}`}
                          referrerPolicy="no-referrer"
                          className="h-12 w-16 rounded object-contain"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Machine Details & Telemetry */}
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-signal px-3 py-1 text-xs font-medium text-signal-foreground">
                      Machine {String(activeIndex + 1).padStart(2, '0')} of {MACHINES.length}
                    </span>
                    <span className="glass rounded-full px-3 py-1 text-xs font-medium">
                      {activeMachine.brand ?? 'IMA SpA'} · {activeMachine.origin ?? 'Italy'}
                    </span>
                    <span className="glass rounded-full px-3 py-1 text-xs">
                      {activeMachine.category}
                    </span>
                    <span className="glass rounded-full px-3 py-1 text-xs">
                      {activeMachine.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="display-lg">{activeMachine.name}</h3>
                    <p className="mt-2 text-lg text-ink-muted">{activeMachine.tagline}</p>
                  </div>

                  <p className="text-sm leading-relaxed text-ink-muted">
                    {activeMachine.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 border-y border-ink-border py-5">
                    {activeMachine.specs.map((spec) => (
                      <div key={spec.label}>
                        <p className="font-display text-xl text-ink-foreground">{spec.value}</p>
                        <p className="text-xs text-ink-muted">{spec.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="signal" size="xl">
                      <Link to="/machines/$slug" params={{ slug: activeMachine.slug }}>
                        Full technical profile <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      type="button"
                      variant="glass"
                      size="xl"
                      onClick={() => setIsZoomedPreview(true)}
                    >
                      <Maximize2 className="size-4" /> Full Machine Preview
                    </Button>
                    {activeMachine.pdfUrl && (
                      <Button asChild variant="glass" size="xl">
                        <a
                          href={activeMachine.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="size-4" /> Official PDF Brochure
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* View Mode Toggle: Brand-by-Brand One-by-One vs Category Filter */}
            <div className="mt-24 mb-12 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
              <div>
                <p className="eyebrow text-[#009246]">
                  All Brands &amp; Machineries One-by-One Showcase ({MACHINES.length} Models)
                </p>
                <h3 className="display-md mt-2">
                  Complete Industrial Machinery Lineup by Principal Brand &amp; Category
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setViewMode('by-brand')}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    viewMode === 'by-brand'
                      ? 'bg-[#009246] text-white shadow-lg'
                      : 'glass text-white/80 hover:bg-white/15'
                  }`}
                >
                  <Layers className="size-4" /> Show By Principal Brand (One by One)
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('by-category')}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    viewMode === 'by-category'
                      ? 'bg-signal text-signal-foreground shadow-lg'
                      : 'glass text-white/80 hover:bg-white/15'
                  }`}
                >
                  Filter By 9 Categories
                </button>
              </div>
            </div>

            {viewMode === 'by-brand' ? (
              <div className="space-y-24">
                {BRAND_SHOWCASE_SECTIONS.map((brandSec) => {
                  const brandMachines = MACHINES.filter(
                    (m) => (m.brand ?? 'IMA SpA') === brandSec.brandKey
                  );
                  const brandCategories = Array.from(
                    new Set(brandMachines.map((m) => m.category))
                  );
                  return (
                    <div key={brandSec.id} id={brandSec.id} className="scroll-mt-24">
                      {/* Brand Headline Banner */}
                      <div
                        style={{
                          borderColor: `${brandSec.accentHex}55`,
                          background: `linear-gradient(145deg, ${brandSec.accentHex}18 0%, rgba(15,23,42,0.85) 75%)`,
                        }}
                        className="relative mb-10 overflow-hidden rounded-3xl border-2 p-6 sm:p-10"
                      >
                        <div
                          className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${brandSec.accent}`}
                        />
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              style={{ backgroundColor: brandSec.accentHex }}
                              className="inline-flex size-10 items-center justify-center rounded-xl font-display text-lg font-black text-white shadow-md"
                            >
                              {brandSec.number}
                            </span>
                            <span
                              style={{
                                borderColor: `${brandSec.accentHex}88`,
                                backgroundColor: `${brandSec.accentHex}25`,
                              }}
                              className="rounded-full border px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-white"
                            >
                              {brandSec.brandKey}
                            </span>
                            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                              {brandMachines.length} Individual Machines
                            </span>
                            {brandCategories.map((cat) => {
                              const cTheme = CATEGORY_COLOR_MAP[cat];
                              return (
                                <span
                                  key={cat}
                                  style={{
                                    borderColor: `${cTheme.hex}88`,
                                    backgroundColor: `${cTheme.hex}25`,
                                  }}
                                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold text-white"
                                >
                                  <span
                                    className="size-2 rounded-full"
                                    style={{ backgroundColor: cTheme.hex }}
                                  />
                                  {cat} ({brandMachines.filter((m) => m.category === cat).length})
                                </span>
                              );
                            })}
                          </div>
                          <Link
                            to="/machines"
                            style={{ color: brandSec.accentHex }}
                            className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider hover:underline"
                          >
                            View in Full Matrix <ArrowRight className="size-3.5" />
                          </Link>
                        </div>
                        <h4 className="display-md mt-4 text-white">{brandSec.headline}</h4>
                        <p className="mt-2 max-w-4xl text-sm text-white/75">
                          {brandSec.subheadline}
                        </p>
                      </div>

                      {/* Sub-Line / Category Groupings Inside Each Principal Brand */}
                      <div className="space-y-14">
                        {brandCategories.map((subCat) => {
                          const subMachines = brandMachines.filter((m) => m.category === subCat);
                          const cTheme = CATEGORY_COLOR_MAP[subCat];
                          return (
                            <div key={subCat}>
                              {brandCategories.length > 1 && (
                                <div
                                  style={{ borderColor: cTheme.hex }}
                                  className="mb-6 flex flex-wrap items-center justify-between gap-3 border-l-4 pl-4"
                                >
                                  <div>
                                    <p
                                      style={{ color: cTheme.hex }}
                                      className="text-[11px] font-extrabold uppercase tracking-widest"
                                    >
                                      {brandSec.brandKey} · {subCat} Division
                                    </p>
                                    <h5 className="font-display text-xl sm:text-2xl text-white">
                                      {subCat === 'Spreaders'
                                        ? 'All Automatic Spreader Machines — Phoenix 890 Series & 892 Mithos'
                                        : subCat === 'Cutters'
                                          ? 'Automatic High-Ply & Single-Ply CNC Cutters'
                                          : subCat === 'Tables'
                                            ? 'Syncro Modular, Air-Blowing, Transfer, Pin & Multilevel Tables'
                                            : subCat === 'Jacket Automation'
                                              ? 'Jacket Line (Ceket Grubu) — Pocket Welting, Sleeve Setters & Sartorial Stitch'
                                              : subCat === 'Jeans & Casual'
                                                ? 'Casual & Jean Line (KOT Bandı) — 3-Axis Pocket Setters, Hemmers & Serging'
                                                : subCat === 'Knitwear Automation'
                                                  ? 'Knitwear Line (Örgü Grubu) — Kangaroo Pocket, Yamato Hemmer & Laser Placket'
                                                  : subCat === 'Smart Laundry & Laser'
                                                    ? 'Laundry Smart Evolution — AllTogether® Washers, NEO³ Ozone, NDRY Dryers, NRAY Laser & NITROGEN®'
                                                    : subCat}
                                    </h5>
                                  </div>
                                  <span
                                    style={{
                                      borderColor: `${cTheme.hex}66`,
                                      backgroundColor: `${cTheme.hex}20`,
                                    }}
                                    className="rounded-full border px-3.5 py-1 text-xs font-bold text-white"
                                  >
                                    {subMachines.length} Models in {subCat}
                                  </span>
                                </div>
                              )}

                              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {subMachines.map((machine, mIdx) => (
                                  <div key={machine.slug} className="relative group/card">
                                    <div
                                      style={{ backgroundColor: cTheme.hex }}
                                      className="pointer-events-none absolute left-5 top-14 z-20 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold tracking-widest uppercase text-white shadow-md"
                                    >
                                      #{String(mIdx + 1).padStart(2, '0')} · {machine.category}
                                    </div>
                                    <MachineShowcaseCard machine={machine} />
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setQuickModalMachine(machine);
                                      }}
                                      className="glass absolute right-5 top-14 z-20 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-ink-foreground opacity-0 transition-opacity group-hover/card:opacity-100 hover:bg-glass-strong cursor-pointer"
                                    >
                                      <Eye className="size-3.5" /> Full Preview
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <div className="mb-8 flex flex-wrap gap-2">
                  {(['All', ...MACHINE_CATEGORIES] as FleetCategoryFilter[]).map((cat) => {
                    const isAll = cat === 'All';
                    const cTheme = !isAll ? CATEGORY_COLOR_MAP[cat] : null;
                    const active = categoryFilter === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategoryFilter(cat)}
                        style={
                          !isAll && cTheme
                            ? {
                                backgroundColor: active ? cTheme.hex : `${cTheme.hex}1a`,
                                borderColor: active ? '#ffffff' : `${cTheme.hex}66`,
                              }
                            : undefined
                        }
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          isAll
                            ? active
                              ? 'border-white bg-emerald-600 text-white shadow-lg'
                              : 'border-white/20 glass text-ink-foreground hover:bg-glass-strong'
                            : 'text-white hover:scale-105'
                        }`}
                      >
                        {!isAll && cTheme && (
                          <span
                            className="size-2 rounded-full bg-white"
                            style={{ backgroundColor: active ? '#ffffff' : cTheme.hex }}
                          />
                        )}
                        <span>
                          {cat} (
                          {cat === 'All'
                            ? MACHINES.length
                            : MACHINES.filter((m) => m.category === cat).length}
                          )
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredGridMachines.map((machine) => {
                    const cTheme = CATEGORY_COLOR_MAP[machine.category];
                    return (
                      <div key={machine.slug} className="relative group/card">
                        {cTheme && (
                          <div
                            style={{ backgroundColor: cTheme.hex }}
                            className="pointer-events-none absolute left-5 top-14 z-20 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold tracking-widest uppercase text-white shadow-md"
                          >
                            {machine.brand ?? 'IMA SpA'} · {machine.category}
                          </div>
                        )}
                        <MachineShowcaseCard machine={machine} />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setQuickModalMachine(machine);
                          }}
                          className="glass absolute right-5 top-14 z-20 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs text-ink-foreground opacity-0 transition-opacity group-hover/card:opacity-100 hover:bg-glass-strong cursor-pointer"
                        >
                          <Eye className="size-3.5" /> Full Preview
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-16 text-center">
              <Button asChild variant="glass" size="xl">
                <Link to="/machines">
                  Explore full technical catalog &amp; matrix ({MACHINES.length} machines)
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-t border-ink-border bg-ink text-ink-foreground">
        <div className="site-container grid grid-cols-2 gap-y-12 py-20 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="border-l border-ink-border pl-6">
              <p className="display-lg">{stat.value}</p>
              <p className="mt-2 text-sm text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10 Official PDF Brochures Vault + Framis Italia 2025 + Official Bangladesh Client Roster */}
      <PdfCatalogVaultSection showClients={true} />

      {/* Colorful Creative About IMA Far East Ltd. Highlight Section on Homepage */}
      <section className="site-container py-20">
        <div className="relative overflow-hidden rounded-[32px] border-2 border-emerald-400/30 bg-gradient-to-br from-[#071527] via-[#0c1d3a] to-[#17102c] p-6 sm:p-10 lg:p-14 text-white shadow-[0_30px_90px_rgba(4,12,30,0.55)]">
          {/* Vibrant Top Italian Tricolore + Spectrum Ribbon */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#009246] via-cyan-400 via-50% to-[#CE2B37]" />
          <div
            className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full blur-3xl opacity-35"
            style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
          />
          <div
            className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full blur-3xl opacity-35"
            style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
          />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[280px_1fr]">
            {/* Left Creative Leadership & Emblem Card */}
            <div className="flex flex-col items-center rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-6 text-center backdrop-blur-md shadow-xl">
              <div className="relative flex size-36 sm:size-44 items-center justify-center rounded-full border-2 border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-rose-500/20 p-4 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                <img
                  src={IMAGES.ifelLogo}
                  alt="IFEL — IMA Far East Ltd."
                  referrerPolicy="no-referrer"
                  className="size-full object-contain drop-shadow-xl"
                />
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow">
                Managing Director
              </span>
              <p className="mt-2 font-display text-lg font-bold text-white">
                M. Borhan Uddin Ahmed
              </p>
              <p className="mt-1 text-xs text-cyan-200/80">
                Dhaka · Chattogram · Savar · Gazipur
              </p>

              {/* Quick Colorful Impact Strip */}
              <div className="mt-4 grid w-full grid-cols-2 gap-2 border-t border-white/10 pt-4">
                <div className="rounded-xl bg-emerald-500/15 border border-emerald-400/30 p-2">
                  <p className="font-display text-lg font-black text-emerald-300">100+</p>
                  <p className="text-[10px] text-white/75">Factories</p>
                </div>
                <div className="rounded-xl bg-amber-500/15 border border-amber-400/30 p-2">
                  <p className="font-display text-lg font-black text-amber-300">26</p>
                  <p className="text-[10px] text-white/75">Engineers</p>
                </div>
              </div>
            </div>

            {/* Right Colorful Readable Content Area */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/15 px-4 py-1.5">
                <span className="inline-flex h-2.5 w-6 overflow-hidden rounded-xs">
                  <span className="w-1/3 bg-[#009246]" />
                  <span className="w-1/3 bg-white" />
                  <span className="w-1/3 bg-[#CE2B37]" />
                </span>
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-200">
                  About IMA FAR EAST LTD.
                </span>
              </div>

              <h2 className="display-md mt-4 bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                Empowering over 100 apparel &amp; textile factories across Bangladesh.
              </h2>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/85">
                {ABOUT_US_TEXT.lead}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cyan-100/75">
                {ABOUT_US_TEXT.body1}
              </p>

              {/* Color-Coded Principal Brand Badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {ABOUT_US_TEXT.principals.map((p, i) => {
                  const palette = [
                    { bg: 'rgba(16,185,129,0.2)', border: '#10b981', text: '#6ee7b7' },
                    { bg: 'rgba(59,130,246,0.2)', border: '#3b82f6', text: '#93c5fd' },
                    { bg: 'rgba(244,63,94,0.2)', border: '#f43f5e', text: '#fda4af' },
                    { bg: 'rgba(245,158,11,0.2)', border: '#f59e0b', text: '#fcd34d' },
                    { bg: 'rgba(6,182,212,0.2)', border: '#06b6d4', text: '#67e8f9' },
                  ];
                  const col = palette[i % palette.length];
                  return (
                    <span
                      key={p.name}
                      style={{
                        backgroundColor: col.bg,
                        borderColor: col.border,
                        color: col.text,
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold shadow-sm"
                    >
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: col.border }}
                      />
                      {p.name}
                    </span>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(16,185,129,0.4)] transition-transform hover:scale-[1.03]"
                >
                  Read Full About Us
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-gradient-to-r from-amber-500/20 to-rose-500/20 px-7 py-3.5 text-sm font-bold text-amber-100 hover:from-amber-500/35 hover:to-rose-500/35 transition-all"
                >
                  View Cinematic Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Corporate & 5-Brand Machinery Documentary Video in About Section */}
      <CorporateMachineryVideoSection />

      {/* World-Renowned Principal Partners Section — Clean Minimalist Italian Flag Gradient Theme */}
      <PrincipalPartnersSection showHeaderBanner={true} />

      {/* Meet Our Dynamic Team Section — MD, Director & Full 26-Member Roster */}
      <DynamicTeamSection />

      {/* Discover Grid */}
      <section className="site-container pt-24 pb-28">
        <h2 className="display-lg mb-16 text-center">Discover</h2>
        <div className="mx-auto grid max-w-[1320px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <DiscoverCard
            to="/about"
            image={IMAGES.ifelLogo}
            alt="About IMA Far East Ltd."
            title="About IMA Far East Ltd."
          />
          <DiscoverCard
            to="/gallery"
            image={GALLERY_ITEMS[0].src}
            alt="IMA Far East Ltd. Exhibition Gallery"
            title="Cinematic Exhibition Gallery."
          />
          <DiscoverCard
            to="/solutions"
            image={IMAGES.detailSyncro}
            alt="IMA Syncro cutting tables"
            title="Eight turnkey solutions."
          />
          <DiscoverCard
            to="/service"
            image={IMAGES.detailZephiroHead}
            alt="IMA Zephiro cutting head"
            title="26 engineers. One phone number."
          />
        </div>
      </section>

      {/* Full-Screen HD Machine Preview Lightbox (Live Studio Stage Zoom) */}
      {isZoomedPreview && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`Full preview of ${activeMachine.name}`}
          onClick={() => setIsZoomedPreview(false)}
        >
          <div
            className="studio-luxury relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/20 p-6 sm:p-10 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                  {activeMachine.brand ?? 'IMA SpA'} · {activeMachine.category} ·{' '}
                  {activeMachine.badge}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl text-white">
                  {activeMachine.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevMachine}
                  className="glass inline-flex size-10 items-center justify-center rounded-full hover:bg-white/20 cursor-pointer"
                  aria-label="Previous machine"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMachine}
                  className="glass inline-flex size-10 items-center justify-center rounded-full hover:bg-white/20 cursor-pointer"
                  aria-label="Next machine"
                >
                  <ChevronRight className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsZoomedPreview(false)}
                  className="glass inline-flex size-10 items-center justify-center rounded-full hover:bg-white/20 cursor-pointer"
                  aria-label="Close full preview"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            <div className="relative my-6 flex flex-1 items-center justify-center overflow-hidden">
              <div className="pointer-events-none absolute size-96 rounded-full bg-signal/20 blur-3xl" />
              <img
                src={currentPreviewImg}
                alt={activeMachine.name}
                referrerPolicy="no-referrer"
                className="machine-shadow max-h-[58vh] w-full object-contain"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
              <div className="flex flex-wrap gap-2">
                {previewImages.map((imgUrl, i) => (
                  <button
                    key={imgUrl + i}
                    type="button"
                    onClick={() => setSelectedDetailImageIdx(i)}
                    className={`overflow-hidden rounded-xl border p-1.5 transition-all cursor-pointer ${
                      selectedDetailImageIdx === i
                        ? 'border-signal bg-white/15 ring-1 ring-signal'
                        : 'border-white/15 bg-white/5 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${activeMachine.name} view ${i + 1}`}
                      referrerPolicy="no-referrer"
                      className="h-12 w-16 object-contain"
                    />
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="signal" size="lg">
                  <Link
                    to="/machines/$slug"
                    params={{ slug: activeMachine.slug }}
                    onClick={() => setIsZoomedPreview(false)}
                  >
                    Full Machine Page <ArrowRight className="size-4" />
                  </Link>
                </Button>
                {activeMachine.pdfUrl && (
                  <Button asChild variant="glass" size="lg">
                    <a href={activeMachine.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="size-4" /> Official PDF
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Quick Spec Sheet Modal */}
      {quickModalMachine && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={quickModalMachine.name}
          onClick={() => setQuickModalMachine(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-ink-border bg-ink text-ink-foreground p-6 sm:p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQuickModalMachine(null)}
              className="glass absolute right-6 top-6 inline-flex size-10 items-center justify-center rounded-full hover:bg-glass-strong cursor-pointer"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>

            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="studio-luxury relative flex aspect-[4/3] items-center justify-center rounded-2xl border border-white/15 p-6 shadow-xl">
                <img
                  src={quickModalMachine.image}
                  alt={quickModalMachine.name}
                  referrerPolicy="no-referrer"
                  className="machine-shadow animate-float-machine max-h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="eyebrow text-signal">
                  {quickModalMachine.brand ?? 'IMA SpA'} · {quickModalMachine.category} ·{' '}
                  {quickModalMachine.badge}
                </p>
                <h3 className="display-md mt-2">{quickModalMachine.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {quickModalMachine.description}
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-ink-border py-4">
                  {quickModalMachine.specs.map((s) => (
                    <div key={s.label}>
                      <dt className="text-xs text-ink-muted">{s.label}</dt>
                      <dd className="font-display text-lg text-ink-foreground">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild variant="signal" size="lg">
                    <Link
                      to="/machines/$slug"
                      params={{ slug: quickModalMachine.slug }}
                      onClick={() => setQuickModalMachine(null)}
                    >
                      Open Machine Page
                    </Link>
                  </Button>
                  {quickModalMachine.pdfUrl && (
                    <Button asChild variant="glass" size="lg">
                      <a
                        href={quickModalMachine.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="size-4" /> Official PDF
                      </a>
                    </Button>
                  )}
                  <Button asChild variant="glass" size="lg">
                    <Link to="/contact" onClick={() => setQuickModalMachine(null)}>
                      Request Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
