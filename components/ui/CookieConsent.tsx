'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, Check, Settings2, X } from 'lucide-react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // Granular preference state
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [adsEnabled, setAdsEnabled] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('aot_consent');
      if (!saved) {
        // Show banner after brief delay so it doesn't fight with initial render
        const timer = setTimeout(() => setIsOpen(true), 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {}

    // Listen for manual trigger from Footer or Privacy page
    const handleOpenSettings = () => {
      setIsOpen(true);
      setShowPreferences(true);
    };

    window.addEventListener('aot-open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('aot-open-cookie-settings', handleOpenSettings);
  }, []);

  const updateGtagConsent = (granted: boolean, adsGranted: boolean = granted) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
        ad_storage: adsGranted ? 'granted' : 'denied',
        ad_user_data: adsGranted ? 'granted' : 'denied',
        ad_personalization: adsGranted ? 'granted' : 'denied',
      });
    }
  };

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('aot_consent', 'granted');
      localStorage.setItem('aot_consent_analytics', 'true');
      localStorage.setItem('aot_consent_ads', 'true');
    } catch (e) {}
    updateGtagConsent(true, true);
    setIsOpen(false);
    setShowPreferences(false);
  };

  const handleRejectNonEssential = () => {
    try {
      localStorage.setItem('aot_consent', 'denied');
      localStorage.setItem('aot_consent_analytics', 'false');
      localStorage.setItem('aot_consent_ads', 'false');
    } catch (e) {}
    updateGtagConsent(false, false);
    setIsOpen(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('aot_consent', analyticsEnabled || adsEnabled ? 'custom' : 'denied');
      localStorage.setItem('aot_consent_analytics', analyticsEnabled ? 'true' : 'false');
      localStorage.setItem('aot_consent_ads', adsEnabled ? 'true' : 'false');
    } catch (e) {}
    updateGtagConsent(analyticsEnabled, adsEnabled);
    setIsOpen(false);
    setShowPreferences(false);
  };

  if (!mounted || !isOpen) return null;

  return (
    <div 
      role="dialog" 
      aria-label="Cookie and Privacy Consent" 
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 sm:max-w-md z-50 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 text-slate-900 dark:text-slate-100"
    >
      {!showPreferences ? (
        // Standard Compact Banner
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-900/80 text-amber-600 dark:text-amber-400">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
                  Privacy & Cookie Consent
                </h3>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  <span>100% In-Browser Memory · Zero Data Storage</span>
                </span>
              </div>
            </div>
            <button
              onClick={handleRejectNonEssential}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              title="Close and reject non-essential cookies"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            We use minimal cookies for theme settings and anonymous performance measurement. All computational tools run 100% client-side in your browser RAM. Read our{' '}
            <Link href="/cookies/" className="text-blue-600 dark:text-blue-400 underline font-semibold hover:text-blue-700">
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link href="/privacy/" className="text-blue-600 dark:text-blue-400 underline font-semibold hover:text-blue-700">
              Privacy Policy
            </Link>.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm text-center"
            >
              Accept All
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors text-center"
            >
              Reject Non-Essential
            </button>
            <button
              onClick={() => setShowPreferences(true)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold transition-colors flex items-center justify-center"
              title="Customize Cookie Preferences"
              aria-label="Customize"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        // Granular Preferences Modal
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <Settings2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                Cookie Preferences
              </h3>
            </div>
            <button
              onClick={() => setShowPreferences(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Back
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* Essential Cookies (Always Active) */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900 dark:text-white">1. Strictly Necessary (Always Active)</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                  Required
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Stores your theme preference (Dark/Light) and local tool session. Zero personal data tracked.
              </p>
            </div>

            {/* Performance & Analytics */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900 dark:text-white">2. Analytics & Performance</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Anonymized visit metrics via Google Analytics 4 to help us improve tool speed and stability.
              </p>
            </div>

            {/* Marketing & Ads */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900 dark:text-white">3. Advertising & Personalization</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={adsEnabled}
                    onChange={(e) => setAdsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Relevant, non-intrusive advertisements served through Google AdSense to keep tools 100% free.
              </p>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSavePreferences}
              className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm text-center"
            >
              Save Preferences
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors text-center"
            >
              Reject All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
