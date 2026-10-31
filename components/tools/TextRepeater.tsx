'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import ActionPanel from '../ui/ActionPanel';
import MobileStickyActionBar from '../ui/MobileStickyActionBar';

export interface TextRepeaterProps {
  locale?: string;
  ui?: Record<string, any>;
}

export default function TextRepeater({ ui }: TextRepeaterProps) {
  const [text, setText] = useState<string>('Love you ❤️');
  const [repetitions, setRepetitions] = useState<number>(100);
  const [separatorType, setSeparatorType] = useState<string>('newline');
  const [customSeparator, setCustomSeparator] = useState<string>(' | ');
  const [includeLineNumbers, setIncludeLineNumbers] = useState<boolean>(false);

  const getEffectiveSeparator = useCallback(() => {
    switch (separatorType) {
      case 'newline': return '\n';
      case 'space': return ' ';
      case 'comma': return ', ';
      case 'period': return '. ';
      case 'none': return '';
      case 'custom': return customSeparator;
      default: return '\n';
    }
  }, [separatorType, customSeparator]);

  const repeatedText = useMemo(() => {
    if (!text || repetitions <= 0) return '';
    const count = Math.min(Math.max(1, repetitions), 10000);
    const sep = getEffectiveSeparator();

    if (includeLineNumbers) {
      const lines: string[] = [];
      for (let i = 1; i <= count; i++) {
        lines.push(`${i}. ${text}`);
      }
      return lines.join(sep);
    }

    // Fast in-memory array allocation
    return new Array(count).fill(text).join(sep);
  }, [text, repetitions, getEffectiveSeparator, includeLineNumbers]);

  const stats = useMemo(() => {
    const chars = repeatedText.length;
    const words = repeatedText ? repeatedText.trim().split(/\s+/).filter(Boolean).length : 0;
    const kb = (new Blob([repeatedText]).size / 1024).toFixed(1);
    return [
      { label: 'Words', value: words.toLocaleString() },
      { label: 'Characters', value: chars.toLocaleString() },
      { label: 'Memory Size', value: `${kb} KB` },
      { label: 'Speed', value: '< 2ms' },
    ];
  }, [repeatedText]);

  return (
    <div className="w-full">
      {/* Responsive Master Workspace: 2-Column Desktop (Above-the-Fold) & 1-Column Native Mobile App */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
        
        {/* Left Column: Input, 1-Click Viral Combos & Controls (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Input Header & Character Counter */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {ui?.inputLabel || 'Text or Emojis to Repeat'}
              </label>
              <span className="text-[11px] font-mono font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
                {text.length} chars
              </span>
            </div>

            {/* Input Textarea */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={ui?.inputPlaceholder || 'Type your message, words, or emoji...'}
              rows={3}
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
            />

            {/* Quick 1-Click Viral Combos (Horizontally swipeable on mobile) */}
            <div className="space-y-1.5 pt-0.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                <span>⚡ Viral 1-Click:</span>
              </div>
              <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
                {[
                  { label: '🔥 100x Fire', text: '🔥 Fire!', count: 100, sep: 'newline' },
                  { label: '❤️ 1000x Hearts', text: '❤️ Love You', count: 1000, sep: 'space' },
                  { label: '🚀 50x Boost', text: '🚀 To The Moon!', count: 50, sep: 'newline' },
                  { label: '💬 WhatsApp Spam', text: 'Hey, wake up! 😴', count: 100, sep: 'newline' }
                ].map((combo) => (
                  <button
                    key={combo.label}
                    type="button"
                    onClick={() => {
                      setText(combo.text);
                      setRepetitions(combo.count);
                      setSeparatorType(combo.sep);
                    }}
                    className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-900/60 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-xs active:scale-95 whitespace-nowrap flex-shrink-0"
                  >
                    {combo.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Fill Pills (Horizontally swipeable on mobile) */}
            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
              <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap flex-shrink-0">{ui?.quickFill || 'Quick Fill:'}</span>
              {['❤️ Love You', '🙏 I am Sorry', '🎉 Happy Birthday!', '🚀 Let\'s Go!', '✨ Awesome'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setText(preset)}
                  className="text-xs font-medium px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors active:scale-95 whitespace-nowrap flex-shrink-0"
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Configuration Box */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-3.5">
              
              {/* Repetitions with Mobile Stepper Buttons */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {ui?.repetitionLabel || 'Number of Repetitions'}
                  </label>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                    {repetitions.toLocaleString()}x
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setRepetitions(prev => Math.max(1, prev - 10))}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors flex-shrink-0 active:scale-95 text-xs select-none"
                    title="-10"
                    aria-label="Decrease by 10"
                  >
                    -10
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={repetitions}
                    onChange={(e) => setRepetitions(Math.max(1, Math.min(10000, Number(e.target.value) || 1)))}
                    className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 dark:text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => setRepetitions(prev => Math.min(10000, prev + 10))}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors flex-shrink-0 active:scale-95 text-xs select-none"
                    title="+10"
                    aria-label="Increase by 10"
                  >
                    +10
                  </button>
                </div>

                {/* Quick Count Chips (Horizontally swipeable on mobile) */}
                <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5 mt-2">
                  {[10, 50, 100, 500, 1000, 5000].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRepetitions(num)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all whitespace-nowrap flex-shrink-0 ${
                        repetitions === num
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                      }`}
                    >
                      {num}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Separators */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {ui?.separatorLabel || 'Separator Between Repeats'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2">
                  {[
                    { id: 'newline', label: 'New Line (Enter)' },
                    { id: 'space', label: 'Space (" ")' },
                    { id: 'comma', label: 'Comma (", ")' },
                    { id: 'period', label: 'Period (". ")' },
                    { id: 'none', label: 'No Separator' },
                    { id: 'custom', label: 'Custom...' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSeparatorType(s.id)}
                      className={`text-[11px] font-bold py-1.5 px-2 rounded-xl border text-center transition-colors ${
                        separatorType === s.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                {separatorType === 'custom' && (
                  <input
                    type="text"
                    value={customSeparator}
                    onChange={(e) => setCustomSeparator(e.target.value)}
                    placeholder={ui?.customSeparatorPlaceholder || 'Enter custom separator...'}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
                  />
                )}

                {/* Line Numbers Toggle */}
                <label className="flex items-center space-x-2 pt-0.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeLineNumbers}
                    onChange={(e) => setIncludeLineNumbers(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700"
                  />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {ui?.lineNumbers || 'Add line numbers (1, 2, 3...)'}
                  </span>
                </label>
              </div>

            </div>

          </div>
        </div>

        {/* Right Column: Live Output Preview, Stats & Primary Action Panel (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-3 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {ui?.outputLabel || 'Repeated Output Preview'}
                </span>
              </div>
              <div className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                ⚡ Instant Client-Side
              </div>
            </div>

            {/* Output Editor Textarea - Balanced Desktop Height */}
            <div className="relative flex-1 min-h-[260px] lg:min-h-[320px] flex flex-col">
              <textarea
                readOnly
                value={repeatedText}
                placeholder={ui?.outputPlaceholder || 'Your repeated output will appear here automatically...'}
                className="w-full flex-1 bg-slate-950 text-slate-100 rounded-2xl p-4 text-xs font-mono border border-slate-800 focus:outline-none resize-none selection:bg-blue-600 selection:text-white leading-relaxed"
              />
            </div>
          </div>

          {/* Unified Action Panel with Live Stats & Copy */}
          <ActionPanel
            content={repeatedText}
            onClear={() => setText('')}
            downloadFileName={`repeated-text-${repetitions}x.txt`}
            stats={stats}
            showWhatsAppShare={true}
            className="mt-4"
          />
        </div>

      </div>

      {/* Mobile Sticky Quick Action Bar - Appears dynamically on mobile when output is ready */}
      <MobileStickyActionBar
        content={repeatedText}
        onClear={() => setText('')}
        countLabel={`${repetitions.toLocaleString()}x`}
      />
    </div>
  );
}
