'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, Home, Compass, Sparkles } from 'lucide-react';
import { TOOLS } from '../lib/tools-data';
import ToolIcon from './ToolIcon';

export default function NotFoundContent() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return TOOLS.filter(tool => 
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      (tool.keywords && tool.keywords.some(k => k.toLowerCase().includes(q))) ||
      (tool.categoryLabel && tool.categoryLabel.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const popularTools = useMemo(() => {
    return TOOLS.slice(0, 4);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
      {/* 404 Badge */}
      <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold mb-4">
        <Compass className="w-3.5 h-3.5" />
        <span>HTTP 404 · Page Not Found</span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
        Looking for a specific online tool?
      </h1>

      <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
        The link you followed may be mistyped or moved. Search our 100% free, private client-side utilities below:
      </p>

      {/* Global Instant Search Input */}
      <div className="mt-8 relative max-w-xl mx-auto text-left">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools (e.g. text repeater, repeat words)..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-lg transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Live Filtered Results Box */}
        {searchQuery.trim() !== '' && (
          <div className="mt-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-2 space-y-1">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}/`}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group block"
                >
                  <ToolIcon name={tool.icon} className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="flex-1 min-w-0 block">
                    <span className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {tool.categoryLabel}
                      </span>
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 block">
                      {tool.shortDesc || tool.description}
                    </span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </Link>
              ))
            ) : (
              <div className="py-6 px-4 text-center">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  No tools found matching &quot;{searchQuery}&quot;
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  Try another keyword or browse our complete directory below.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Suggested Popular Tools (Shown when search is empty) */}
      {searchQuery.trim() === '' && (
        <div className="mt-6 text-left max-w-xl mx-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Popular Utilities</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {popularTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}/`}
                className="flex items-center space-x-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-sm transition-all group block"
              >
                <ToolIcon name={tool.icon} className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="flex-1 min-w-0 block">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate block">
                    {tool.name}
                  </span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Action Links */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/all-tools/"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
        >
          <span>All Tools Directory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm border border-slate-200/80 dark:border-slate-700/80 transition-all active:scale-95"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Homepage</span>
        </Link>
      </div>
    </div>
  );
}
