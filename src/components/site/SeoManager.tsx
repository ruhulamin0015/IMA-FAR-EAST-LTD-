import { useEffect } from 'react';
import { MACHINES, SITE_INFO, getMachineBySlug } from '../../data/machines';

interface SeoMeta {
  title: string;
  description: string;
  keywords: string;
  image: string;
  ogType: 'website' | 'product';
  robots: string;
  jsonLd: Record<string, unknown>[];
}

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string) {
  let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id: string, data: Record<string, unknown>[]) {
  const existing = document.getElementById(id);
  if (data.length === 0) {
    existing?.remove();
    return;
  }
  const script = (existing as HTMLScriptElement | null) ?? document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(
    data.length === 1 ? data[0] : { '@context': 'https://schema.org', '@graph': data },
  );
  if (!existing) {
    document.head.appendChild(script);
  }
}

export function SeoManager({ cleanPath }: { cleanPath: string }) {
  useEffect(() => {
    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : 'https://imabangla.com';
    const canonicalUrl = `${origin}${cleanPath === '/' ? '/' : cleanPath}`;
    const defaultOgImage = `${origin}/og-cover.png`;

    let meta: SeoMeta;

    if (cleanPath === '/') {
      meta = {
        title: 'IMA Far East Ltd. — The Italian cutting room, engineered for Bangladesh',
        description:
          'Italian automatic cutting machines, digital spreaders, fusing, bonding, CNC sewing & smart eco laundry — delivered and serviced 24/7 across Bangladesh.',
        keywords:
          'IMA Far East Ltd, IFEL Bangladesh, IMA SpA Italy, automatic fabric cutter Bangladesh, Phoenix 890 spreader, ROTONDI fusing press, FRAMIS ITALIA bonding, New-tecH sewing automat, NEXIA eco laundry laser, garment machinery Dhaka',
        image: defaultOgImage,
        ogType: 'website',
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'IMA Far East Ltd. Flagship European Garment Machinery',
            numberOfItems: MACHINES.length,
            itemListElement: MACHINES.slice(0, 12).map((m, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              url: `${origin}/machines/${m.slug}`,
              name: m.name,
            })),
          },
        ],
      };
    } else if (cleanPath === '/machines') {
      meta = {
        title: `75 Industrial Garment Machines Catalog — IMA Far East Ltd.`,
        description:
          'Browse 75 European garment machines from IMA SpA, ROTONDI, FRAMIS ITALIA, New-tecH & NEXIA with specs and PDF brochures for Bangladesh factories.',
        keywords:
          'garment machinery catalog Bangladesh, CNC fabric cutters, automatic spreaders, continuous fusing machines, ultrasonic bonding, jeans pocket setter, denim laser washing',
        image: defaultOgImage,
        ogType: 'website',
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Complete Industrial Garment Machinery Catalog — IMA Far East Ltd.',
            url: canonicalUrl,
            description:
              'Full 75-machine industrial catalog across IMA SpA, ROTONDI Group, FRAMIS ITALIA, New-tecH, and NEXIA Srl.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
              { '@type': 'ListItem', position: 2, name: 'Machines', item: canonicalUrl },
            ],
          },
        ],
      };
    } else if (cleanPath.startsWith('/machines/')) {
      const slug = cleanPath.slice('/machines/'.length);
      const machine = getMachineBySlug(slug);
      if (machine) {
        const machineImg = machine.image.startsWith('http')
          ? machine.image
          : `${origin}${machine.image}`;
        const brandName = machine.brand ?? 'IMA SpA';
        const shortDesc = `${machine.name} by ${brandName} (${machine.origin ?? 'Italy'}): ${machine.tagline} Supplied & serviced 24/7 in Bangladesh by IMA Far East Ltd.`.slice(
          0,
          160,
        );
        meta = {
          title: `${machine.name} (${brandName}) — IMA Far East Ltd.`,
          description: shortDesc,
          keywords: `${machine.name}, ${brandName}, ${machine.category}, ${machine.tags.join(', ')}, IMA Far East Ltd Bangladesh`,
          image: machineImg,
          ogType: 'product',
          robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          jsonLd: [
            {
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: machine.name,
              description: machine.description,
              image: [machineImg],
              sku: machine.slug,
              category: machine.category,
              brand: {
                '@type': 'Brand',
                name: brandName,
              },
              manufacturer: {
                '@type': 'Organization',
                name: brandName,
              },
              additionalProperty: machine.specs.map((sp) => ({
                '@type': 'PropertyValue',
                name: sp.label,
                value: sp.value,
              })),
              offers: {
                '@type': 'Offer',
                url: canonicalUrl,
                availability: 'https://schema.org/InStock',
                areaServed: {
                  '@type': 'Country',
                  name: 'Bangladesh',
                },
                seller: {
                  '@type': 'Organization',
                  name: SITE_INFO.name,
                  telephone: SITE_INFO.phone,
                  email: SITE_INFO.email,
                },
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
                { '@type': 'ListItem', position: 2, name: 'Machines', item: `${origin}/machines` },
                { '@type': 'ListItem', position: 3, name: machine.name, item: canonicalUrl },
              ],
            },
          ],
        };
      } else {
        meta = {
          title: 'Machine Not Found — IMA Far East Ltd.',
          description: 'The requested industrial machine model was not found in our catalog.',
          keywords: 'IMA Far East Ltd, garment machinery Bangladesh',
          image: defaultOgImage,
          ogType: 'website',
          robots: 'noindex, follow',
          jsonLd: [],
        };
      }
    } else if (cleanPath === '/about') {
      meta = {
        title: 'About IMA Far East Ltd. — Leadership & 100+ Bangladesh Factories',
        description:
          'Led by Managing Director M. Borhan Uddin Ahmed, IMA Far East Ltd. supplies European garment machinery & 24/7 engineering support across Bangladesh.',
        keywords:
          'About IMA Far East Ltd, M. Borhan Uddin Ahmed, IFEL Dhaka, European garment machinery Bangladesh, IMA Italy partner Bangladesh',
        image: defaultOgImage,
        ogType: 'website',
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About IMA Far East Ltd.',
            url: canonicalUrl,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
              { '@type': 'ListItem', position: 2, name: 'About Us', item: canonicalUrl },
            ],
          },
        ],
      };
    } else if (cleanPath === '/solutions') {
      meta = {
        title: 'Turnkey Garment Factory Solutions — IMA Far East Ltd.',
        description:
          'Explore eight turnkey automation workflows for knitwear, denim, shirting, seamless activewear, fusing, and eco laundry in Bangladesh.',
        keywords:
          'turnkey cutting room Bangladesh, denim automation line, shirt finishing line, seamless bonding factory setup, smart garment laundry',
        image: `${origin}/images/ima-detail-syncro.webp`,
        ogType: 'website',
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
              { '@type': 'ListItem', position: 2, name: 'Solutions', item: canonicalUrl },
            ],
          },
        ],
      };
    } else if (cleanPath === '/service') {
      meta = {
        title: '24/7 Engineering Service & OEM Spares — IMA Far East Ltd.',
        description:
          '26 factory-trained engineers across Dhaka, Gazipur, Savar & Chattogram with stocked OEM spare parts for IMA, ROTONDI, FRAMIS, New-tecH & NEXIA.',
        keywords:
          'garment machine service Bangladesh, IMA cutter spare parts Dhaka, 24/7 technical engineering RMG Bangladesh',
        image: `${origin}/images/ima-detail-zephiro-head.webp`,
        ogType: 'website',
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: '24/7 Industrial Garment Machinery Installation, Maintenance & OEM Spares',
            provider: {
              '@type': 'Organization',
              name: SITE_INFO.name,
              telephone: SITE_INFO.phone,
            },
            areaServed: {
              '@type': 'Country',
              name: 'Bangladesh',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
              { '@type': 'ListItem', position: 2, name: '24/7 Service', item: canonicalUrl },
            ],
          },
        ],
      };
    } else if (cleanPath === '/gallery') {
      meta = {
        title: 'Exhibition & Installation Gallery — IMA Far East Ltd.',
        description:
          'View factory installations, international trade exhibitions, and machinery showcases by IMA Far East Ltd. across Bangladesh and Europe.',
        keywords: 'IMA Far East gallery, Garmentech Dhaka exhibition, garment factory cutting room photos',
        image: defaultOgImage,
        ogType: 'website',
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'IMA Far East Ltd. Exhibition & Factory Gallery',
            url: canonicalUrl,
          },
        ],
      };
    } else if (cleanPath === '/company') {
      meta = {
        title: 'Company, Partners & 26-Member Team — IMA Far East Ltd.',
        description:
          'Meet IMA Far East Ltd. leadership, 26-member engineering team, and global European machinery principals serving Bangladesh RMG leaders.',
        keywords: 'IMA Far East team, principal machinery partners Bangladesh, IMA SpA, ROTONDI, FRAMIS, NEXIA',
        image: `${origin}/images/ima-partners.webp`,
        ogType: 'website',
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
              { '@type': 'ListItem', position: 2, name: 'Company', item: canonicalUrl },
            ],
          },
        ],
      };
    } else if (cleanPath === '/contact') {
      meta = {
        title: 'Book a Factory Audit & Quote — IMA Far East Ltd. Dhaka',
        description:
          'Contact IMA Far East Ltd. in Dhaka (+88 01711 58 88 43 / info@imabangla.com) to request machine pricing, PDF brochures, or a factory audit.',
        keywords: 'contact IMA Far East Ltd, garment machinery quote Bangladesh, Dhaka Asad Gate office',
        image: defaultOgImage,
        ogType: 'website',
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact IMA Far East Ltd.',
            url: canonicalUrl,
          },
        ],
      };
    } else {
      meta = {
        title: 'Page Not Found — IMA Far East Ltd.',
        description: 'The requested page could not be found on IMA Far East Ltd.',
        keywords: 'IMA Far East Ltd',
        image: defaultOgImage,
        ogType: 'website',
        robots: 'noindex, follow',
        jsonLd: [],
      };
    }

    document.title = meta.title;
    upsertLink('canonical', canonicalUrl);
    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'keywords', meta.keywords);
    upsertMeta('name', 'robots', meta.robots);

    upsertMeta('property', 'og:type', meta.ogType);
    upsertMeta('property', 'og:site_name', 'IMA Far East Ltd.');
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', meta.image);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', meta.image);

    upsertJsonLd('dynamic-route-jsonld', meta.jsonLd);
  }, [cleanPath]);

  return null;
}
