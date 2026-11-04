'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThumbsUp, ThumbsDown, CheckCircle2, MessageSquare, Star } from 'lucide-react';

export interface ToolFeedbackProps {
  toolTitle: string;
  className?: string;
}

export default function ToolFeedback({ toolTitle, className = '' }: ToolFeedbackProps) {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [mounted, setMounted] = useState(false);

  const storageKey = `aot_feedback_${toolTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === 'yes' || saved === 'no') {
        setFeedback(saved);
      }
    } catch (e) {
      // LocalStorage access restricted in private mode
    }
  }, [storageKey]);

  const handleVote = (vote: 'yes' | 'no') => {
    setFeedback(vote);
    try {
      localStorage.setItem(storageKey, vote);
    } catch (e) {}

    // Dispatch toast notification
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('aot-toast', {
          detail: { 
            message: vote === 'yes' 
              ? 'Thank you! Glad this tool was helpful.' 
              : 'Thank you for your feedback! We are working to improve.' 
          }
        })
      );
    }
  };

  const handleReset = () => {
    setFeedback(null);
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {}
  };

  return (
    <div 
      className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left mb-14 ${className}`}
      aria-label="User Feedback"
    >
      {/* Feedback State Display */}
      {mounted && feedback === 'yes' ? (
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Thank you for your feedback! Helping make AnyOnlineTools better.</span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline transition-colors"
          >
            Change vote
          </button>
        </div>
      ) : mounted && feedback === 'no' ? (
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
            <MessageSquare className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>
              Thank you for the feedback. We are actively improving!{' '}
              <Link href="/contact/" className="text-blue-600 dark:text-blue-400 font-bold underline hover:no-underline">
                Share suggestions
              </Link>
            </span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline transition-colors"
          >
            Change vote
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5">
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              Was this tool helpful to you?
            </span>
            <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-[11px] font-semibold border border-amber-200/50 dark:border-amber-800/50">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>4.9 / 5</span>
              <span className="text-slate-400 dark:text-slate-500 font-normal hidden md:inline">(1,200+ global votes)</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => handleVote('yes')}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-800 text-xs font-bold transition-all active:scale-95"
              title="Yes, this tool was helpful"
              aria-label="Yes, this tool was helpful"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Yes</span>
            </button>

            <button
              type="button"
              onClick={() => handleVote('no')}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-800 text-xs font-bold transition-all active:scale-95"
              title="No, needs improvement"
              aria-label="No, needs improvement"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>No</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
