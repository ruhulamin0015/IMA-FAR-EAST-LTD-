import { IMAGES, SITE_INFO } from '../data/machines';
import { Link } from '../router';
import { PageHero } from '../components/site/PageHero';
import { DynamicTeamSection } from '../components/site/DynamicTeamSection';
import { Button } from '../components/ui/button';

const MILESTONES = [
  {
    year: '1977',
    text: "IMA SpA founded in Palazzolo sull'Oglio (Brescia), Italy — pioneer of the first fully digital fabric spreader.",
  },
  {
    year: '2018',
    text: 'IMA Far East Ltd. established in Dhaka to give Bangladesh direct engineering authority.',
  },
  {
    year: '100+',
    text: 'Garment factories across Bangladesh now cutting on IMA technology.',
  },
];

export function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="European heritage & local leadership"
        title="Built on Italian engineering. Anchored in Bangladesh."
        machine={IMAGES.logo}
        machineAlt="IFEL — IMA Far East Ltd. logo"
        watermark="1977"
      />

      <section className="site-container grid gap-16 py-28 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex items-start">
          <img
            src={IMAGES.partners}
            alt="IMA Far East Ltd. — 48 years and principal partners"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full rounded-2xl shadow-xl"
          />
        </div>
        <div className="space-y-12">
          {MILESTONES.map((item) => (
            <div key={item.year} className="border-l border-border pl-8">
              <p className="display-lg">{item.year}</p>
              <p className="mt-3 text-lg font-light text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <DynamicTeamSection />

      <section className="site-container grid gap-10 py-24 md:grid-cols-2">
        <div>
          <p className="eyebrow text-muted-foreground">Dhaka headquarters</p>
          <p className="display-md mt-4">{SITE_INFO.address}</p>
        </div>
        <div className="flex flex-col items-start justify-end gap-4">
          <a href={SITE_INFO.phoneHref} className="text-xl hover:underline">
            {SITE_INFO.phone}
          </a>
          <a href={`mailto:${SITE_INFO.email}`} className="text-xl hover:underline">
            {SITE_INFO.email}
          </a>
          <Button asChild variant="ink" size="xl" className="mt-4">
            <Link to="/contact">Get in touch</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
