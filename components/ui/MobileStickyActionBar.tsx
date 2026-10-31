'use client';

import React from 'react';
import { Share2, Trash2 } from 'lucide-react';
import CopyButton from './CopyButton';

export interface MobileStickyActionBarProps {
  content: string;
  onClear?: () => void;
  onShare?: () => void;
  countLabel?: string;
  className?: string;
}

export default function MobileStickyActionBar({
  content,
  onClear,
  onShare,
  countLabel,
  className = '',
}: MobileStickyActionBarProps) {
  if (!content || content.trim().length === 0) {
    return null;
  }

  const handleShare = async () => {
    if (onShare) {
      onShare();
      return;
    }

    if (!content) return;
    const shareText = content.length > 2500
      ? content.slice(0, 2500) + '... [Via AnyOnlineTools.com]'
      : content;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'AnyOnlineTools – Output',
          text: shareText,
        });
        return;
      } catch (e) {
        // User closed native share sheet
        return;
      }
    }

    // Direct WhatsApp fallback
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden pointer-events-none transition-all ${className}`}
      aria-label="Mobile Quick Actions"
    >
      <div className="pointer-events-auto max-w-md mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-black/50 rounded-2xl p-2 flex items-center justify-between gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
        
        {/* Quick summary badge (when available) */}
        {countLabel && (
          <div className="flex flex-col px-2 flex-shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 leading-none">
              Ready
            </span>
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5">
              {countLabel}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 flex-1 justify-end">
          {/* 1. Primary 1-Tap Copy Button */}
          <CopyButton
            text={content}
            label="Copy"
            copiedLabel="Copied!"
            size="sm"
            variant="primary"
            className="flex-1 py-2 text-xs font-bold"
          />

          {/* 2. Native Share Button (Web Share API) */}
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center justify-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900/60 transition-colors active:scale-95 flex-shrink-0"
            title="Share via WhatsApp, Telegram, or Notes"
            aria-label="Share via social apps"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          {/* 3. Clear Button */}
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center justify-center space-x-1 px-2.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 border border-slate-200/80 dark:border-slate-700/80 transition-colors active:scale-95 flex-shrink-0"
              title="Clear input and output"
              aria-label="Clear output"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
