import React from 'react';
import type { Metadata } from 'next';
import { i18n, type Locale } from '../../../i18n-config';
import { siteConfig } from '../../../lib/site-config';
import { TOOLS } from '../../../lib/tools-data';
import { getLocalizedTool, isToolTranslated } from '../../../lib/tool-localization';
import ToolPageRenderer from '../../../components/ToolPageRenderer';

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  // English tools are strictly pre-rendered at root (/[slug]/) by app/[locale]/page.tsx.
  // Never generate /en/:slug to eliminate duplicate URL penalties.
  const nonEnglishLocales = (i18n.locales as readonly string[]).filter(l => l !== 'en');
  for (const locale of nonEnglishLocales) {
    for (const tool of TOOLS) {
      params.push({ locale, slug: tool.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const localeStr = params.locale;
  const isKnownLocale = (i18n.locales as readonly string[]).includes(localeStr);
  const isKnownTool = TOOLS.some(t => t.slug === params.slug);

  // Guard against invalid nested shapes like /text-repeater/text-repeater/
  if (!isKnownLocale || !isKnownTool) {
    return {};
  }

  const locale = localeStr as Locale;
  const tool = getLocalizedTool(params.slug, locale);
  if (!tool) return {};

  const translated = isToolTranslated(params.slug, locale);

  // Single Source of Truth Canonical Protocol:
  // - English always canonicalizes to root direct tool: https://anyonlinetools.com/${tool.slug}/
  // - Untranslated languages canonicalize back to English to prevent thin/duplicate content penalties
  // - Verified translated languages have self-referencing canonical: https://anyonlinetools.com/${locale}/${tool.slug}/
  const canonicalUrl = (locale === 'en' || !translated)
    ? `${siteConfig.domain}/${tool.slug}/`
    : `${siteConfig.domain}/${locale}/${tool.slug}/`;

  // Bidirectional Reciprocal Hreflang Tags:
  const languages: Record<string, string> = {
    'en': `${siteConfig.domain}/${tool.slug}/`,
    'x-default': `${siteConfig.domain}/${tool.slug}/`,
  };

  for (const l of i18n.locales) {
    if (l !== 'en' && isToolTranslated(params.slug, l)) {
      languages[l] = `${siteConfig.domain}/${l}/${tool.slug}/`;
    }
  }

  return {
    title: tool.seoTitle,
    description: tool.seoDesc,
    keywords: tool.keywords.join(', '),
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDesc,
      url: canonicalUrl,
      siteName: siteConfig.siteName,
      type: 'website',
      locale: locale,
      images: [
        {
          url: `${siteConfig.domain}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${tool.name} - AnyOnlineTools`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seoTitle,
      description: tool.seoDesc,
      images: [`${siteConfig.domain}/og-image.png`]
    }
  };
}

export default function DynamicToolLocalePage(props: {
  params: { locale: string; slug: string };
}) {
  return <ToolPageRenderer params={props.params} isDirectRootEnglish={false} />;
}
