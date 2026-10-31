import React from 'react';
import type { Metadata } from 'next';
import HomePageContent from '../components/HomePageContent';
import { FAQS } from '../lib/site-faqs';
import { siteConfig } from '../lib/site-config';

export const metadata: Metadata = {
  title: 'AnyOnlineTools – 100% Free, Fast & Private Online Utilities | No Upload',
  description: 'A scalable hub of free, private, client-side web utilities. No upload, zero server data, instant in-browser processing for Gen Z and developers.',
  keywords: 'online tools, free online tools, 100% client-side, no upload, zero server data, developer tools, word counter, json formatter, password generator, text repeater',
  alternates: {
    canonical: `${siteConfig.domain}/`,
    languages: {
      'en': `${siteConfig.domain}/`,
      'x-default': `${siteConfig.domain}/`,
      'es': `${siteConfig.domain}/es/`,
      'pt': `${siteConfig.domain}/pt/`,
      'id': `${siteConfig.domain}/id/`,
      'ar': `${siteConfig.domain}/ar/`,
      'fr': `${siteConfig.domain}/fr/`,
      'de': `${siteConfig.domain}/de/`,
      'ja': `${siteConfig.domain}/ja/`,
      'ru': `${siteConfig.domain}/ru/`,
      'tr': `${siteConfig.domain}/tr/`,
      'vi': `${siteConfig.domain}/vi/`,
      'th': `${siteConfig.domain}/th/`,
      'it': `${siteConfig.domain}/it/`,
      'ko': `${siteConfig.domain}/ko/`,
      'pl': `${siteConfig.domain}/pl/`,
      'nl': `${siteConfig.domain}/nl/`,
      'sv': `${siteConfig.domain}/sv/`,
      'zh-cn': `${siteConfig.domain}/zh-cn/`,
      'zh-tw': `${siteConfig.domain}/zh-tw/`,
      'bg': `${siteConfig.domain}/bg/`,
      'ca': `${siteConfig.domain}/ca/`,
      'el': `${siteConfig.domain}/el/`,
      'hi': `${siteConfig.domain}/hi/`,
      'ms': `${siteConfig.domain}/ms/`,
      'uk': `${siteConfig.domain}/uk/`,
      'sw': `${siteConfig.domain}/sw/`,
    }
  },
  openGraph: {
    title: 'AnyOnlineTools – Free, Fast & Private Online Utilities',
    description: 'Instant in-browser utilities with 100% client-side privacy, no upload, and zero server data.',
    url: `${siteConfig.domain}/`,
    siteName: siteConfig.siteName,
    type: 'website',
    images: ['/og-image.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AnyOnlineTools – Free, Fast & Private Online Utilities',
    description: 'Instant, free, and private online tools for Gen Z and developers. No upload, zero server data.',
    images: ['/og-image.png']
  }
};

export default function RootPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.domain,
    description: siteConfig.tagline,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.domain}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePageContent />
    </>
  );
}
