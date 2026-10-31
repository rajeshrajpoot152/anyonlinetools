'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);

  useEffect(() => {
    const handleToastEvent = (e: CustomEvent<{ message: string }>) => {
      const message = e.detail?.message || 'Action completed successfully!';
      const id = Date.now();
      setToast({ message, id });

      setTimeout(() => {
        setToast((current) => (current?.id === id ? null : current));
      }, 2500);
    };

    window.addEventListener('aot-toast' as any, handleToastEvent as any);
    return () => window.removeEventListener('aot-toast' as any, handleToastEvent as any);
  }, []);

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0 z-50 flex items-center space-x-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 shadow-2xl backdrop-blur-md border border-slate-800 dark:border-slate-200 transition-all duration-300 whitespace-nowrap animate-in fade-in slide-in-from-bottom-5 pointer-events-none select-none">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 flex-shrink-0" />
      <span className="text-xs font-bold tracking-wide">{toast.message}</span>
    </div>
  );
}
