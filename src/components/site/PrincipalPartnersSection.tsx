import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ABOUT_US_TEXT, IMAGES } from '../../data/machines';
import { Link } from '../../router';

function PartnerBrandMark({ name }: { name: string }) {
  switch (name) {
    case 'IMA ITALY':
      return (
        <div className="flex h-12 items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3.5 shadow-xs">
          <svg viewBox="0 0 110 36" className="h-7 w-auto" aria-hidden="true">
            <rect x="2" y="4" width="22" height="9" fill="#18181B" />
            <rect x="2" y="16" width="22" height="12" fill="#18181B" />
            <line x1="28" y1="5" x2="106" y2="5" stroke="#CE2B37" strokeWidth="2.2" />
            <line x1="28" y1="9" x2="106" y2="9" stroke="#CE2B37" strokeWidth="2.2" />
            <line x1="28" y1="13" x2="106" y2="13" stroke="#CE2B37" strokeWidth="2.2" />
            <polygon points="28,28 28,16 44,24 60,16 60,28" fill="#18181B" />
            <polygon points="65,28 65,16 85,22 106,16 106,28" fill="#18181B" />
            <rect x="28" y="31" width="26" height="2.5" fill="#009246" />
            <rect x="54" y="31" width="26" height="2.5" fill="#E2E8F0" />
            <rect x="80" y="31" width="26" height="2.5" fill="#CE2B37" />
          </svg>
        </div>
      );
    case 'ROTONDI':
      return (
        <div className="flex h-12 items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 shadow-xs">
          <svg viewBox="0 0 130 34" className="h-7 w-auto" aria-hidden="true">
            <circle cx="14" cy="14" r="10" fill="#0284C7" />
            <path d="M14 6 L14 22 M6 14 L22 14 M9 9 L19 19 M19 9 L9 19" stroke="#FFF" strokeWidth="1.8" />
            <text x="29" y="19" fill="#0369A1" fontFamily="Barlow Semi Condensed, sans-serif" fontWeight="700" fontSize="16" letterSpacing="0.5">
              ROTONDI
            </text>
            <path d="M28 26 Q72 20 120 27" stroke="#CE2B37" strokeWidth="1.8" fill="none" />
          </svg>
        </div>
      );
    case 'FRAMIS ITALIA':
      return (
        <div className="flex h-12 items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 shadow-xs">
          <svg viewBox="0 0 140 34" className="h-7 w-auto" aria-hidden="true">
            <text x="4" y="19" fill="#1E3A5F" fontFamily="Barlow Semi Condensed, sans-serif" fontWeight="500" fontSize="15" letterSpacing="1.2">
              FRAMIS
            </text>
            <text x="64" y="19" fill="#3B82F6" fontFamily="Barlow Semi Condensed, sans-serif" fontWeight="300" fontSize="15" letterSpacing="1.2">
              ITALIA
            </text>
            <rect x="52" y="24" width="9" height="6" rx="1" fill="#009246" />
            <rect x="64" y="24" width="9" height="6" rx="1" fill="#94A3B8" />
            <rect x="76" y="24" width="9" height="6" rx="1" fill="#0284C7" />
          </svg>
        </div>
      );
    case 'NEXIA':
      return (
        <div className="flex h-12 items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 shadow-xs">
          <svg viewBox="0 0 105 36" className="h-7 w-auto" aria-hidden="true">
            <path d="M6 28 L6 6 L24 22 L24 6" stroke="#1E3A8A" strokeWidth="4.5" fill="none" strokeLinejoin="round" />
            <text x="33" y="23" fill="#1E3A8A" fontFamily="Michroma, sans-serif" fontWeight="600" fontSize="13" letterSpacing="1">
              NEXIA
            </text>
            <rect x="33" y="28" width="20" height="2.2" fill="#009246" />
            <rect x="53" y="28" width="20" height="2.2" fill="#E2E8F0" />
            <rect x="73" y="28" width="20" height="2.2" fill="#CE2B37" />
          </svg>
        </div>
      );
    case 'SIP ITALY':
      return (
        <div className="flex h-12 items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 shadow-xs">
          <svg viewBox="0 0 120 36" className="h-7 w-auto" aria-hidden="true">
            <text x="4" y="23" fill="#18181B" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="21">
              SiP
            </text>
            <line x1="42" y1="26" x2="50" y2="10" stroke="#009246" strokeWidth="2.5" />
            <line x1="47" y1="26" x2="55" y2="10" stroke="#CE2B37" strokeWidth="2.5" />
            <text x="58" y="23" fill="#18181B" fontFamily="Barlow Semi Condensed, sans-serif" fontWeight="700" fontSize="14" letterSpacing="0.8">
              ITALY
            </text>
          </svg>
        </div>
      );
    case 'VOMATEX':
      return (
        <div className="flex h-12 items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 shadow-xs">
          <svg viewBox="0 0 130 36" className="h-7 w-auto" aria-hidden="true">
            <polygon points="4,8 16,8 22,26 10,26" fill="#EAB308" />
            <polygon points="15,8 25,8 19,26 11,26" fill="#18181B" opacity="0.85" />
            <text x="30" y="21" fill="#18181B" fontFamily="Barlow Semi Condensed, sans-serif" fontWeight="700" fontSize="15" letterSpacing="1">
              VOMATEX
            </text>
            <text x="30" y="30" fill="#64748B" fontFamily="Barlow, sans-serif" fontWeight="600" fontSize="7.5" letterSpacing="1.4">
              IRONING COVERS
            </text>
          </svg>
        </div>
      );
    case 'BUSI':
      return (
        <div className="flex h-12 items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 shadow-xs">
          <svg viewBox="0 0 115 36" className="h-7 w-auto" aria-hidden="true">
            <ellipse cx="15" cy="18" rx="11" ry="12" fill="none" stroke="#B45309" strokeWidth="1.8" strokeDasharray="2 1" />
            <text x="8" y="22" fill="#B45309" fontFamily="Georgia, serif" fontWeight="700" fontSize="11">
              GB
            </text>
            <text x="32" y="25" fill="#B45309" fontFamily="Barlow Semi Condensed, sans-serif" fontWeight="700" fontSize="22" letterSpacing="1.5">
              BUSI
            </text>
            <text x="90" y="23" fill="#475569" fontFamily="Barlow, sans-serif" fontWeight="600" fontSize="8" transform="rotate(-90 95 20)">
              1958
            </text>
          </svg>
        </div>
      );
    case 'OMMI':
      return (
        <div className="flex h-12 items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 shadow-xs">
          <svg viewBox="0 0 120 36" className="h-7 w-auto" aria-hidden="true">
            <rect x="4" y="8" width="22" height="17" rx="4" fill="#0284C7" />
            <path d="M30 25 L30 9 L42 20 L54 9 L54 25" stroke="#0284C7" strokeWidth="4.5" fill="none" strokeLinejoin="round" />
            <path d="M60 25 L60 9 L72 20 L84 9 L84 25" stroke="#0284C7" strokeWidth="4.5" fill="none" strokeLinejoin="round" />
            <rect x="90" y="8" width="7" height="17" fill="#0284C7" />
            <circle cx="105" cy="22" r="3" fill="#009246" />
            <circle cx="113" cy="22" r="3" fill="#CE2B37" />
          </svg>
        </div>
      );
    case 'RICHPEACE':
      return (
        <div className="flex h-12 items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 shadow-xs">
          <svg viewBox="0 0 135 36" className="h-7 w-auto" aria-hidden="true">
            <rect x="5" y="5" width="22" height="24" rx="2" fill="none" stroke="#CE2B37" strokeWidth="1.8" />
            <text x="10" y="21" fill="#CE2B37" fontFamily="Barlow Semi Condensed, sans-serif" fontWeight="700" fontSize="15">
              R
            </text>
            <text x="34" y="23" fill="#1E293B" fontFamily="Barlow Semi Condensed, sans-serif" fontStyle="italic" fontWeight="700" fontSize="17" letterSpacing="0.4">
              Richpeace
            </text>
          </svg>
        </div>
      );
    default:
      return null;
  }
}

export function PrincipalPartnersSection({ showHeaderBanner = true }: { showHeaderBanner?: boolean }) {
  const [selectedPrincipal, setSelectedPrincipal] = useState(0);

  return (
    <section className="relative overflow-hidden py-24 bg-[linear-gradient(135deg,#f0fdf4_0%,#ffffff_48%,#fff1f2_100%)] text-slate-900 border-y border-slate-200/80">
      {/* Clean Minimalist Italian Flag Tricolore Top Ribbon */}
      <div className="absolute inset-x-0 top-0 flex h-1.5">
        <div className="flex-1 bg-[#009246]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#CE2B37]" />
      </div>

      {/* Subtle ambient Italian tricolore radial washes */}
      <div className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-[#009246]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-16 h-96 w-96 rounded-full bg-[#CE2B37]/[0.06] blur-3xl" />

      <div className="site-container relative z-10">
        {/* Header with IFEL Logo + Italian Flag Theme Pill */}
        {showHeaderBanner && (
          <div className="mb-14 flex flex-col justify-between gap-8 border-b border-slate-200/80 pb-10 lg:flex-row lg:items-end">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <img
                src={IMAGES.ifelLogo}
                alt="IFEL — IMA Far East Ltd. Official Logo"
                referrerPolicy="no-referrer"
                className="size-20 shrink-0 object-contain drop-shadow-md"
              />

              <div>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-3.5 py-1 shadow-2xs">
                  <span className="inline-flex h-3 w-4 overflow-hidden rounded-[2px] ring-1 ring-slate-200">
                    <span className="w-1/3 bg-[#009246]" />
                    <span className="w-1/3 bg-white" />
                    <span className="w-1/3 bg-[#CE2B37]" />
                  </span>
                  <span className="eyebrow text-[11px] text-slate-700">
                    Italian &amp; European Principal Portfolio
                  </span>
                </div>
                <h2 className="display-lg mt-3 text-slate-950">
                  World-renowned machinery principals.
                </h2>
              </div>
            </div>

            <div className="max-w-md space-y-2">
              <p className="text-sm leading-relaxed text-slate-600">
                Supplied, commissioned, and serviced 24/7 across Bangladesh by{' '}
                <strong className="font-semibold text-slate-900">IMA FAR EAST LTD.</strong> under
                the leadership of M. Borhan Uddin Ahmed.
              </p>
              <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                <span className="inline-flex items-center gap-1.5 text-[#009246]">
                  <ShieldCheck className="size-4" /> 100% Genuine OEM
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1.5 text-[#CE2B37]">
                  <CheckCircle2 className="size-4" /> 26 In-House Engineers
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 9 Principal Cards Grid — Clean Minimalist Italian Tricolore Contrast */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_US_TEXT.principals.map((partner, idx) => {
            const active = selectedPrincipal === idx;
            return (
              <div
                key={partner.name}
                onClick={() => setSelectedPrincipal(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPrincipal(idx);
                  }
                }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#009246]/[0.03] via-white to-[#CE2B37]/[0.03] p-7 text-left transition-all duration-300 cursor-pointer ${
                  active
                    ? 'border-2 border-[#009246] shadow-[0_20px_50px_rgba(0,146,70,0.10)] -translate-y-0.5'
                    : 'border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:border-slate-300 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] hover:-translate-y-0.5'
                }`}
              >
                {/* Top Tricolore Accent Line on Each Card */}
                <div className="absolute inset-x-0 top-0 flex h-1">
                  <div className="w-1/3 bg-[#009246]" />
                  <div className="w-1/3 bg-slate-100" />
                  <div className="w-1/3 bg-[#CE2B37]" />
                </div>

                <div>
                  {/* Row 1: Number + Origin + IFEL Official Emblem */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2">
                      <span className="inline-flex h-2.5 w-3.5 overflow-hidden rounded-[2px] ring-1 ring-slate-300">
                        <span className="w-1/3 bg-[#009246]" />
                        <span className="w-1/3 bg-white" />
                        <span className="w-1/3 bg-[#CE2B37]" />
                      </span>
                      <span className="eyebrow text-[11px] font-semibold tracking-[0.16em] text-[#009246]">
                        0{idx + 1} · {partner.origin}
                      </span>
                    </div>

                    <img
                      src={IMAGES.ifelLogo}
                      alt="IFEL Verified Partner"
                      referrerPolicy="no-referrer"
                      title="Supplied & Serviced by IFEL Dhaka"
                      className="size-8 object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Row 2: Brand Logo Badge + Bold Partner Name */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-3xl font-semibold tracking-tight text-slate-950">
                      {partner.name}
                    </h3>
                    <PartnerBrandMark name={partner.name} />
                  </div>

                  {/* Row 3: Description */}
                  <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                    {partner.role}
                  </p>
                </div>

                {/* Footer Bar: Supplied & Serviced by IFEL Dhaka + 24/7 Support */}
                <div className="mt-7 flex items-center justify-between border-t border-slate-200/80 pt-4 text-xs">
                  <span className="inline-flex items-center gap-2 font-medium text-slate-600">
                    <img
                      src={IMAGES.ifelLogo}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="size-5 object-contain"
                    />
                    Supplied &amp; Serviced by IFEL Dhaka
                  </span>
                  <Link
                    to="/contact"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 font-semibold text-[#CE2B37] transition-transform group-hover:translate-x-0.5 hover:underline"
                  >
                    24/7 Support <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
