import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '../../lib/site-config';
import PricingContent from '../../components/PricingContent';

export const metadata: Metadata = {
  title: 'Transparent Pricing: $0 Free Forever — AnyOnlineTools',
  description: '100% free online utilities with zero subscriptions, zero daily task limits, and zero credit card requirements. Unlimited document, text, and developer tools.',
  alternates: {
    canonical: `${siteConfig.domain}/pricing/`,
  },
  openGraph: {
    title: 'Transparent Pricing: $0 Free Forever — AnyOnlineTools',
    description: 'No subscriptions, no artificial task limits, and no credit card traps. 100% free forever for personal, academic, and commercial use.',
    url: `${siteConfig.domain}/pricing/`,
    siteName: siteConfig.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transparent Pricing: $0 Free Forever — AnyOnlineTools',
    description: 'No subscriptions, no artificial task limits, and no credit cards. All utilities 100% free forever.',
  },
};

export default function PricingPage() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.siteName,
    operatingSystem: 'All modern web browsers (Chrome, Firefox, Safari, Edge, Brave)',
    applicationCategory: 'UtilitiesApplication',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2035-12-31'
    },
    description: '100% free, private, client-side online utilities for document management, text editing, and developer workflows with zero file size limits and zero registration.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <PricingContent />
    </>
  );
}
