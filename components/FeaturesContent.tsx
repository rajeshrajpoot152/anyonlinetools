'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Zap, 
  Laptop, 
  Sparkles, 
  Infinity as InfinityIcon, 
  Sliders, 
  ArrowRight, 
  Check, 
  X,
  Lock,
  Layers,
  Smartphone
} from 'lucide-react';

export default function FeaturesContent() {
  const pillars = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
      title: 'Zero-Theft In-Browser Privacy',
      badge: 'Zero Cloud Upload',
      description: 'Unlike legacy cloud tools that hold files on remote servers for up to 2 hours, AnyOnlineTools runs 100% inside your browser memory. Exactly 0 bytes leave your device, eliminating cloud data theft and third-party vendor risks entirely.'
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      title: 'Bandwidth-Independent Batch Speed',
      badge: 'WebAssembly Engine',
      description: 'Never wait for slow uploads on weak Wi-Fi or mobile data. All batch conversions execute multi-threaded on your device\'s local CPU and GPU via WebAssembly. A 500MB file processes locally in milliseconds without consuming cellular bandwidth.'
    },
    {
      icon: <Laptop className="w-8 h-8 text-blue-500" />,
      title: 'Maximum Privacy in the Web Browser',
      badge: 'PWA & Offline Ready',
      description: 'Competitors require downloading separate desktop applications for offline privacy. We deliver desktop-grade air-gapped isolation directly in standard web browsers. Install as a Progressive Web App (PWA) with one click for offline use.'
    },
    {
      icon: <Sparkles className="w-8 h-8 text-indigo-500" />,
      title: 'Effortless Non-Technical Ergonomics',
      badge: 'Zero Account Walls',
      description: 'No technical expertise, accounts, or email confirmations required. Drag and drop files anywhere onto the canvas, use automatic A-Z and reverse sorting, and download pristine results with zero configuration hurdles.'
    },
    {
      icon: <InfinityIcon className="w-8 h-8 text-rose-500" />,
      title: 'Unrestricted Free Standard',
      badge: '$0 Forever / No Caps',
      description: 'Say goodbye to artificial 15MB file caps, 2-3 task daily quotas, and subscription paywalls. Every tool, preset, and advanced feature is completely unlocked for unlimited use bounded only by your machine\'s RAM.'
    },
    {
      icon: <Sliders className="w-8 h-8 text-cyan-500" />,
      title: 'Lossless & Perceptual Optimization',
      badge: 'Ultra High Fidelity',
      description: 'Our compression algorithms intelligently downsample raster imagery according to target DPI (72, 150, 300) and strip redundant metadata while preserving crisp vector typography, hyperlinks, and document integrity.'
    }
  ];

  const comparisonPoints = [
    {
      vector: 'File Processing Location',
      legacy: 'Remote cloud data centers (AWS/GCP)',
      anyOnline: '100% Local browser memory (Client-Side)'
    },
    {
      vector: 'File Retention Time',
      legacy: 'Up to 2 hours on cloud storage',
      anyOnline: '0 seconds (Never stored or uploaded)'
    },
    {
      vector: 'Speed Dependency',
      legacy: 'Tied to internet upload bandwidth & server load',
      anyOnline: 'Tied to local hardware speed (0 network lag)'
    },
    {
      vector: 'Daily Task Limits',
      legacy: '2 to 3 tasks per day on free tier',
      anyOnline: 'Unlimited tasks forever'
    },
    {
      vector: 'File Size Caps',
      legacy: '15MB – 25MB paywall barrier',
      anyOnline: 'Unlimited (Hardware-bound only)'
    },
    {
      vector: 'Offline Capability',
      legacy: 'Requires installing heavy desktop apps',
      anyOnline: 'Native Progressive Web App (In-browser offline)'
    },
    {
      vector: 'Account & Identity',
      legacy: 'Mandatory email signup & confirmation',
      anyOnline: 'Zero signups, zero tracking, zero emails'
    }
  ];

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <span>⚡ Engineering Excellence & Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Core Platform Features & Capabilities
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Engineered from the ground up on modern WebAssembly and client-side standards. Zero file uploads, zero server queues, and zero artificial limitations.
          </p>
        </div>

        {/* 6 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="text-blue-600 dark:text-blue-400">
                    {pillar.icon}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {pillar.badge}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {pillar.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Verified Client-Side Standard</span>
                <Check className="w-4 h-4 ml-1.5 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Comparison Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
              The Architectural Shift: Cloud Servers vs. Local Edge
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Why client-side processing delivers superior privacy, speed, and reliability compared to legacy SaaS utility platforms.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <th className="py-4 px-6 font-bold text-slate-900 dark:text-white">Vector</th>
                    <th className="py-4 px-6 font-bold text-rose-600 dark:text-rose-400">Legacy Cloud Model</th>
                    <th className="py-4 px-6 font-bold text-emerald-600 dark:text-emerald-400">AnyOnlineTools Edge Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {comparisonPoints.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/50 dark:bg-slate-950/20' : ''}>
                      <td className="py-4 px-6 font-semibold text-slate-900 dark:text-slate-100">
                        {item.vector}
                      </td>
                      <td className="py-4 px-6 text-rose-700 dark:text-rose-400 flex items-center space-x-2">
                        <X className="w-4 h-4 flex-shrink-0 text-rose-500" />
                        <span>{item.legacy}</span>
                      </td>
                      <td className="py-4 px-6 text-emerald-700 dark:text-emerald-300 font-semibold">
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 flex-shrink-0 text-emerald-500" />
                          <span>{item.anyOnline}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Freedom Across Platforms */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-400/30">
              <span>📱 Universal Cross-Platform Freedom</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Work Seamlessly Across Desktop, Tablet & Mobile
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6">
              AnyOnlineTools adapts dynamically to your workflow. Whether you are on an iPhone, iPad, Android phone, MacBook, Windows PC, or Linux workstation, our responsive viewport and PWA engine ensure flawless performance without requiring platform-specific app downloads.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/guide"
                className="px-5 py-2.5 bg-white text-blue-900 rounded-xl font-bold text-xs sm:text-sm hover:bg-blue-50 transition-colors"
              >
                Read User&apos;s Guide
              </Link>
              <Link
                href="/pricing"
                className="px-5 py-2.5 bg-blue-800/80 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-blue-700 transition-colors border border-blue-700"
              >
                Review $0 Free Policy
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
