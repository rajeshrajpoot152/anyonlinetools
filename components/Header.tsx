'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Download, 
  Sun, 
  Moon, 
  Search, 
  Sparkles, 
  Wrench, 
  Globe 
} from 'lucide-react';
import { TOOLS, getLocalizedToolHref } from '../lib/tools-data';
import ToolIcon from './ToolIcon';
import { i18n } from '../i18n-config';
import { LOCALE_SEO } from '../lib/i18n-seo';

export default function Header({ currentLang = 'en' }: { currentLang?: string }) {
  const pathname = usePathname() || '';
  const pathSegments = pathname.split('/').filter(Boolean);
  const detectedLocale = pathSegments.length > 0 && (i18n.locales as readonly string[]).includes(pathSegments[0])
    ? pathSegments[0]
    : currentLang;
  const activeLang = detectedLocale || 'en';

  // Find if currently viewing a known tool
  const currentToolSlug = pathSegments.find(segment => TOOLS.some(t => t.slug === segment));
  const currentTool = currentToolSlug ? TOOLS.find(t => t.slug === currentToolSlug) : undefined;

  const [toolsOpen, setToolsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installable, setInstallable] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    // Check dark mode preference
    if (typeof window !== 'undefined') {
      let preference: string | null = null;
      try { preference = localStorage.getItem('anyonlinetools-theme'); } catch {}
      const isDark = preference ? preference === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    }

    // PWA Install prompt listener
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Global Ctrl+K / Cmd+K Command Palette listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    try { localStorage.setItem('anyonlinetools-theme', nextDark ? 'dark' : 'light'); } catch {}
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallable(false);
    }
    setDeferredPrompt(null);
  };

  const filteredTools = searchQuery.trim() === '' 
    ? [] 
    : TOOLS.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const homeHref = activeLang === 'en' ? '/' : `/${activeLang}/`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={homeHref} className="flex items-center space-x-2.5 group">
          <Wrench className="w-7 h-7 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform flex-shrink-0" />
          <span className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
              AnyOnline<span className="text-blue-600 dark:text-blue-400">Tools</span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
              100% Free · Client-Side Private
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-700 dark:text-slate-300">
          <Link href={homeHref} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>

          {/* Tools Mega Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="flex items-center space-x-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
            >
              <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>All Tools ({TOOLS.length})</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
            </button>

            {toolsOpen && (
              <div 
                className="absolute left-1/2 -translate-x-1/2 mt-2 w-[420px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-5 z-50 space-y-3"
                onMouseLeave={() => setToolsOpen(false)}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 flex items-center space-x-1.5">
                  <Wrench className="w-3.5 h-3.5 text-blue-500" />
                  <span>Free Online Utilities ({TOOLS.length})</span>
                </div>
                <div className="space-y-1.5">
                  {TOOLS.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={getLocalizedToolHref(tool, activeLang)}
                      onClick={() => setToolsOpen(false)}
                      className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                    >
                      <ToolIcon name={tool.icon} className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform mt-0.5" />
                      <span className="flex-1 block">
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {tool.name}
                        </span>
                        <span className="block text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {tool.shortDesc}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Search Button / Command Palette Trigger */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center space-x-2 px-2.5 py-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200/60 dark:border-slate-800"
              title="Search tools (Ctrl + K)"
              aria-label="Search tools"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline text-xs text-slate-400">Search tools...</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 rounded border border-slate-200 dark:border-slate-700">
                Ctrl K
              </kbd>
            </button>

            {searchOpen && (
              <div 
                className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={() => setSearchOpen(false)}
              >
                <div 
                  className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
                    <Search className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search tools, utilities, formats... (e.g. repeat, counter)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full text-xs sm:text-sm bg-transparent border-none focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                    />
                    <kbd 
                      onClick={() => setSearchOpen(false)}
                      className="cursor-pointer px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-lg border border-slate-200 dark:border-slate-700"
                    >
                      ESC
                    </kbd>
                  </div>
                  
                  <div className="p-2 max-h-80 overflow-y-auto space-y-1">
                    {filteredTools.length > 0 ? (
                      filteredTools.map((t) => (
                        <Link
                          key={t.slug}
                          href={getLocalizedToolHref(t, activeLang)}
                          onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                          className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                        >
                          <span className="flex items-center space-x-3">
                            <ToolIcon name={t.icon} className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            <span className="block">
                              <span className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {t.name}
                              </span>
                              <span className="block text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                                {t.shortDesc || t.description}
                              </span>
                            </span>
                          </span>
                          <span className="text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 uppercase">
                            {t.categoryLabel}
                          </span>
                        </Link>
                      ))
                    ) : searchQuery.trim() !== '' ? (
                      <div className="p-8 text-center text-xs text-slate-400">
                        No tools found matching &quot;{searchQuery}&quot;
                      </div>
                    ) : (
                      <div className="p-4 text-center text-xs text-slate-400 dark:text-slate-500">
                        Type any keyword to instantly search all 100% in-browser utilities...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PWA Install Button */}
          {installable && (
            <button
              onClick={handleInstallClick}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              title="Install App"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          )}

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center space-x-1 p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-xs font-bold uppercase"
              title="Change Language"
              aria-label="Change Language"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">{activeLang}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {langOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 max-h-80 overflow-y-auto"
                onMouseLeave={() => setLangOpen(false)}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 py-1 mb-1">
                  Global Languages ({i18n.locales.length})
                </div>
                <div className="space-y-0.5">
                  {i18n.locales.map((code) => {
                    const info = LOCALE_SEO[code];
                    const isActive = activeLang === code;
                    const switchHref = currentTool 
                      ? getLocalizedToolHref(currentTool, code)
                      : (code === 'en' ? '/' : `/${code}/`);

                    return (
                      <Link
                        key={code}
                        href={switchHref}
                        onClick={() => setLangOpen(false)}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors ${
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="truncate">{info?.nativeName || code}</span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase ml-2">{code}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto space-y-4">
          <Link
            href={homeHref}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-900 dark:text-white py-1.5"
          >
            Home
          </Link>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Browse All Tools ({TOOLS.length})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.slug}
                  href={getLocalizedToolHref(tool, activeLang)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  <ToolIcon name={tool.icon} className="w-4 h-4 text-blue-500" />
                  <span>{tool.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-4 text-sm font-medium">
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
