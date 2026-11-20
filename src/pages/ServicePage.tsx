import { IMAGES, SITE_INFO } from '../data/machines';
import { Link } from '../router';
import { PageHero } from '../components/site/PageHero';
import { DynamicTeamSection } from '../components/site/DynamicTeamSection';
import { Button } from '../components/ui/button';

const ESCALATION_LEVELS = [
  {
    title: '24/7 hotline dispatch',
    text: 'Central support desk & remote diagnostics link',
    time: '≤ 15 min',
  },
  {
    title: 'Certified field engineer on site',
    text: 'Gazipur, Savar, Narayanganj & Chattogram industrial hubs',
    time: '≤ 2 h',
  },
  {
    title: 'Senior technical manager',
    text: 'Complex optical/PLC diagnostics and blade alignment',
    time: '≤ 4 h',
  },
  {
    title: 'General manager engineering',
    text: 'Direct oversight by M. Borhan Uddin Ahmed & executive team',
    time: '≤ 8 h',
  },
  {
    title: 'IMA SpA principal HQ, Brescia',
    text: 'Direct remote telemetry link with Italian R&D designers',
    time: '≤ 12 h',
  },
];

const SPARES = [
  { name: 'Circular & straight blades', qty: '2,500+ units' },
  { name: 'Sharpening stones & belts', qty: '1,200+ units' },
  { name: 'Vacuum bristle blocks', qty: '450+ sets' },
  { name: 'Optical encoders & sensors', qty: '180+ units' },
];

export function ServicePage() {
  return (
    <>
      <PageHero
        eyebrow="24/7 technical commitment"
        title="26 engineers. One phone number."
        intro="Every IMA machine installed in Bangladesh is supported by factory-trained specialists with direct escalation to Brescia, Italy."
        machine={IMAGES.detailZephiroHead}
        machineAlt="IMA Zephiro 50 cutting head"
        watermark="24/7"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="signal" size="xl">
            <a href={SITE_INFO.phoneHref}>Call hotline {SITE_INFO.phone}</a>
          </Button>
          <Button asChild variant="glass" size="xl">
            <a href={SITE_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
        </div>
      </PageHero>

      <section className="site-container py-24">
        <p className="eyebrow text-muted-foreground">Dispatch escalation protocol</p>
        <h2 className="display-lg mt-4 max-w-3xl">
          From hotline to Brescia in under twelve hours.
        </h2>
        <ol className="mt-14 divide-y divide-border border-y border-border">
          {ESCALATION_LEVELS.map((level, idx) => (
            <li
              key={level.title}
              className="grid items-center gap-4 py-7 md:grid-cols-[120px_1fr_auto]"
            >
              <span className="font-display text-lg text-muted-foreground">Level 0{idx + 1}</span>
              <div>
                <p className="font-display text-2xl">{level.title}</p>
                <p className="mt-1 text-muted-foreground">{level.text}</p>
              </div>
              <span className="display-md">{level.time}</span>
            </li>
          ))}
        </ol>
      </section>

      <DynamicTeamSection />

      <section className="bg-ink py-24 text-ink-foreground">
        <div className="site-container">
          <p className="eyebrow text-ink-muted">Dhaka warehouse fast-movers · 100% in stock</p>
          <h2 className="display-lg mt-4">Genuine OEM parts, already in Dhaka.</h2>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SPARES.map((spare) => (
              <div
                key={spare.name}
                className="rounded-2xl border border-ink-border bg-ink-soft p-8"
              >
                <p className="display-md">{spare.qty}</p>
                <p className="mt-3 text-ink-muted">{spare.name}</p>
              </div>
            ))}
          </div>
          <Button asChild variant="glass" size="xl" className="mt-14">
            <Link to="/contact">Raise a service request</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
