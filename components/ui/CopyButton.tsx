'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md';
}

export default function CopyButton({
  text,
  label = 'Copy to Clipboard',
  copiedLabel = 'Copied!',
  className = '',
  variant = 'primary',
  size = 'md',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!text) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-https or older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('aot-toast', {
            detail: { message: 'Copied to clipboard · Ready to paste' }
          })
        );
        window.dispatchEvent(new CustomEvent('aot-copied'));
      }
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        try { navigator.vibrate(40); } catch (e) {}
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all select-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = size === 'sm' 
    ? 'px-3 py-1.5 text-xs space-x-1.5' 
    : 'px-4 py-2.5 text-sm space-x-2';

  const variantStyles = {
    primary: copied
      ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/30'
      : 'bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-md shadow-blue-500/20',
    secondary: copied
      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-300 dark:border-emerald-800'
      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700',
    ghost: copied
      ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
      : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800',
    icon: copied
      ? 'p-2 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg'
      : 'p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg',
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleCopy}
        disabled={!text}
        title={copied ? copiedLabel : label}
        aria-label={copied ? copiedLabel : label}
        className={`${variantStyles.icon} ${className}`}
      >
        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className={`${baseStyles} ${sizeStyles} ${variantStyles[variant]} ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
