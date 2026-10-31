import React from 'react';
import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import { siteConfig } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Contact Us – AnyOnlineTools Support & Feedback | 100% Client-Side',
  description: 'Have questions, tool requests, or feedback? Contact the AnyOnlineTools team directly. 100% Client-Side, No Upload, Zero Server Data.',
  alternates: {
    canonical: `${siteConfig.domain}/contact/`,
  },
  openGraph: {
    title: 'Contact Us – AnyOnlineTools Support & Feedback',
    description: 'Have questions, tool requests, or feedback? Contact the AnyOnlineTools team directly.',
    url: `${siteConfig.domain}/contact/`,
    images: ['/og-image.png']
  }
};

export default function ContactPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact AnyOnlineTools Support & Feedback',
    url: `${siteConfig.domain}/contact/`,
    description: 'Get in touch with the AnyOnlineTools team for tool requests, feedback, and support.',
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteConfig.domain,
      email: siteConfig.supportEmail,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          email: siteConfig.supportEmail,
          contactType: 'customer support'
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactForm />
    </>
  );
}
