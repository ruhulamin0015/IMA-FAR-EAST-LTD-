import React, { useState } from 'react';
import { MACHINES, SITE_INFO } from '../data/machines';
import { PageHero } from '../components/site/PageHero';
import { Button } from '../components/ui/button';

const SECTORS = [
  'Knitwear / T-Shirts / Polos',
  'Denim Jeans & Bottoms',
  'Woven Shirts & Blouses',
  'Activewear & Lycra / Lingerie',
  'Home Textiles & Towels',
];

const SELECT_CLASSES =
  'flex h-12 w-full rounded-lg border border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';

const INPUT_CLASSES =
  'flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';

const TEXTAREA_CLASSES =
  'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState(SITE_INFO.whatsapp);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = [
      'Factory audit / quote request',
      `Factory: ${formData.get('factory')}`,
      `Contact: ${formData.get('name')}`,
      `Phone: ${formData.get('phone')}`,
      `Sector: ${formData.get('sector')}`,
      `Machine of interest: ${formData.get('machine')}`,
      `Bottleneck: ${formData.get('message')}`,
    ].join('\n');
    setWhatsappUrl(`${SITE_INFO.whatsapp}?text=${encodeURIComponent(text)}`);
    setSubmitted(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Zero obligation consultation"
        title="Tell us your bottleneck. We'll bring the machine."
        intro="Schedule a comprehensive on-site cutting room audit by our senior technical engineers."
      />

      <section className="site-container grid gap-16 py-24 lg:grid-cols-[1.4fr_1fr]">
        {submitted ? (
          <div className="rounded-2xl bg-muted p-10">
            <p className="eyebrow text-signal">Request ready</p>
            <h2 className="display-md mt-4">Thank you.</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your audit request is ready. Our team will contact you within one business day to
              confirm the audit, or you can send it directly via WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="signal" size="xl">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Send via WhatsApp
                </a>
              </Button>
              <Button variant="ink" size="xl" onClick={() => setSubmitted(false)}>
                Send another request
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="factory" className="text-sm font-medium leading-none">
                Factory / company name *
              </label>
              <input
                id="factory"
                name="factory"
                required
                maxLength={120}
                className={INPUT_CLASSES}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none">
                Contact person & title *
              </label>
              <input id="name" name="name" required maxLength={120} className={INPUT_CLASSES} />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium leading-none">
                Phone / WhatsApp *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                maxLength={30}
                className={INPUT_CLASSES}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="sector" className="text-sm font-medium leading-none">
                Product / fabric sector
              </label>
              <select
                id="sector"
                name="sector"
                className={SELECT_CLASSES}
                defaultValue={SECTORS[0]}
              >
                {SECTORS.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="machine" className="text-sm font-medium leading-none">
                Machine of interest
              </label>
              <select
                id="machine"
                name="machine"
                className={SELECT_CLASSES}
                defaultValue="Not sure yet"
              >
                <option value="Not sure yet">Not sure yet</option>
                {MACHINES.map((m) => (
                  <option key={m.slug} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="message" className="text-sm font-medium leading-none">
                Primary bottleneck / objective
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={1000}
                className={TEXTAREA_CLASSES}
              />
            </div>

            <div className="sm:col-span-2">
              <Button type="submit" variant="ink" size="xl">
                Confirm audit request
              </Button>
            </div>
          </form>
        )}

        <aside className="space-y-10">
          <div>
            <p className="eyebrow text-muted-foreground">24/7 Hotline</p>
            <a href={SITE_INFO.phoneHref} className="display-md mt-3 block hover:underline">
              {SITE_INFO.phone}
            </a>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Email</p>
            <a href={`mailto:${SITE_INFO.email}`} className="mt-3 block text-xl hover:underline">
              {SITE_INFO.email}
            </a>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Dhaka headquarters</p>
            <p className="mt-3 text-xl">{SITE_INFO.address}</p>
          </div>
        </aside>
      </section>
    </>
  );
}
