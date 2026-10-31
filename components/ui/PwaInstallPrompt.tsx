'use client';

import React, { useState, useEffect } from 'react';
import { Download, Sparkles, X, Smartphone, Check } from 'lucide-react';

export default function PwaInstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // 1. Detect if already running in standalone PWA
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      setInstalled(true);
      return;
    }

    // 2. Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !/crios|fxios/.test(userAgent);
    setIsIos(isIosDevice);

    // 3. Capture PWA deferred prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).deferredPwaPrompt = e;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // 4. Listen for successful copy event
    const handleCopiedEvent = () => {
      try {
        const dismissed = localStorage.getItem('aot_pwa_dismissed');
        if (dismissed || isStandalone) return;

        // Show prompt after 1.8 seconds (giving user time to see the "Copied" toast)
        setTimeout(() => {
          setVisible(true);
        }, 1800);
      } catch (e) {}
    };

    window.addEventListener('aot-copied', handleCopiedEvent);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('aot-copied', handleCopiedEvent);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setVisible(false);
        try { localStorage.setItem('aot_pwa_dismissed', 'installed'); } catch (e) {}
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosGuide(true);
    } else {
      // Fallback for browsers that support install via browser menu
      alert("To install AnyOnlineTools, tap your browser's menu (⋮) and select 'Install app' or 'Add to Home screen'.");
      setVisible(false);
    }
  };

  const handleDismiss = () => {
    setVisible(false);
    setShowIosGuide(false);
    try {
      localStorage.setItem('aot_pwa_dismissed', 'later');
    } catch (e) {}
  };

  if (!visible || installed) return null;

  return (
    <div 
      role="complementary" 
      aria-label="PWA Install Recommendation"
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto sm:max-w-md z-50 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border border-blue-200/80 dark:border-blue-900/80 rounded-3xl p-4 sm:p-5 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 text-slate-900 dark:text-slate-100"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/30">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                AnyOnlineTools को होम स्क्रीन पर जोड़ें
              </h4>
              <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                PWA
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-tight">
              बिना इंटरनेट कभी भी 0 सेकंड में इस्तेमाल करें (0 MB Storage · 100% Private)
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
          title="Dismiss"
          aria-label="Dismiss prompt"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {showIosGuide ? (
        <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
          <p className="font-bold text-slate-800 dark:text-slate-200">
            iPhone / iPad पर इंस्टॉल करने के 2 आसान स्टेप्स:
          </p>
          <ol className="list-decimal list-inside text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
            <li>Safari के नीचे <strong>Share</strong> बटन (चौकोर तीर वाला आइकन) दबाएं।</li>
            <li>स्क्रॉल करके <strong>&apos;Add to Home Screen&apos;</strong> पर टैप करें।</li>
          </ol>
          <button
            onClick={handleDismiss}
            className="w-full mt-2 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-xl"
          >
            Got it!
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 mt-3.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={handleInstallClick}
            className="flex-1 inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install App (0 MB)</span>
          </button>
          <button
            onClick={handleDismiss}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold transition-colors"
          >
            Later
          </button>
        </div>
      )}
    </div>
  );
}
