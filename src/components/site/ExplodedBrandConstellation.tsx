import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Compass,
  Cpu,
  Eye,
  FileText,
  Layers,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { IMAGES, MACHINES, Machine, MachineCategory, PDF_CATALOGS } from '../../data/machines';
import { Link } from '../../router';

export interface CategoryColorTheme {
  category: MachineCategory;
  brandKey: string;
  hex: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  badgeBgClass: string;
}

export const CATEGORY_COLOR_MAP: Record<MachineCategory, CategoryColorTheme> = {
  Cutters: {
    category: 'Cutters',
    brandKey: 'IMA SpA',
    hex: '#10b981',
    bgClass: 'bg-emerald-500/15',
    borderClass: 'border-emerald-500/45',
    textClass: 'text-emerald-300',
    badgeBgClass: 'bg-emerald-600',
  },
  Spreaders: {
    category: 'Spreaders',
    brandKey: 'IMA SpA',
    hex: '#14b8a6',
    bgClass: 'bg-teal-500/15',
    borderClass: 'border-teal-500/45',
    textClass: 'text-teal-300',
    badgeBgClass: 'bg-teal-600',
  },
  Tables: {
    category: 'Tables',
    brandKey: 'IMA SpA',
    hex: '#22c55e',
    bgClass: 'bg-green-500/15',
    borderClass: 'border-green-500/45',
    textClass: 'text-green-300',
    badgeBgClass: 'bg-green-600',
  },
  'Fusing & Pressing': {
    category: 'Fusing & Pressing',
    brandKey: 'ROTONDI Group',
    hex: '#3b82f6',
    bgClass: 'bg-blue-500/15',
    borderClass: 'border-blue-500/45',
    textClass: 'text-blue-300',
    badgeBgClass: 'bg-blue-600',
  },
  'Bonding & Heat Press': {
    category: 'Bonding & Heat Press',
    brandKey: 'Framis Italia SpA',
    hex: '#f43f5e',
    bgClass: 'bg-rose-500/15',
    borderClass: 'border-rose-500/45',
    textClass: 'text-rose-300',
    badgeBgClass: 'bg-rose-600',
  },
  'Jacket Automation': {
    category: 'Jacket Automation',
    brandKey: 'New-tecH',
    hex: '#f59e0b',
    bgClass: 'bg-amber-500/15',
    borderClass: 'border-amber-500/45',
    textClass: 'text-amber-300',
    badgeBgClass: 'bg-amber-600',
  },
  'Jeans & Casual': {
    category: 'Jeans & Casual',
    brandKey: 'New-tecH',
    hex: '#a855f7',
    bgClass: 'bg-purple-500/15',
    borderClass: 'border-purple-500/45',
    textClass: 'text-purple-300',
    badgeBgClass: 'bg-purple-600',
  },
  'Knitwear Automation': {
    category: 'Knitwear Automation',
    brandKey: 'New-tecH',
    hex: '#f97316',
    bgClass: 'bg-orange-500/15',
    borderClass: 'border-orange-500/45',
    textClass: 'text-orange-300',
    badgeBgClass: 'bg-orange-600',
  },
  'Smart Laundry & Laser': {
    category: 'Smart Laundry & Laser',
    brandKey: 'NEXIA',
    hex: '#06b6d4',
    bgClass: 'bg-cyan-500/15',
    borderClass: 'border-cyan-500/45',
    textClass: 'text-cyan-300',
    badgeBgClass: 'bg-cyan-600',
  },
};

export interface BrandNodeConfig {
  id: string;
  brandKey: string;
  sectionAnchor: string;
  shortName: string;
  fullName: string;
  origin: string;
  founded: string;
  tagline: string;
  // Exact non-overlapping pentagonal offsets from center (in px) for Spread & Gathered states
  spreadX: number;
  spreadY: number;
  gatherX: number;
  gatherY: number;
  spokeAngleDeg: number;
  accentHex: string;
  secondaryHex: string;
  cardBgGradient: string;
  categories: MachineCategory[];
  showcaseMachines: {
    name: string;
    image: string;
    category: MachineCategory;
    slug: string;
  }[];
  flagshipSpecs: { label: string; value: string }[];
  logoMonogram: string;
  logoSubtext: string;
}

export const BRAND_CONSTELLATION_NODES: BrandNodeConfig[] = [
  {
    id: 'ima',
    brandKey: 'IMA SpA',
    sectionAnchor: 'brand-ima',
    shortName: 'IMA SpA',
    fullName: 'IMA SpA — Cutting Room Division',
    origin: 'Palazzolo sull’Oglio (Brescia), Italy',
    founded: 'Since 1977',
    tagline: 'CNC Automated Cutters, Phoenix Spreaders & Syncro Tables',
    spreadX: 0,
    spreadY: -315,
    gatherX: 0,
    gatherY: -125,
    spokeAngleDeg: -90,
    accentHex: '#10b981',
    secondaryHex: '#059669',
    cardBgGradient: 'linear-gradient(145deg, rgba(16,185,129,0.18) 0%, rgba(8,18,34,0.96) 65%)',
    categories: ['Cutters', 'Spreaders', 'Tables'],
    showcaseMachines: [
      {
        name: '892 Mithos 4WD Spreader',
        image: '/images/catalog/ima-892-mithos.webp',
        category: 'Spreaders',
        slug: '892-mithos',
      },
      {
        name: 'Phoenix 890B Spreader',
        image: '/images/catalog/ima-890b.webp',
        category: 'Spreaders',
        slug: '890b-phoenix',
      },
      {
        name: 'Typhoon 70 CNC Cutter',
        image: IMAGES.typhoon,
        category: 'Cutters',
        slug: 'typhoon-70',
      },
      {
        name: 'Syncro 848 Modular Table',
        image: '/images/catalog/ima-table-848.webp',
        category: 'Tables',
        slug: 'syncro-modular-line',
      },
    ],
    flagshipSpecs: [
      { label: 'Max Speed', value: '120 m/min' },
      { label: 'Compressed Lay', value: 'Up to 90 mm' },
    ],
    logoMonogram: 'IMA',
    logoSubtext: 'Brescia · Italy',
  },
  {
    id: 'rotondi',
    brandKey: 'ROTONDI Group',
    sectionAnchor: 'brand-rotondi',
    shortName: 'ROTONDI',
    fullName: 'ROTONDI Group Srl — Pressing & Fusing',
    origin: 'Settimo Milanese (Milan), Italy',
    founded: 'Since 1953',
    tagline: 'Hi-Tech Continuous Fusing, Jacket, Jeans & Shirt Pressing Lines',
    spreadX: 415,
    spreadY: -95,
    gatherX: 145,
    gatherY: -45,
    spokeAngleDeg: -13,
    accentHex: '#3b82f6',
    secondaryHex: '#2563eb',
    cardBgGradient: 'linear-gradient(145deg, rgba(59,130,246,0.20) 0%, rgba(8,18,34,0.96) 65%)',
    categories: ['Fusing & Pressing'],
    showcaseMachines: [
      {
        name: 'SR-3100 Shirt Finisher',
        image: '/images/catalog/rotondi-shirt-sr3100.webp',
        category: 'Fusing & Pressing',
        slug: 'rotondi-sr3100-arsh-shirt-finishing',
      },
      {
        name: 'SM-120 Continuous Fusing',
        image: '/images/catalog/rotondi-fusing-sm120.webp',
        category: 'Fusing & Pressing',
        slug: 'rotondi-fp-touch-series',
      },
      {
        name: 'ARSH Double-Dummy Press',
        image: '/images/catalog/rotondi-shirt-arsh.webp',
        category: 'Fusing & Pressing',
        slug: 'rotondi-arsh-double-dummy-press',
      },
      {
        name: 'SH-5 Collar Fusing Press',
        image: '/images/catalog/rotondi-shirt-sh5.webp',
        category: 'Fusing & Pressing',
        slug: 'rotondi-sh5-sh10-collar-fusing',
      },
    ],
    flagshipSpecs: [
      { label: 'Heating Zones', value: 'Up to 9 Zones' },
      { label: 'Shirt Output', value: '1,400 / 8h' },
    ],
    logoMonogram: 'ROTONDI',
    logoSubtext: 'Milano · Italy',
  },
  {
    id: 'framis',
    brandKey: 'Framis Italia SpA',
    sectionAnchor: 'brand-framis',
    shortName: 'FRAMIS ITALIA',
    fullName: 'Framis Italia SpA — NoSo® Bonding',
    origin: 'Gaggiano (Milan), Italy',
    founded: 'Since 1976',
    tagline: 'NoSo® Thermoadhesive Bonding, 28kHz Ultrasonic & Vacuum Chiller Presses',
    spreadX: 315,
    spreadY: 265,
    gatherX: 115,
    gatherY: 98,
    spokeAngleDeg: 40,
    accentHex: '#f43f5e',
    secondaryHex: '#e11d48',
    cardBgGradient: 'linear-gradient(145deg, rgba(244,63,94,0.20) 0%, rgba(8,18,34,0.96) 65%)',
    categories: ['Bonding & Heat Press'],
    showcaseMachines: [
      {
        name: 'MPHK40 Vacuum Chiller Press',
        image: '/images/catalog/framis-mphk40-vacuum.webp',
        category: 'Bonding & Heat Press',
        slug: 'framis-mc201z-mphk40-mphk18-presses',
      },
      {
        name: 'MXC-205-D-SE Weld & Cut',
        image: '/images/catalog/framis-mxc205.webp',
        category: 'Bonding & Heat Press',
        slug: 'framis-mxc-205-d-se-weld-cut',
      },
      {
        name: 'MU 281 28kHz Ultrasonic',
        image: '/images/catalog/framis-mu281.webp',
        category: 'Bonding & Heat Press',
        slug: 'framis-mu-281-ultrasonic',
      },
      {
        name: 'MPHK32X Dual C-Type Press',
        image: '/images/catalog/framis-mphk32x.webp',
        category: 'Bonding & Heat Press',
        slug: 'framis-mphk32x-dual-ctype-press',
      },
    ],
    flagshipSpecs: [
      { label: 'Ultrasonic', value: '28 kHz Titanium' },
      { label: 'Cooling Plate', value: 'Integrated Chiller' },
    ],
    logoMonogram: 'FRAMIS',
    logoSubtext: 'Milano · Italy',
  },
  {
    id: 'nexia',
    brandKey: 'NEXIA',
    sectionAnchor: 'brand-nexia',
    shortName: 'NEXIA Srl',
    fullName: 'NEXIA Srl — Laundry Smart Evolution',
    origin: 'Rosà (Vicenza), Italy',
    founded: 'Since 1871',
    tagline: 'AllTogether® Eco Washers, NEO³ Ozone, NDRY Dryers, NRAY Laser & Nitrogen',
    spreadX: -315,
    spreadY: 265,
    gatherX: -115,
    gatherY: 98,
    spokeAngleDeg: 140,
    accentHex: '#06b6d4',
    secondaryHex: '#0891b2',
    cardBgGradient: 'linear-gradient(145deg, rgba(6,182,212,0.20) 0%, rgba(8,18,34,0.96) 65%)',
    categories: ['Smart Laundry & Laser'],
    showcaseMachines: [
      {
        name: 'NS 420 Wave® Eco Washer',
        image: '/images/catalog/nexia-ns420-wave.webp',
        category: 'Smart Laundry & Laser',
        slug: 'nexia-wave-ndrop-nebulizer-system',
      },
      {
        name: 'NRAY 4 Dual Laser Cabin',
        image: '/images/catalog/nexia-nray4-dual-laser.webp',
        category: 'Smart Laundry & Laser',
        slug: 'nexia-nray4-dual-laser-mannequin',
      },
      {
        name: 'NDRY 200 Circular Energy',
        image: '/images/catalog/nexia-ndry200-circular-energy.webp',
        category: 'Smart Laundry & Laser',
        slug: 'nexia-ndry200-circular-energy-dryer',
      },
      {
        name: 'NITROGEN® Airless Dyeing',
        image: '/images/catalog/nexia-nitrogen-dyeing.webp',
        category: 'Smart Laundry & Laser',
        slug: 'nexia-nitrogen-lcft-garment-dyeing',
      },
    ],
    flagshipSpecs: [
      { label: 'Water Saving', value: 'Up to -85%' },
      { label: 'Chemical Saving', value: 'Up to -87%' },
    ],
    logoMonogram: 'NEXIA',
    logoSubtext: 'Vicenza · Italy',
  },
  {
    id: 'newtech',
    brandKey: 'New-tecH',
    sectionAnchor: 'brand-newtech',
    shortName: 'NEW-TECH',
    fullName: 'New-tecH — Industrial Sewing Automats',
    origin: 'European & Mediterranean CNC Division',
    founded: 'Since 1972',
    tagline: 'CNC Pocket Setters, Jacket Welt Automats, Jeans & Knitwear Robotics',
    spreadX: -415,
    spreadY: -95,
    gatherX: -145,
    gatherY: -45,
    spokeAngleDeg: -167,
    accentHex: '#f59e0b',
    secondaryHex: '#d97706',
    cardBgGradient: 'linear-gradient(145deg, rgba(245,158,11,0.20) 0%, rgba(8,18,34,0.96) 65%)',
    categories: ['Jacket Automation', 'Jeans & Casual', 'Knitwear Automation'],
    showcaseMachines: [
      {
        name: '3000-11 Jeans Pocket Setter',
        image: '/images/catalog/newtech-3000-11.webp',
        category: 'Jeans & Casual',
        slug: 'newtech-3000-11-back-pocket-setter',
      },
      {
        name: '2025-1 Jacket Pocket Welt',
        image: '/images/catalog/newtech-2025-1.webp',
        category: 'Jacket Automation',
        slug: 'newtech-2025-2250-jacket-pocket-welting',
      },
      {
        name: '3500-20 Kangaroo Pocket',
        image: '/images/catalog/newtech-3500-20.webp',
        category: 'Knitwear Automation',
        slug: 'newtech-3500-20-kangaroo-3000-13-knit-pocket',
      },
      {
        name: '2800-8 J-Stitch Fly Automat',
        image: '/images/catalog/newtech-2800-8.webp',
        category: 'Jeans & Casual',
        slug: 'newtech-2800-8-j-stitch-fly-automat',
      },
    ],
    flagshipSpecs: [
      { label: 'Pocket Hemming', value: '14,000 / Day' },
      { label: 'Welt Output', value: '2,000 / 8h' },
    ],
    logoMonogram: 'New-tecH',
    logoSubtext: 'CNC Automats',
  },
];

interface ExplodedBrandConstellationProps {
  onSelectMachineForModal: (machine: Machine) => void;
  onJumpToBrandSection: (sectionAnchor: string) => void;
  onSelectCategoryFilter?: (category: MachineCategory) => void;
}

export function ExplodedBrandConstellation({
  onSelectMachineForModal,
  onJumpToBrandSection,
  onSelectCategoryFilter,
}: ExplodedBrandConstellationProps) {
  const [animState, setAnimState] = useState<'spread' | 'gathered'>('spread');
  const [autoCycle, setAutoCycle] = useState(true);
  const [explodedLayers, setExplodedLayers] = useState(true);
  const [hoveredBrandId, setHoveredBrandId] = useState<string | null>(null);
  const [activeBrandPortal, setActiveBrandPortal] = useState<BrandNodeConfig | null>(null);
  const [portalCategoryFilter, setPortalCategoryFilter] = useState<string>('All');
  const [selectedPortalMachine, setSelectedPortalMachine] = useState<Machine | null>(null);
  // Track which showcase machine index (0..3) is currently highlighted inside each brand node card
  const [activeCardMachineIdx, setActiveCardMachineIdx] = useState<Record<string, number>>({
    ima: 0,
    rotondi: 0,
    framis: 0,
    nexia: 0,
    newtech: 0,
  });

  // Auto-cycle Spread <-> Gather every 6.5s unless paused or hovering
  useEffect(() => {
    if (!autoCycle || hoveredBrandId || activeBrandPortal) return;
    const timer = window.setInterval(() => {
      setAnimState((prev) => (prev === 'spread' ? 'gathered' : 'spread'));
    }, 6500);
    return () => window.clearInterval(timer);
  }, [autoCycle, hoveredBrandId, activeBrandPortal]);

  // Also gently rotate the showcased flagship machine inside each brand card every 3.5s
  useEffect(() => {
    if (hoveredBrandId || activeBrandPortal) return;
    const timer = window.setInterval(() => {
      setActiveCardMachineIdx((prev) => {
        const next: Record<string, number> = {};
        for (const node of BRAND_CONSTELLATION_NODES) {
          next[node.id] = ((prev[node.id] ?? 0) + 1) % node.showcaseMachines.length;
        }
        return next;
      });
    }, 3600);
    return () => window.clearInterval(timer);
  }, [hoveredBrandId, activeBrandPortal]);

  const machinesByBrand = useMemo(() => {
    const map: Record<string, Machine[]> = {};
    for (const node of BRAND_CONSTELLATION_NODES) {
      map[node.brandKey] = MACHINES.filter((m) => (m.brand ?? 'IMA SpA') === node.brandKey);
    }
    return map;
  }, []);

  const handleOpenBrandPortal = (node: BrandNodeConfig, initialCategory: string = 'All') => {
    setAnimState('spread');
    setActiveBrandPortal(node);
    setPortalCategoryFilter(initialCategory);
    const brandList = machinesByBrand[node.brandKey] ?? [];
    const filtered =
      initialCategory === 'All'
        ? brandList
        : brandList.filter((m) => m.category === initialCategory);
    setSelectedPortalMachine(filtered[0] ?? brandList[0] ?? null);
  };

  const portalMachines = useMemo(() => {
    if (!activeBrandPortal) return [];
    const list = machinesByBrand[activeBrandPortal.brandKey] ?? [];
    if (portalCategoryFilter === 'All') return list;
    return list.filter((m) => m.category === portalCategoryFilter);
  }, [activeBrandPortal, machinesByBrand, portalCategoryFilter]);

  const portalCategories = useMemo(() => {
    if (!activeBrandPortal) return [];
    const list = machinesByBrand[activeBrandPortal.brandKey] ?? [];
    return Array.from(new Set(list.map((m) => m.category)));
  }, [activeBrandPortal, machinesByBrand]);

  const portalBrochures = useMemo(() => {
    if (!activeBrandPortal) return [];
    const key = activeBrandPortal.brandKey.toLowerCase();
    return PDF_CATALOGS.filter(
      (c) =>
        c.brand.toLowerCase().includes(key.split(' ')[0]) ||
        key.includes(c.brand.toLowerCase().split(' ')[0]),
    );
  }, [activeBrandPortal]);

  return (
    <section
      id="italian-brand-constellation"
      className="relative w-full overflow-hidden bg-[#040710] text-white py-14 lg:py-20 border-b border-white/10 select-none"
    >
      {/* Multi-Brand Color-Coded Radial Backlights */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-1000"
          style={{
            width: animState === 'spread' ? '980px' : '520px',
            height: animState === 'spread' ? '980px' : '520px',
            background:
              'radial-gradient(circle, rgba(16,185,129,0.14) 0%, rgba(59,130,246,0.08) 38%, rgba(244,63,94,0.12) 70%, transparent 100%)',
            filter: 'blur(65px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div className="site-container relative z-10">
        {/* Top Section Header & Animation Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 backdrop-blur-md">
              <span className="inline-flex h-2.5 w-6 overflow-hidden rounded-xs shadow-sm">
                <span className="w-1/3 bg-[#009246]" />
                <span className="w-1/3 bg-white" />
                <span className="w-1/3 bg-[#CE2B37]" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                5 Brands · 9 Color-Coded Categories · {MACHINES.length} Industrial Machines
              </span>
            </div>
            <h2 className="display-md mt-3 text-white">
              Interactive Brand &amp; Category Constellation
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-white/70">
              Each brand and machine category is color-coded for instant recognition. Click any{' '}
              <strong className="text-white">Brand Card</strong>,{' '}
              <strong className="text-emerald-300">Machine Cutout</strong>, or{' '}
              <strong className="text-cyan-300">Category Pill</strong> to automatically enter all
              machines.
            </p>
          </div>

          {/* Interactive Spread / Gather Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setAnimState('spread')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                animState === 'spread'
                  ? 'border-emerald-500 bg-emerald-500/25 text-white shadow-[0_0_24px_rgba(16,185,129,0.4)]'
                  : 'border-white/15 bg-white/[0.04] text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Maximize2 className="size-3.5 text-emerald-400" />
              Spread / Explode
            </button>

            <button
              type="button"
              onClick={() => setAnimState('gathered')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                animState === 'gathered'
                  ? 'border-rose-500 bg-rose-500/25 text-white shadow-[0_0_24px_rgba(244,63,94,0.4)]'
                  : 'border-white/15 bg-white/[0.04] text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <RotateCcw className="size-3.5 text-rose-400" />
              Gather Hub
            </button>

            <button
              type="button"
              onClick={() => setAutoCycle((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all cursor-pointer border ${
                autoCycle
                  ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-200'
                  : 'border-white/15 bg-white/[0.04] text-white/60 hover:text-white'
              }`}
            >
              {autoCycle ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              Auto Spread/Gather: {autoCycle ? 'ON' : 'PAUSED'}
            </button>

            <button
              type="button"
              onClick={() => setExplodedLayers((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all cursor-pointer border ${
                explodedLayers
                  ? 'border-amber-400/50 bg-amber-500/15 text-amber-200'
                  : 'border-white/15 bg-white/[0.04] text-white/60 hover:text-white'
              }`}
            >
              <Layers className="size-3.5" />
              Multi-Machine Dock
            </button>
          </div>
        </div>

        {/* =====================================================================
            BRAND & CATEGORY COLOR-CODED LEGEND BAR (1-Click Filter by Brand or Category)
           ===================================================================== */}
        <div className="mb-6 rounded-2xl border border-white/12 bg-[#080f1f]/90 p-3.5 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-white/10">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/55">
              COLOR-CODED BRANDS &amp; MACHINE CATEGORIES (CLICK ANY PILL TO ENTER):
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {BRAND_CONSTELLATION_NODES.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleOpenBrandPortal(b)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white/85 hover:text-white cursor-pointer transition-transform hover:scale-105"
                >
                  <span
                    className="size-2.5 rounded-full shadow-sm"
                    style={{ backgroundColor: b.accentHex }}
                  />
                  <span>{b.shortName}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(Object.keys(CATEGORY_COLOR_MAP) as MachineCategory[]).map((cat) => {
              const theme = CATEGORY_COLOR_MAP[cat];
              const count = MACHINES.filter((m) => m.category === cat).length;
              const parentNode = BRAND_CONSTELLATION_NODES.find(
                (n) => n.brandKey === theme.brandKey,
              );
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    if (parentNode) {
                      handleOpenBrandPortal(parentNode, cat);
                    }
                    if (onSelectCategoryFilter) {
                      onSelectCategoryFilter(cat);
                    }
                  }}
                  style={{
                    borderColor: `${theme.hex}66`,
                    backgroundColor: `${theme.hex}18`,
                  }}
                  className="group inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold text-white transition-all hover:scale-105 cursor-pointer"
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: theme.hex }}
                  />
                  <span>{cat}</span>
                  <span
                    className="rounded-md px-1.5 py-0.5 text-[10px] font-extrabold text-white"
                    style={{ backgroundColor: theme.hex }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            DESKTOP RADIAL EXPLODED CONSTELLATION STAGE (Zero Overlap, 940px Tall)
           ===================================================================== */}
        <div className="relative mx-auto hidden lg:block h-[940px] w-full max-w-[1280px] rounded-[36px] border border-white/15 bg-gradient-to-b from-[#080f1e]/95 via-[#050914]/98 to-[#080f1e]/95 shadow-[0_35px_100px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Top-Left & Top-Right Telemetry HUD */}
          <div className="absolute left-6 top-6 z-20 flex items-center gap-3 rounded-2xl border border-white/12 bg-black/50 px-4 py-2.5 backdrop-blur-md">
            <Compass
              className="size-4 text-emerald-400 animate-spin"
              style={{ animationDuration: '14s' }}
            />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                CONSTELLATION MODE
              </p>
              <p className="text-xs font-bold text-white">
                {animState === 'spread'
                  ? 'EXPLODED RADIAL SPREAD (5 BRANDS ACTIVE)'
                  : 'GATHERED CORE CONVERGENCE'}
              </p>
            </div>
          </div>

          <div className="absolute right-6 top-6 z-20 flex items-center gap-2 rounded-2xl border border-white/12 bg-black/50 px-4 py-2.5 backdrop-blur-md">
            <Sparkles className="size-4 text-amber-400" />
            <span className="text-xs text-white/85">
              Click any <strong className="text-white">Brand Card</strong> or{' '}
              <strong className="text-emerald-300">Machine Thumbnail</strong> to enter
            </span>
          </div>

          {/* SVG Concentric Rings & Color-Coded Radial Spokes */}
          <svg
            viewBox="0 0 1280 940"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              <radialGradient id="tricoloreCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#009246" stopOpacity="0.42" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.10" />
                <stop offset="85%" stopColor="#CE2B37" stopOpacity="0.34" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="tricoloreRingStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#009246" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#CE2B37" />
              </linearGradient>
            </defs>

            {/* Outer Orbital Guide Ring */}
            <circle
              cx="640"
              cy="485"
              r={animState === 'spread' ? 360 : 175}
              fill="none"
              stroke="rgba(255,255,255,0.09)"
              strokeWidth="1.5"
              strokeDasharray="8 10"
              className="transition-all duration-1000 ease-out"
            />
            {/* Middle Concentric Ring */}
            <circle
              cx="640"
              cy="485"
              r={animState === 'spread' ? 158 : 128}
              fill="url(#tricoloreCoreGlow)"
              stroke="url(#tricoloreRingStroke)"
              strokeWidth="2"
              strokeOpacity="0.65"
              className="transition-all duration-1000 ease-out"
            />
            {/* Inner Concentric Ring */}
            <circle
              cx="640"
              cy="485"
              r={animState === 'spread' ? 105 : 92}
              fill="none"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.5"
              className="transition-all duration-1000 ease-out"
            />

            {/* 5 Brand-Color Radial Spokes Connecting Central Emblem to Each Brand Node */}
            {BRAND_CONSTELLATION_NODES.map((node) => {
              const rad = (node.spokeAngleDeg * Math.PI) / 180;
              const innerR = animState === 'spread' ? 98 : 74;
              const x1 = 640 + Math.cos(rad) * innerR;
              const y1 = 485 + Math.sin(rad) * innerR;
              const x2 = 640 + (animState === 'spread' ? node.spreadX : node.gatherX);
              const y2 = 485 + (animState === 'spread' ? node.spreadY : node.gatherY);
              const isHovered = hoveredBrandId === node.id;

              return (
                <g key={node.id}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={node.accentHex}
                    strokeOpacity={isHovered ? 0.95 : 0.45}
                    strokeWidth={isHovered ? 4 : 2.5}
                    className="transition-all duration-1000 ease-out"
                  />
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#ffffff"
                    strokeOpacity={0.75}
                    strokeWidth={2}
                    strokeDasharray="10 28"
                    className="transition-all duration-1000 ease-out"
                  />
                  <circle
                    cx={x1}
                    cy={y1}
                    r={6}
                    fill={node.accentHex}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="transition-all duration-1000 ease-out"
                  />
                  <circle
                    cx={x2}
                    cy={y2}
                    r={isHovered ? 9 : 6}
                    fill={node.accentHex}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all duration-1000 ease-out"
                  />
                </g>
              );
            })}
          </svg>

          {/* ===============================================================
              CENTER CORE: ITALIAN TRICOLORE EMBLEM (No "FLAG OF ITALY" Text)
             =============================================================== */}
          <button
            type="button"
            onClick={() => setAnimState((prev) => (prev === 'spread' ? 'gathered' : 'spread'))}
            className="group absolute left-1/2 top-[485px] z-30 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center rounded-full cursor-pointer transition-transform duration-700 hover:scale-105 focus:outline-none"
            style={{
              width: animState === 'spread' ? '194px' : '218px',
              height: animState === 'spread' ? '194px' : '218px',
            }}
            title="Click Central Hub to Spread or Gather all 5 Brands"
          >
            <div className="absolute inset-0 rounded-full border-2 border-white/25 bg-[#070d1b]/95 shadow-[0_0_60px_rgba(16,185,129,0.45)] backdrop-blur-xl transition-all duration-700 group-hover:border-white/55" />

            {/* Rotating Conic Tricolore Ring */}
            <div
              className="absolute inset-2.5 rounded-full opacity-90 transition-transform duration-1000 group-hover:rotate-45"
              style={{
                background:
                  'conic-gradient(from 0deg, #009246 0deg 120deg, #ffffff 120deg 240deg, #CE2B37 240deg 360deg)',
                padding: '3px',
                WebkitMask:
                  'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))',
              }}
            />

            {/* Inner Emblem Circle */}
            <div className="relative z-10 flex size-[146px] flex-col items-center justify-center rounded-full border border-white/25 bg-gradient-to-b from-[#0e182d] to-[#060a14] p-3 text-center shadow-inner">
              {/* Sculpted Italian Tricolore Crest */}
              <div className="flex h-10 w-18 overflow-hidden rounded-xl border border-white/35 shadow-[0_8px_22px_rgba(0,0,0,0.65)]">
                <div className="h-full w-1/3 bg-[#009246]" />
                <div className="h-full w-1/3 bg-white" />
                <div className="h-full w-1/3 bg-[#CE2B37]" />
              </div>

              <p className="mt-2 font-display text-[11px] font-black uppercase tracking-[0.18em] text-white">
                5 GLOBAL BRANDS
              </p>
              <p className="text-[10px] font-bold text-emerald-300">
                {MACHINES.length} Industrial Machines
              </p>
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white/12 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white group-hover:bg-emerald-600 transition-colors">
                <Zap className="size-2.5 text-amber-300" />
                {animState === 'spread' ? 'Gather Hub' : 'Explode All'}
              </span>
            </div>
          </button>

          {/* ===============================================================
              5 NON-OVERLAPPING COLOR-CODED BRAND NODES WITH MULTI-MACHINE PREVIEWS
             =============================================================== */}
          {BRAND_CONSTELLATION_NODES.map((node) => {
            const offsetX = animState === 'spread' ? node.spreadX : node.gatherX;
            const offsetY = animState === 'spread' ? node.spreadY : node.gatherY;
            const count = (machinesByBrand[node.brandKey] ?? []).length;
            const isHovered = hoveredBrandId === node.id;
            const currentShowcaseIdx = activeCardMachineIdx[node.id] ?? 0;
            const activeShowcaseMachine =
              node.showcaseMachines[currentShowcaseIdx] ?? node.showcaseMachines[0];

            return (
              <div
                key={node.id}
                onMouseEnter={() => setHoveredBrandId(node.id)}
                onMouseLeave={() => setHoveredBrandId(null)}
                onClick={() => handleOpenBrandPortal(node)}
                style={{
                  transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${
                    animState === 'gathered' ? 0.62 : isHovered ? 1.04 : 1
                  })`,
                  opacity: animState === 'gathered' ? 0.88 : 1,
                  background: node.cardBgGradient,
                  borderColor: isHovered ? node.accentHex : `${node.accentHex}77`,
                  boxShadow: isHovered
                    ? `0 24px 65px -10px ${node.accentHex}66, 0 0 30px ${node.accentHex}44`
                    : `0 18px 45px rgba(0,0,0,0.75), 0 0 18px ${node.accentHex}22`,
                }}
                className="group absolute left-1/2 top-[485px] z-20 w-[328px] rounded-[26px] border-2 p-3.5 backdrop-blur-xl transition-all duration-1000 ease-out cursor-pointer"
              >
                {/* Top Brand Color Accent Bar */}
                <div
                  className="mb-2.5 flex items-center justify-between gap-2 rounded-xl px-3 py-1.5"
                  style={{ backgroundColor: `${node.accentHex}24` }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="rounded-lg px-2 py-0.5 font-display text-[11px] font-black tracking-wider text-white shadow"
                      style={{ backgroundColor: node.accentHex }}
                    >
                      {node.logoMonogram}
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-sm font-extrabold text-white">
                        {node.shortName}
                      </h3>
                      <p className="truncate text-[9px] text-white/70">{node.origin}</p>
                    </div>
                  </div>

                  <span
                    className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold text-white shadow"
                    style={{ backgroundColor: node.accentHex }}
                  >
                    {count} Machines
                  </span>
                </div>

                {/* Color-Coded Category Pills for This Brand */}
                <div className="mb-2 flex flex-wrap items-center gap-1">
                  {node.categories.map((cat) => {
                    const cTheme = CATEGORY_COLOR_MAP[cat];
                    return (
                      <span
                        key={cat}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenBrandPortal(node, cat);
                        }}
                        style={{
                          backgroundColor: `${cTheme.hex}25`,
                          borderColor: `${cTheme.hex}77`,
                          color: '#ffffff',
                        }}
                        className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[9px] font-bold hover:scale-105 transition-transform"
                      >
                        <span
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: cTheme.hex }}
                        />
                        {cat}
                      </span>
                    );
                  })}
                </div>

                {/* Main Transparent Studio Machine Cutout Stage */}
                <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-[#070d1a]/90 p-2">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-35 transition-opacity group-hover:opacity-65"
                    style={{
                      background: `radial-gradient(circle at center, ${node.accentHex}66 0%, transparent 72%)`,
                    }}
                  />
                  <img
                    src={activeShowcaseMachine.image}
                    alt={activeShowcaseMachine.name}
                    className="relative z-10 max-h-28 w-auto object-contain transition-all duration-500 group-hover:scale-108 drop-shadow-[0_12px_18px_rgba(0,0,0,0.75)]"
                  />
                  <span
                    className="absolute bottom-1.5 left-2 rounded-md px-2 py-0.5 text-[9px] font-bold text-white shadow backdrop-blur-md"
                    style={{ backgroundColor: `${node.accentHex}dd` }}
                  >
                    {activeShowcaseMachine.name}
                  </span>
                </div>

                {/* Multi-Machine Mini Cutout Dock (4 Verified Machine Images per Brand!) */}
                {explodedLayers && (
                  <div className="mt-2 grid grid-cols-4 gap-1.5">
                    {node.showcaseMachines.map((sm, idx) => {
                      const isCurrent = idx === currentShowcaseIdx;
                      return (
                        <button
                          key={sm.slug + idx}
                          type="button"
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                            setActiveCardMachineIdx((prev) => ({ ...prev, [node.id]: idx }));
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCardMachineIdx((prev) => ({ ...prev, [node.id]: idx }));
                            handleOpenBrandPortal(node);
                          }}
                          style={{
                            borderColor: isCurrent ? node.accentHex : 'rgba(255,255,255,0.12)',
                            backgroundColor: isCurrent
                              ? `${node.accentHex}28`
                              : 'rgba(255,255,255,0.03)',
                          }}
                          className="flex h-11 items-center justify-center rounded-lg border p-1 transition-all hover:scale-105 cursor-pointer"
                          title={sm.name}
                        >
                          <img
                            src={sm.image}
                            alt={sm.name}
                            className="max-h-9 w-auto object-contain"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Bottom Specs & Enter Brand CTA */}
                <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-white/10 pt-2">
                  <div className="flex gap-3">
                    {node.flagshipSpecs.map((sp) => (
                      <div key={sp.label}>
                        <p className="text-[8px] uppercase tracking-wider text-white/50">
                          {sp.label}
                        </p>
                        <p className="text-[11px] font-bold text-white">{sp.value}</p>
                      </div>
                    ))}
                  </div>

                  <span
                    className="inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md transition-transform group-hover:translate-x-0.5"
                    style={{ backgroundColor: node.accentHex }}
                  >
                    Enter All {count}
                    <ArrowRight className="size-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================================
            TABLET & MOBILE INTERACTIVE EXPLODED RADIAL CONSTELLATION + BRAND CARDS
           ===================================================================== */}
        <div className="lg:hidden space-y-5">
          {/* Interactive Mobile Radial Exploded Constellation Stage */}
          <div className="relative mx-auto h-[460px] sm:h-[540px] w-full overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-b from-[#080f1e]/95 via-[#050914]/98 to-[#080f1e]/95 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
            {/* Mobile Constellation Status Bar */}
            <div className="absolute inset-x-3 top-3 z-30 flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-xl border border-white/12 bg-black/60 px-2.5 py-1.5 backdrop-blur-md">
                <Compass
                  className="size-3.5 text-emerald-400 animate-spin"
                  style={{ animationDuration: '14s' }}
                />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                  {animState === 'spread' ? 'Exploded 5-Brand View' : 'Gathered Core'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAnimState((prev) => (prev === 'spread' ? 'gathered' : 'spread'))}
                className="inline-flex items-center gap-1 rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-200 backdrop-blur-md active:scale-95 transition-transform"
              >
                <Zap className="size-3 text-amber-300" />
                {animState === 'spread' ? 'Gather Hub' : 'Explode All'}
              </button>
            </div>

            {/* Mobile SVG Concentric Orbital Rings & Color-Coded Radial Spokes */}
            <svg
              viewBox="0 0 400 440"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <defs>
                <radialGradient id="mobileTricoloreCoreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#009246" stopOpacity="0.42" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.10" />
                  <stop offset="85%" stopColor="#CE2B37" stopOpacity="0.34" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="mobileTricoloreRingStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#009246" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#CE2B37" />
                </linearGradient>
              </defs>

              <circle
                cx="200"
                cy="232"
                r={animState === 'spread' ? 148 : 74}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.25"
                strokeDasharray="5 7"
                className="transition-all duration-1000 ease-out"
              />
              <circle
                cx="200"
                cy="232"
                r={animState === 'spread' ? 68 : 54}
                fill="url(#mobileTricoloreCoreGlow)"
                stroke="url(#mobileTricoloreRingStroke)"
                strokeWidth="1.75"
                strokeOpacity="0.7"
                className="transition-all duration-1000 ease-out"
              />

              {BRAND_CONSTELLATION_NODES.map((node) => {
                // Scale desktop radial coordinates for mobile 400x440 viewport
                const mSpreadX = node.spreadX * 0.31;
                const mSpreadY = node.spreadY * 0.43;
                const mGatherX = node.gatherX * 0.34;
                const mGatherY = node.gatherY * 0.38;
                const x2 = 200 + (animState === 'spread' ? mSpreadX : mGatherX);
                const y2 = 232 + (animState === 'spread' ? mSpreadY : mGatherY);

                return (
                  <g key={`m-spoke-${node.id}`}>
                    <line
                      x1={200}
                      y1={232}
                      x2={x2}
                      y2={y2}
                      stroke={node.accentHex}
                      strokeOpacity={0.65}
                      strokeWidth={2}
                      className="transition-all duration-1000 ease-out"
                    />
                    <line
                      x1={200}
                      y1={232}
                      x2={x2}
                      y2={y2}
                      stroke="#ffffff"
                      strokeOpacity={0.75}
                      strokeWidth={1.5}
                      strokeDasharray="6 14"
                      className="transition-all duration-1000 ease-out"
                    />
                    <circle
                      cx={x2}
                      cy={y2}
                      r={4.5}
                      fill={node.accentHex}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="transition-all duration-1000 ease-out"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Mobile Center Tricolore Hub */}
            <button
              type="button"
              onClick={() => setAnimState((prev) => (prev === 'spread' ? 'gathered' : 'spread'))}
              className="group absolute left-1/2 top-[53%] z-20 -translate-x-1/2 -translate-y-1/2 flex size-[96px] sm:size-[112px] flex-col items-center justify-center rounded-full border-2 border-white/30 bg-[#070d1b]/95 p-2 text-center shadow-[0_0_40px_rgba(16,185,129,0.45)] transition-transform duration-500 active:scale-95"
            >
              <div className="flex h-5 w-10 overflow-hidden rounded-md border border-white/35 shadow">
                <div className="h-full w-1/3 bg-[#009246]" />
                <div className="h-full w-1/3 bg-white" />
                <div className="h-full w-1/3 bg-[#CE2B37]" />
              </div>
              <p className="mt-1 font-display text-[9px] font-black uppercase tracking-wider text-white leading-tight">
                5 BRANDS
              </p>
              <p className="text-[8px] font-bold text-emerald-300">{MACHINES.length} Models</p>
              <span className="mt-0.5 rounded-full bg-white/15 px-1.5 py-0.5 text-[7px] font-extrabold uppercase text-amber-300">
                {animState === 'spread' ? 'Tap Gather' : 'Tap Spread'}
              </span>
            </button>

            {/* 5 Radial Interactive Mobile Brand Nodes */}
            {BRAND_CONSTELLATION_NODES.map((node) => {
              const pctSpreadX = (node.spreadX / 415) * 35; // -35% to +35%
              const pctSpreadY = (node.spreadY / 315) * 33; // -33% to +33%
              const pctGatherX = (node.gatherX / 145) * 16;
              const pctGatherY = (node.gatherY / 125) * 16;
              const leftPct = 50 + (animState === 'spread' ? pctSpreadX : pctGatherX);
              const topPct = 53 + (animState === 'spread' ? pctSpreadY : pctGatherY);
              const count = (machinesByBrand[node.brandKey] ?? []).length;
              const currentShowcaseIdx = activeCardMachineIdx[node.id] ?? 0;
              const activeShowcaseMachine =
                node.showcaseMachines[currentShowcaseIdx] ?? node.showcaseMachines[0];

              return (
                <button
                  key={`mobile-node-${node.id}`}
                  type="button"
                  onClick={() => handleOpenBrandPortal(node)}
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: `translate(-50%, -50%) scale(${animState === 'gathered' ? 0.72 : 1})`,
                    background: node.cardBgGradient,
                    borderColor: node.accentHex,
                    boxShadow: `0 10px 28px rgba(0,0,0,0.8), 0 0 16px ${node.accentHex}44`,
                  }}
                  className="absolute z-20 flex w-[112px] sm:w-[144px] flex-col items-center rounded-2xl border-2 p-1.5 sm:p-2 text-center backdrop-blur-xl transition-all duration-1000 ease-out active:scale-95"
                >
                  <div className="flex w-full items-center justify-between gap-1">
                    <span
                      className=" truncate rounded px-1.5 py-0.5 font-display text-[8px] sm:text-[9px] font-black text-white"
                      style={{ backgroundColor: node.accentHex }}
                    >
                      {node.shortName}
                    </span>
                    <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[8px] font-extrabold text-white">
                      {count}
                    </span>
                  </div>

                  <div className="my-1 flex h-12 sm:h-16 w-full items-center justify-center rounded-xl bg-[#070d1a]/90 p-1">
                    <img
                      src={activeShowcaseMachine.image}
                      alt={activeShowcaseMachine.name}
                      className="max-h-10 sm:max-h-14 w-auto object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.75)]"
                    />
                  </div>

                  <p className="w-full truncate text-[8px] sm:text-[9px] font-bold text-white/90">
                    {activeShowcaseMachine.name}
                  </p>
                  <span
                    className="mt-1 inline-flex w-full items-center justify-center gap-0.5 rounded-lg py-0.5 text-[8px] font-extrabold uppercase text-white"
                    style={{ backgroundColor: node.accentHex }}
                  >
                    Enter All {count}
                    <ArrowRight className="size-2.5" />
                  </span>
                </button>
              );
            })}

            {/* Bottom Mobile Helper Prompt */}
            <div className="absolute inset-x-3 bottom-2.5 z-20 flex items-center justify-center">
              <span className="rounded-full border border-white/12 bg-black/65 px-3 py-1 text-[10px] font-semibold text-white/80 backdrop-blur-md">
                Tap any <strong className="text-emerald-300">Brand Node</strong> above or swipe cards below
              </span>
            </div>
          </div>

          {/* Full Detailed Mobile & Tablet Brand Cards with 4-Machine Switcher Dock */}
          <div className="grid gap-4 sm:grid-cols-2">
            {BRAND_CONSTELLATION_NODES.map((node) => {
              const count = (machinesByBrand[node.brandKey] ?? []).length;
              const currentShowcaseIdx = activeCardMachineIdx[node.id] ?? 0;
              const activeShowcaseMachine =
                node.showcaseMachines[currentShowcaseIdx] ?? node.showcaseMachines[0];

              return (
                <div
                  key={node.id}
                  onClick={() => handleOpenBrandPortal(node)}
                  style={{
                    background: node.cardBgGradient,
                    borderColor: `${node.accentHex}88`,
                  }}
                  className="rounded-3xl border-2 p-4 shadow-xl active:scale-[0.99] transition-transform cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="rounded-lg px-2.5 py-1 font-display text-xs font-black text-white shadow"
                        style={{ backgroundColor: node.accentHex }}
                      >
                        {node.logoMonogram}
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-sm font-bold text-white">
                          {node.shortName}
                        </h3>
                        <p className="truncate text-[10px] text-white/65">{node.origin}</p>
                      </div>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-3 py-1 text-xs font-extrabold text-white shadow"
                      style={{ backgroundColor: node.accentHex }}
                    >
                      Enter {count} →
                    </span>
                  </div>

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {node.categories.map((cat) => {
                      const cTheme = CATEGORY_COLOR_MAP[cat];
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenBrandPortal(node, cat);
                          }}
                          style={{
                            backgroundColor: `${cTheme.hex}28`,
                            borderColor: `${cTheme.hex}77`,
                          }}
                          className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-bold text-white"
                        >
                          <span
                            className="size-1.5 rounded-full"
                            style={{ backgroundColor: cTheme.hex }}
                          />
                          {cat}
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative my-3 flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#070d1a] p-3">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-35"
                      style={{
                        background: `radial-gradient(circle at center, ${node.accentHex}66 0%, transparent 72%)`,
                      }}
                    />
                    <img
                      src={activeShowcaseMachine.image}
                      alt={activeShowcaseMachine.name}
                      className="relative z-10 max-h-32 object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.75)]"
                    />
                    <span
                      className="absolute bottom-2 left-2.5 rounded-md px-2 py-0.5 text-[10px] font-bold text-white shadow"
                      style={{ backgroundColor: `${node.accentHex}dd` }}
                    >
                      {activeShowcaseMachine.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 mb-3">
                    {node.showcaseMachines.map((sm, idx) => {
                      const isCurrent = idx === currentShowcaseIdx;
                      return (
                        <button
                          key={sm.slug + idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCardMachineIdx((prev) => ({ ...prev, [node.id]: idx }));
                          }}
                          style={{
                            borderColor: isCurrent ? node.accentHex : 'rgba(255,255,255,0.15)',
                            backgroundColor: isCurrent
                              ? `${node.accentHex}28`
                              : 'rgba(255,255,255,0.04)',
                          }}
                          className="flex h-12 items-center justify-center rounded-lg border p-1 transition-transform active:scale-95"
                        >
                          <img
                            src={sm.image}
                            alt={sm.name}
                            className="max-h-10 object-contain"
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-2.5">
                    <div className="flex gap-3">
                      {node.flagshipSpecs.map((sp) => (
                        <div key={sp.label}>
                          <p className="text-[9px] uppercase tracking-wider text-white/50">
                            {sp.label}
                          </p>
                          <p className="text-xs font-bold text-white">{sp.value}</p>
                        </div>
                      ))}
                    </div>
                    <span
                      className="inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-extrabold uppercase text-white"
                      style={{ backgroundColor: node.accentHex }}
                    >
                      All {count} Models
                      <ArrowRight className="size-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          INTERACTIVE BRAND FLEET PORTAL MODAL (Opens Automatically When Any Brand Is Clicked)
         ===================================================================== */}
      {activeBrandPortal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 sm:p-6 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setActiveBrandPortal(null)}
        >
          <div
            className="relative flex max-h-[94vh] w-full max-w-7xl flex-col overflow-hidden rounded-[22px] sm:rounded-[28px] border-2 bg-[#080e1c] text-white shadow-[0_35px_120px_rgba(0,0,0,0.85)]"
            style={{ borderColor: `${activeBrandPortal.accentHex}88` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Portal Top Brand Header */}
            <div
              className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 px-4 py-3.5 sm:px-6 sm:py-5"
              style={{
                background: `linear-gradient(90deg, ${activeBrandPortal.accentHex}38 0%, rgba(8,14,28,0.96) 65%)`,
              }}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div
                  className="flex h-11 sm:h-14 min-w-[74px] sm:min-w-[92px] flex-col items-center justify-center rounded-xl sm:rounded-2xl border border-white/25 px-2.5 text-center shadow-lg shrink-0"
                  style={{ backgroundColor: activeBrandPortal.accentHex }}
                >
                  <span className="font-display text-xs sm:text-sm font-black tracking-wider text-white">
                    {activeBrandPortal.logoMonogram}
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-white/90">
                    {activeBrandPortal.logoSubtext}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex h-2 w-5 overflow-hidden rounded-xs">
                      <span className="w-1/3 bg-[#009246]" />
                      <span className="w-1/3 bg-white" />
                      <span className="w-1/3 bg-[#CE2B37]" />
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-emerald-300 truncate">
                      {activeBrandPortal.origin} · {activeBrandPortal.founded}
                    </span>
                  </div>
                  <h3 className="font-display text-base sm:text-2xl font-bold text-white truncate">
                    {activeBrandPortal.fullName} (
                    {(machinesByBrand[activeBrandPortal.brandKey] ?? []).length} Models)
                  </h3>
                  <p className="hidden sm:block text-xs text-white/70">{activeBrandPortal.tagline}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const anchor = activeBrandPortal.sectionAnchor;
                    setActiveBrandPortal(null);
                    onJumpToBrandSection(anchor);
                  }}
                  className="inline-flex items-center gap-1 rounded-xl border border-white/20 bg-white/10 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-white hover:bg-white/20 cursor-pointer"
                >
                  Page Showcase
                  <ArrowRight className="size-3" />
                </button>

                <Link
                  to="/machines"
                  onClick={() => setActiveBrandPortal(null)}
                  style={{ backgroundColor: activeBrandPortal.accentHex }}
                  className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-bold text-white hover:opacity-90"
                >
                  Full Catalog
                  <ArrowRight className="size-3" />
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveBrandPortal(null)}
                  className="inline-flex size-9 sm:size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-rose-600 hover:border-rose-500 transition-colors cursor-pointer"
                  aria-label="Close Brand Portal"
                >
                  <X className="size-4 sm:size-5" />
                </button>
              </div>
            </div>

            {/* Brand Switcher Tabs + Color-Coded Category Filter Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.02] px-6 py-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-2 text-[10px] font-bold uppercase tracking-widest text-white/45">
                  Switch Brand:
                </span>
                {BRAND_CONSTELLATION_NODES.map((b) => {
                  const active = b.id === activeBrandPortal.id;
                  const c = (machinesByBrand[b.brandKey] ?? []).length;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => handleOpenBrandPortal(b)}
                      style={{
                        backgroundColor: active ? b.accentHex : 'rgba(255,255,255,0.05)',
                        borderColor: active ? '#ffffff' : `${b.accentHex}55`,
                      }}
                      className="rounded-lg border px-3 py-1.5 text-xs font-bold text-white transition-all cursor-pointer hover:opacity-90"
                    >
                      {b.shortName} ({c})
                    </button>
                  );
                })}
              </div>

              {portalCategories.length > 1 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPortalCategoryFilter('All')}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold cursor-pointer ${
                      portalCategoryFilter === 'All'
                        ? 'bg-white text-slate-950 font-bold'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    All ({(machinesByBrand[activeBrandPortal.brandKey] ?? []).length})
                  </button>
                  {portalCategories.map((cat) => {
                    const cTheme = CATEGORY_COLOR_MAP[cat as MachineCategory];
                    const active = portalCategoryFilter === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setPortalCategoryFilter(cat)}
                        style={{
                          backgroundColor: active
                            ? cTheme?.hex ?? activeBrandPortal.accentHex
                            : `${cTheme?.hex ?? activeBrandPortal.accentHex}22`,
                          borderColor: cTheme?.hex ?? activeBrandPortal.accentHex,
                        }}
                        className="rounded-lg border px-2.5 py-1 text-[11px] font-bold text-white cursor-pointer"
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Portal Body: Split Live Machine Spotlight + All Brand Machines Grid */}
            <div className="grid flex-1 overflow-y-auto lg:grid-cols-12">
              {selectedPortalMachine && (
                <div className="flex flex-col justify-between border-b border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 lg:col-span-5 lg:border-b-0 lg:border-r">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white"
                        style={{
                          backgroundColor:
                            CATEGORY_COLOR_MAP[selectedPortalMachine.category]?.hex ??
                            activeBrandPortal.accentHex,
                        }}
                      >
                        {selectedPortalMachine.brand ?? activeBrandPortal.shortName} ·{' '}
                        {selectedPortalMachine.category}
                      </span>
                      <span className="text-xs font-mono text-white/50">
                        {selectedPortalMachine.family}
                      </span>
                    </div>

                    <div className="relative my-4 flex h-64 items-center justify-center rounded-3xl border border-white/15 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,rgba(15,23,42,0.4)_75%)] p-6">
                      <img
                        src={selectedPortalMachine.image}
                        alt={selectedPortalMachine.name}
                        className="max-h-56 w-auto object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.7)] transition-all duration-300"
                      />
                    </div>

                    <h4 className="font-display text-2xl font-bold text-white">
                      {selectedPortalMachine.name}
                    </h4>
                    <p
                      className="mt-1 text-sm font-bold"
                      style={{ color: activeBrandPortal.accentHex }}
                    >
                      {selectedPortalMachine.tagline}
                    </p>
                    <p className="mt-2.5 text-xs leading-relaxed text-white/75 line-clamp-3">
                      {selectedPortalMachine.description}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      {selectedPortalMachine.specs.slice(0, 4).map((sp) => (
                        <div
                          key={sp.label}
                          className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5"
                        >
                          <p className="text-[10px] uppercase tracking-wider text-white/45">
                            {sp.label}
                          </p>
                          <p className="mt-0.5 text-xs font-bold text-white">{sp.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/10">
                    <Link
                      to={`/machines/${selectedPortalMachine.slug}`}
                      onClick={() => setActiveBrandPortal(null)}
                      style={{ backgroundColor: activeBrandPortal.accentHex }}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider text-white hover:opacity-90"
                    >
                      <Cpu className="size-4" />
                      Enter Full Machine Page
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        const target = selectedPortalMachine;
                        setActiveBrandPortal(null);
                        onSelectMachineForModal(target);
                      }}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-semibold text-white hover:bg-white/20 cursor-pointer"
                    >
                      <Eye className="size-4" />
                      3D Zoom Dossier
                    </button>

                    {portalBrochures[0] && (
                      <a
                        href={portalBrochures[0].pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3.5 py-3 text-xs font-semibold text-white/85 hover:bg-white/15"
                      >
                        <FileText className="size-4 text-rose-400" />
                        PDF Brochure
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Right Column: Interactive Grid of All Machines in This Brand (7 cols) */}
              <div className="p-6 lg:col-span-7 overflow-y-auto max-h-[68vh]">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60">
                    All {portalMachines.length} Machines in {activeBrandPortal.shortName} — Click
                    Any Card to Inspect or Enter
                  </p>
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
                  {portalMachines.map((m) => {
                    const isCurrent = selectedPortalMachine?.slug === m.slug;
                    const catColor =
                      CATEGORY_COLOR_MAP[m.category]?.hex ?? activeBrandPortal.accentHex;
                    return (
                      <div
                        key={m.slug}
                        onClick={() => setSelectedPortalMachine(m)}
                        style={{
                          borderColor: isCurrent ? catColor : `${catColor}44`,
                          backgroundColor: isCurrent
                            ? `${catColor}22`
                            : 'rgba(255,255,255,0.03)',
                        }}
                        className="group flex flex-col justify-between rounded-2xl border-2 p-3.5 transition-all cursor-pointer hover:scale-[1.02]"
                      >
                        <div>
                          <div className="relative flex h-32 items-center justify-center rounded-xl bg-[#0c1528] p-2">
                            <img
                              src={m.image}
                              alt={m.name}
                              className="max-h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-108 drop-shadow-[0_8px_14px_rgba(0,0,0,0.6)]"
                            />
                            <span
                              className="absolute top-2 left-2 rounded px-1.5 py-0.5 text-[8px] font-extrabold uppercase text-white"
                              style={{ backgroundColor: catColor }}
                            >
                              {m.category}
                            </span>
                          </div>
                          <h5 className="mt-2.5 font-display text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                            {m.name}
                          </h5>
                          <p className="mt-0.5 text-[11px] text-white/60 line-clamp-2">
                            {m.tagline}
                          </p>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-2">
                          <Link
                            to={`/machines/${m.slug}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveBrandPortal(null);
                            }}
                            style={{ color: catColor }}
                            className="inline-flex items-center gap-1 text-[11px] font-extrabold hover:underline"
                          >
                            Enter Machine
                            <ArrowRight className="size-3" />
                          </Link>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveBrandPortal(null);
                              onSelectMachineForModal(m);
                            }}
                            className="rounded-lg bg-white/10 px-2 py-1 text-[10px] font-semibold text-white hover:bg-white/20 cursor-pointer"
                          >
                            Quick View
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
