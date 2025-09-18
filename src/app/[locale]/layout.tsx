import { Analytics } from '@/analytics/analytics';
import {
  fontBricolageGrotesque,
  fontNotoSans,
  fontNotoSansMono,
  fontNotoSerif,
} from '@/assets/fonts';
import AffonsoScript from '@/components/affiliate/affonso';
import PromotekitScript from '@/components/affiliate/promotekit';
import { TailwindIndicator } from '@/components/layout/tailwind-indicator';
import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor';
import { Preloader } from '@/components/performance/Preloader';
import { websiteConfig } from '@/config/website';
import { defaultMessages } from '@/i18n/messages';
import { routing } from '@/i18n/routing';
import { getBaseUrl, getImageUrl } from '@/lib/urls/urls';
import { cn } from '@/lib/utils';
import { type Locale, NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Providers } from './providers';

import '@/styles/globals.css';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

/**
 * 1. Locale Layout
 * https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#layout
 *
 * 2. NextIntlClientProvider
 * https://next-intl.dev/docs/usage/configuration#nextintlclientprovider
 */
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const baseUrl = getBaseUrl();
  const sameAsLinks = Object.values(websiteConfig.metadata.social ?? {}).filter(
    (value): value is string => Boolean(value)
  );
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: defaultMessages.Metadata.name,
    url: baseUrl,
    logo: getImageUrl(websiteConfig.metadata.images?.logoLight ?? '/logo.png'),
    sameAs: sameAsLinks,
  };
  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    name: defaultMessages.Metadata.name,
    url: baseUrl,
    inLanguage: locale,
    description: defaultMessages.Metadata.description,
    publisher: {
      '@id': `${baseUrl}#organization`,
    },
    image: getImageUrl(websiteConfig.metadata.images?.ogImage ?? '/og.png'),
  };
  const stringifyJsonLd = (data: object) =>
    JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      className="dark"
      style={{ colorScheme: 'dark' }}
    >
      <head>
        <AffonsoScript />
        <PromotekitScript />
        <script type="application/ld+json">
          {stringifyJsonLd(organizationJsonLd)}
        </script>
        <script type="application/ld+json">
          {stringifyJsonLd(webSiteJsonLd)}
        </script>
        <link rel="dns-prefetch" href="https://www.thwordle.com" />
        <link
          rel="preconnect"
          href="https://www.thwordle.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          'size-full antialiased',
          fontNotoSans.className,
          fontNotoSerif.variable,
          fontNotoSansMono.variable,
          fontBricolageGrotesque.variable
        )}
      >
        <NuqsAdapter>
          <NextIntlClientProvider>
            <Providers locale={locale}>
              <Preloader />
              <PerformanceMonitor />

              {children}

              <Toaster richColors position="top-right" offset={64} />
              <TailwindIndicator />
              <Analytics />
            </Providers>
          </NextIntlClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
