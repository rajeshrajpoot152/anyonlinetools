'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Layers, 
  ArrowRight, 
  ChevronDown,
  CheckCircle,
  HelpCircle,
  Laptop
} from 'lucide-react';
import { TOOLS, TOOL_CATEGORIES, ToolInfo, getLocalizedToolHref } from '../lib/tools-data';
import ToolIcon from './ToolIcon';
import { FAQS } from '../lib/site-faqs';

export default function HomePageContent({ lang = 'en' }: { lang?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-20">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wide mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>100% Free · Private In-Browser Tools · Zero Data Collection</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Fast, Free & Private <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
            Online Utilities
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          A modern suite of essential online tools for developers, content creators, and professionals. All operations execute directly in your browser memory for maximum speed and complete privacy.
        </p>

        {/* Live Search Bar */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search tools (e.g. Text Repeater, repeat text)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 text-sm sm:text-base bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 text-slate-900 dark:text-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Global Authority & Zero-Upload Trust Metrics */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs text-center">
            <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">0 Bytes</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Uploaded to Servers</div>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs text-center">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">0 Seconds</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Data Retention</div>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs text-center">
            <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">0 Queues</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Local Hardware Speed</div>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs text-center">
            <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">$0 Free</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Forever / No Caps</div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {TOOL_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <ToolIcon name={cat.icon} className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{cat.label}</span>
              {cat.id === 'all' && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  {TOOLS.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={getLocalizedToolHref(tool, lang)}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 flex flex-col justify-between"
            >
              <span className="block">
                <span className="flex items-center justify-between mb-4">
                  <span className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform block">
                    <ToolIcon name={tool.icon} className="w-8 h-8" />
                  </span>
                </span>

                <span className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 block">
                  {tool.name}
                </span>

                <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6 block">
                  {tool.description}
                </span>
              </span>

              <span className="flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 mb-20 p-8">
          <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No Tools Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
            We couldn't find any tool matching "{searchQuery}". Try searching for another keyword or browse all tools.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Popular Conversions & Quick Utility Matrix */}
      <section className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span>⚡ Trending & High-Demand Tools</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            High-Speed In-Browser Utilities
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Fast, client-side tools running 100% in your browser with zero data uploads.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            ...(TOOLS.length > 0 ? [{
              label: TOOLS[0].name,
              icon: '🔁',
              href: getLocalizedToolHref(TOOLS[0], lang),
              cat: 'Featured Tool'
            }] : []),
            { label: 'All Tools Catalog', icon: '📦', href: '/all-tools', cat: 'Directory' },
            { label: 'WASM Recipes', icon: '⚡', href: '/developers', cat: 'Developer' },
            { label: 'Platform Features', icon: '🛡️', href: '/features', cat: 'Zero-Theft' },
            { label: '$0 Free Charter', icon: '💎', href: '/pricing', cat: 'Forever Free' },
            { label: 'Operations Guide', icon: '📖', href: '/guide', cat: 'Help & Docs' },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <span className="flex items-center justify-between mb-2">
                <span className="text-xl">{item.icon}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {item.cat}
                </span>
              </span>
              <span className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Value Pillars Section */}
      <section className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineered for Privacy, Speed & Simplicity
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Why developers, writers, and digital professionals choose private client-side utilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="mb-4 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              100% Client-Side Privacy
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your inputs, text, code, passwords, and sensitive data never travel across the internet. Everything is calculated and rendered directly inside your web browser.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="mb-4 text-blue-600 dark:text-blue-400">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Zero Server Latency
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Experience instant results without network delays, slow API queries, or annoying loading spinners. Built with optimized modern web algorithms.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="mb-4 text-indigo-600 dark:text-indigo-400">
              <Laptop className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              No Sign-Up or Paywalls
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No account creation required, no email subscriptions, no daily limits, and no credit cards. Simply open the website, use the tool, and get things done.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Got Questions About AnyOnlineTools?
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
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
    </main>
  );
}
