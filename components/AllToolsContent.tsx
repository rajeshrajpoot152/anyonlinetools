'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Star, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { TOOLS, TOOL_CATEGORIES, getLocalizedToolHref, type ToolInfo } from '../lib/tools-data';
import ToolIcon from './ToolIcon';
import { i18n } from '../i18n-config';

interface CatalogTool {
  slug: string;
  name: string;
  category: string;
  icon: string;
  desc: string;
  href: string;
  badge?: string;
  isPopular?: boolean;
}

const CATEGORIES = [
  'All',
  ...TOOL_CATEGORIES.filter(c => c.id !== 'all').map(c => c.label)
];

export default function AllToolsContent() {
  const pathname = usePathname() || '';
  const pathSegments = pathname.split('/').filter(Boolean);
  const detectedLocale = pathSegments.length > 0 && (i18n.locales as readonly string[]).includes(pathSegments[0])
    ? pathSegments[0]
    : 'en';
  const activeLang = detectedLocale;

  const catalogItems: CatalogTool[] = useMemo(() => {
    return TOOLS.map(t => ({
      slug: t.slug,
      name: t.name,
      category: t.categoryLabel,
      icon: t.icon,
      desc: t.shortDesc || t.description,
      href: getLocalizedToolHref(t, activeLang),
      badge: t.badge,
      isPopular: true
    }));
  }, [activeLang]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [pinnedSlugs, setPinnedSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('aot_pinned_tools');
      if (stored) setPinnedSlugs(JSON.parse(stored));
    } catch {}
  }, []);

  const togglePin = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const exists = pinnedSlugs.includes(slug);
    const updated = exists ? pinnedSlugs.filter(s => s !== slug) : [...pinnedSlugs, slug];
    setPinnedSlugs(updated);
    try {
      localStorage.setItem('aot_pinned_tools', JSON.stringify(updated));
    } catch {}
  };

  const filteredTools = useMemo(() => {
    return catalogItems.filter(tool => {
      let matchesCat = true;
      if (selectedCat === 'Frequently Used') {
        matchesCat = tool.isPopular === true;
      } else if (selectedCat !== 'All') {
        matchesCat = tool.category.toLowerCase().includes(selectedCat.toLowerCase());
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        tool.name.toLowerCase().includes(q) ||
        tool.desc.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [catalogItems, searchQuery, selectedCat]);

  const pinnedTools = useMemo(() => {
    return catalogItems.filter(tool => pinnedSlugs.includes(tool.slug));
  }, [catalogItems, pinnedSlugs]);

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Unified Tools Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            All Online Tools at a Glance
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Every utility on AnyOnlineTools organized by category. Star your everyday favorites to pin them right to the top of your workspace.
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g. Text Repeater, repeat words)..."
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl shadow-sm text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCat === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pinned / Favorites Section */}
        {pinnedTools.length > 0 && (
          <div className="mb-14 bg-white dark:bg-slate-900/60 border border-amber-200 dark:border-amber-900/40 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-4">
              <Star className="w-4 h-4 fill-amber-500" />
              <span>Pinned Favorites ({pinnedTools.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {pinnedTools.map((tool) => (
                <div
                  key={tool.slug}
                  className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 hover:border-amber-400 flex items-center justify-between group transition-all"
                >
                  <Link
                    href={tool.href}
                    className="flex items-center space-x-3 flex-1 min-w-0"
                  >
                    <span className="text-blue-600 dark:text-blue-400 flex-shrink-0 block">
                      <ToolIcon name={tool.icon} className="w-5 h-5" />
                    </span>
                    <span className="truncate block">
                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate block">
                        {tool.name}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 block">
                        {tool.category}
                      </span>
                    </span>
                  </Link>
                  <button
                    onClick={(e) => togglePin(tool.slug, e)}
                    className="p-1.5 text-amber-500 hover:text-amber-600 transition-colors ml-2 flex-shrink-0"
                    title="Remove from favorites"
                    aria-label={`Remove ${tool.name} from favorites`}
                  >
                    <Star className="w-4 h-4 fill-amber-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Master Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-16">
          {filteredTools.map((tool) => {
            const isPinned = pinnedSlugs.includes(tool.slug);
            return (
              <div
                key={tool.slug}
                className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/60 dark:hover:border-blue-500/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Link href={tool.href} className="text-blue-600 dark:text-blue-400">
                      <ToolIcon name={tool.icon} className="w-7 h-7" />
                    </Link>
                    <button
                      onClick={(e) => togglePin(tool.slug, e)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isPinned 
                          ? 'text-amber-500' 
                          : 'text-slate-300 dark:text-slate-600 hover:text-amber-400'
                      }`}
                      title={isPinned ? 'Remove favorite' : 'Pin to favorites'}
                      aria-label={`Toggle favorite for ${tool.name}`}
                    >
                      <Star className={`w-4 h-4 ${isPinned ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>

                  <Link href={tool.href} className="block group">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 block">
                      {tool.category}
                    </span>
                    <span className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5 block">
                      {tool.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 block">
                      {tool.desc}
                    </span>
                  </Link>
                </div>

                <Link 
                  href={tool.href}
                  className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Zero Results Feedback */}
        {filteredTools.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 max-w-lg mx-auto">
            <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              No matching tools found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Try searching for general keywords or switch the category filter to &quot;All&quot;.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCat('All'); }}
              className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
