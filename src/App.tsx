/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { getMachineBySlug } from './data/machines';
import { Link, RouterProvider, useRouter } from './router';
import { SiteHeader } from './components/site/SiteHeader';
import { SiteFooter } from './components/site/SiteFooter';
import { HomePage } from './pages/HomePage';
import { MachinesIndexPage } from './pages/MachinesIndexPage';
import { MachineDetailPage } from './pages/MachineDetailPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { ServicePage } from './pages/ServicePage';
import { CompanyPage } from './pages/CompanyPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4 text-ink-foreground">
      <div className="max-w-md text-center">
        <p className="eyebrow text-signal">Error 404</p>
        <h1 className="display-lg mt-3 text-ink-foreground">Page not found</h1>
        <p className="mt-3 text-sm text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-signal px-6 py-3 text-sm font-medium text-signal-foreground transition-opacity hover:opacity-90"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { pathname } = useRouter();
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  useEffect(() => {
    if (cleanPath === '/') {
      document.title = 'IMA Far East Ltd. — The Italian cutting room, engineered for Bangladesh';
    } else if (cleanPath === '/machines') {
      document.title = 'Machine fleet — IMA Far East Ltd.';
    } else if (cleanPath.startsWith('/machines/')) {
      const slug = cleanPath.slice('/machines/'.length);
      const machine = getMachineBySlug(slug);
      document.title = machine
        ? `${machine.name} — IMA Far East Ltd.`
        : 'Machine not found — IMA Far East Ltd.';
    } else if (cleanPath === '/about') {
      document.title = 'About Us — IMA Far East Ltd.';
    } else if (cleanPath === '/gallery') {
      document.title = 'Cinematic Exhibition Gallery — IMA Far East Ltd.';
    } else if (cleanPath === '/solutions') {
      document.title = 'Eight turnkey solutions — IMA Far East Ltd.';
    } else if (cleanPath === '/service') {
      document.title = '24/7 Service & spares — IMA Far East Ltd.';
    } else if (cleanPath === '/company') {
      document.title = 'Company & leadership — IMA Far East Ltd.';
    } else if (cleanPath === '/contact') {
      document.title = 'Book a factory audit — IMA Far East Ltd.';
    } else {
      document.title = 'Page not found — IMA Far East Ltd.';
    }
  }, [cleanPath]);

  let content = <NotFoundPage />;
  if (cleanPath === '/') {
    content = <HomePage />;
  } else if (cleanPath === '/machines') {
    content = <MachinesIndexPage />;
  } else if (cleanPath.startsWith('/machines/')) {
    const slug = cleanPath.slice('/machines/'.length);
    content = <MachineDetailPage slug={slug} />;
  } else if (cleanPath === '/about') {
    content = <AboutPage />;
  } else if (cleanPath === '/gallery') {
    content = <GalleryPage />;
  } else if (cleanPath === '/solutions') {
    content = <SolutionsPage />;
  } else if (cleanPath === '/service') {
    content = <ServicePage />;
  } else if (cleanPath === '/company') {
    content = <CompanyPage />;
  } else if (cleanPath === '/contact') {
    content = <ContactPage />;
  }

  return (
    <>
      <SiteHeader />
      <main>{content}</main>
      <SiteFooter />
    </>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppRoutes />
    </RouterProvider>
  );
}
