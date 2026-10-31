import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Scale, 
  Code, 
  DollarSign, 
  QrCode, 
  Server, 
  Laptop 
} from 'lucide-react';
import { siteConfig } from '../../lib/site-config';
import { TOOLS } from '../../lib/tools-data';

export const metadata: Metadata = {
  title: 'AnyOnlineTools for Enterprise – Zero-Trust Business Productivity Suite',
  description: '100% client-side online utilities for corporate HR, legal, finance, and engineering teams. Zero data leakage, instant IT whitelisting, and zero licensing fees.',
  alternates: {
    canonical: `${siteConfig.domain}/business/`,
  },
  openGraph: {
    title: 'AnyOnlineTools for Business – Zero-Trust Enterprise Utilities',
    description: 'Empower your workforce with fast, private in-browser tools. No cloud uploads, no vendor data liability, 100% free forever.',
    url: `${siteConfig.domain}/business/`,
    images: ['/og-image.png']
  }
};

export default function BusinessPage() {
  const hrSlugs = ['blur-image', 'blur-text', 'password-generator', 'percentage-calculator'];
  const legalSlugs = ['text-diff-checker', 'remove-duplicate-lines', 'word-counter', 'case-converter'];
  const devSlugs = ['json-formatter', 'base64-converter', 'hash-generator', 'uuid-generator', 'url-encoder-decoder'];
  const financeSlugs = ['percentage-calculator', 'unit-converter', 'case-converter'];

  const hrTools = TOOLS.filter(t => hrSlugs.includes(t.slug));
  const legalTools = TOOLS.filter(t => legalSlugs.includes(t.slug));
  const devTools = TOOLS.filter(t => devSlugs.includes(t.slug));
  const financeTools = TOOLS.filter(t => financeSlugs.includes(t.slug));

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-800 dark:text-slate-200">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <Building2 className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-3 border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Zero-Trust Architecture · 0 Bytes Uploaded · Instant CISO Whitelisting</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Enterprise &amp; Business{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
            Productivity Suite
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          The only online utility suite engineered for zero-trust enterprise networks. Employees format JSON, compare contracts, generate passwords, and calculate figures locally in browser memory—eliminating data leakage risks and vendor security headaches.
        </p>
      </div>

      {/* Trust Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400">0 Bytes</div>
          <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Cloud Uploads</div>
          <div className="text-[11px] text-slate-500 mt-1">100% computed in workstation RAM</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">HIPAA &amp; GDPR</div>
          <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Compliant By Design</div>
          <div className="text-[11px] text-slate-500 mt-1">Zero vendor data liability</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">Air-Gapped</div>
          <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Offline PWA Mode</div>
          <div className="text-[11px] text-slate-500 mt-1">Operates without active internet</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">$0 / Seat</div>
          <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">100% Free Forever</div>
          <div className="text-[11px] text-slate-500 mt-1">Zero procurement bureaucracy</div>
        </div>
      </div>

      {/* Corporate Division Solutions */}
      <div className="space-y-12 mb-16">
        {/* Division 1: Engineering & IT */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Code className="w-8 h-8 text-violet-600 dark:text-violet-400 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Software Engineering &amp; DevOps Operations</h2>
              <p className="text-xs text-slate-500">Format API payloads, generate cryptographic checksums, and decode data without sending secrets across the web.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {devTools.map(t => (
              <Link key={t.slug} href={`/${t.slug}/`} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-400 transition-colors bg-slate-50/50 dark:bg-slate-800/40 block">
                <span className="font-bold text-xs text-slate-900 dark:text-white mb-1 block">{t.name}</span>
                <span className="text-[11px] text-slate-500 line-clamp-2 block">{t.shortDesc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Division 2: Legal & Contract Admin */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Scale className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Legal Counsel &amp; Contract Administration</h2>
              <p className="text-xs text-slate-500">Audit contract redlines, compare NDAs, and clean legal indexes with complete attorney-client privilege protection.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {legalTools.map(t => (
              <Link key={t.slug} href={`/${t.slug}/`} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors bg-slate-50/50 dark:bg-slate-800/40 block">
                <span className="font-bold text-xs text-slate-900 dark:text-white mb-1 block">{t.name}</span>
                <span className="text-[11px] text-slate-500 line-clamp-2 block">{t.shortDesc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Division 3: HR & People Operations */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Human Resources &amp; Talent Acquisition</h2>
              <p className="text-xs text-slate-500">Anonymize candidate resumes, generate secure onboarding credentials, and calculate equity allocations.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {hrTools.map(t => (
              <Link key={t.slug} href={`/${t.slug}/`} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-400 transition-colors bg-slate-50/50 dark:bg-slate-800/40 block">
                <span className="font-bold text-xs text-slate-900 dark:text-white mb-1 block">{t.name}</span>
                <span className="text-[11px] text-slate-500 line-clamp-2 block">{t.shortDesc}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* CISO Whitelisting Guide */}
      <section className="bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 text-white p-8 sm:p-12 rounded-3xl border border-slate-700 shadow-xl mb-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-3 border border-blue-400/30">
            <Server className="w-3.5 h-3.5" />
            <span>For Chief Information Security Officers (CISOs)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight">
            How to Verify Zero Data Exfiltration
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            Your network security team can verify our client-side claims in seconds. Open your browser Developer Tools (<code className="text-amber-300 bg-black/40 px-1.5 py-0.5 rounded font-mono text-xs">F12 &gt; Network</code>) and run any tool operation. You will observe exactly zero outbound POST, PUT, or WebSocket data transmissions containing employee inputs.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-200">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zscaler &amp; Palo Alto Proxy Whitelist-Friendly</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Backend Data Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full Offline PWA Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="text-center p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Have Enterprise Inquiries or Need Custom Offline PWA Builds?</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-5">
          Our engineering team regularly assists corporate IT departments with offline whitelisting and compliance documentation.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-md hover:shadow-lg"
        >
          <span>Contact Enterprise Support</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
