import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '../lib/site-config';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieConsent from '../components/ui/CookieConsent';
import PwaInstallPrompt from '../components/ui/PwaInstallPrompt';
import Toast from '../components/ui/Toast';

export const viewport: Viewport = {
  themeColor: '#2563EB',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: 'AnyOnlineTools – 100% Free, Fast & Private Online Utilities | No Upload',
  description: 'A scalable hub of free, private, 100% client-side web utilities. No upload, zero server data, instant in-browser processing for Gen Z and developers.',
  keywords: 'online tools, 100% client-side, no upload, zero server data, developer tools, text repeater, word counter, json formatter, qr code generator',
  manifest: '/manifest.json',
  openGraph: {
    title: 'AnyOnlineTools – Free, Fast & Private Online Utilities | 100% Client-Side',
    description: 'Instant in-browser utilities with 100% client-side privacy, no upload, and zero server data.',
    url: siteConfig.domain,
    siteName: siteConfig.siteName,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AnyOnlineTools - 100% Client-Side Privacy'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AnyOnlineTools – Free, Fast & Private Online Utilities',
    description: 'Instant, free, and 100% private in-browser utilities. No upload, zero server data.',
    images: ['/og-image.png']
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.domain}/#organization`,
        name: siteConfig.siteName,
        url: siteConfig.domain,
        logo: {
          '@type': 'ImageObject',
          url: `${siteConfig.domain}/logo.png`
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: siteConfig.supportEmail,
          contactType: 'Customer Support'
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.domain}/#website`,
        url: siteConfig.domain,
        name: siteConfig.siteName,
        description: siteConfig.tagline,
        publisher: {
          '@id': `${siteConfig.domain}/#organization`
        }
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var t = localStorage.getItem('anyonlinetools-theme') || (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
                if (t === 'dark') document.documentElement.classList.add('dark');
              } catch(e) {}
              // Development safeguard: Immediately purge service workers and stale browser caches on localhost
              if (typeof window !== 'undefined' && (location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(regs) {
                    for (var i = 0; i < regs.length; i++) { regs[i].unregister(); }
                  });
                }
                if ('caches' in window) {
                  caches.keys().then(function(keys) {
                    for (var j = 0; j < keys.length; j++) { caches.delete(keys[j]); }
                  });
                }
              }
            })();`
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {siteConfig.googleSiteVerification && (
          <meta name="google-site-verification" content={siteConfig.googleSiteVerification} />
        )}
        {/* Google Consent Mode v2 Baseline Declaration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
(function(){
  var c = 'denied';
  try { if (localStorage.getItem('aot_consent') === 'granted') c = 'granted'; } catch(e){}
  gtag('consent', 'default', {
    'analytics_storage': c,
    'ad_storage': c,
    'ad_user_data': c,
    'ad_personalization': c
  });
})();`
          }}
        />
        {siteConfig.googleAnalyticsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `gtag('js',new Date());gtag('config','${siteConfig.googleAnalyticsId}',{page_path:window.location.pathname});`
              }}
            />
          </>
        )}
        {siteConfig.googleAdsensePublisherId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.googleAdsensePublisherId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
        <Header currentLang="en" />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer currentLang="en" />
        <CookieConsent />
        <PwaInstallPrompt />
        <Toast />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              if ('serviceWorker' in navigator && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(){});
                });
              }
            })();`
          }}
        />
      </body>
    </html>
  );
}
