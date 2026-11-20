import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Download,
  Film,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { GALLERY_ITEMS, IMAGES, MACHINES } from '../../data/machines';
import { Link } from '../../router';

interface DocumentaryChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  brandKey: string;
  accentHex: string;
  mp4TimestampSec: number;
  narration: string;
  metrics: { label: string; value: string }[];
  heroImage: string;
  secondaryImages: { src: string; label: string }[];
  linkTo: string;
}

const DOCUMENTARY_CHAPTERS: DocumentaryChapter[] = [
  {
    id: 'chap-corporate',
    number: '01',
    title: 'IMA FAR EAST LTD. (IFEL) — Corporate Heritage & Leadership',
    subtitle: 'Under the Dynamic Leadership of M. Borhan Uddin Ahmed · Dhaka, Bangladesh',
    brandKey: 'IFEL Corporate',
    accentHex: '#10b981',
    mp4TimestampSec: 0,
    narration:
      'Welcome to IMA Far East Limited. Under the visionary leadership of Managing Director M. Borhan Uddin Ahmed, IMA Far East Limited powers more than 100 leading garment factories across Bangladesh with 75 world-class European and global industrial machines, backed by 26 full-time factory-trained engineers.',
    metrics: [
      { label: 'Client Factories', value: '100+ in Bangladesh' },
      { label: 'In-House Engineers', value: '26 Full-Time' },
      { label: 'Total Machinery Fleet', value: `${MACHINES.length} Models` },
    ],
    heroImage: GALLERY_ITEMS[1]?.src ?? IMAGES.ifelLogo,
    secondaryImages: [
      { src: IMAGES.ifelLogo, label: 'Official IFEL Emblem' },
      { src: IMAGES.partners, label: 'Global OEM Principals' },
      { src: GALLERY_ITEMS[0]?.src ?? IMAGES.ifelLogo, label: 'International Exhibitions' },
    ],
    linkTo: '/about',
  },
  {
    id: 'chap-ima',
    number: '02',
    title: 'IMA SpA ITALY — Automated Cutting Room, Spreaders & Tables',
    subtitle: 'Palazzolo sull’Oglio (Brescia), Italy · Founded 1977 · 17 Cutting Room Models',
    brandKey: 'IMA SpA',
    accentHex: '#10b981',
    mp4TimestampSec: 4.5,
    narration:
      'Chapter Two: IMA SpA Italy. Founded in Brescia in 1977, IMA engineers complete automated cutting rooms including the Typhoon 70 high-ply CNC cutter, the 892 Mithos 4-wheel-drive heavy roll spreader, the Phoenix 890 spreader series operating at 120 meters per minute, and modular Syncro spreading tables.',
    metrics: [
      { label: 'Spreading Speed', value: '120 m/min' },
      { label: 'Compressed Lay', value: 'Up to 90 mm' },
      { label: 'IMA Fleet', value: '17 Machines' },
    ],
    heroImage: '/images/catalog/ima-892-mithos.webp',
    secondaryImages: [
      { src: '/images/catalog/ima-890b.webp', label: 'Phoenix 890B Spreader' },
      { src: IMAGES.typhoon, label: 'Typhoon 70 CNC Cutter' },
      { src: '/images/catalog/ima-table-848.webp', label: 'Syncro 848 Modular Table' },
    ],
    linkTo: '/machines/892-mithos',
  },
  {
    id: 'chap-rotondi',
    number: '03',
    title: 'ROTONDI GROUP MILAN — Continuous Fusing & Shirt Pressing Line',
    subtitle: 'Settimo Milanese (Milan), Italy · Founded 1953 · 11 Fusing & Shirt Models',
    brandKey: 'ROTONDI Group',
    accentHex: '#3b82f6',
    mp4TimestampSec: 9.0,
    narration:
      'Chapter Three: Rotondi Group Milan. Manufactured across three factories covering 15,000 square meters in Milan, Rotondi delivers 9-zone FP Touch continuous fusing lines, SM-120 shirt collar fusing, the SR-3100 tensioning shirt finisher, and the ARSH robotic double-dummy press producing 1,400 shirts per shift.',
    metrics: [
      { label: 'Thermal Control', value: 'Up to 9 Zones' },
      { label: 'Shirt Output', value: '1,400 / 8h' },
      { label: 'Rotondi Fleet', value: '11 Machines' },
    ],
    heroImage: '/images/catalog/rotondi-shirt-sr3100.webp',
    secondaryImages: [
      { src: '/images/catalog/rotondi-fusing-sm120.webp', label: 'SM-120 Collar Fusing' },
      { src: '/images/catalog/rotondi-shirt-arsh.webp', label: 'ARSH Double-Dummy Press' },
      { src: '/images/catalog/rotondi-shirt-sh5.webp', label: 'SH-5 Automatic Fusing' },
    ],
    linkTo: '/machines/rotondi-sr3100-arsh-shirt-finishing',
  },
  {
    id: 'chap-framis',
    number: '04',
    title: 'FRAMIS ITALIA SpA — NoSo® Seamless Bonding & Heat Presses',
    subtitle: 'Gaggiano (Milan), Italy · Founded 1976 · 13 Sewfree Bonding Models',
    brandKey: 'Framis Italia SpA',
    accentHex: '#f43f5e',
    mp4TimestampSec: 13.5,
    narration:
      'Chapter Four: Framis Italia. Pioneering NoSo sewfree thermoadhesive polyurethane films and bonding machinery in Milan since 1976, featuring the MXC-205 Weld and Cut system, 28 kilohertz titanium ultrasonic bonding, and the MPHK40 flat heat press with integrated vacuum and chiller cooling.',
    metrics: [
      { label: 'Ultrasonic Horn', value: '28 kHz Titanium' },
      { label: 'Lower Platen', value: 'Vacuum + Chiller' },
      { label: 'Framis Fleet', value: '13 Machines' },
    ],
    heroImage: '/images/catalog/framis-mphk40-vacuum.webp',
    secondaryImages: [
      { src: '/images/catalog/framis-mxc205.webp', label: 'MXC-205 Weld & Cut' },
      { src: '/images/catalog/framis-mu281.webp', label: 'MU 281 Ultrasonic' },
      { src: '/images/catalog/framis-mphk32x.webp', label: 'MPHK32X Dual C-Press' },
    ],
    linkTo: '/machines/framis-mc201z-mphk40-mphk18-presses',
  },
  {
    id: 'chap-newtech',
    number: '05',
    title: 'NEW-TECH AUTOMATION — Jacket, Jeans & Knitwear CNC Robotics',
    subtitle: 'European & Mediterranean CNC Division · Founded 1972 · 24 CNC Sewing Models',
    brandKey: 'New-tecH',
    accentHex: '#f59e0b',
    mp4TimestampSec: 18.0,
    narration:
      'Chapter Five: New-tecH Industrial Sewing Automats. Engineered with Beijer touchscreen electronics, Zero-Max mechanics, and Juki, Brother, and Pegasus sewing heads, New-tecH automates jacket pocket welting at 2,000 pockets per shift and denim pocket hemming up to 14,000 pockets per day.',
    metrics: [
      { label: 'Pocket Hemming', value: '14,000 / Day' },
      { label: 'Jacket Welting', value: '2,000 / 8h' },
      { label: 'New-tecH Fleet', value: '24 Machines' },
    ],
    heroImage: '/images/catalog/newtech-3000-11.webp',
    secondaryImages: [
      { src: '/images/catalog/newtech-2025-1.webp', label: '2025-1 Jacket Welt' },
      { src: '/images/catalog/newtech-3500-20.webp', label: '3500-20 Kangaroo Pocket' },
      { src: '/images/catalog/newtech-2800-8.webp', label: '2800-8 J-Stitch Fly' },
    ],
    linkTo: '/machines/newtech-3000-11-back-pocket-setter',
  },
  {
    id: 'chap-nexia',
    number: '06',
    title: 'NEXIA Srl ITALY — AllTogether® Eco Laundry, Laser & Nitrogen Dyeing',
    subtitle: 'Rosà (Vicenza), Italy · Heritage Since 1871 · 10 Smart Laundry & Laser Models',
    brandKey: 'NEXIA',
    accentHex: '#06b6d4',
    mp4TimestampSec: 22.5,
    narration:
      'Chapter Six: Nexia Italy, Laundry Smart Evolution with mechanical heritage since 1871. Featuring the NS 420 AllTogether and Wave washers saving up to 85 percent water and 87 percent chemicals, NEO3 ozone, NDRY 200 Circular Energy dryers, NRAY 4 dual-laser cabins, and patented Nitrogen airless dyeing.',
    metrics: [
      { label: 'Water Saving', value: 'Up to -85%' },
      { label: 'Chemical Saving', value: 'Up to -87%' },
      { label: 'NEXIA Fleet', value: '10 Machines' },
    ],
    heroImage: '/images/catalog/nexia-ns420-wave.webp',
    secondaryImages: [
      { src: '/images/catalog/nexia-nray4-dual-laser.webp', label: 'NRAY 4 Dual Laser' },
      { src: '/images/catalog/nexia-ndry200-circular-energy.webp', label: 'NDRY 200 Dryer' },
      { src: '/images/catalog/nexia-nitrogen-dyeing.webp', label: 'NITROGEN® Dyeing' },
    ],
    linkTo: '/machines/nexia-wave-ndrop-nebulizer-system',
  },
];

export function CorporateMachineryVideoSection() {
  const [playerMode, setPlayerMode] = useState<'interactive' | 'mp4'>('interactive');
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [voiceoverEnabled, setVoiceoverEnabled] = useState(false);
  const [chapterProgress, setChapterProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [focusedSubImage, setFocusedSubImage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeChapter = DOCUMENTARY_CHAPTERS[activeChapterIdx] ?? DOCUMENTARY_CHAPTERS[0];

  // Reset focused sub-image when chapter changes
  useEffect(() => {
    setFocusedSubImage(null);
  }, [activeChapterIdx]);

  // Optional Web Speech API narration when voiceoverEnabled is toggled ON
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (voiceoverEnabled && isPlaying && playerMode === 'interactive') {
      const utter = new SpeechSynthesisUtterance(activeChapter.narration);
      utter.rate = 1.02;
      utter.pitch = 0.98;
      window.speechSynthesis.speak(utter);
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeChapterIdx, voiceoverEnabled, isPlaying, playerMode, activeChapter.narration]);

  // Interactive Motion Cinema auto-advance timer (7 seconds per chapter)
  useEffect(() => {
    if (!isPlaying || playerMode !== 'interactive') return;
    const stepMs = 70;
    const durationMs = 7000;
    const timer = window.setInterval(() => {
      setChapterProgress((prev) => {
        const next = prev + (stepMs / durationMs) * 100;
        if (next >= 100) {
          setActiveChapterIdx((cIdx) => (cIdx + 1) % DOCUMENTARY_CHAPTERS.length);
          return 0;
        }
        return next;
      });
    }, stepMs);
    return () => window.clearInterval(timer);
  }, [isPlaying, playerMode]);

  const handleSelectChapter = (idx: number) => {
    setActiveChapterIdx(idx);
    setChapterProgress(0);
    if (playerMode === 'mp4' && videoRef.current) {
      const targetSec = DOCUMENTARY_CHAPTERS[idx]?.mp4TimestampSec ?? 0;
      videoRef.current.currentTime = targetSec;
      videoRef.current.play().catch(() => {});
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#050914] py-20 text-white border-y border-white/10">
      {/* Ambient Brand-Color Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[760px] rounded-full blur-[110px] opacity-25 transition-colors duration-1000"
        style={{ backgroundColor: activeChapter.accentHex }}
      />

      <div className="site-container relative z-10">
        {/* Top Section Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5">
              <Film className="size-3.5 text-emerald-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                Corporate &amp; 5-Brand Machinery Documentary Video
              </span>
            </div>
            <h2 className="display-md mt-3 text-white">
              Inside IMA Far East Ltd. &amp; Our 75-Machine Industrial Fleet
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Experience our complete corporate story, leadership vision, and all 5 European &amp;
              global machinery brands in our interactive 6-chapter documentary cinema or native
              1080p MP4 broadcast player.
            </p>
          </div>

          {/* Mode Switcher & Download Button */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setPlayerMode('interactive')}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                playerMode === 'interactive'
                  ? 'border-emerald-400 bg-emerald-500/25 text-white shadow-[0_0_24px_rgba(16,185,129,0.35)]'
                  : 'border-white/15 bg-white/[0.04] text-white/70 hover:text-white'
              }`}
            >
              <Sparkles className="size-3.5 text-emerald-400" />
              Interactive 6-Chapter Cinema
            </button>

            <button
              type="button"
              onClick={() => setPlayerMode('mp4')}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                playerMode === 'mp4'
                  ? 'border-cyan-400 bg-cyan-500/25 text-white shadow-[0_0_24px_rgba(6,182,212,0.35)]'
                  : 'border-white/15 bg-white/[0.04] text-white/70 hover:text-white'
              }`}
            >
              <Film className="size-3.5 text-cyan-400" />
              1080p MP4 Video Player
            </button>

            <a
              href="/videos/ifel-corporate-showcase.mp4"
              download="IFEL_Corporate_Machinery_Documentary_1080p.mp4"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
            >
              <Download className="size-3.5 text-emerald-300" />
              Download MP4
            </a>
          </div>
        </div>

        {/* =====================================================================
            MAIN VIDEO THEATER STAGE
           ===================================================================== */}
        <div
          ref={containerRef}
          style={{ borderColor: `${activeChapter.accentHex}66` }}
          className="relative overflow-hidden rounded-[32px] border-2 bg-[#080f1f] shadow-[0_35px_100px_rgba(0,0,0,0.85)]"
        >
          {/* Top Italian Tricolore Cinema Strip */}
          <div className="flex h-1.5 w-full">
            <div className="w-1/3 bg-[#009246]" />
            <div className="w-1/3 bg-white" />
            <div className="w-1/3 bg-[#CE2B37]" />
          </div>

          {playerMode === 'interactive' ? (
            <div className="p-6 sm:p-10">
              {/* Top Cinema HUD Bar */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span
                    style={{ backgroundColor: activeChapter.accentHex }}
                    className="inline-flex size-9 items-center justify-center rounded-xl font-display text-sm font-black text-white shadow"
                  >
                    {activeChapter.number}
                  </span>
                  <div>
                    <p
                      style={{ color: activeChapter.accentHex }}
                      className="text-[10px] font-extrabold uppercase tracking-[0.2em]"
                    >
                      CHAPTER {activeChapter.number} OF 06 · {activeChapter.brandKey}
                    </p>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                      {activeChapter.title}
                    </h3>
                  </div>
                </div>

                {/* Playback & Audio Narration Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    style={{ backgroundColor: activeChapter.accentHex }}
                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow cursor-pointer hover:opacity-90"
                  >
                    {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveChapterIdx(0);
                      setChapterProgress(0);
                      setIsPlaying(true);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/15 cursor-pointer"
                  >
                    <RotateCcw className="size-3.5" />
                    Restart
                  </button>

                  <button
                    type="button"
                    onClick={() => setVoiceoverEnabled((v) => !v)}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold cursor-pointer transition-colors ${
                      voiceoverEnabled
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                        : 'border-white/15 bg-white/5 text-white/75 hover:bg-white/15'
                    }`}
                  >
                    {voiceoverEnabled ? (
                      <Volume2 className="size-3.5 text-emerald-400" />
                    ) : (
                      <VolumeX className="size-3.5" />
                    )}
                    Voiceover: {voiceoverEnabled ? 'ON' : 'OFF'}
                  </button>

                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="inline-flex size-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 hover:bg-white/15 cursor-pointer"
                    title="Toggle Fullscreen Cinema"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="size-4" />
                    ) : (
                      <Maximize2 className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Main Split Documentary Stage */}
              <div className="grid items-center gap-8 lg:grid-cols-12">
                {/* Left 7 Cols: Animated Ken-Burns Studio Visual Stage + Multi-Angle Dock */}
                <div className="lg:col-span-7">
                  <div className="relative flex h-[340px] sm:h-[400px] items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,rgba(6,10,22,0.92)_78%)] p-6">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-35 transition-colors duration-700"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${activeChapter.accentHex}55 0%, transparent 70%)`,
                      }}
                    />

                    <img
                      key={focusedSubImage ?? activeChapter.heroImage}
                      src={focusedSubImage ?? activeChapter.heroImage}
                      alt={activeChapter.title}
                      className="relative z-10 max-h-[320px] w-auto object-contain transition-transform duration-1000 ease-out scale-100 hover:scale-105 drop-shadow-[0_24px_38px_rgba(0,0,0,0.75)]"
                    />

                    {/* Live Subtitle Caption Overlay Bar */}
                    <div className="absolute inset-x-4 bottom-3 z-20 rounded-2xl border border-white/15 bg-black/75 px-4 py-2.5 backdrop-blur-md">
                      <p className="text-xs leading-relaxed text-white/90">
                        <strong style={{ color: activeChapter.accentHex }}>
                          [{activeChapter.brandKey}]
                        </strong>{' '}
                        {activeChapter.narration}
                      </p>
                    </div>
                  </div>

                  {/* Secondary Machine / Corporate Angle Strip */}
                  <div className="mt-3 grid grid-cols-4 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setFocusedSubImage(null)}
                      style={{
                        borderColor:
                          focusedSubImage === null
                            ? activeChapter.accentHex
                            : 'rgba(255,255,255,0.12)',
                      }}
                      className="flex items-center gap-2 rounded-xl border bg-white/[0.04] p-2 text-left hover:bg-white/10 cursor-pointer"
                    >
                      <img
                        src={activeChapter.heroImage}
                        alt={activeChapter.title}
                        className="size-10 object-contain shrink-0"
                      />
                      <span className="truncate text-[10px] font-bold text-white">Main View</span>
                    </button>

                    {activeChapter.secondaryImages.map((img) => {
                      const active = focusedSubImage === img.src;
                      return (
                        <button
                          key={img.src}
                          type="button"
                          onClick={() => setFocusedSubImage(img.src)}
                          style={{
                            borderColor: active
                              ? activeChapter.accentHex
                              : 'rgba(255,255,255,0.12)',
                          }}
                          className="flex items-center gap-2 rounded-xl border bg-white/[0.04] p-2 text-left hover:bg-white/10 cursor-pointer"
                        >
                          <img
                            src={img.src}
                            alt={img.label}
                            className="size-10 object-contain shrink-0"
                          />
                          <span className="truncate text-[10px] font-bold text-white/85">
                            {img.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right 5 Cols: Chapter Telemetry, Metrics & Direct Machine Link */}
                <div className="flex flex-col justify-between space-y-5 lg:col-span-5">
                  <div>
                    <span
                      style={{
                        backgroundColor: `${activeChapter.accentHex}25`,
                        borderColor: `${activeChapter.accentHex}77`,
                        color: activeChapter.accentHex,
                      }}
                      className="inline-block rounded-full border px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest"
                    >
                      {activeChapter.subtitle}
                    </span>

                    <h4 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-white">
                      {activeChapter.title}
                    </h4>

                    <p className="mt-3 text-sm leading-relaxed text-white/75">
                      {activeChapter.narration}
                    </p>

                    {/* 3 Telemetry Metric Cards */}
                    <div className="mt-5 grid grid-cols-3 gap-2.5">
                      {activeChapter.metrics.map((m) => (
                        <div
                          key={m.label}
                          style={{ borderColor: `${activeChapter.accentHex}44` }}
                          className="rounded-2xl border bg-white/[0.03] p-3"
                        >
                          <p className="text-[10px] uppercase tracking-wider text-white/50">
                            {m.label}
                          </p>
                          <p
                            style={{ color: activeChapter.accentHex }}
                            className="mt-1 font-display text-sm sm:text-base font-extrabold"
                          >
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chapter Progress Bar */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-[11px] text-white/60">
                      <span>Chapter Progress</span>
                      <span>{Math.round(chapterProgress)}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-100"
                        style={{
                          width: `${chapterProgress}%`,
                          backgroundColor: activeChapter.accentHex,
                        }}
                      />
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      to={activeChapter.linkTo}
                      style={{ backgroundColor: activeChapter.accentHex }}
                      className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg hover:opacity-90"
                    >
                      Explore {activeChapter.brandKey} Details
                      <ArrowRight className="size-4" />
                    </Link>

                    <Link
                      to="/machines"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-xs font-bold text-white hover:bg-white/15"
                    >
                      All {MACHINES.length} Machines
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Native 1080p MP4 Broadcast Video Player Mode */
            <div className="p-6 sm:p-10">
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-black">
                <video
                  ref={videoRef}
                  src="/videos/ifel-corporate-showcase.mp4"
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="aspect-video w-full object-contain"
                />
              </div>
            </div>
          )}

          {/* Bottom 6-Chapter Interactive Timeline Selector Strip */}
          <div className="border-t border-white/10 bg-black/40 px-6 py-4">
            <p className="mb-2.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/50">
              CLICK ANY DOCUMENTARY CHAPTER TO JUMP INSTANTLY:
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
              {DOCUMENTARY_CHAPTERS.map((chap, idx) => {
                const isActive = idx === activeChapterIdx;
                return (
                  <button
                    key={chap.id}
                    type="button"
                    onClick={() => handleSelectChapter(idx)}
                    style={{
                      borderColor: isActive ? chap.accentHex : 'rgba(255,255,255,0.12)',
                      backgroundColor: isActive
                        ? `${chap.accentHex}26`
                        : 'rgba(255,255,255,0.03)',
                    }}
                    className="group flex flex-col justify-between rounded-xl border-2 p-2.5 text-left transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span
                        style={{ color: chap.accentHex }}
                        className="text-[10px] font-black uppercase tracking-wider"
                      >
                        CH {chap.number}
                      </span>
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: chap.accentHex }}
                      />
                    </div>
                    <p className="mt-1 truncate font-display text-xs font-bold text-white">
                      {chap.brandKey}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
