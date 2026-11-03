'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Wrench, 
  ShieldCheck, 
  Globe,
  Star,
  Award,
  Linkedin,
  Facebook,
  MessageSquare,
  Bookmark,
  BookOpen,
  Code2,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { siteConfig } from '../lib/site-config';
import { TOOLS, getLocalizedToolHref } from '../lib/tools-data';
import { i18n } from '../i18n-config';
import { LOCALE_SEO } from '../lib/i18n-seo';

export default function Footer({ currentLang = 'en' }: { currentLang?: string }) {
  const pathname = usePathname() || '';
  const pathSegments = pathname.split('/').filter(Boolean);
  const detectedLocale = pathSegments.length > 0 && (i18n.locales as readonly string[]).includes(pathSegments[0])
    ? pathSegments[0]
    : currentLang;
  const activeLang = detectedLocale || 'en';
  const homeHref = activeLang === 'en' ? '/' : `/${activeLang}/`;

  const socialProfiles = [
    { name: 'Trustpilot', href: 'https://trustpilot.com/review/anyonlinetools.com', icon: Star, highlight: true, color: 'emerald' },
    { name: 'Product Hunt', href: 'https://www.producthunt.com/@anyonlinetools', icon: Award, highlight: true, color: 'orange' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/anyonlinetools/', icon: Linkedin },
    { name: 'Reddit', href: 'https://www.reddit.com/user/anyonlinetools/', icon: MessageSquare },
    { name: 'Dev.to', href: 'https://dev.to/anyonlinetools', icon: Code2 },
    { name: 'Medium', href: 'https://medium.com/@anyonlinetools', icon: BookOpen },
    { name: 'Quora', href: 'https://www.quora.com/profile/anyonlinetools', icon: HelpCircle },
    { name: 'Pinterest', href: 'https://www.pinterest.com/anyonlinetools/', icon: Bookmark },
    { name: 'Facebook', href: 'https://www.facebook.com/anyonlinetools/', icon: Facebook },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-300 dark:border-slate-800">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2">
            <Link href={homeHref} className="inline-flex items-center space-x-2.5 mb-3 group">
              <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform flex-shrink-0" />
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                AnyOnline<span className="text-blue-600 dark:text-blue-400">Tools</span>
              </span>
            </Link>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm font-medium">
              Free, fast, and privacy-first online utilities for developers, writers, and digital professionals worldwide. All tools run 100% client-side in your web browser with zero server telemetry.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-xs text-emerald-700 dark:text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>100% Free · Client-Side Private · Zero Data Storage</span>
            </div>
            
            {/* Quick Community Badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://trustpilot.com/review/anyonlinetools.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                title="Review AnyOnlineTools on Trustpilot"
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Trustpilot Reviews</span>
              </a>
              <a
                href="https://www.producthunt.com/@anyonlinetools"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 text-[11px] font-bold text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/60 transition-colors"
                title="Find AnyOnlineTools on Product Hunt"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Product Hunt</span>
              </a>
            </div>

            <div className="mt-3">
              <Link href="/llms.txt" className="text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-mono font-semibold transition-colors underline-offset-2 hover:underline">
                🤖 AI &amp; LLM Index (/llms.txt)
              </Link>
            </div>
          </div>

          {/* Online Tools */}
          <div className="lg:col-span-2">
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">
              Popular Tools ({TOOLS.length})
            </div>
            <ul className="space-y-2.5 text-xs">
              {TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <Link href={getLocalizedToolHref(tool, activeLang)} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between">
                    <span>{tool.name}</span>
                    {tool.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-medium">
                        {tool.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Community Profiles */}
          <div className="lg:col-span-1">
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">
              Community &amp; Social
            </div>
            <ul className="space-y-2 text-xs">
              {socialProfiles.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center justify-between transition-colors ${
                        item.highlight 
                          ? 'text-slate-900 dark:text-slate-100 font-semibold hover:text-blue-600 dark:hover:text-blue-400' 
                          : 'hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <IconComponent className={`w-3.5 h-3.5 ${
                          item.name === 'Trustpilot' ? 'text-emerald-500 fill-emerald-500' :
                          item.name === 'Product Hunt' ? 'text-orange-500' :
                          item.name === 'LinkedIn' ? 'text-blue-600' :
                          item.name === 'Reddit' ? 'text-orange-600' :
                          item.name === 'Facebook' ? 'text-blue-500' :
                          'text-slate-400 group-hover:text-blue-500'
                        }`} />
                        <span>{item.name}</span>
                      </span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Legal Links */}
          <div className="lg:col-span-1">
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">
              Platform &amp; Legal
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About AnyOnlineTools
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('aot-open-cookie-settings'));
                    }
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Cookie Preferences
                </button>
              </li>
              <li>
                <Link href="/education" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold text-indigo-600 dark:text-indigo-400">
                  🎓 For Education
                </Link>
              </li>
              <li>
                <Link href="/business" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold text-blue-600 dark:text-blue-400">
                  🏢 For Enterprise
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold text-emerald-600 dark:text-emerald-400">
                  📖 User&apos;s Guide
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold text-emerald-600 dark:text-emerald-400">
                  💎 100% Free Forever ($0)
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold text-cyan-600 dark:text-cyan-400">
                  ⚡ Features &amp; Capabilities
                </Link>
              </li>
              <li>
                <Link href="/developers" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold text-purple-600 dark:text-purple-400">
                  💻 For Developers
                </Link>
              </li>
              <li>
                <Link href="/all-tools" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold text-blue-600 dark:text-blue-400">
                  🗂️ All Tools Directory
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Languages Section in Exact Order */}
        <div className="py-8 border-b border-slate-300 dark:border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
            <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Supported Global Languages ({i18n.locales.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {i18n.locales.map((code) => {
              const langInfo = LOCALE_SEO[code];
              const isActive = activeLang === code;
              return (
                <Link
                  key={code}
                  href={code === 'en' ? '/' : `/${code}/`}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-sm'
                      : 'bg-white dark:bg-slate-900/60 hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <span>{langInfo?.nativeName || code}</span>
                  <span className={`text-[10px] uppercase font-mono ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                    ({code})
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500 space-y-3 sm:space-y-0">
          <div>
            <div>
              © {new Date().getFullYear()} {siteConfig.siteName} ({siteConfig.domain.replace('https://', '')}). Built for speed and privacy.
            </div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              Reviewed & verified by the AnyOnlineTools Engineering Team.
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Powered by{' '}
              <a 
                href="https://growautoai.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                GrowAutoAI
              </a>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center space-x-1">
              <span>Crafted with precision for productive minds</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
