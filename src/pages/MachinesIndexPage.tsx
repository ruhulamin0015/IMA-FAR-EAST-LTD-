import { useState } from 'react';
import { ArrowRight, FileText, LayoutGrid, Search, Table2 } from 'lucide-react';
import { MACHINES, MACHINE_CATEGORIES, MachineCategory, SITE_INFO } from '../data/machines';
import { Link } from '../router';
import { PageHero } from '../components/site/PageHero';
import { MachineCatalogCard } from '../components/site/MachineCards';
import { PdfCatalogVaultSection } from '../components/site/PdfCatalogVaultSection';
import { Button } from '../components/ui/button';

type FilterOption = 'All' | MachineCategory;

export function MachinesIndexPage() {
  const [filter, setFilter] = useState<FilterOption>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'matrix'>('grid');

  const options: FilterOption[] = ['All', ...MACHINE_CATEGORIES];

  const filteredMachines = MACHINES.filter((m) => {
    const matchesCategory = filter === 'All' || m.category === filter;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCategory;
    return (
      matchesCategory &&
      (m.name.toLowerCase().includes(q) ||
        (m.brand ?? '').toLowerCase().includes(q) ||
        m.badge.toLowerCase().includes(q) ||
        m.tagline.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <PageHero
        eyebrow="Engineered precision equipment · Italy & European OEM Principals"
        title="The complete machine fleet."
        intro={`Explore all ${MACHINES.length} industrial machine lines across IMA SpA Cutters, Spreaders & Syncro Tables, ROTONDI Fusing & Shirt Pressing, FRAMIS ITALIA NoSo® Bonding & Heat Presses, New-tecH Jacket, Jeans & Knitwear Automation, and NEXIA Smart Laundry, Ozone, Laser & Nitrogen Dyeing.`}
        machine={MACHINES[0].image}
        machineAlt={MACHINES[0].name}
        watermark="FLEET"
      />

      <section className="bg-muted py-20">
        <div className="site-container">
          {/* Swiss Minimalist Filter & Matrix Toolbar */}
          <div className="mb-12 flex flex-col justify-between gap-6 border-b border-border pb-8 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-2">
              {options.map((option) => {
                const count =
                  option === 'All'
                    ? MACHINES.length
                    : MACHINES.filter((m) => m.category === option).length;
                const active = filter === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFilter(option)}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      active
                        ? 'bg-foreground text-background shadow-sm'
                        : 'border border-border bg-background text-foreground hover:bg-accent'
                    }`}
                  >
                    {option}{' '}
                    <span className="ml-1 font-mono opacity-65 tabular-nums">({count})</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 sm:w-64 sm:flex-initial">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by brand, model or spec..."
                  className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div className="inline-flex rounded-xl border border-border bg-background p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <LayoutGrid className="size-3.5" /> Catalog Grid
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('matrix')}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    viewMode === 'matrix'
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Table2 className="size-3.5" /> Technical Matrix
                </button>
              </div>
            </div>
          </div>

          {/* View 1: Visual Catalog Grid */}
          {viewMode === 'grid' ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredMachines.map((machine) => (
                <MachineCatalogCard key={machine.slug} machine={machine} />
              ))}
            </div>
          ) : (
            /* View 2: Swiss Minimalist Technical Comparison Matrix */
            <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/60 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      <th className="py-4 pl-6 pr-3">No.</th>
                      <th className="px-4 py-4">Machine Model</th>
                      <th className="px-4 py-4">Principal Brand</th>
                      <th className="px-4 py-4">Category</th>
                      <th className="px-4 py-4">Primary Specification</th>
                      <th className="px-4 py-4">Brochure</th>
                      <th className="py-4 pl-4 pr-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredMachines.map((machine, idx) => (
                      <tr
                        key={machine.slug}
                        className="transition-colors hover:bg-muted/40"
                      >
                        <td className="py-4 pl-6 pr-3 font-mono text-xs text-muted-foreground tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={machine.image}
                              alt={machine.name}
                              referrerPolicy="no-referrer"
                              className="h-10 w-14 rounded object-contain"
                            />
                            <div>
                              <p className="font-display text-base font-medium text-foreground">
                                {machine.name}
                              </p>
                              <p className="text-xs text-muted-foreground">{machine.tagline}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-xs font-medium text-foreground">
                          {machine.brand ?? 'IMA SpA'}
                        </td>
                        <td className="px-4 py-4 text-xs text-muted-foreground">
                          {machine.category}
                        </td>
                        <td className="px-4 py-4 font-mono text-xs text-foreground tabular-nums">
                          {machine.specs[0]?.label}: {machine.specs[0]?.value}
                        </td>
                        <td className="px-4 py-4">
                          {machine.pdfUrl ? (
                            <a
                              href={machine.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
                            >
                              <FileText className="size-3 text-signal" /> PDF
                            </a>
                          ) : (
                            <span className="text-xs text-muted-foreground">On Request</span>
                          )}
                        </td>
                        <td className="py-4 pl-4 pr-6 text-right">
                          <Link
                            to="/machines/$slug"
                            params={{ slug: machine.slug }}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-signal hover:underline"
                          >
                            Inspect <ArrowRight className="size-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Direct Consultation Banner */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border bg-background p-8 sm:p-12">
            <div>
              <p className="eyebrow text-signal">Turnkey Production Engineering</p>
              <h2 className="display-md mt-2">
                Need help sizing the right cutting, fusing, bonding or sewing line?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Our 26 in-house engineers analyze your daily marker output, fabric GSM, and floor
                layout to specify the exact European machine configuration.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="ink" size="xl">
                <Link to="/contact">Request Line Sizing Audit</Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <a href={SITE_INFO.phoneHref}>Call {SITE_INFO.phone}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Official 10 PDF Brochures Vault */}
      <PdfCatalogVaultSection showClients={true} />
    </>
  );
}
