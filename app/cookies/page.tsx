import React from 'react';
import type { Metadata } from 'next';
import { Cookie, ShieldCheck, CheckCircle2, Sliders, Globe, ExternalLink, Lock } from 'lucide-react';
import { siteConfig } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Cookie & Storage Transparency Policy – AnyOnlineTools',
  description: 'Understand how AnyOnlineTools uses browser local storage and minimal technical cookies with zero invasive tracking or data harvesting.',
  alternates: {
    canonical: `${siteConfig.domain}/cookies/`,
  },
  openGraph: {
    title: 'Cookie & Storage Transparency Policy – AnyOnlineTools',
    description: 'Learn about our minimal, privacy-first cookie and local storage standards.',
    url: `${siteConfig.domain}/cookies/`,
    images: ['/og-image.png']
  }
};

export default function CookiesPage() {
  return (
    <main className="flex-1 w-full max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-800 dark:text-slate-200">
      <div className="text-center mb-12">
        <Cookie className="w-12 h-12 text-amber-600 dark:text-amber-400 mb-4 mx-auto" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Cookie & Storage Transparency Policy
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Last Updated: 2026 · Official Transparency Charter for {siteConfig.siteName}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-sm leading-relaxed">
        {/* Section 1: Overview */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <ShieldCheck className="w-5 h-5 text-emerald-500 mr-2" />
            1. Our Clean-Browser Philosophy: Zero Invasive Tracking
          </h2>
          <p>
            At <strong>{siteConfig.siteName}</strong>, we believe you should be able to use online productivity tools without being tracked, profiled, or followed across the internet.
          </p>
          <p>
            Unlike traditional websites that deploy dozens of cross-site advertising beacons and behavioral trackers, we operate on a <strong>minimalist, privacy-first storage architecture</strong>. We do not use third-party tracking cookies to build advertising profiles, and we never sell your usage data to data brokers.
          </p>
        </section>

        {/* Section 2: Storage Matrix Table */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <Sliders className="w-5 h-5 text-blue-500 mr-2" />
            2. Complete Breakdown of Stored Technologies
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Below is an exhaustive, plain-English inventory of all technologies that store or retrieve data on your device when visiting {siteConfig.siteName}:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3">Technology</th>
                  <th className="p-3">Key / Purpose</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="p-3 font-semibold font-mono text-slate-900 dark:text-white">localStorage</td>
                  <td className="p-3">
                    <span className="font-mono text-blue-600 dark:text-blue-400">theme</span>: Remembers your user-selected Dark Mode or Light Mode preference so your eyes are comfortable upon return.
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold">
                      Functional (First-Party)
                    </span>
                  </td>
                  <td className="p-3 font-mono">Persistent (Local Device Only)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold font-mono text-slate-900 dark:text-white">sessionStorage</td>
                  <td className="p-3">
                    Transient tool state (e.g., active tab selection or temporary calculation view).
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-semibold">
                      Technical Session
                    </span>
                  </td>
                  <td className="p-3 font-mono">Until Tab Closes</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold font-mono text-slate-900 dark:text-white">HTTP Cookie</td>
                  <td className="p-3">
                    <span className="font-mono text-slate-700 dark:text-slate-300">__cf_bm / security</span>: Used strictly by our global CDN to distinguish legitimate human users from malicious automated bot attacks.
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                      Strictly Necessary Security
                    </span>
                  </td>
                  <td className="p-3 font-mono">30 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Zero Tool Input Interception */}
        <section className="space-y-3 p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
          <h2 className="text-lg sm:text-xl font-bold text-emerald-950 dark:text-emerald-200 flex items-center">
            <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
            3. Zero Tool Input Interception Guarantee
          </h2>
          <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-300">
            Neither cookies nor local storage ever inspect, record, or transmit the text you format, passwords you generate, calculations you perform, or images you blur. All utility computation occurs 100% in volatile device RAM and is mathematically invisible to web cookies.
          </p>
        </section>

        {/* Section 4: Browser Management */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <Globe className="w-5 h-5 text-indigo-500 mr-2" />
            4. How to Manage, Block & Clear Cookies in Your Browser
          </h2>
          <p>
            You have total control over the storage of cookies and local data. You can configure your browser to block all cookies, alert you before a cookie is set, or delete stored data at any time:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white">Google Chrome:</span>
              <p className="text-slate-600 dark:text-slate-400 mt-1 font-mono">
                Settings &gt; Privacy &amp; security &gt; Third-party cookies
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white">Mozilla Firefox:</span>
              <p className="text-slate-600 dark:text-slate-400 mt-1 font-mono">
                Settings &gt; Privacy &amp; Security &gt; Cookies &amp; Site Data
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white">Apple Safari:</span>
              <p className="text-slate-600 dark:text-slate-400 mt-1 font-mono">
                Settings &gt; Safari &gt; Advanced &gt; Block All Cookies
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white">Microsoft Edge:</span>
              <p className="text-slate-600 dark:text-slate-400 mt-1 font-mono">
                Settings &gt; Cookies &amp; site permissions &gt; Manage cookies
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Industry Opt-Out Coalitions */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            5. Global Industry Opt-Out Organizations
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For users seeking universal opt-outs across all commercial ad networks, you may utilize the official consumer portals provided by digital advertising self-regulatory bodies:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <li>
              <strong>European Union &amp; UK:</strong> European Interactive Digital Advertising Alliance (EDAA) —{' '}
              <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">
                youronlinechoices.eu <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </li>
            <li>
              <strong>United States:</strong> Digital Advertising Alliance (DAA) —{' '}
              <a href="https://aboutads.info/consumers" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">
                aboutads.info/consumers <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </li>
            <li>
              <strong>United States (Network Advertisers):</strong> Network Advertising Initiative (NAI) —{' '}
              <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">
                optout.networkadvertising.org <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </li>
          </ul>
        </section>

        {/* Section 6: Contact */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            6. Questions Regarding Cookie &amp; Storage Practices
          </h2>
          <p>
            If you have questions about how our platform uses local storage or wish to suggest further privacy enhancements, please reach out to our team at{' '}
            <a href={`mailto:${siteConfig.supportEmail}`} className="text-blue-600 font-semibold hover:underline">
              {siteConfig.supportEmail}
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
