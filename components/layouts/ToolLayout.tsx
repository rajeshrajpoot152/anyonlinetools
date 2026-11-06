'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Laptop, 
  HelpCircle, 
  ChevronDown, 
  ArrowLeft,
  CheckCircle2,
  Lock
} from 'lucide-react';
import ToolIcon from '../ToolIcon';
import ToolFeedback from '../ui/ToolFeedback';
import { siteConfig } from '../../lib/site-config';

export interface HowToStep {
  step: number;
  title: string;
  desc: string;
}

export interface FeatureCard {
  title: string;
  desc: string;
  icon?: React.ReactNode;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface UseCaseItem {
  title: string;
  desc: string;
  tag?: string;
  icon?: string;
}

export interface ComparisonRow {
  feature: string;
  us: string;
  traditional: string;
}

export interface ComparisonTableData {
  title?: string;
  subtitle?: string;
  ourLabel?: string;
  traditionalLabel?: string;
  rows: ComparisonRow[];
}

export interface RelatedToolItem {
  slug: string;
  name: string;
  category?: string;
  categoryLabel?: string;
  description: string;
  icon: string;
}

export interface UILabels {
  backToAll?: string;
  quickStart?: string;
  howToUseTitle?: string;
  faqBadge?: string;
  faqTitle?: string;
  badgeText?: string;
  useCasesTitle?: string;
  useCasesBadge?: string;
}

export interface ToolLayoutProps {
  title: string;
  description: string;
  categoryLabel?: string;
  icon?: string;
  badge?: string;
  children: React.ReactNode;
  howToUse?: HowToStep[];
  features?: FeatureCard[];
  faqs?: FAQItem[];
  useCases?: UseCaseItem[];
  comparisonTable?: ComparisonTableData;
  relatedTools?: RelatedToolItem[];
  schema?: Record<string, any>;
  faqSchema?: Record<string, any> | null;
  breadcrumbSchema?: Record<string, any> | null;
  showAdSlots?: boolean;
  locale?: string;
  uiLabels?: UILabels;
}

export default function ToolLayout({
  title,
  description,
  categoryLabel,
  icon = 'Wrench',
  badge,
  children,
  howToUse,
  features,
  faqs,
  useCases,
  comparisonTable,
  relatedTools,
  schema,
  faqSchema,
  breadcrumbSchema,
  showAdSlots = true,
  locale = 'en',
  uiLabels,
}: ToolLayoutProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const defaultFeatures: FeatureCard[] = [
    {
      title: '100% Client-Side Privacy',
      desc: 'Your inputs, files, and text never leave your device. All computations execute directly in your browser memory via native Web APIs.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />
    },
    {
      title: 'Hardware-Accelerated Speed',
      desc: 'Zero server roundtrips, no API latency, and no queue waiting. Instant local processing powered by your device CPU.',
      icon: <Zap className="w-5 h-5 text-blue-500" />
    },
    {
      title: 'Free Forever & Unlimited',
      desc: 'No account creation, no subscriptions, no credit card, and zero rate limits. Open the tool and get your work done instantly.',
      icon: <Laptop className="w-5 h-5 text-indigo-500" />
    }
  ];

  const activeFeatures = features && features.length > 0 ? features : defaultFeatures;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 lg:py-6">
      {/* Schema Injection */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      {/* Semantic Breadcrumb Navigation - Preserved for SEO Crawlers & Screen Readers, Visually Hidden to Maximize Above-the-Fold Tool Space */}
      <nav aria-label="Breadcrumb" className="sr-only">
        <ol className="inline-flex items-center flex-wrap gap-y-1 space-x-1.5 sm:space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <li className="inline-flex items-center">
            <Link 
              href={locale === 'en' ? '/' : `/${locale}/`}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
          </li>
          <li className="inline-flex items-center">
            <span className="mx-1 text-slate-300 dark:text-slate-600">/</span>
            <Link 
              href="/all-tools/" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {uiLabels?.backToAll || 'All Tools'}
            </Link>
          </li>
          {categoryLabel && (
            <li className="inline-flex items-center">
              <span className="mx-1 text-slate-300 dark:text-slate-600">/</span>
              <span className="text-slate-600 dark:text-slate-400">{categoryLabel}</span>
            </li>
          )}
          <li className="inline-flex items-center">
            <span className="mx-1 text-slate-300 dark:text-slate-600">/</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold" aria-current="page">
              {title}
            </span>
          </li>
        </ol>
      </nav>

      {/* Streamlined Tool Hero Header - Above-the-Fold Desktop & Mobile App Layout */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="text-blue-600 dark:text-blue-400 flex-shrink-0">
              <ToolIcon name={icon} className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {title}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {description}
              </p>
            </div>
          </div>

          <div className="hidden md:inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wide flex-shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{uiLabels?.badgeText || '100% Free · Client-Side Private · No Upload'}</span>
          </div>
        </div>

        {/* E-E-A-T Verified Trust Bar (Subtle & Clean) */}
        <div className="pt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          <span className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Verified for Chrome, Safari & Android</span>
          </span>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <span>Privacy: 100% In-Memory RAM Execution</span>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <span>Updated: October 2026</span>
        </div>
      </div>

      {/* Central Tool Workspace (Children) - Positioned Immediately Above-the-Fold */}
      <main className="mb-8">
        {children}
      </main>

      {/* Bottom Responsive Ad Slot - Rendered ONLY when AdSense is active with Core Web Vitals CLS Shield */}
      {siteConfig.googleAdsensePublisherId && showAdSlots && (
        <div 
          className="w-full my-8 min-h-[100px] sm:min-h-[250px] lg:min-h-[280px] flex items-center justify-center overflow-hidden transition-all"
          data-slot="ad-tool-bottom"
          aria-label="Advertisement"
        >
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={siteConfig.googleAdsensePublisherId}
            data-ad-slot="tool-bottom"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      )}

      {/* Step-by-Step "How to use" Guide */}
      {howToUse && howToUse.length > 0 && (
        <section className="mb-14 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{uiLabels?.quickStart || 'Quick Start Guide'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-6">
            {uiLabels?.howToUseTitle || `How to Use ${title}`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {howToUse.map((item) => (
              <div 
                key={item.step} 
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center mb-3">
                  0{item.step}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Practical Real-World Use Cases */}
      {useCases && useCases.length > 0 && (
        <section className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
              <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{uiLabels?.useCasesBadge || 'Versatile Applications'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {uiLabels?.useCasesTitle || 'Practical Real-World Use Cases'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-blue-500/40 transition-all"
              >
                <div>
                  {uc.tag && (
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mb-3">
                      {uc.tag}
                    </span>
                  )}
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    {uc.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Comparison Matrix Table */}
      {comparisonTable && comparisonTable.rows && comparisonTable.rows.length > 0 && (
        <section className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Performance & Privacy Benchmark</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {comparisonTable.title || 'Why Choose AnyOnlineTools?'}
            </h2>
            {comparisonTable.subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
                {comparisonTable.subtitle}
              </p>
            )}
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
                  <th className="py-4 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">Feature / Standard</th>
                  <th className="py-4 px-4 sm:px-6 font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30">
                    {comparisonTable.ourLabel || 'AnyOnlineTools'}
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-bold text-slate-500 dark:text-slate-400">
                    {comparisonTable.traditionalLabel || 'Traditional Repeaters'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {comparisonTable.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-800 dark:text-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-emerald-700 dark:text-emerald-400 bg-blue-50/30 dark:bg-blue-950/20">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{row.us}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-500 dark:text-slate-400">
                      {row.traditional}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Core Value Pillars */}
      <section className="mb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {activeFeatures.map((f, i) => (
            <div 
              key={i} 
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="mb-4 text-blue-600 dark:text-blue-400">
                {f.icon || <ShieldCheck className="w-6 h-6" />}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* E-E-A-T Trust & Security Verification Strip */}
      <section className="mb-14 p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400 shadow-sm">
        <div className="flex items-center space-x-3.5">
          <ShieldCheck className="w-7 h-7 text-emerald-500 flex-shrink-0" />
          <div>
            <span className="font-bold text-slate-900 dark:text-white text-sm block">
              100% Client-Side In-Browser Guarantee
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              Zero data leaves your device. Verified by AnyOnlineTools Engineering Standards.
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-5 text-slate-600 dark:text-slate-300 font-medium">
          <span className="inline-flex items-center space-x-1.5">
            <Lock className="w-4 h-4 text-blue-500" />
            <span>0 Bytes Uploaded</span>
          </span>
          <span className="inline-flex items-center space-x-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Hardware Accelerated</span>
          </span>
        </div>
      </section>

      {/* Related Tools Cluster (Topical Authority & Internal Linking) */}
      {relatedTools && relatedTools.length > 0 && (
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Topical Cluster</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Related Utilities
              </h2>
            </div>
            <Link 
              href="/all-tools/"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center space-x-1"
            >
              <span>Explore All</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((relTool) => (
              <Link
                key={relTool.slug}
                href={locale === 'en' ? `/${relTool.slug}/` : `/${locale}/${relTool.slug}/`}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-lg transition-all block"
              >
                <span className="flex items-center space-x-3 mb-2">
                  <ToolIcon name={relTool.icon} className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors block">
                    {relTool.name}
                  </span>
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed block">
                  {relTool.description}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Real Interactive User Feedback (Google HCU Trust Signal) */}
      <ToolFeedback toolTitle={title} />

      {/* Frequently Asked Questions */}
      {faqs && faqs.length > 0 && (
        <section className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{uiLabels?.faqBadge || 'Questions & Answers'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {uiLabels?.faqTitle || 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Editorial & E-E-A-T Technical Verification Box */}
      <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>
            Reviewed and technically verified by the <strong className="text-slate-800 dark:text-slate-200 font-semibold">AnyOnlineTools Engineering Team</strong>.
          </span>
        </div>
        <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          Editorial Standards: 100% Client-Side Privacy · Zero Telemetry · Updated October 2026
        </div>
      </div>
    </div>
  );
}
