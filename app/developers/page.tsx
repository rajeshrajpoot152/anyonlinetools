import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '../../lib/site-config';
import DevelopersContent from '../../components/DevelopersContent';

export const metadata: Metadata = {
  title: 'For Developers — Open Utilities, Code Recipes & Formats Hub | AnyOnlineTools',
  description: 'Zero API keys, zero rate limits, and zero monthly subscriptions. Explore open client-side WebAssembly code recipes and our 300+ supported file formats matrix.',
  alternates: {
    canonical: `${siteConfig.domain}/developers/`,
  },
  openGraph: {
    title: 'For Developers — Open Utilities, Code Recipes & Formats Hub | AnyOnlineTools',
    description: 'High-performance in-browser developer utilities with zero network upload latency and 100% client-side privacy.',
    url: `${siteConfig.domain}/developers/`,
    siteName: siteConfig.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Developers — Open Utilities & Code Recipes | AnyOnlineTools',
    description: 'Zero-cost, privacy-first developer integrations, client-side WebAssembly recipes, and universal formats matrix.',
  },
};

export default function DevelopersPage() {
  const developerSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'AnyOnlineTools Developer Hub: Open Integrations & Client-Side Code Recipes',
    description: 'Integrate zero-upload in-browser utilities, WebAssembly scripts, and automated developer conversion workflows with zero API keys or monthly subscriptions.',
    programmingLanguage: ['JavaScript', 'TypeScript', 'Python', 'cURL'],
    author: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteConfig.domain
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteConfig.domain
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(developerSchema) }}
      />
      <DevelopersContent />
    </>
  );
}
