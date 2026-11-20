import { useState } from 'react';
import {
  Award,
  CreditCard,
  LayoutGrid,
  Mail,
  Maximize2,
  Phone,
  Search,
  ShieldCheck,
  Table2,
  UserCheck,
  X,
} from 'lucide-react';
import {
  EXECUTIVE_LEADERSHIP,
  IMAGES,
  SITE_INFO,
  TEAM_MEMBERS,
  TeamDepartment,
} from '../../data/machines';

type DepartmentFilter = 'All' | TeamDepartment;

const DEPARTMENTS: DepartmentFilter[] = [
  'All',
  'Technical & Service Support',
  'Sales & Marketing',
  'Accounts & Administration',
  'Training & Sample Development',
];

export function DynamicTeamSection() {
  const [departmentFilter, setDepartmentFilter] = useState<DepartmentFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'both' | 'cards' | 'table'>('both');
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    title: string;
    subtitle: string;
  } | null>(null);

  const featuredLeaders = EXECUTIVE_LEADERSHIP.filter((l) => l.featured);
  const governanceLeaders = EXECUTIVE_LEADERSHIP.filter((l) => !l.featured);

  const filteredMembers = TEAM_MEMBERS.filter((member) => {
    const matchesDept =
      departmentFilter === 'All' || member.department === departmentFilter;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesDept;
    return (
      matchesDept &&
      (member.name.toLowerCase().includes(q) ||
        member.designation.toLowerCase().includes(q) ||
        member.phone.toLowerCase().includes(q) ||
        member.email.toLowerCase().includes(q) ||
        member.sNo.includes(q))
    );
  });

  return (
    <section
      id="dynamic-team"
      className="relative overflow-hidden bg-[#08090c] py-24 text-white"
    >
      {/* Clean Minimalist Italian Flag Tricolore Top Border */}
      <div className="absolute inset-x-0 top-0 h-1 w-full bg-gradient-to-r from-[#009246] via-white to-[#CE2B37]" />

      {/* Subtle Italian Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[460px] w-[460px] rounded-full bg-[#009246]/[0.07] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-20 h-[460px] w-[460px] rounded-full bg-[#CE2B37]/[0.07] blur-[140px]"
      />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-3">
              <span className="inline-flex h-2 w-6 rounded-sm bg-gradient-to-r from-[#009246] via-white to-[#CE2B37]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75">
                IMA FAR EAST LTD. · LEADERSHIP & NATIONWIDE FORCE
              </p>
            </div>
            <h2 className="display-lg mt-4 text-white">Meet Our Dynamic Team.</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
              Under the visionary leadership of Managing Director{' '}
              <strong className="font-medium text-white">M. Borhan Uddin Ahmed</strong> and
              Director <strong className="font-medium text-white">M. Salauddin</strong>, our
              dedicated 26-member sales, customer service, and factory-trained engineering force
              delivers 24/7 support to over 100 garment &amp; textile factories across Bangladesh.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 backdrop-blur-md lg:self-end">
            <img
              src={IMAGES.ifelLogo}
              alt="IFEL — IMA Far East Ltd."
              referrerPolicy="no-referrer"
              className="size-12 object-contain drop-shadow-md"
            />
            <div>
              <p className="font-display text-sm tracking-wider text-white">
                IMA FAR EAST LTD.
              </p>
              <p className="text-xs text-white/60">
                Executive Board &amp; 26 Dedicated Specialists
              </p>
            </div>
          </div>
        </div>

        {/* Executive Leadership Spotlight: MD & Director with Portrait + Official Visiting Card */}
        <div className="mb-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#009246]">
                01 · EXECUTIVE BOARD &amp; DIRECTORS
              </p>
              <h3 className="display-md mt-1 text-white">
                Visionary Leadership &amp; Governance
              </h3>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {featuredLeaders.map((leader, idx) => {
              const isMD = idx === 0;
              const accentColor = isMD ? '#009246' : '#CE2B37';
              return (
                <article
                  key={leader.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 sm:p-8 shadow-2xl transition-all duration-300 hover:border-white/30"
                >
                  {/* Top Tricolore Accent Line */}
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#009246] via-white/90 to-[#CE2B37]" />

                  <div>
                    {/* Portrait + Executive Info Row */}
                    <div className="grid gap-6 sm:grid-cols-[190px_1fr] items-start">
                      {/* Portrait Photo */}
                      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-lg">
                        <img
                          src={leader.portrait}
                          alt={`${leader.name} — ${leader.role}`}
                          referrerPolicy="no-referrer"
                          className="aspect-[3/4] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            leader.portrait &&
                            setLightboxImage({
                              src: leader.portrait,
                              title: leader.name,
                              subtitle: leader.subtitle,
                            })
                          }
                          className="absolute bottom-2.5 right-2.5 inline-flex size-8 items-center justify-center rounded-full bg-black/70 text-white/90 backdrop-blur-md transition-colors hover:bg-black cursor-pointer"
                          aria-label={`Enlarge portrait of ${leader.name}`}
                        >
                          <Maximize2 className="size-3.5" />
                        </button>
                      </div>

                      {/* Bio & Direct Contact */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <span
                            className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                            style={{
                              borderColor: `${accentColor}55`,
                              backgroundColor: `${accentColor}1f`,
                              color: '#ffffff',
                            }}
                          >
                            <Award className="size-3 text-[#CE2B37]" />
                            {leader.role}
                          </span>
                          <h4 className="mt-3 font-display text-2xl sm:text-3xl tracking-tight text-white">
                            {leader.name}
                          </h4>
                          <p className="mt-1 text-xs font-medium text-white/60">
                            {leader.subtitle}
                          </p>
                          <p className="mt-3.5 text-sm leading-relaxed text-white/75">
                            {leader.bio}
                          </p>
                        </div>

                        {/* Direct Phone & Email Links */}
                        <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                            {leader.phones.map((ph) => (
                              <a
                                key={ph}
                                href={`tel:${ph.replace(/\s+/g, '')}`}
                                className="inline-flex items-center gap-1.5 font-mono text-white/85 transition-colors hover:text-[#009246] tabular-nums"
                              >
                                <Phone className="size-3.5 text-[#009246]" />
                                {ph}
                              </a>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                            {leader.emails.map((em) => (
                              <a
                                key={em}
                                href={`mailto:${em}`}
                                className="inline-flex items-center gap-1.5 text-white/75 transition-colors hover:text-white"
                              >
                                <Mail className="size-3.5 text-[#CE2B37]" />
                                {em}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Official Visiting Card Showcase */}
                    {leader.visitingCard && (
                      <div className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-4">
                        <div className="mb-2.5 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/65">
                            <CreditCard className="size-3.5 text-[#009246]" />
                            Official Executive Visiting Card
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setLightboxImage({
                                src: leader.visitingCard!,
                                title: `${leader.name} — Official Visiting Card`,
                                subtitle: leader.subtitle,
                              })
                            }
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#CE2B37] hover:underline cursor-pointer"
                          >
                            <Maximize2 className="size-3" /> Full Card View
                          </button>
                        </div>
                        <div
                          onClick={() =>
                            setLightboxImage({
                              src: leader.visitingCard!,
                              title: `${leader.name} — Official Visiting Card`,
                              subtitle: leader.subtitle,
                            })
                          }
                          className="overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer"
                        >
                          <img
                            src={leader.visitingCard}
                            alt={`${leader.name} Official Visiting Card`}
                            referrerPolicy="no-referrer"
                            className="max-h-48 w-full object-contain transition-transform duration-500 hover:scale-[1.02]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Existing Governance Board Members (Chairman & R&D Specialist) */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {governanceLeaders.map((leader) => (
              <article
                key={leader.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#CE2B37]">
                      {leader.role}
                    </span>
                    <ShieldCheck className="size-4 text-white/40" />
                  </div>
                  <h4 className="mt-2 font-display text-2xl text-white">{leader.name}</h4>
                  <p className="mt-0.5 text-xs text-white/55">{leader.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{leader.bio}</p>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-white/10 pt-3 text-xs text-white/65">
                  <span className="inline-flex items-center gap-1.5">
                    <UserCheck className="size-3.5 text-[#009246]" />
                    IFEL Executive Governance Board
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Full 26-Member Dynamic Team Directory */}
        <div className="mt-20 border-t border-white/10 pt-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#CE2B37]">
                02 · COMPLETE 26-MEMBER OPERATIONAL &amp; TECHNICAL ROSTER
              </p>
              <h3 className="display-md mt-1 text-white">
                Sales, Customer Service &amp; Engineering Directory (01 – 26)
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-white/65">
                Direct contact numbers, designations, and official email addresses of all 26
                IMA Far East Ltd. team members serving Bangladesh&apos;s apparel and textile sector.
              </p>
            </div>

            {/* View Switcher & Search Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 sm:w-64 sm:flex-initial">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/45" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, role, phone, S.No..."
                  className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-white/45 focus:border-white/40 focus:outline-none"
                />
              </div>

              <div className="inline-flex rounded-xl border border-white/15 bg-white/[0.03] p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('both')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    viewMode === 'both'
                      ? 'bg-white text-black'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Both Views
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    viewMode === 'cards'
                      ? 'bg-white text-black'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="size-3.5" /> Cards
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-white text-black'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Table2 className="size-3.5" /> Table
                </button>
              </div>
            </div>
          </div>

          {/* Department Filter Tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {DEPARTMENTS.map((dept) => {
              const count =
                dept === 'All'
                  ? TEAM_MEMBERS.length
                  : TEAM_MEMBERS.filter((m) => m.department === dept).length;
              const active = departmentFilter === dept;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setDepartmentFilter(dept)}
                  className={`rounded-xl border px-4 py-2 text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? 'border-white bg-white text-black shadow-md'
                      : 'border-white/15 bg-white/[0.03] text-white/75 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {dept}{' '}
                  <span
                    className={`ml-1 font-mono tabular-nums ${
                      active ? 'text-black/70' : 'text-white/45'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Team Cards Grid */}
          {(viewMode === 'both' || viewMode === 'cards') && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMembers.map((member) => (
                <article
                  key={member.sNo}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30"
                >
                  {/* Top Italian Flag Micro-Bar */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#009246] via-white/80 to-[#CE2B37] opacity-75 transition-opacity group-hover:opacity-100" />

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#009246] tabular-nums">
                        S.No #{member.sNo}
                      </span>
                      <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/60">
                        {member.department}
                      </span>
                    </div>

                    <h4 className="mt-3 font-display text-lg text-white">{member.name}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">
                      {member.designation}
                    </p>
                  </div>

                  <div className="mt-5 space-y-2 border-t border-white/10 pt-3.5 text-xs">
                    <a
                      href={`tel:+88${member.phone}`}
                      className="flex items-center justify-between font-mono text-white/90 transition-colors hover:text-[#009246] tabular-nums"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Phone className="size-3.5 text-[#009246]" />
                        {member.phone}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-white/45">
                        Call
                      </span>
                    </a>

                    {member.email ? (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 truncate text-white/75 transition-colors hover:text-white"
                        title={member.email}
                      >
                        <Mail className="size-3.5 shrink-0 text-[#CE2B37]" />
                        <span className="truncate">{member.email}</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 text-white/40">
                        <Mail className="size-3.5 shrink-0 text-white/30" />
                        <span>{SITE_INFO.email} (Central Desk)</span>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Official Structured Directory Table (S.No | Phone | Name | Designation | Email) */}
          {(viewMode === 'both' || viewMode === 'table') && (
            <div className="mt-10 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.02]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/[0.04] px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-2 w-5 rounded-sm bg-gradient-to-r from-[#009246] via-white to-[#CE2B37]" />
                  <h4 className="font-display text-base text-white">
                    Official Team Contact Sheet ({filteredMembers.length} of {TEAM_MEMBERS.length}{' '}
                    Members)
                  </h4>
                </div>
                <span className="text-xs text-white/55">
                  Click any phone number or email to connect directly
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-black/40 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                      <th className="py-3.5 pl-6 pr-3">S.No</th>
                      <th className="px-4 py-3.5">Phone</th>
                      <th className="px-4 py-3.5">Name</th>
                      <th className="px-4 py-3.5">Designation</th>
                      <th className="py-3.5 pl-4 pr-6">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredMembers.map((member) => (
                      <tr
                        key={member.sNo}
                        className="transition-colors hover:bg-white/[0.04]"
                      >
                        <td className="py-3.5 pl-6 pr-3 font-mono text-xs font-semibold text-[#009246] tabular-nums">
                          {member.sNo}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 font-mono text-xs text-white/90 tabular-nums">
                          <a
                            href={`tel:+88${member.phone}`}
                            className="inline-flex items-center gap-1.5 hover:text-[#009246] hover:underline"
                          >
                            <Phone className="size-3 text-[#009246]" />
                            {member.phone}
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 font-medium text-white">
                          {member.name}
                        </td>
                        <td className="px-4 py-3.5 text-xs text-white/75">
                          {member.designation}
                        </td>
                        <td className="whitespace-nowrap py-3.5 pl-4 pr-6 text-xs text-white/75">
                          {member.email ? (
                            <a
                              href={`mailto:${member.email}`}
                              className="inline-flex items-center gap-1.5 hover:text-white hover:underline"
                            >
                              <Mail className="size-3 text-[#CE2B37]" />
                              {member.email}
                            </a>
                          ) : (
                            <span className="text-white/35">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal for Portraits & Visiting Cards */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.title}
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-[#0d1016] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              aria-label="Close preview"
            >
              <X className="size-5" />
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-full rounded-2xl object-contain"
            />
            <div className="mt-4 text-center">
              <h4 className="font-display text-xl text-white">{lightboxImage.title}</h4>
              <p className="mt-1 text-xs text-white/60">{lightboxImage.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
