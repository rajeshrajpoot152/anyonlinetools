/**
 * Global Site Configuration for AnyOnlineTools (anyonlinetools.com)
 * 
 * Free, fast, and privacy-first online utilities for developers, writers, and digital professionals.
 */

export interface SiteConfig {
  domain: string;
  siteName: string;
  tagline: string;
  supportEmail: string;
  googleAnalyticsId: string;
  googleSiteVerification: string;
  googleAdsensePublisherId: string;
  socialLinks: {
    linkedin?: string;
    pinterest?: string;
    facebook?: string;
    devto?: string;
    medium?: string;
    reddit?: string;
    quora?: string;
    trustpilot?: string;
    producthunt?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
}

export const siteConfig: SiteConfig = {
  domain: 'https://anyonlinetools.com',
  siteName: 'AnyOnlineTools',
  tagline: 'Free, Fast & 100% Private In-Browser Online Utilities',
  supportEmail: 'hello@anyonlinetools.com',

  // 1. Google Analytics 4 Measurement ID (optional)
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',

  // 2. Google Search Console Verification Meta Tag Token
  googleSiteVerification: '',

  // 3. Google AdSense Publisher ID (e.g. ca-pub-XXXXXXXXXXXXXXXX)
  googleAdsensePublisherId: process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || '',

  // 4. Official Social Channels & Community Profiles
  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/anyonlinetools/',
    pinterest: 'https://www.pinterest.com/anyonlinetools/',
    facebook: 'https://www.facebook.com/anyonlinetools/',
    devto: 'https://dev.to/anyonlinetools',
    medium: 'https://medium.com/@anyonlinetools',
    reddit: 'https://www.reddit.com/user/anyonlinetools/',
    quora: 'https://www.quora.com/profile/anyonlinetools',
    trustpilot: 'https://trustpilot.com/review/anyonlinetools.com',
    producthunt: 'https://www.producthunt.com/@anyonlinetools'
  }
};
