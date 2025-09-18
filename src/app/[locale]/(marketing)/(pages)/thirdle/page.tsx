import { websiteConfig } from '@/config/website';
import { routing } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import { getBaseUrl, getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const THIRDLE_CANONICAL_PATH = '/thirdle';
const THIRDLE_EXTERNAL_URL = 'https://thirdle.org/';
const LANGUAGE_TAGS: Record<string, string> = {
  en: 'en-US',
  zh: 'zh-CN',
};
const stringifyJsonLd = (data: object) =>
  JSON.stringify(data).replace(/</g, '\\u003c');

type HeroContent = {
  title: string;
  subtitle: string;
  intro: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaButton: string;
  ctaNote: string;
};

type HowToContent = {
  title: string;
  description: string;
  steps: Array<{
    title: string;
    description: string;
  }>;
};

type ColorHintsContent = {
  title: string;
  items: Array<{
    icon: string;
    label: string;
    description: string;
  }>;
};

type FeaturesContent = {
  title: string;
  items: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
};

type FAQContent = {
  title: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

type ScreenReaderContent = {
  heading: string;
  intro: string;
  howToHeading: string;
  howToIntro: string;
  colorHeading: string;
  whyHeading: string;
  whyBody: string;
};

type SchemaContent = {
  howToName: string;
  howToDescription: string;
  faqDescription: string;
};

interface ThirdleTranslations {
  hero: HeroContent;
  howTo: HowToContent;
  colorHints: ColorHintsContent;
  features: FeaturesContent;
  faq: FAQContent;
  screenReader: ScreenReaderContent;
  schema: SchemaContent;
  metaDescription: string;
}

/**
 * Generate metadata for Thirdle page with localized titles and hreflang entries
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ThirdlePage' });
  const canonicalUrl = getUrlWithLocale(THIRDLE_CANONICAL_PATH, locale);
  const availableLocales = Object.keys(websiteConfig.i18n.locales) as Locale[];

  const languageAlternates = availableLocales.reduce<Record<string, string>>(
    (acc, localeCode) => {
      acc[localeCode] = getUrlWithLocale(THIRDLE_CANONICAL_PATH, localeCode);
      return acc;
    },
    {}
  );

  const defaultLocaleUrl = getUrlWithLocale(
    THIRDLE_CANONICAL_PATH,
    routing.defaultLocale as Locale
  );
  languageAlternates['x-default'] = defaultLocaleUrl;

  return constructMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    canonicalUrl,
    alternates: {
      languages: languageAlternates,
    },
  });
}

interface ThirdlePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ThirdlePage(props: ThirdlePageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'ThirdlePage' });

  const content: ThirdleTranslations = {
    hero: t.raw('hero') as HeroContent,
    howTo: t.raw('howTo') as HowToContent,
    colorHints: t.raw('colorHints') as ColorHintsContent,
    features: t.raw('features') as FeaturesContent,
    faq: t.raw('faq') as FAQContent,
    screenReader: t.raw('screenReader') as ScreenReaderContent,
    schema: t.raw('schema') as SchemaContent,
    metaDescription: t('metaDescription'),
  };

  const baseUrl = getBaseUrl();
  const canonicalUrl = getUrlWithLocale(THIRDLE_CANONICAL_PATH, locale);
  const availableLocales = Object.keys(websiteConfig.i18n.locales) as string[];
  const availableLanguageTags = availableLocales.map(
    (code) => LANGUAGE_TAGS[code] ?? code
  );
  const currentLanguageTag = LANGUAGE_TAGS[locale] ?? locale;
  const organizationId = `${baseUrl}#organization`;

  const gameJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    '@id': `${canonicalUrl}#game`,
    name: content.hero.title,
    url: canonicalUrl,
    inLanguage: currentLanguageTag,
    description: content.metaDescription,
    applicationCategory: 'Game',
    genre: 'Word Game',
    operatingSystem: 'Web Browser',
    availableLanguage: availableLanguageTags,
    publisher: {
      '@id': organizationId,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      url: THIRDLE_EXTERNAL_URL,
    },
  };

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${canonicalUrl}#how-to`,
    name: content.schema.howToName,
    description: content.schema.howToDescription,
    inLanguage: currentLanguageTag,
    step: content.howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    description: content.schema.faqDescription,
    inLanguage: currentLanguageTag,
    mainEntity: content.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const structuredData: Array<{ '@id': string } & Record<string, unknown>> = [
    gameJsonLd,
    howToJsonLd,
    faqJsonLd,
  ];

  return (
    <>
      {structuredData.map((snippet) => (
        <JsonLdScript key={snippet['@id']} snippet={snippet} />
      ))}

      <div className="sr-only">
        <h1>{content.screenReader.heading}</h1>
        <p>{content.screenReader.intro}</p>

        <h2>{content.screenReader.howToHeading}</h2>
        <p>{content.screenReader.howToIntro}</p>

        <h3>{content.screenReader.colorHeading}</h3>
        <ul>
          {content.colorHints.items.map((hint) => (
            <li key={hint.label}>
              {hint.label}: {hint.description}
            </li>
          ))}
        </ul>

        <h2>{content.screenReader.whyHeading}</h2>
        <p>{content.screenReader.whyBody}</p>
      </div>

      <div className="container mx-auto px-4 py-8">
        <ThirdleGameComponent
          hero={content.hero}
          howTo={content.howTo}
          colorHints={content.colorHints}
          features={content.features}
        />
        <FAQSection faq={content.faq} />
      </div>
    </>
  );
}

interface ThirdleGameComponentProps {
  hero: HeroContent;
  howTo: HowToContent;
  colorHints: ColorHintsContent;
  features: FeaturesContent;
}

function JsonLdScript({
  snippet,
}: {
  snippet: { '@id': string } & Record<string, unknown>;
}) {
  return <script type="application/ld+json">{stringifyJsonLd(snippet)}</script>;
}

function ThirdleGameComponent({
  hero,
  howTo,
  colorHints,
  features,
}: ThirdleGameComponentProps) {
  return (
    <div className="w-full">
      <div className="text-center mb-10 space-y-4">
        <h1 className="text-4xl font-bold md:text-5xl">{hero.title}</h1>
        <p className="text-xl text-muted-foreground">{hero.subtitle}</p>
        <p className="max-w-2xl mx-auto text-base text-muted-foreground">
          {hero.intro}
        </p>

        <div className="bg-card border rounded-lg p-6 md:p-8 max-w-2xl mx-auto text-left space-y-6">
          <div>
            <h2 className="text-lg font-semibold">{howTo.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {howTo.description}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {howTo.steps.map((step) => (
                <li key={step.title}>
                  <span className="font-medium text-foreground">
                    {step.title}
                  </span>
                  {': '}
                  {step.description}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold">{colorHints.title}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {colorHints.items.map((hint) => (
                <div
                  key={hint.label}
                  className="flex items-start gap-3 rounded-md bg-muted/60 p-3"
                >
                  <span className="text-xl leading-none" aria-hidden="true">
                    {hint.icon}
                  </span>
                  <div className="text-sm text-muted-foreground">
                    <div className="font-medium text-foreground">
                      {hint.label}
                    </div>
                    <p>{hint.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">
          {hero.ctaHeading}
        </h2>
        <p className="text-blue-700 dark:text-blue-300 mb-6 max-w-xl mx-auto">
          {hero.ctaDescription}
        </p>
        <a
          href={THIRDLE_EXTERNAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15,3 21,3 21,9" />
            <line x1="10" x2="21" y1="14" y2="3" />
          </svg>
          {hero.ctaButton}
        </a>
        <p className="text-sm text-blue-600 dark:text-blue-400 mt-3">
          {hero.ctaNote}
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-6">
          {features.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.items.map((feature) => (
            <div
              key={feature.title}
              className="bg-card border rounded-lg p-4 text-center"
            >
              <div className="text-2xl mb-2" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQSection({ faq }: { faq: FAQContent }) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-center mb-6">{faq.title}</h2>
      <div className="space-y-4 max-w-3xl mx-auto">
        {faq.items.map((item) => (
          <div key={item.question} className="bg-card border rounded-lg p-5">
            <h3 className="text-lg font-semibold">{item.question}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
