import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import {
  ABOUT_US_TEXT,
  EXECUTIVE_LEADERSHIP,
  IMAGES,
  MACHINES,
  MACHINE_CATEGORIES,
  MachineCategory,
  SITE_INFO,
} from '../../data/machines';
import { Link, useRouter } from '../../router';

type MegaPanelKey = 'machines' | 'solutions' | 'company' | null;

const TOP_NAV_ITEMS: Array<{
  label: string;
  to: string;
  megaKey?: Exclude<MegaPanelKey, null>;
}> = [
  { label: 'Machines', to: '/machines', megaKey: 'machines' },
  { label: 'About Us', to: '/about' },
  { label: 'Cinematic Gallery', to: '/gallery' },
  { label: 'Solutions', to: '/solutions', megaKey: 'solutions' },
  { label: '24/7 Service', to: '/service' },
  { label: 'Company & Heritage', to: '/company', megaKey: 'company' },
  { label: 'Contact & Audit', to: '/contact' },
];

const TURNKEY_SOLUTIONS_PREVIEW = [
  {
    n: '01',
    title: 'Syncro Cutting Room',
    partner: 'IMA SpA (Italy)',
    area: 'Spreading & CNC cutting',
  },
  {
    n: '02',
    title: 'NOSO® Ultrasonic Bonding',
    partner: 'Framis Italia',
    area: 'Bonding & heat seal',
  },
  {
    n: '03',
    title: 'Denim Jeans Automation',
    partner: 'SIP Italy',
    area: 'Pocket welting & stitching',
  },
  {
    n: '04',
    title: 'Pneumatic Steam Finishing',
    partner: 'Rotondi · Vomatex',
    area: 'Garment pressing & finishing',
  },
  {
    n: '05',
    title: 'True Rib & Medical Socks',
    partner: 'Busi Giovanni (Italy)',
    area: 'Circular sock knitting',
  },
  {
    n: '06',
    title: 'Multi-Head CAD & Quilting',
    partner: 'Richpeace',
    area: 'Embroidery, plotters & sewing',
  },
  {
    n: '07',
    title: 'Automated Warehouse Logistics',
    partner: 'OMMI · ONO Lean (Italy)',
    area: 'Intralogistics & storage',
  },
  {
    n: '08',
    title: 'Smart Laundry Evolution',
    partner: 'NEXIA (Italy)',
    area: 'Industrial washing systems',
  },
];

export function SiteHeader() {
  const { pathname } = useRouter();
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaPanelKey>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | MachineCategory>('All');
  const [hoveredMachineSlug, setHoveredMachineSlug] = useState<string>(MACHINES[0].slug);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<MegaPanelKey>('machines');

  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setActiveMega(null);
    setMobileNavOpen(false);
  }, [cleanPath]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMega(null);
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleMouseEnterMega = (key: MegaPanelKey) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMega(key);
  };

  const handleMouseLeaveHeader = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveMega(null);
    }, 160);
  };

  const filteredMachines =
    activeCategory === 'All'
      ? MACHINES
      : MACHINES.filter((m) => m.category === activeCategory);

  const previewMachine =
    MACHINES.find((m) => m.slug === hoveredMachineSlug) ??
    filteredMachines[0] ??
    MACHINES[0];

  const isSolidHeader = scrolled || activeMega !== null || mobileNavOpen;

  return (
    <header
      onMouseLeave={handleMouseLeaveHeader}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isSolidHeader
          ? 'bg-[#090b0f]/95 text-white shadow-[0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl'
          : 'shade-header text-ink-foreground'
      }`}
    >
      {/* Subtle Top Italian Tricolore Hairline */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#009246] via-white/90 to-[#CE2B37]" />

      <div className="site-container flex h-20 items-center justify-between gap-4">
        {/* Zone 1: Official IFEL Emblem + Wordmark */}
        <Link
          to="/"
          onClick={() => {
            setActiveMega(null);
            setMobileNavOpen(false);
          }}
          className="flex shrink-0 items-center gap-3 group"
          aria-label="IMA Far East Ltd. home"
        >
          <img
            src={IMAGES.ifelLogo}
            alt="IFEL Logo"
            referrerPolicy="no-referrer"
            className="size-10 sm:size-11 object-contain shrink-0 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          <span className="wordmark whitespace-nowrap text-[0.65rem] leading-none tracking-[0.22em] sm:text-xs xl:text-sm">
            IMA FAR EAST LTD.
          </span>
        </Link>

        {/* Zone 2: Full Desktop Top Bar Navigation (All 7 Sections + Interactive Mega Menu Triggers) */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-2"
        >
          {TOP_NAV_ITEMS.map((item) => {
            const isActive =
              item.to === '/machines'
                ? cleanPath === '/machines' || cleanPath.startsWith('/machines/')
                : cleanPath === item.to;
            const isMegaOpen = item.megaKey && activeMega === item.megaKey;

            return (
              <div
                key={item.to}
                onMouseEnter={() =>
                  handleMouseEnterMega(item.megaKey ? item.megaKey : null)
                }
                className="relative"
              >
                <Link
                  to={item.to}
                  onClick={() => setActiveMega(null)}
                  className={`relative inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-sm font-medium transition-colors ${
                    isActive || isMegaOpen
                      ? 'text-white'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.megaKey && (
                    <ChevronDown
                      className={`size-3.5 transition-transform duration-200 ${
                        isMegaOpen ? 'rotate-180 text-[#CE2B37]' : 'text-white/50'
                      }`}
                    />
                  )}
                  {/* Active Underline Indicator */}
                  <span
                    className={`pointer-events-none absolute inset-x-2.5 -bottom-1 h-[2px] rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#009246] via-white to-[#CE2B37] opacity-100'
                        : isMegaOpen
                          ? 'bg-white/60 opacity-100'
                          : 'opacity-0'
                    }`}
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Zone 3: Direct Hotline & Responsive Tablet/Mobile Toggle */}
        <div className="flex shrink-0 items-center gap-2.5">
          <a
            href={SITE_INFO.phoneHref}
            className="hidden xl:inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/90 transition-colors hover:border-white/35 hover:bg-white/[0.08] tabular-nums"
            aria-label={`Call 24/7 Hotline ${SITE_INFO.phone}`}
          >
            <Phone className="size-3.5 text-[#009246]" />
            <span>{SITE_INFO.phone}</span>
          </a>

          {/* Tablet & Mobile Hamburger Toggle (Only shown below lg breakpoint) */}
          <button
            type="button"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="inline-flex lg:hidden items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/15 cursor-pointer"
            aria-expanded={mobileNavOpen}
            aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
          >
            {mobileNavOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            <span>{mobileNavOpen ? 'Close' : 'Navigation'}</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          INTERACTIVE MEGA NAVIGATION DROPDOWN (DESKTOP)
         ===================================================================== */}
      {activeMega && (
        <div
          onMouseEnter={() => {
            if (closeTimeoutRef.current) {
              window.clearTimeout(closeTimeoutRef.current);
              closeTimeoutRef.current = null;
            }
          }}
          className="hidden lg:block border-t border-white/10 bg-[#0b0d12]/98 text-white shadow-2xl backdrop-blur-2xl animate-fade-in"
        >
          <div className="site-container py-8">
            {/* 1. MACHINES MEGA MENU */}
            {activeMega === 'machines' && (
              <div className="grid gap-8 lg:grid-cols-[240px_1fr_330px]">
                {/* Left Column: Category Filters */}
                <div className="flex flex-col justify-between border-r border-white/10 pr-6">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      Multi-Brand Fleet Categories
                    </p>
                    <div className="mt-3 flex max-h-[320px] flex-col gap-1 overflow-y-auto pr-1">
                      {(['All', ...MACHINE_CATEGORIES] as const).map((category) => {
                        const count =
                          category === 'All'
                            ? MACHINES.length
                            : MACHINES.filter((m) => m.category === category).length;
                        const active = activeCategory === category;
                        return (
                          <button
                            key={category}
                            type="button"
                            onClick={() => setActiveCategory(category)}
                            className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
                              active
                                ? 'bg-white text-black shadow-sm'
                                : 'text-white/75 hover:bg-white/[0.06] hover:text-white'
                            }`}
                          >
                            <span className="truncate">
                              {category === 'All' ? 'All Machines Fleet' : category}
                            </span>
                            <span
                              className={`ml-2 font-mono text-[11px] tabular-nums ${
                                active ? 'text-black/70' : 'text-white/45'
                              }`}
                            >
                              {String(count).padStart(2, '0')}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 border-t border-white/10 pt-3">
                    <Link
                      to="/machines"
                      onClick={() => setActiveMega(null)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#009246] hover:underline"
                    >
                      Explore Complete Catalog ({MACHINES.length})
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Center Column: Interactive Scrollable Machine Grid */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      Select a Machine to Inspect ({filteredMachines.length} Models)
                    </p>
                    <span className="text-xs text-white/45">
                      IMA · ROTONDI · FRAMIS ITALIA · New-tecH · NEXIA
                    </span>
                  </div>

                  <div className="grid max-h-[350px] grid-cols-2 gap-2.5 overflow-y-auto pr-2 xl:grid-cols-3">
                    {filteredMachines.map((machine) => {
                      const isHovered = previewMachine.slug === machine.slug;
                      return (
                        <Link
                          key={machine.slug}
                          to="/machines/$slug"
                          params={{ slug: machine.slug }}
                          onMouseEnter={() => setHoveredMachineSlug(machine.slug)}
                          onClick={() => setActiveMega(null)}
                          className={`group flex items-center gap-3 rounded-xl border p-2.5 transition-all ${
                            isHovered
                              ? 'border-white/30 bg-white/[0.08]'
                              : 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]'
                          }`}
                        >
                          <div className="studio flex size-14 shrink-0 items-center justify-center rounded-lg p-1.5">
                            <img
                              src={machine.image}
                              alt={machine.name}
                              referrerPolicy="no-referrer"
                              className="max-h-full w-full rounded object-contain"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-display text-sm text-white">
                              {machine.headline.replace('.', '')}
                            </p>
                            <p className="truncate text-[10px] text-white/55">
                              {machine.brand ?? 'IMA SpA'} · {machine.badge}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Live Highlight Preview of Hovered Machine */}
                <div className="flex flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.03] p-5">
                  <div>
                    <div className="studio-luxury flex aspect-[16/10] items-center justify-center rounded-xl p-4">
                      <img
                        src={previewMachine.image}
                        alt={previewMachine.name}
                        referrerPolicy="no-referrer"
                        className="machine-shadow animate-float-machine max-h-full w-full rounded object-contain"
                      />
                    </div>
                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#009246]">
                      {previewMachine.brand ?? 'IMA SpA'} · {previewMachine.category}
                    </p>
                    <h4 className="mt-1 font-display text-lg text-white leading-snug">
                      {previewMachine.name}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/65">
                      {previewMachine.tagline}
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                      {previewMachine.specs.slice(0, 2).map((s) => (
                        <div key={s.label}>
                          <p className="font-display text-xs text-white">{s.value}</p>
                          <p className="text-[10px] text-white/50">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link
                      to="/machines/$slug"
                      params={{ slug: previewMachine.slug }}
                      onClick={() => setActiveMega(null)}
                      className="inline-flex flex-1 items-center justify-between rounded-lg bg-white px-3.5 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-90"
                    >
                      <span>Technical Sheet</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                    {previewMachine.pdfUrl && (
                      <a
                        href={previewMachine.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/20"
                      >
                        PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 2. SOLUTIONS MEGA MENU */}
            {activeMega === 'solutions' && (
              <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      Eight Turnkey Production Lines
                    </p>
                    <Link
                      to="/solutions"
                      onClick={() => setActiveMega(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#009246] hover:underline"
                    >
                      View All Turnkey Solutions <ArrowRight className="size-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                    {TURNKEY_SOLUTIONS_PREVIEW.map((sol) => (
                      <Link
                        key={sol.n}
                        to="/solutions"
                        onClick={() => setActiveMega(null)}
                        className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-white/25 hover:bg-white/[0.06]"
                      >
                        <span className="font-mono text-[11px] font-semibold text-[#CE2B37] tabular-nums">
                          {sol.n} · {sol.area}
                        </span>
                        <h4 className="mt-1.5 font-display text-base text-white group-hover:underline">
                          {sol.title}
                        </h4>
                        <p className="mt-1 text-xs text-white/60">{sol.partner}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Principal Brands Summary */}
                <div className="flex flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.03] p-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#009246]">
                      Global OEM Principals
                    </p>
                    <h4 className="mt-2 font-display text-xl text-white">
                      9 World-Renowned Engineering Partners
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-white/65">
                      Authorized Bangladesh sales, turnkey installation, and 24/7 after-sales
                      technical support across cutting, finishing, bonding, laundry, denim, socks,
                      intralogistics, and CAD embroidery.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {ABOUT_US_TEXT.principals.map((p) => (
                        <span
                          key={p.name}
                          className="rounded border border-white/15 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-white/85"
                        >
                          {p.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    onClick={() => setActiveMega(null)}
                    className="mt-5 inline-flex items-center justify-between rounded-lg bg-[#CE2B37] px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <span>Book a Factory Line Audit</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* 3. COMPANY & HERITAGE MEGA MENU */}
            {activeMega === 'company' && (
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={IMAGES.ifelLogo}
                      alt="IFEL Emblem"
                      referrerPolicy="no-referrer"
                      className="size-12 object-contain"
                    />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#009246]">
                        Since 1977 · Dhaka Since 2018
                      </p>
                      <h4 className="font-display text-lg text-white">
                        IMA Far East Ltd.
                      </h4>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-white/65">
                    Serving over 100 garment &amp; textile factories across Bangladesh with
                    integrated Italian cutting room technology, European finishing lines, and
                    in-house engineering governance.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      to="/about"
                      onClick={() => setActiveMega(null)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:underline"
                    >
                      Corporate Profile <ArrowRight className="size-3" />
                    </Link>
                    <Link
                      to="/company"
                      onClick={() => setActiveMega(null)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#009246] hover:underline"
                    >
                      Heritage &amp; Milestones <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>

                {/* Executive Leadership Quick View */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#CE2B37]">
                    Executive Leadership
                  </p>
                  <div className="mt-3 space-y-3">
                    {EXECUTIVE_LEADERSHIP.slice(0, 2).map((leader) => (
                      <Link
                        key={leader.id}
                        to="/company"
                        onClick={() => setActiveMega(null)}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-2.5 transition-colors hover:border-white/25"
                      >
                        {leader.portrait && (
                          <img
                            src={leader.portrait}
                            alt={leader.name}
                            referrerPolicy="no-referrer"
                            className="size-11 rounded-lg object-cover object-top"
                          />
                        )}
                        <div>
                          <p className="font-display text-sm text-white">{leader.name}</p>
                          <p className="text-[11px] text-white/60">{leader.role}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 26-Member Dynamic Team & Gallery Quick Links */}
                <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="space-y-3">
                    <Link
                      to="/service"
                      onClick={() => setActiveMega(null)}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-white/25"
                    >
                      <Wrench className="mt-0.5 size-4 shrink-0 text-[#009246]" />
                      <div>
                        <p className="font-display text-sm text-white">
                          Meet Our 26-Member Dynamic Team
                        </p>
                        <p className="text-[11px] text-white/60">
                          Full sales, customer service &amp; technical support directory (01–26)
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/gallery"
                      onClick={() => setActiveMega(null)}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-white/25"
                    >
                      <Sparkles className="mt-0.5 size-4 shrink-0 text-[#CE2B37]" />
                      <div>
                        <p className="font-display text-sm text-white">
                          Cinematic Exhibition Gallery
                        </p>
                        <p className="text-[11px] text-white/60">
                          International expos, ribbon-cuttings &amp; award ceremonies
                        </p>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-white/60">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5 text-[#009246]" />
                      Dhaka HQ · Asad Gate
                    </span>
                    <Link
                      to="/contact"
                      onClick={() => setActiveMega(null)}
                      className="font-semibold text-white hover:underline"
                    >
                      Contact Us →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          RESPONSIVE TABLET & MOBILE NAVIGATION DRAWER
         ===================================================================== */}
      {mobileNavOpen && (
        <div className="lg:hidden max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-white/10 bg-[#090b0f] px-6 py-6 text-white shadow-2xl">
          <ul className="divide-y divide-white/10">
            {TOP_NAV_ITEMS.map((item) => {
              const isActive =
                item.to === '/machines'
                  ? cleanPath === '/machines' || cleanPath.startsWith('/machines/')
                  : cleanPath === item.to;
              const isExpanded = item.megaKey && mobileExpandedSection === item.megaKey;

              return (
                <li key={item.to} className="py-2.5">
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.to}
                      onClick={() => setMobileNavOpen(false)}
                      className={`font-display text-xl transition-colors ${
                        isActive ? 'text-[#009246]' : 'text-white hover:text-white/80'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.megaKey && (
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpandedSection((prev) =>
                            prev === item.megaKey ? null : item.megaKey!
                          )
                        }
                        className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/75"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <ChevronDown
                          className={`size-4 transition-transform ${
                            isExpanded ? 'rotate-180 text-[#CE2B37]' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Expandable Machines Submenu */}
                  {item.megaKey === 'machines' && isExpanded && (
                    <div className="mt-3 grid grid-cols-1 gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:grid-cols-2">
                      {MACHINES.map((m, idx) => (
                        <Link
                          key={m.slug}
                          to="/machines/$slug"
                          params={{ slug: m.slug }}
                          onClick={() => setMobileNavOpen(false)}
                          className="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs text-white/80 hover:bg-white/10 hover:text-white"
                        >
                          <span>
                            <strong className="font-mono text-[#009246] tabular-nums">
                              {String(idx + 1).padStart(2, '0')}
                            </strong>{' '}
                            {m.name.replace('IMA ', '')}
                          </span>
                          <ChevronRight className="size-3.5 text-white/40" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Mobile Expandable Solutions Submenu */}
                  {item.megaKey === 'solutions' && isExpanded && (
                    <div className="mt-3 grid grid-cols-1 gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:grid-cols-2">
                      {TURNKEY_SOLUTIONS_PREVIEW.map((sol) => (
                        <Link
                          key={sol.n}
                          to="/solutions"
                          onClick={() => setMobileNavOpen(false)}
                          className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-white/80 hover:bg-white/10"
                        >
                          <span>
                            <strong className="font-mono text-[#CE2B37] tabular-nums">
                              {sol.n}
                            </strong>{' '}
                            {sol.title}
                          </span>
                          <ChevronRight className="size-3.5 text-white/40" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Mobile Expandable Company Submenu */}
                  {item.megaKey === 'company' && isExpanded && (
                    <div className="mt-3 space-y-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-white/75">
                      <p className="text-white/90 font-medium">
                        Executive Leadership &amp; 26-Member Dynamic Team
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <Link
                          to="/company"
                          onClick={() => setMobileNavOpen(false)}
                          className="rounded-lg bg-white/10 px-3 py-1.5 text-white"
                        >
                          Leadership &amp; Heritage
                        </Link>
                        <Link
                          to="/service"
                          onClick={() => setMobileNavOpen(false)}
                          className="rounded-lg bg-white/10 px-3 py-1.5 text-white"
                        >
                          26 Engineers Roster
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                24/7 Engineering Hotline
              </p>
              <a
                href={SITE_INFO.phoneHref}
                className="mt-1 block font-mono text-base text-white hover:underline tabular-nums"
              >
                {SITE_INFO.phone}
              </a>
            </div>
            <Link
              to="/contact"
              onClick={() => setMobileNavOpen(false)}
              className="rounded-xl bg-[#CE2B37] px-5 py-2.5 text-xs font-semibold text-white"
            >
              Book a Factory Audit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
