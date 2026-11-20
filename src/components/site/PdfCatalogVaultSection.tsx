import { useState } from 'react';
import {
  Award,
  Building2,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Sparkles,
  X,
} from 'lucide-react';
import {
  BANGLADESH_CLIENTS,
  IMAGES,
  PDF_CATALOGS,
  PdfCatalog,
} from '../../data/machines';
import { Button } from '../ui/button';

export function PdfCatalogVaultSection({
  showClients = true,
}: {
  showClients?: boolean;
}) {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [activePdfModal, setActivePdfModal] = useState<PdfCatalog | null>(null);

  const brands = ['All', 'IMA SpA', 'ROTONDI Group', 'Framis Italia SpA', 'New-tecH', 'NEXIA'];

  const filteredCatalogs =
    selectedBrand === 'All'
      ? PDF_CATALOGS
      : PDF_CATALOGS.filter((c) => c.brand === selectedBrand);

  return (
    <>
      <section className="relative overflow-hidden bg-[#090b0f] py-24 text-white">
        {/* Luxury Ambient Gradient Orbs */}
        <div className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-[#009246]/15 blur-[130px]" />
        <div className="pointer-events-none absolute -right-40 bottom-20 size-96 rounded-full bg-[#CE2B37]/15 blur-[130px]" />

        <div className="site-container relative">
          {/* Section Header */}
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/90">
                <FileText className="size-3.5 text-[#009246]" />
                <span>11 Official OEM Engineering Catalogues &amp; Technical Brochures</span>
              </div>
              <h2 className="display-lg mt-4 max-w-4xl">
                Official Technical Documentation &amp; Machine Dossiers.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
                Inspect or download the complete original manufacturer brochures for IMA SpA
                Spreaders &amp; Tables, ROTONDI Fusing &amp; Shirt Lines, FRAMIS ITALIA 2025/2026
                NoSo® Bonding &amp; Heat Presses, New-tecH Jacket, Jeans &amp; Knitwear
                Automation, and NEXIA 2025 Smart Laundry, Ozone, Laser &amp; Nitrogen Dyeing.
              </p>
            </div>

            {/* Brand Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {brands.map((b) => {
                const active = selectedBrand === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBrand(b)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      active
                        ? 'bg-gradient-to-r from-[#009246] to-[#007a3a] text-white shadow-lg'
                        : 'border border-white/15 bg-white/[0.04] text-white/75 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 10 PDF Catalogs Showcase Grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCatalogs.map((cat, idx) => (
              <article
                key={cat.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:shadow-2xl"
              >
                {/* Top Tricolore Accent */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#009246] via-white/80 to-[#CE2B37] opacity-60 group-hover:opacity-100" />

                <div>
                  {/* Cover Preview Stage */}
                  <div
                    onClick={() => setActivePdfModal(cat)}
                    className="studio-luxury relative flex aspect-[16/10] cursor-pointer items-center justify-center overflow-hidden rounded-2xl p-3"
                  >
                    <img
                      src={cat.coverImage}
                      alt={cat.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="max-h-full w-full rounded-lg object-contain shadow-2xl transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                      {String(idx + 1).padStart(2, '0')} · {cat.brand}
                    </span>
                    <span className="glass absolute right-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] text-white/90">
                      {cat.pages} Pages · PDF
                    </span>
                  </div>

                  {/* Details */}
                  <div className="mt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#009246]">
                      {cat.origin} · {cat.category}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl text-white leading-snug">
                      {cat.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-white/65">{cat.subtitle}</p>

                    <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-3">
                      {cat.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-xs text-white/75"
                        >
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#009246]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Model Chips */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {cat.models.map((m) => (
                        <span
                          key={m}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-white/80"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center gap-2.5 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={() => setActivePdfModal(cat)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black transition-opacity hover:opacity-90 cursor-pointer"
                  >
                    <FileText className="size-3.5" />
                    <span>Preview Brochure</span>
                  </button>
                  <a
                    href={cat.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/[0.05] px-3.5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/15"
                    title="Download Official PDF"
                  >
                    <Download className="size-3.5" />
                    <span>PDF</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* NEXIA 2025 AllTogether® + Framis Italia 2025 Sustainability Highlights */}
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* NEXIA Srl 2025 Laundry Smart Evolution Card */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/15 bg-gradient-to-br from-sky-500/15 via-white/[0.04] to-[#009246]/15 p-8 lg:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-white">
                  <Sparkles className="size-3.5 text-sky-400" />
                  <span>NEXIA ITALY (SINCE 1871) · Laundry Smart Evolution 2025</span>
                </div>
                <h3 className="display-md mt-4">
                  AllTogether® System: Wave®, NDrop®, NEO³ Ozone &amp; Nexstone®.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Born in Rosà (Vicenza) from Caminada (1871), 2M, and 4M heritage,{' '}
                  <strong>NEXIA</strong> integrates recirculation, double nebulization, ozone in
                  water &amp; air, pumice-free Nexstone®, NDRY Circular Energy heat-recovery
                  dryers, NRAY CO₂ lasers, and patented <strong>NITROGEN®</strong> airless dyeing.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-white/15 bg-black/40 p-3.5">
                    <p className="font-display text-2xl text-sky-400">-85%</p>
                    <p className="mt-1 text-[11px] text-white/65">Water Consumption</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-black/40 p-3.5">
                    <p className="font-display text-2xl text-[#009246]">-87%</p>
                    <p className="mt-1 text-[11px] text-white/65">Chemical Reduction</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-black/40 p-3.5">
                    <p className="font-display text-2xl text-white">-40%</p>
                    <p className="mt-1 text-[11px] text-white/65">Energy &amp; Steam</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-black/40 p-3.5">
                    <p className="font-display text-2xl text-emerald-400">1871</p>
                    <p className="mt-1 text-[11px] text-white/65">Vicenza, Italy Roots</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <img
                  src="/images/catalog/cover-nexia-catalogue.webp"
                  alt="NEXIA Main Catalogue 2025"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-44 w-full rounded-2xl border border-white/15 bg-black/40 object-contain p-2 shadow-2xl"
                />
                <img
                  src="/images/catalog/nexia-alltogether-system-sheet.webp"
                  alt="NEXIA AllTogether System Sheet"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-44 w-full rounded-2xl border border-white/15 bg-black/40 object-contain p-2 shadow-2xl"
                />
              </div>
            </div>

            {/* Framis Italia 2025 Company Profile & Sustainability Highlight */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/15 bg-gradient-to-br from-[#009246]/15 via-white/[0.04] to-[#CE2B37]/15 p-8 lg:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-white">
                  <Sparkles className="size-3.5 text-[#009246]" />
                  <span>FRAMIS ITALIA 2025 Innovation · Creativity Made Shape</span>
                </div>
                <h3 className="display-md mt-4">
                  Dream AQUA®, Framilon® &amp; NoSo® Zero-Solvent Bonding Ecosystem.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Founded in Milan in 1979, Framis Italia provides the complete synergy of custom
                  polyurethane heat-seal tapes, films, and Italian bonding machines. In 2024/2025,
                  Framis launched <strong>Dream AQUA</strong> (100% water-based, DMF-free &amp;
                  PFAS-free adhesive films) and <strong>ECO</strong> 100% solvent-free two-sided
                  tapes.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-white/15 bg-black/40 p-3.5">
                    <p className="font-display text-2xl text-[#009246]">-20% CO₂</p>
                    <p className="mt-1 text-[11px] text-white/65">2025 Emissions Reduction</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-black/40 p-3.5">
                    <p className="font-display text-2xl text-white">-50%</p>
                    <p className="mt-1 text-[11px] text-white/65">Solvent Reduction Target</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-black/40 p-3.5">
                    <p className="font-display text-2xl text-[#CE2B37]">0% PFAS</p>
                    <p className="mt-1 text-[11px] text-white/65">Dream AQUA Water-Based</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-black/40 p-3.5">
                    <p className="font-display text-2xl text-white">1979</p>
                    <p className="mt-1 text-[11px] text-white/65">Milan, Italy Heritage</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <img
                  src="/images/catalog/cover-framis-profile.webp"
                  alt="Framis Italia Company Profile 2025"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-44 w-full rounded-2xl border border-white/15 bg-black/40 object-contain p-2 shadow-2xl"
                />
                <img
                  src="/images/catalog/cover-framis-machines.webp"
                  alt="Framis Italia Signature 2026 Catalogue"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-44 w-full rounded-2xl border border-white/15 bg-black/40 object-contain p-2 shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Official IMA Bangladesh Client Portfolio (Extracted from Spreaders PDF Page 1 & Page 24) */}
          {showClients && (
            <div className="mt-16 rounded-3xl border border-white/15 bg-white/[0.03] p-8 lg:p-12">
              <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1 text-xs font-medium text-[#009246]">
                    <Building2 className="size-3.5" />
                    <span>Official IMA SpA &amp; IFEL Customer Portfolio in Bangladesh</span>
                  </div>
                  <h3 className="display-md mt-3">
                    Trusted by 100+ Leading Garment &amp; Textile Conglomerates Across Bangladesh.
                  </h3>
                  <p className="mt-2 text-sm text-white/65">
                    Verified cutting room, spreading, fusing, bonding, and sewing automation
                    installations commissioned and supported 24/7 by IMA Far East Ltd.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {BANGLADESH_CLIENTS.map((client) => (
                      <span
                        key={client}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/90 transition-colors hover:border-[#009246] hover:bg-white/[0.08]"
                      >
                        <Award className="size-3 text-[#009246]" />
                        {client}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Authentic Extracted Pages from IMA Spreaders PDF */}
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/50 p-2">
                    <img
                      src={IMAGES.spreadersTeamCover}
                      alt="IMA Global & Bangladesh Team and 45th Anniversary"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full rounded-xl object-contain"
                    />
                    <p className="mt-2 px-2 text-center text-[11px] text-white/60">
                      IMA Global &amp; Bangladesh Engineering Team · 45th Anniversary &amp; Italian
                      National Day
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/50 p-2">
                    <img
                      src={IMAGES.spreadersClientsPage}
                      alt="IMA Customer List in Bangladesh"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full rounded-xl object-contain"
                    />
                    <p className="mt-2 px-2 text-center text-[11px] text-white/60">
                      Official IMA Customer Reference Roster in Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive In-App PDF Brochure Viewer Modal */}
      {activePdfModal && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={activePdfModal.title}
          onClick={() => setActivePdfModal(null)}
        >
          <div
            className="relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-[#0d1017] text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#009246]">
                  {activePdfModal.brand} · {activePdfModal.origin} ({activePdfModal.pages} Pages)
                </p>
                <h3 className="font-display text-lg sm:text-xl text-white">
                  {activePdfModal.title}
                </h3>
              </div>
              <div className="flex items-center gap-2.5">
                <Button asChild variant="signal" size="sm">
                  <a
                    href={activePdfModal.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <Download className="size-3.5" /> Download PDF
                  </a>
                </Button>
                <Button asChild variant="glass" size="sm">
                  <a
                    href={activePdfModal.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="size-3.5" /> Open in New Tab
                  </a>
                </Button>
                <button
                  type="button"
                  onClick={() => setActivePdfModal(null)}
                  className="glass inline-flex size-9 items-center justify-center rounded-full hover:bg-white/20 cursor-pointer"
                  aria-label="Close PDF viewer"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Frame */}
            <div className="flex-1 bg-black">
              <iframe
                src={activePdfModal.pdfUrl}
                title={activePdfModal.title}
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
