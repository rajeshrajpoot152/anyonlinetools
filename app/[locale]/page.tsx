import React from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import HomePageContent from '../../components/HomePageContent';
import ToolPageRenderer from '../../components/ToolPageRenderer';
import { i18n, type Locale } from '../../i18n-config';
import { LOCALE_SEO } from '../../lib/i18n-seo';
import { siteConfig } from '../../lib/site-config';
import { TOOLS } from '../../lib/tools-data';
import { generateMetadata as generateToolMetadata } from './[slug]/page';

export function generateStaticParams() {
  const params: { locale: string }[] = [];
  // 1. Non-English Homepages: /es/, /hi/, /fr/ ...
  // Root English Homepage is handled at root / by app/page.tsx.
  for (const locale of i18n.locales) {
    if (locale !== 'en') {
      params.push({ locale });
    }
  }
  // 2. Direct Root Tools: /text-repeater/
  for (const tool of TOOLS) {
    params.push({ locale: tool.slug });
  }
  return params;
}

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const paramVal = params.locale;

  // Case A: Root English Tool Route (e.g. /text-repeater/)
  const isTool = TOOLS.some(t => t.slug === paramVal);
  if (isTool) {
    return generateToolMetadata({ params: { locale: 'en', slug: paramVal } });
  }

  // Case B: /en/ redirects to root /
  if (paramVal === 'en') {
    return {};
  }

  // Case C: Localized Home Page (e.g. /es/, /hi/)
  const isLocale = (i18n.locales as readonly string[]).includes(paramVal);
  if (isLocale) {
    const locale = paramVal as Locale;
    const seo = LOCALE_SEO[locale] || LOCALE_SEO['en'];
    
    const canonicalUrl = `${siteConfig.domain}/${locale}/`;

    const languages: Record<string, string> = {
      'en': `${siteConfig.domain}/`,
      'x-default': `${siteConfig.domain}/`,
    };

    for (const l of i18n.locales) {
      if (l !== 'en') {
        languages[l] = `${siteConfig.domain}/${l}/`;
      }
    }

    return {
      title: seo.title,
      description: seo.description,
      alternates: {
        canonical: canonicalUrl,
        languages: languages,
      },
      openGraph: {
        title: seo.ogTitle,
        description: seo.ogDescription,
        url: canonicalUrl,
        siteName: siteConfig.siteName,
        type: 'website',
        locale: locale,
        images: [
          {
            url: `${siteConfig.domain}/og-image.png`,
            width: 1200,
            height: 630,
            alt: seo.title
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.ogTitle,
        description: seo.ogDescription,
        images: [`${siteConfig.domain}/og-image.png`]
      }
    };
  }

  return {};
}

export default function LocaleOrToolPage({ params }: { params: { locale: string } }) {
  const paramVal = params.locale;

  // Case A: Root English Tool Route (e.g. /text-repeater/)
  const isTool = TOOLS.some(t => t.slug === paramVal);
  if (isTool) {
    return <ToolPageRenderer params={{ locale: 'en', slug: paramVal }} isDirectRootEnglish={true} />;
  }

  // Case B: Redirect /en/ to root /
  if (paramVal === 'en') {
    redirect('/');
  }

  // Case C: Localized Home Page (e.g. /es/, /hi/)
  const isLocale = (i18n.locales as readonly string[]).includes(paramVal);
  if (isLocale) {
    return <HomePageContent lang={paramVal} />;
  }

  notFound();
}
