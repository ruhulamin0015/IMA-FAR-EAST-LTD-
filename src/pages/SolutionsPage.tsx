import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/machines';
import { Link } from '../router';
import { PageHero } from '../components/site/PageHero';
import { PrincipalPartnersSection } from '../components/site/PrincipalPartnersSection';
import { PdfCatalogVaultSection } from '../components/site/PdfCatalogVaultSection';
import { Button } from '../components/ui/button';

const SOLUTIONS = [
  {
    n: '01',
    area: 'Spreading & CNC cutting',
    partner: 'IMA SpA (Brescia, Italy)',
    title: 'Syncro Cutting Room, Phoenix & Mithos Spreaders',
    text: 'Automated tension-free spreading (890B, 890H, 890L, 890C, 890XL, 890T, 890D & 892 Mithos 4x4), modular 825/826/837/839/848 tables, and Typhoon/Zephiro/Tempest CNC vacuum cutters.',
    models: 'Typhoon 70 · 892 Mithos · 890 Series · 839 Multilevel',
  },
  {
    n: '02',
    area: 'Fusing & shirt finishing',
    partner: 'ROTONDI Group (Milan, Italy)',
    title: 'Continuous Fusing Line & Complete Shirt Line',
    text: '9-zone curved heating FP Touch fusing presses (-40% energy saving, 1–4 lane stacker), G & MG series, SH-5/10 collar fusing, SR-3100 blowing shirt finishers, and ARSH double-dummy presses (2,400 pcs/8h).',
    models: 'FP-120/183 · G-160 · SH-5/10 · SR-3100 · ARSH · APC-3300',
  },
  {
    n: '03',
    area: 'NoSo® bonding & heat press',
    partner: 'Framis Italia SpA (Milan, Italy)',
    title: 'Signature 2026 Sewfree Bonding, Dream AQUA & Heat Presses',
    text: 'Simultaneous weld & cut (MXC 205), edge binding (MXC 208), 28kHz ultrasonic (MU 281), 900mm lamination (MR 900), zipper drift welding (MC201Z), vacuum chiller flat presses (MPHK40) & 3D curve presses (MPHK18).',
    models: 'MXC 205/208/210 · MU 281 · MR 900 · MPHK40 · MPHK18',
  },
  {
    n: '04',
    area: 'Jacket tailoring automation',
    partner: 'New-tecH (Istanbul, Turkey)',
    title: 'Jacket Line Pocket Welting, Sleeve Setting & Sartorial Stitch',
    text: 'Programmable straight & slanted welt pocket automats (2,000 pockets/8h), 18-zone step-motor sleeve setting stations (100/5), 3,500 RPM sleeve buttonhole indexers (100/8), and Efka electronic hand-stitch.',
    models: '2025/1 · 2050/5 · 2250/5 · 100/5 · 100/8 · 3600/1 · 9820/01',
  },
  {
    n: '05',
    area: 'Jeans & casual automation',
    partner: 'New-tecH · SIP Italy',
    title: '3-Axis Back Pocket Setters, 14,000/Day Hemming & Denim Lines',
    text: '3-axis cold-folding back & watch pocket setters (4,000–4,500 pcs/8h, 0.001mm precision), J-stitch fly automats (2800/8), 14,000-pocket/day chainstitch hemmers (3200/2-3), double-head serging, and Kansai waistband units.',
    models: '3000/11 · 3000/12 · 2800/8 · 3200/2-3 · 1600/10 · 1500/8 · 3110/1',
  },
  {
    n: '06',
    area: 'Knitwear sewing automation',
    partner: 'New-tecH (Istanbul, Turkey)',
    title: 'Hoodie Kangaroo Pocket, Yamato Hemmer & Laser Polo Placket',
    text: '3-axis automatic sweatshirt kangaroo pocket setter (3500/20), 4,500 pcs/8h T-shirt pocket setter (3000/13), 660 pcs/hour Yamato coverstitch bottom hemmer (3500/10), and laser polo placket automat (3500/1-2).',
    models: '3500/20 · 3000/13 · 3500/10 · 3500/11 · 3500/1-2 · 1500/7',
  },
  {
    n: '07',
    area: 'Hosiery & medical knit',
    partner: 'Busi Giovanni (Brescia, Italy)',
    title: 'True Rib & Medical Compression Socks',
    text: 'Single-cylinder circular knitting machines with needles in the dial for authentic true rib, terry sports, and Class 1–3 graduated medical compression hosiery.',
    models: 'Gold Terry · Idea Terry · Medical Compression',
  },
  {
    n: '08',
    area: 'Intralogistics, laundry & CAD',
    partner: 'NEXIA · OMMI · Richpeace · Vomatex',
    title: 'Smart Laundry, Automated Warehousing & Multi-Head Quilting',
    text: 'NEXIA smart ecological washing systems, OMMI automated roll warehousing, Vomatex German technical pressing coverings, and Richpeace multi-head embroidery & quilting.',
    models: 'NEXIA Smart · OMMI Roll WMS · RP-Quilt · Vomatex',
  },
];

export function SolutionsPage() {
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Complete RMG manufacturing lines"
        title="Eight turnkey solutions."
        intro="From IMA Syncro cutting rooms and Rotondi shirt finishing to Framis Italia NoSo® bonding and New-tecH jacket, denim & knitwear automation."
        machine={IMAGES.detailSyncro}
        machineAlt="IMA Syncro modular cutting tables"
        watermark="Syncro"
      />

      <section className="site-container py-24">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-signal">Swiss-Precision Industrial Architecture</p>
            <h2 className="display-lg mt-3 max-w-3xl">
              10 European &amp; global principal partners. One accountable team in Dhaka.
            </h2>
          </div>
          <Button asChild variant="ink" size="xl">
            <Link to="/contact">Request Turnkey Line Proposal</Link>
          </Button>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {SOLUTIONS.map((sol) => {
            const isSelected = selectedSolution === sol.n;
            return (
              <article
                key={sol.n}
                onClick={() => setSelectedSolution(isSelected ? null : sol.n)}
                className={`group flex flex-col justify-between bg-background p-8 transition-colors md:p-10 cursor-pointer ${
                  isSelected ? 'bg-muted/70' : 'hover:bg-muted/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <p className="eyebrow text-muted-foreground tabular-nums">
                      {sol.n} / {sol.area}
                    </p>
                    <span className="font-mono text-xs text-signal">{sol.partner}</span>
                  </div>
                  <h3 className="mt-5 font-display text-3xl">{sol.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{sol.text}</p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Models: {sol.models}
                  </p>
                  <Link
                    to="/contact"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground group-hover:text-signal"
                  >
                    Inquire <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 10 Official PDF Catalogues Vault */}
      <PdfCatalogVaultSection showClients={true} />

      {/* Principal Partners Interactive Section */}
      <PrincipalPartnersSection showHeaderBanner={true} />

      <section className="bg-muted py-24">
        <div className="site-container grid items-center gap-12 lg:grid-cols-2">
          <img
            src={IMAGES.partners}
            alt="IMA Far East Ltd. — 48 years and principal partners"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full rounded-2xl shadow-xl"
          />
          <div>
            <h2 className="display-md">Need a full line, not just a machine?</h2>
            <p className="mt-5 text-lg font-light text-muted-foreground">
              Tell us your product mix and bottleneck. Our senior engineers will map the right
              combination of partners for your floor.
            </p>
            <Button asChild variant="ink" size="xl" className="mt-8">
              <Link to="/contact">Book an on-site audit</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
