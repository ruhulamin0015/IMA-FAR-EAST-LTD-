import { ArrowUp, Globe, MessageCircle } from 'lucide-react';
import { IMAGES, MACHINES, SITE_INFO } from '../../data/machines';
import { Link } from '../../router';

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="site-container">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mx-auto flex flex-col items-center gap-3 py-16 text-sm transition-opacity hover:opacity-70 cursor-pointer"
        >
          <ArrowUp className="size-5" strokeWidth={1.25} />
          Scroll up
        </button>

        <div className="mx-auto max-w-[1300px] pb-12">
          <p className="text-sm text-ink-muted">Current region / language</p>
          <p className="mt-3 inline-flex items-center gap-3">
            <Globe className="size-6" strokeWidth={1.25} /> Bangladesh / English
          </p>

          <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="mb-5 text-sm text-ink-muted">Machines (All 10 Fleet)</p>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {MACHINES.map((machine) => (
                  <li key={machine.slug}>
                    <Link
                      to="/machines/$slug"
                      params={{ slug: machine.slug }}
                      className="text-sm hover:underline"
                    >
                      {machine.name.replace('IMA ', '')}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-5 text-sm text-ink-muted">Company & Explore</p>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="hover:underline">
                    About Us — IMA Far East Ltd.
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:underline">
                    Cinematic Exhibition Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/company" className="hover:underline">
                    Heritage & leadership
                  </Link>
                </li>
                <li>
                  <Link to="/solutions" className="hover:underline">
                    Eight turnkey solutions
                  </Link>
                </li>
                <li>
                  <Link to="/service" className="hover:underline">
                    24/7 Service & spares
                  </Link>
                </li>
                <li>
                  <Link to="/machines" className="hover:underline">
                    Full machine fleet
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:underline">
                    Book a factory audit
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-5 text-sm text-ink-muted">Locations & contacts</p>
              <address className="space-y-3 not-italic">
                <p>{SITE_INFO.address}</p>
                <a href={SITE_INFO.phoneHref} className="block hover:underline">
                  Hotline: {SITE_INFO.phone}
                </a>
                <a href={`mailto:${SITE_INFO.email}`} className="block hover:underline">
                  {SITE_INFO.email}
                </a>
              </address>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap gap-6">
            <a
              href={SITE_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:opacity-70"
            >
              <MessageCircle className="size-5" strokeWidth={1.5} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:opacity-70"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:opacity-70"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:opacity-70"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
                aria-hidden="true"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </a>
          </div>

          <div className="mt-14 space-y-3 text-sm text-ink-muted">
            <p>
              © 2026 IMA Far East Ltd. Liaison office of IMA SpA, Palazzolo sull'Oglio (Brescia),
              Italy.
            </p>
            <p className="max-w-4xl text-xs leading-relaxed">
              Specifications are indicative and depend on configuration, fabric and working width.
              Supplying, commissioning and servicing high-precision RMG cutting and spreading
              technology in Bangladesh since 2018.
            </p>
          </div>
        </div>

        <div className="border-t border-ink-border py-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 wordmark whitespace-nowrap text-[0.7rem] sm:text-[clamp(0.9rem,1.6vw,1.35rem)]"
          >
            <img
              src={IMAGES.ifelLogo}
              alt="IFEL Logo"
              referrerPolicy="no-referrer"
              className="size-12 object-contain drop-shadow-md"
            />
            IMA FAR EAST LTD.
          </Link>
        </div>
      </div>
    </footer>
  );
}
