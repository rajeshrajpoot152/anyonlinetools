import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { i18n, type Locale } from '../i18n-config';
import { siteConfig } from '../lib/site-config';
import { TOOLS } from '../lib/tools-data';
import { getLocalizedTool, isToolTranslated } from '../lib/tool-localization';
import ToolLayout from './layouts/ToolLayout';
import { getToolComponent } from './tools/registry';

export default function ToolPageRenderer({
  params,
  isDirectRootEnglish = false
}: {
  params: { locale: string; slug: string };
  isDirectRootEnglish?: boolean;
}) {
  const localeStr = params.locale;

  // 1. Guard against duplicate tool nesting (e.g. /text-repeater/text-repeater/)
  const isToolAsLocale = TOOLS.some(t => t.slug === localeStr);
  if (isToolAsLocale) {
    notFound();
  }

  // 2. Guard against unknown/invalid locale prefixes
  const isKnownLocale = (i18n.locales as readonly string[]).includes(localeStr);
  if (!isKnownLocale) {
    notFound();
  }

  // 3. 301 Redirect for legacy /en/:slug to primary canonical /:slug/
  if (localeStr === 'en' && !isDirectRootEnglish) {
    redirect(`/${params.slug}/`);
  }

  const locale = (isDirectRootEnglish ? 'en' : localeStr) as Locale;
  const tool = getLocalizedTool(params.slug, locale);
  if (!tool) {
    notFound();
  }

  const ToolComponent = getToolComponent(tool.slug);
  if (!ToolComponent) {
    notFound();
  }

  // Dual Schema: SoftwareApplication + FAQPage with localized content
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    operatingSystem: 'All (Web Browser)',
    applicationCategory: 'UtilitiesApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    description: tool.subheading || tool.seoDesc
  };

  const faqSchema = tool.faqs && tool.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  } : null;

  // BreadcrumbList Rich Snippet Schema for Top-Tier Google Search Presentation
  const canonicalUrl = (locale === 'en' || !isToolTranslated(params.slug, locale))
    ? `${siteConfig.domain}/${tool.slug}/`
    : `${siteConfig.domain}/${locale}/${tool.slug}/`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.domain
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'All Tools',
        item: `${siteConfig.domain}/all-tools/`
      },
      ...(tool.categoryLabel ? [{
        '@type': 'ListItem',
        position: 3,
        name: tool.categoryLabel,
        item: `${siteConfig.domain}/all-tools/`
      }] : []),
      {
        '@type': 'ListItem',
        position: tool.categoryLabel ? 4 : 3,
        name: tool.heading || tool.name,
        item: canonicalUrl
      }
    ]
  };

  const relatedTools = TOOLS
    .filter((t) => t.slug !== tool.slug && t.category === tool.category)
    .slice(0, 3);

  return (
    <ToolLayout
      title={tool.heading}
      description={tool.subheading}
      categoryLabel={tool.categoryLabel}
      icon={tool.icon}
      badge={tool.statusBadge}
      howToUse={tool.howToUse}
      useCases={tool.useCases}
      comparisonTable={tool.comparisonTable}
      faqs={tool.faqs}
      features={tool.features.length > 0 ? tool.features : undefined}
      relatedTools={relatedTools.length > 0 ? relatedTools : undefined}
      schema={softwareSchema}
      faqSchema={faqSchema}
      breadcrumbSchema={breadcrumbSchema}
      locale={locale}
      uiLabels={{
        backToAll: tool.ui.backToAll,
        quickStart: tool.ui.quickStart,
        howToUseTitle: tool.ui.howToUseTitle ? tool.ui.howToUseTitle.replace('{tool}', tool.name) : undefined,
        faqBadge: tool.ui.faqBadge,
        faqTitle: tool.ui.faqTitle,
        badgeText: tool.trustBadge,
      }}
    >
      <ToolComponent locale={locale} ui={tool.ui} />
    </ToolLayout>
  );
}
