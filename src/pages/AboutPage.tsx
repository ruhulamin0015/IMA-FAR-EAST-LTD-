import { Award, CheckCircle2, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import { ABOUT_US_TEXT, GALLERY_ITEMS, IMAGES, SITE_INFO } from '../data/machines';
import { Link } from '../router';
import { Button } from '../components/ui/button';
import { PrincipalPartnersSection } from '../components/site/PrincipalPartnersSection';
import { DynamicTeamSection } from '../components/site/DynamicTeamSection';
import { CorporateMachineryVideoSection } from '../components/site/CorporateMachineryVideoSection';

const PILLARS = [
  {
    icon: Sparkles,
    title: 'Maximizing Productivity',
    description:
      'Integrated CAD software and automated CNC cutting & spreading hardware engineered to eliminate cutting room bottlenecks.',
    accent: '#10b981',
    gradient: 'from-emerald-500/15 via-teal-500/10 to-transparent',
    border: 'border-emerald-500/35',
  },
  {
    icon: CheckCircle2,
    title: 'Minimizing Errors',
    description:
      'Digital tension-free fabric feeding, optical registration, and precision knife intelligence for zero-defect garment plies.',
    accent: '#3b82f6',
    gradient: 'from-blue-500/15 via-sky-500/10 to-transparent',
    border: 'border-blue-500/35',
  },
  {
    icon: ShieldCheck,
    title: 'Quality & Fabric Savings',
    description:
      'Optimize marker utilization and fabric yield across knitwear, denim, woven shirting, and technical textiles.',
    accent: '#f59e0b',
    gradient: 'from-amber-500/15 via-orange-500/10 to-transparent',
    border: 'border-amber-500/35',
  },
  {
    icon: Wrench,
    title: 'Unmatched After-Sales Service',
    description:
      '26 factory-trained engineers stationed across Bangladesh with genuine OEM spare parts in our Dhaka warehouse.',
    accent: '#f43f5e',
    gradient: 'from-rose-500/15 via-pink-500/10 to-transparent',
    border: 'border-rose-500/35',
  },
];

export function AboutPage() {
  return (
    <>
      {/* Hero Banner with IFEL Logo & Full Name */}
      <section className="relative min-h-[84svh] overflow-hidden bg-ink text-ink-foreground flex items-end">
        <div className="absolute inset-0 studio" />
        <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-center overflow-hidden px-6">
          <p
            aria-hidden={true}
            className="wordmark max-w-full select-none whitespace-nowrap text-center text-[clamp(1.6rem,5.8vw,6.8rem)] tracking-[0.18em] leading-none text-ink-foreground/[0.05]"
          >
            IMA FAR EAST
          </p>
        </div>

        <div className="site-container relative z-10 grid items-center gap-12 pb-[10vh] pt-36 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow mb-4 text-signal animate-slide-title">
              Corporate Profile · Engineering Excellence in Bangladesh
            </p>
            <h1
              className="display-hero animate-slide-title"
              style={{ animationDelay: '0.1s' }}
            >
              IMA FAR EAST LTD.
            </h1>
            <p
              className="mt-6 max-w-2xl text-xl font-light leading-relaxed text-ink-muted animate-slide-title"
              style={{ animationDelay: '0.25s' }}
            >
              {ABOUT_US_TEXT.lead}
            </p>
            <div
              className="mt-8 flex flex-wrap gap-3 animate-slide-title"
              style={{ animationDelay: '0.4s' }}
            >
              <Button asChild variant="signal" size="xl">
                <Link to="/machines">Explore 75-Machine Fleet</Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/gallery">Cinematic Exhibition Gallery</Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <img
              src={IMAGES.ifelLogo}
              alt="IFEL — IMA Far East Ltd. Official Emblem"
              referrerPolicy="no-referrer"
              className="size-56 sm:size-64 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-slide-machine"
            />
            <p className="wordmark mt-6 text-center text-sm tracking-[0.28em] text-ink-foreground">
              IMA FAR EAST LTD.
            </p>
            <p className="mt-1 text-xs text-ink-muted">
              Under the Dynamic Leadership of M. Borhan Uddin Ahmed
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Corporate & 5-Brand Machinery Documentary Video Theater */}
      <CorporateMachineryVideoSection />

      {/* Executive Corporate Narrative & Leadership Story */}
      <section className="site-container py-24">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] items-start">
          <div className="space-y-6">
            <p className="eyebrow text-signal">Our Corporate Mission &amp; Heritage</p>
            <h2 className="display-lg">
              Integrated software &amp; hardware solutions for over 100 factories across Bangladesh.
            </h2>

            <div className="space-y-6 rounded-3xl border border-border bg-muted/40 p-8 sm:p-11 text-[17px] leading-[1.8] text-foreground shadow-sm">
              <p className="text-lg leading-relaxed">
                Under the dynamic leadership of visionary business entrepreneur{' '}
                <strong className="font-semibold text-foreground">M. Borhan Uddin Ahmed</strong>,{' '}
                <strong className="font-semibold text-foreground">IMA FAR EAST LTD.</strong> has
                established itself as one of the most respected and accomplished suppliers of
                industrial garment machinery and automated equipment in Bangladesh—distinguished by
                uncompromising machine quality, application expertise, and responsive engineering
                support.
              </p>

              <p>
                Today, the company delivers comprehensive, integrated CAD/CAM software and precision
                hardware ecosystems to leading manufacturers across the fashion and apparel,
                technical textiles, and garment graphics sectors, proudly serving more than{' '}
                <strong className="font-semibold text-foreground">
                  100 industrial enterprises
                </strong>{' '}
                throughout Bangladesh.
              </p>

              <p>
                Drawing upon a rich legacy of European and global innovation,{' '}
                <strong className="font-semibold text-foreground">IMA FAR EAST LTD.</strong>{' '}
                partners with manufacturers to unlock their full production potential—maximizing
                cutting and finishing floor productivity, eliminating manual processing errors, and
                realizing substantial fabric and energy savings from existing workflows. Above all,
                the organization commands an exceptional industry reputation for dedicated,
                round-the-clock after-sales technical service.
              </p>

              <div className="border-t border-border pt-6">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Exclusive &amp; Authorized Global Machinery Portfolio
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  <strong className="font-semibold text-foreground">IMA FAR EAST LTD.</strong> is
                  recognized across Bangladesh for supplying and servicing flagship equipment from
                  world-renowned engineering principals: <strong className="text-foreground">IMA ITALY</strong>{' '}
                  for complete automated cutting room solutions;{' '}
                  <strong className="text-foreground">ROTONDI</strong> for advanced garment pressing
                  and finishing; <strong className="text-foreground">FRAMIS ITALIA</strong> for
                  seamless bonding machinery and heat-seal tapes/films;{' '}
                  <strong className="text-foreground">NEXIA</strong> for smart industrial washing and
                  laundry solutions; <strong className="text-foreground">SIP ITALY</strong>, the
                  global benchmark for turnkey jeans and trousers production;{' '}
                  <strong className="text-foreground">VOMATEX</strong> for German pressing pads and
                  technical coverings; <strong className="text-foreground">BUSI</strong> for
                  specialized True Rib sock knitting machinery;{' '}
                  <strong className="text-foreground">OMMI</strong> for automated warehouse
                  intralogistics; and <strong className="text-foreground">RICHPEACE</strong> for
                  multi-head embroidery, computerized quilting, special sewing, plotters, and
                  pattern cutting systems.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-border bg-background shadow-xl">
              <img
                src={GALLERY_ITEMS[1].src}
                alt="Managing Director M. Borhan Uddin Ahmed receiving international excellence recognition"
                referrerPolicy="no-referrer"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-8">
                <div className="flex items-center gap-2 text-signal">
                  <Award className="size-5" />
                  <span className="eyebrow">Dynamic Entrepreneurial Leadership</span>
                </div>
                <h3 className="mt-3 font-display text-2xl">M. Borhan Uddin Ahmed</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Managing Director, IMA Far East Ltd. — spearheading nationwide industrial
                  modernization, strategic European OEM alliances, and 24/7 engineering governance
                  across Bangladesh&apos;s apparel and textile sector.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border bg-background p-6 shadow-md">
              <img
                src={IMAGES.partners}
                alt="IMA Far East Ltd. — Principal Partners"
                referrerPolicy="no-referrer"
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Four Colorful Value Pillars */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061122] via-[#0a162e] to-[#130d26] py-24 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#009246] via-cyan-400 to-[#CE2B37]" />
        <div className="site-container relative z-10">
          <p className="eyebrow text-emerald-300">How We Help Customers Reach Their Optimum</p>
          <h2 className="display-lg mt-3 max-w-3xl bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
            Productivity, precision, savings, and legendary after-sales support.
          </h2>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className={`flex flex-col rounded-3xl border-2 ${pillar.border} bg-gradient-to-b ${pillar.gradient} bg-[#0b152a]/85 p-8 shadow-xl backdrop-blur-md transition-transform duration-300 hover:-translate-y-1.5`}
                >
                  <div
                    className="flex size-13 items-center justify-center rounded-2xl text-white shadow-lg"
                    style={{ backgroundColor: pillar.accent }}
                  >
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* World-Renowned Principal Partners Interactive Showcase — Italian Flag Clean Minimalist Gradient Theme */}
      <PrincipalPartnersSection showHeaderBanner={true} />

      {/* Meet Our Dynamic Team Section — MD, Director & Full 26-Member Roster */}
      <DynamicTeamSection />

      {/* Colorful CTA Section */}
      <section className="site-container py-24">
        <div className="relative overflow-hidden flex flex-wrap items-center justify-between gap-8 rounded-[32px] border-2 border-cyan-400/35 bg-gradient-to-r from-[#07162a] via-[#0d1f3c] to-[#1a1030] p-10 sm:p-14 text-white shadow-2xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#009246] via-amber-400 to-[#CE2B37]" />
          <div className="max-w-2xl">
            <p className="eyebrow text-emerald-300">Partner with IMA Far East Ltd.</p>
            <h2 className="display-md mt-3 text-white">
              Ready to maximize productivity and minimize errors on your floor?
            </h2>
            <p className="mt-3 text-cyan-100/80">
              Connect with our Dhaka headquarters or schedule an on-site cutting &amp; finishing
              audit with our engineering team.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-8 py-4 text-sm font-bold text-white shadow-[0_10px_28px_rgba(16,185,129,0.4)] transition-transform hover:scale-[1.03]"
            >
              Book a Factory Audit
            </Link>
            <a
              href={SITE_INFO.phoneHref}
              className="inline-flex items-center justify-center rounded-full border border-amber-400/50 bg-amber-500/15 px-8 py-4 text-sm font-bold text-amber-200 hover:bg-amber-500/25 transition-colors"
            >
              Call {SITE_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
