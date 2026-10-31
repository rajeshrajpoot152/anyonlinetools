import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '../../lib/site-config';
import AllToolsContent from '../../components/AllToolsContent';

export const metadata: Metadata = {
  title: 'All Online Tools & Utilities Directory — AnyOnlineTools',
  description: 'Complete master directory of all free online tools. Merge, compress, convert, edit, and encrypt documents and text with 100% in-browser privacy.',
  alternates: {
    canonical: `${siteConfig.domain}/all-tools/`,
  },
  openGraph: {
    title: 'All Online Tools & Utilities Directory — AnyOnlineTools',
    description: 'Explore the complete catalog of 100% client-side online tools: documents, text utilities, developer formats, and security tools.',
    url: `${siteConfig.domain}/all-tools/`,
    siteName: siteConfig.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Online Tools & Utilities Directory — AnyOnlineTools',
    description: 'Explore the complete catalog of free, private in-browser utilities with zero file size limits.',
  },
};

export default function AllToolsPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Online Tools & Utilities Directory',
    url: `${siteConfig.domain}/all-tools/`,
    description: 'Complete master catalog of free, fast, and 100% client-side online utilities for document management, text editing, and developer workflows.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <AllToolsContent />
    </>
  );
}
