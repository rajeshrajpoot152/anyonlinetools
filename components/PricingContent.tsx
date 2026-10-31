'use client';

import React from 'react';
import Link from 'next/link';
import { Check, X, Shield, Zap, Sparkles, HeartHandshake, ArrowRight } from 'lucide-react';

export default function PricingContent() {
  const plans = [
    {
      name: 'Personal & Students',
      price: '$0',
      period: 'forever',
      description: 'Ideal for everyday tasks, school assignments, and quick document formatting.',
      popular: false,
      features: [
        'Unlimited daily task volume',
        'Zero registration or email required',
        'Full access to all utility categories',
        '100% in-browser client-side privacy',
        'Zero promotional watermarks',
        'Works on mobile, tablet & desktop'
      ],
      ctaText: 'Start Using Tools',
      ctaHref: '/'
    },
    {
      name: 'Developers & Creators',
      price: '$0',
      period: 'forever',
      description: 'Complete suite for coders, designers, writers, and digital professionals.',
      popular: true,
      features: [
        'Everything in Personal tier',
        'Full access to developer utilities & formatters',
        'WebAssembly hardware-accelerated speed',
        'Zero server queues or wait times',
        'Full commercial usage rights for all outputs',
        'Offline Progressive Web App (PWA) support'
      ],
      ctaText: 'Explore All Tools',
      ctaHref: '/'
    },
    {
      name: 'Teams & Enterprise',
      price: '$0',
      period: 'forever',
      description: 'Zero-trust utility execution for organizations of any size without procurement friction.',
      popular: false,
      features: [
        'Unlimited seats across entire company',
        'Zero data egress (zero files uploaded)',
        'HIPAA, GDPR & corporate NDA compliant by design',
        'Zero vendor procurement or billing audits',
        'No credit card or corporate invoice required',
        'Direct local sync with enterprise cloud drives'
      ],
      ctaText: 'Learn for Enterprise',
      ctaHref: '/business'
    }
  ];

  const comparisonRows = [
    {
      feature: 'Monthly / Annual Cost',
      legacy: '$6 to $15 / month ($72–$180/yr)',
      anyOnline: '$0.00 / Free Forever',
      highlight: true
    },
    {
      feature: 'Daily Task Limits',
      legacy: '2 to 3 tasks per day (then paywalled)',
      anyOnline: 'Unlimited (No daily or hourly caps)',
      highlight: true
    },
    {
      feature: 'File Size Limits',
      legacy: 'Capped at 15MB – 25MB on free tier',
      anyOnline: 'Unlimited (Bounded only by your RAM)',
      highlight: false
    },
    {
      feature: 'Server Processing Queues',
      legacy: 'Artificial throttling during peak hours',
      anyOnline: 'Zero queues (Runs on your CPU/GPU)',
      highlight: true
    },
    {
      feature: 'File Privacy & Retention',
      legacy: 'Uploaded to cloud; stored up to 2 hours',
      anyOnline: '0 bytes uploaded; 0 seconds stored',
      highlight: true
    },
    {
      feature: 'Mandatory Account Signup',
      legacy: 'Yes (Requires email & verification)',
      anyOnline: 'Never (Zero accounts, zero emails)',
      highlight: false
    },
    {
      feature: 'Output Branding / Watermarks',
      legacy: 'Watermarks added on free exports',
      anyOnline: '100% clean output (Zero branding)',
      highlight: false
    },
    {
      feature: 'Commercial License Rights',
      legacy: 'Restricted to personal use on free tier',
      anyOnline: 'Full commercial rights for everyone',
      highlight: false
    },
    {
      feature: 'Credit Card for "Free Trial"',
      legacy: 'Required (Auto-charges after 7 days)',
      anyOnline: 'Never requested (No payment forms)',
      highlight: true
    }
  ];

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <span>💎 100% Free Forever Standard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Transparent Pricing: $0 Forever
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            No subscriptions, no artificial task limits, and no credit card traps. Every tool runs 100% locally in your web browser with zero paywalls.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-slate-900 rounded-3xl p-8 border transition-all flex flex-col justify-between ${
                plan.popular
                  ? 'border-blue-500 dark:border-blue-500 shadow-xl ring-2 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full tracking-wide uppercase shadow-sm">
                  Most Popular
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{plan.description}</p>

                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-2">/ {plan.period}</span>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={plan.ctaHref}
                className={`w-full py-3 px-4 rounded-xl text-center font-bold text-sm transition-all flex items-center justify-center space-x-2 ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                }`}
              >
                <span>{plan.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Competitor Freemium vs AnyOnlineTools Comparison Table */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
              Legacy Freemium Sites vs. AnyOnlineTools
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              See why hundreds of thousands of users switch from subscription-gated tools to our 100% client-side platform.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <th className="py-4 px-6 text-sm font-bold text-slate-900 dark:text-white">Feature / Vector</th>
                    <th className="py-4 px-6 text-sm font-bold text-rose-600 dark:text-rose-400">Legacy Freemium Sites</th>
                    <th className="py-4 px-6 text-sm font-bold text-emerald-600 dark:text-emerald-400">AnyOnlineTools Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                  {comparisonRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={row.highlight ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''}
                    >
                      <td className="py-4 px-6 font-semibold text-slate-900 dark:text-slate-100">
                        {row.feature}
                      </td>
                      <td className="py-4 px-6 text-rose-700 dark:text-rose-400 flex items-center space-x-2">
                        <X className="w-4 h-4 flex-shrink-0 text-rose-500" />
                        <span>{row.legacy}</span>
                      </td>
                      <td className="py-4 px-6 text-emerald-700 dark:text-emerald-300 font-semibold">
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 flex-shrink-0 text-emerald-500" />
                          <span>{row.anyOnline}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* How We Keep It Free Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-400/30">
              <span>💡 Architectural Economics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              How Can AnyOnlineTools Afford to Be 100% Free Forever?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6">
              Traditional online utility companies maintain massive centralized server farms. Every time a user uploads a file, it consumes paid cloud bandwidth, virtual machine compute, and storage. Because their operating costs skyrocket with traffic, they are forced to charge \$10/month and restrict free users to 2 tasks per day.
            </p>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6">
              AnyOnlineTools is engineered on <strong>modern client-side architecture</strong>. Our tools run locally on your device using WebAssembly, HTML5 Canvas, and modern JavaScript. Because your own device performs the processing in local memory, our cloud server compute costs are virtually zero. This fundamental architectural advantage allows us to keep all utilities permanently free, unlimited, and open to the entire world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="px-5 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors"
              >
                Our Lean Engineering Story
              </Link>
              <Link
                href="/privacy"
                className="px-5 py-2.5 bg-blue-800/80 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-blue-700 transition-colors border border-blue-700"
              >
                Read Zero-Upload Privacy Policy
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
