import React from 'react';
import type { Metadata } from 'next';
import { FileText, ShieldCheck, CheckCircle2, AlertTriangle, Scale, Lock, Sparkles, Ban } from 'lucide-react';
import { siteConfig } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Terms of Service – AnyOnlineTools Free Commercial & Personal License',
  description: 'Terms of Service for AnyOnlineTools. Review user rights, 100% content ownership, zero AI training warranty, and acceptable use guidelines.',
  alternates: {
    canonical: `${siteConfig.domain}/terms/`,
  },
  openGraph: {
    title: 'Terms of Service – AnyOnlineTools',
    description: 'Review user rights, 100% content ownership, zero AI training warranty, and acceptable use guidelines.',
    url: `${siteConfig.domain}/terms/`,
    images: ['/og-image.png']
  }
};

export default function TermsPage() {
  return (
    <main className="flex-1 w-full max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-800 dark:text-slate-200">
      <div className="text-center mb-12">
        <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Last Updated: 2026 · Official Operating Agreement for {siteConfig.siteName}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-sm leading-relaxed">
        {/* Section 1: Acceptance */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            1. Acceptance of Terms & Legal Scope
          </h2>
          <p>
            By accessing or using <strong>{siteConfig.siteName}</strong> ({siteConfig.domain}), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of our website and utilities immediately.
          </p>
        </section>

        {/* Section 2: Permitted Use & Commercial License */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
            2. Permitted Use & Free Commercial License
          </h2>
          <p>
            {siteConfig.siteName} grants you a personal, non-exclusive, worldwide, royalty-free, revocable license to access and use all our interactive online tools for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
            <li>Personal and everyday utility tasks.</li>
            <li>Commercial business operations, client deliverables, and professional workflows.</li>
            <li>Academic research, student coursework, and educational classrooms.</li>
          </ul>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            All utilities are provided 100% free of charge with zero mandatory account signups, zero credit cards, and zero hidden subscription renewals.
          </p>
        </section>

        {/* Section 3: Intellectual Property & User Content Ownership */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <Lock className="w-5 h-5 text-indigo-500 mr-2" />
            3. User Content & 100% Intellectual Property Retention
          </h2>
          <p>
            You retain sole and exclusive ownership, copyright, and all industrial/intellectual property rights over all text, files, images, code, passwords, or data you input, format, or process using {siteConfig.siteName}.
          </p>
          <p className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            <strong>Zero Platform Claim:</strong> {siteConfig.siteName} claims zero rights, licenses, or ownership in your content. Because our tools execute 100% client-side in your browser memory, your data is never transferred to our servers and remains under your exclusive custody at all times.
          </p>
        </section>

        {/* Section 4: Zero AI Model Training Warranty */}
        <section className="space-y-3 p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
          <h2 className="text-lg sm:text-xl font-bold text-blue-950 dark:text-blue-200 flex items-center">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            4. Binding Zero AI Model Training Warranty
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {siteConfig.siteName} contractually guarantees that <strong>no user content, documents, text, code, or images processed on our platform are ever used, evaluated, or shared to train, fine-tune, or develop any artificial intelligence (AI), machine learning (ML), or large language model (LLM)</strong>, whether proprietary or third-party.
          </p>
        </section>

        {/* Section 5: Output Verification Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
            5. Independent Verification of Automated Outputs
          </h2>
          <p>
            Our utilities (including text generators, cryptographic calculators, image processors, and converters) are designed to provide rapid assistance. However, automated algorithms can occasionally produce unexpected results.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            You acknowledge and agree that you are solely responsible for independently reviewing and verifying the accuracy, completeness, and suitability of any output generated by our tools before relying on it for legal, financial, architectural, or critical production purposes.
          </p>
        </section>

        {/* Section 6: Prohibited Conduct & Fair Use */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <Ban className="w-5 h-5 text-rose-500 mr-2" />
            6. Acceptable Use & Prohibited Conduct
          </h2>
          <p>When using {siteConfig.siteName}, you agree not to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
            <li>Deploy automated scrapers, spiders, or bots to harvest or overburden our static delivery infrastructure.</li>
            <li>Use our tools to generate synthetic media, deepfakes, or materials intended to defraud, mislead, or harass others.</li>
            <li>Attempt to reverse-engineer, decompile, or inject malicious code into our web application.</li>
            <li>Violate any local, national, or international laws or third-party intellectual property rights.</li>
          </ul>
        </section>

        {/* Section 7: Disclaimer of Warranties & Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            7. Disclaimer of Warranties & Limitation of Liability
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-mono">
            THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED BY LAW, {siteConfig.siteName} DISCLAIMS ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. IN NO EVENT SHALL {siteConfig.siteName} OR ITS CONTRIBUTORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES.
          </p>
        </section>

        {/* Section 8: Brand Safety & Phishing Warning */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            8. Brand Safety & Phishing Advisory
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Our only official website is <strong>{siteConfig.domain}</strong>. {siteConfig.siteName} will never send you unsolicited emails asking for passwords, credit card credentials, or banking details. If you suspect an impersonator or phishing domain, please alert us immediately at{' '}
            <a href={`mailto:${siteConfig.supportEmail}`} className="text-blue-600 font-semibold hover:underline">
              {siteConfig.supportEmail}
            </a>.
          </p>
        </section>

        {/* Section 9: Legal Contact */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            9. Legal Notices & Contact
          </h2>
          <p>
            For any legal inquiries, compliance questions, or formal notices regarding these Terms, please reach out to our legal team directly at{' '}
            <a href={`mailto:${siteConfig.supportEmail}`} className="text-blue-600 font-semibold hover:underline">
              {siteConfig.supportEmail}
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
