import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, Globe, Server, CheckCircle2, Cpu, FileCheck, Sparkles, GraduationCap } from 'lucide-react';
import { siteConfig } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy & Security Policy – AnyOnlineTools 100% Client-Side Guarantee',
  description: 'AnyOnlineTools Privacy and Security Policy. Read our zero-server-upload guarantee, zero AI training charter, GDPR data minimization compliance, and client-side browser execution standards.',
  alternates: {
    canonical: `${siteConfig.domain}/privacy/`,
  },
  openGraph: {
    title: 'Privacy & Security Policy – AnyOnlineTools',
    description: 'AnyOnlineTools Privacy and Security Policy. Read our client-side processing, zero AI training, and zero data storage commitments.',
    url: `${siteConfig.domain}/privacy/`,
    images: ['/og-image.png']
  }
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 w-full max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-800 dark:text-slate-200">
      <div className="text-center mb-12">
        <ShieldCheck className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mb-4 mx-auto" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy, Security & Data Protection Policy
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Last Updated: 2026 · Official Operating Standard for {siteConfig.siteName}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-sm leading-relaxed">
        {/* Section 1: Zero-Data-Collection Guarantee */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <Lock className="w-5 h-5 text-emerald-500 mr-2" />
            1. The Zero-Data-Collection Guarantee (The Safest Server is No Server)
          </h2>
          <p>
            {siteConfig.siteName} operates exclusively on an <strong>in-browser, client-side processing architecture</strong>. When you use our online utilities:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
            <li>Your text, code, passwords, files, and calculations are computed directly in your browser&apos;s local memory (RAM).</li>
            <li><strong>No text inputs, passwords, JSON payloads, or user files are ever sent, uploaded, or stored</strong> on any external server or cloud database.</li>
            <li>All computations and cryptographic algorithms execute locally on your device CPU via modern Web APIs, Web Workers, and Canvas.</li>
            <li>Once you close the browser tab or refresh the page, all your session data is automatically purged.</li>
          </ul>
        </section>

        {/* Section 2: Zero AI Model Training Guarantee */}
        <section className="space-y-3 p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
          <h2 className="text-lg sm:text-xl font-bold text-blue-950 dark:text-blue-200 flex items-center">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            2. Zero AI Model Training & Anti-Scraping Commitment
          </h2>
          <p className="text-blue-900 dark:text-blue-300 font-semibold uppercase tracking-wide text-xs">
            ANYONLINETOOLS DOES NOT USE YOUR CONTENT TO TRAIN, IMPROVE, OR DEVELOP ITS OWN AI MODELS OR ANY THIRD-PARTY AI MODELS.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            Because all file conversions, formatting, and calculations happen 100% locally on your computer or phone, your intellectual property, essays, financial figures, and private code never touch our servers. It is mathematically and technically impossible for our platform to scrape or feed your content into artificial intelligence or machine learning datasets.
          </p>
        </section>

        {/* Section 3: GDPR & Regulatory Compliance */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <FileCheck className="w-5 h-5 text-blue-500 mr-2" />
            3. GDPR Compliance & Universal Data Protection
          </h2>
          <p>
            As a global platform supporting users across 26 languages, {siteConfig.siteName} aligns with the highest international privacy regulations, including the European Union General Data Protection Regulation (GDPR, Regulation (EU) 2016/679) and California Consumer Privacy Act (CCPA/CPRA).
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <p>
              <strong>Data Minimization by Architecture (GDPR Article 5(1)(c)):</strong> We do not ask for exemptions or write convoluted retention policies because we collect zero personal data. We do not track user IP addresses, geolocations, or keystrokes.
            </p>
            <p>
              <strong>Right to Erasure (Article 17):</strong> Because data is held solely in local browser memory during the active session, closing the tab delivers immediate, non-recoverable cryptographic erasure without needing to contact support.
            </p>
          </div>
        </section>

        {/* Section 4: Educational Accounts & Minors Safe Harbor */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <GraduationCap className="w-5 h-5 text-emerald-500 mr-2" />
            4. Protection of Minors & Educational Safe Harbor
          </h2>
          <p>
            {siteConfig.siteName} is committed to being a completely safe utility environment for students, teachers, and educational institutions worldwide.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
            <li><strong>COPPA & FERPA Compliant:</strong> We do not require accounts, logins, or student identities to use any tool.</li>
            <li><strong>Zero Behavioral Advertising:</strong> We never profile minors or track browsing histories across the web.</li>
            <li>Classrooms, coding academies, and universities can safely whitelist {siteConfig.siteName} for classroom instruction with zero legal liability.</li>
          </ul>
        </section>

        {/* Section 5: Network & Transport Security */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <Server className="w-5 h-5 text-indigo-500 mr-2" />
            5. Transport Layer & Infrastructure Security
          </h2>
          <p>
            Even though user data never travels across the network, our delivery infrastructure follows strict defense-in-depth standards:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
            <li><strong>Enforced HTTPS & TLS 1.3:</strong> All connections to {siteConfig.siteName} use encrypted, authenticated transport.</li>
            <li><strong>HTTP Strict Transport Security (HSTS):</strong> Enforces browsers to connect solely through verified SSL/TLS channels.</li>
            <li><strong>Hardened Security Headers:</strong> Our servers enforce strict Content-Security-Policy (CSP), X-Frame-Options (Clickjacking defense), and X-Content-Type-Options (MIME sniffing prevention).</li>
          </ul>
        </section>

        {/* Section 6: Enterprise & Air-Gapped Offline Operation */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <Cpu className="w-5 h-5 text-amber-500 mr-2" />
            6. Enterprise Whitelisting & Air-Gapped Offline Execution
          </h2>
          <p>
            Corporations, healthcare providers, and financial institutions can safely approve {siteConfig.siteName} for employee use. Because our tools execute client-side, employees working on confidential documents or proprietary code will never leak data to a third-party server.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Furthermore, {siteConfig.siteName} functions as an installable Progressive Web App (PWA). Once cached on your workstation, you can disconnect your computer entirely from the network (air-gapped mode) and use the utilities with zero internet connectivity.
          </p>
        </section>

        {/* Section 7: Personal Information & Contact Intake */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            7. Personal Identifiable Information (PII)
          </h2>
          <p>
            We do not require user account registration, phone numbers, or credit card information. The only time we receive any personal data is if you voluntarily reach out to us via our Contact Form or support email ({siteConfig.supportEmail}), in which case your email address is used solely to respond to your specific ticket and is never sold or added to marketing newsletters.
          </p>
        </section>

        {/* Section 8: Cookies and Local Storage */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            8. Cookies and Local Storage
          </h2>
          <p>
            We do not use tracking cookies to harvest behavioral profiles. We use browser local storage solely to remember user-controlled UI preferences, such as whether you have enabled Dark Mode.
          </p>
        </section>

        {/* Section 9: Questions & Privacy Contact */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            9. Official Privacy & Security Inquiries
          </h2>
          <p>
            If you have any questions regarding this Privacy & Security Policy or require enterprise compliance documentation, please contact our security team at{' '}
            <a href={`mailto:${siteConfig.supportEmail}`} className="text-blue-600 font-semibold hover:underline">
              {siteConfig.supportEmail}
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
