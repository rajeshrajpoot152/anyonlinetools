import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '../../lib/site-config';
import GuideContent from '../../components/GuideContent';

export const metadata: Metadata = {
  title: "Universal Document Operations Guide & User's Manual — AnyOnlineTools",
  description: 'Comprehensive step-by-step instructions for organizing, optimizing, editing, converting, and securing documents 100% locally in your browser. Zero file uploads, unlimited usage.',
  alternates: {
    canonical: `${siteConfig.domain}/guide/`,
  },
  openGraph: {
    title: "Universal Document Operations Guide & User's Manual — AnyOnlineTools",
    description: 'Master in-browser document editing: merge, split, compress, convert, sign, and encrypt files with zero limits and 100% client-side privacy.',
    url: `${siteConfig.domain}/guide/`,
    siteName: siteConfig.siteName,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Universal Document Operations Guide & User's Manual",
    description: 'Step-by-step instructions for document organizing, compression, editing, and security completely inside your web browser.',
  },
};

export default function GuidePage() {
  const guideSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: "Universal Document Operations Guide & User's Manual",
    description: 'Comprehensive step-by-step procedural manual for organizing, compressing, editing, converting, and securing documents locally in modern web browsers.',
    author: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteConfig.domain
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteConfig.domain
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.domain}/guide/`
    }
  };

  const howToMergeSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Merge Multiple Documents Online for Free',
    description: 'Step-by-step guide to combining multiple documents into one unified file with client-side zero-upload privacy.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Select or Drag Files',
        text: 'Drag your documents directly into the workspace or click select files.'
      },
      {
        '@type': 'HowToStep',
        name: 'Order Pages and Documents',
        text: 'Arrange thumbnails visually using drag-and-drop or alphabetical sorting.'
      },
      {
        '@type': 'HowToStep',
        name: 'Merge and Download',
        text: 'Click Merge to assemble the files locally in browser memory and download immediately.'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToMergeSchema) }}
      />
      <GuideContent />
    </>
  );
}
