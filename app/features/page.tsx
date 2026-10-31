import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '../../lib/site-config';
import FeaturesContent from '../../components/FeaturesContent';

export const metadata: Metadata = {
  title: 'Core Platform Features & Capabilities — AnyOnlineTools',
  description: 'Explore AnyOnlineTools engineering features: 100% in-browser WebAssembly speed, zero-theft privacy, bandwidth-independent batch conversions, and unlimited usage.',
  alternates: {
    canonical: `${siteConfig.domain}/features/`,
  },
  openGraph: {
    title: 'Core Platform Features & Capabilities — AnyOnlineTools',
    description: 'Experience client-side online utilities engineered with zero file uploads, unlimited batch operations, and desktop-grade privacy in your web browser.',
    url: `${siteConfig.domain}/features/`,
    siteName: siteConfig.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Core Platform Features & Capabilities — AnyOnlineTools',
    description: '100% in-browser WebAssembly speed, zero-upload privacy, and unlimited batch operations with zero paywalls.',
  },
};

export default function FeaturesPage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${siteConfig.siteName} Feature Suite`,
    applicationCategory: 'ProductivityApplication',
    browserRequirements: 'Requires modern standards-compliant browser with WebAssembly support',
    operatingSystem: 'Windows, macOS, Linux, Android, iOS, ChromeOS',
    featureList: [
      '100% In-Browser Client-Side Processing',
      'Zero File Uploads & Zero-Theft Protection',
      'Hardware-Accelerated WebAssembly Batch Engine',
      'Unlimited File Sizes & Unlimited Daily Tasks',
      'Offline Progressive Web App (PWA) Capabilities',
      'Lossless & Perceptual Compression Engine',
      'Full Commercial Usage Rights for All Outputs'
    ],
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD'
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <FeaturesContent />
    </>
  );
}
