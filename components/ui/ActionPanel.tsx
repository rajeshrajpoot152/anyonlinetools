'use client';

import React from 'react';
import { Download, Trash2, Share2, Send } from 'lucide-react';
import CopyButton from './CopyButton';

export interface StatItem {
  label: string;
  value: string | number;
}

export interface ActionPanelProps {
  content?: string;
  onClear?: () => void;
  downloadFileName?: string;
  downloadMimeType?: string;
  stats?: StatItem[];
  showWhatsAppShare?: boolean;
  customActions?: React.ReactNode;
  className?: string;
}

export default function ActionPanel({
  content = '',
  onClear,
  downloadFileName = 'result.txt',
  downloadMimeType = 'text/plain;charset=utf-8',
  stats,
  showWhatsAppShare = true,
  customActions,
  className = '',
}: ActionPanelProps) {
  const handleDownload = () => {
    if (!content) return;
    const blob = new Blob([content], { type: downloadMimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleWhatsAppShare = () => {
    if (!content) return;
    const shareText = content.length > 2000 
      ? content.slice(0, 2000) + '... [truncated for WhatsApp]' 
      : content;
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleTelegramShare = () => {
    if (!content) return;
    const shareText = content.length > 2000 
      ? content.slice(0, 2000) + '... [Via AnyOnlineTools.com]' 
      : content;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://anyonlinetools.com';
    const url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = async () => {
    if (!content) return;
    const shareText = content.length > 2500 
      ? content.slice(0, 2500) + '... [Created via AnyOnlineTools.com]' 
      : content;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'AnyOnlineTools – Output',
          text: shareText,
        });
        return;
      } catch (e) {
        // User closed native sheet
        return;
      }
    }
    // Fallback if Web Share API not supported on desktop
    handleWhatsAppShare();
  };

  const hasContent = Boolean(content && content.trim().length > 0);

  return (
    <div className={`space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800 ${className}`}>
      {/* Live Stats Row */}
      {stats && stats.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
          {stats.map((s, idx) => (
            <div key={idx} className="flex items-center space-x-1">
              <span>{s.label}:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{s.value}</span>
              {idx < stats.length - 1 && <span className="text-slate-300 dark:text-slate-700 ml-2">·</span>}
            </div>
          ))}
        </div>
      )}

      {/* Main Buttons Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Left side actions: Copy, Download, Native Share, WhatsApp, Telegram */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <CopyButton text={content} variant="primary" className="w-full sm:w-auto flex-1 sm:flex-none justify-center" />

          {downloadFileName && (
            <button
              onClick={handleDownload}
              disabled={!hasContent}
              className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4 text-blue-500" />
              <span>Download</span>
            </button>
          )}

          {/* Native OS Share Sheet (Web Share API for WhatsApp, Telegram, Instagram, Messages) */}
          <button
            onClick={handleNativeShare}
            disabled={!hasContent}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-sm font-bold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-950/80 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Share via WhatsApp, Telegram, Instagram, or Notes"
            aria-label="Share via social apps"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>

          {showWhatsAppShare && (
            <button
              onClick={handleWhatsAppShare}
              disabled={!hasContent}
              className="hidden sm:inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl text-sm font-bold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Share to WhatsApp"
            >
              <span>WhatsApp</span>
            </button>
          )}

          <button
            onClick={handleTelegramShare}
            disabled={!hasContent}
            className="hidden sm:inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl text-sm font-bold bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/40 dark:hover:bg-sky-950/80 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Share to Telegram"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Telegram</span>
          </button>

          {customActions}
        </div>

        {/* Right side: Clear */}
        {onClear && (
          <button
            onClick={onClear}
            disabled={!hasContent}
            className="inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed self-end sm:self-auto"
            title="Clear all text"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}
