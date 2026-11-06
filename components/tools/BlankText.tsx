'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  Copy,
  Check,
  Share2,
  Trash2,
  Download,
  Eye,
  ShieldCheck,
  Gamepad2,
  MessageCircle,
  Send,
  Sparkles,
  Sliders,
  Search,
  Code,
  Terminal,
  Eraser,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import ActionPanel from '../ui/ActionPanel';
import MobileStickyActionBar from '../ui/MobileStickyActionBar';

export interface BlankTextProps {
  locale?: string;
  ui?: Record<string, any>;
}

// Unicode standards
const CHAR_MAP: Record<string, { char: string; code: string; name: string; desc: string }> = {
  braille: {
    char: '\u2800',
    code: 'U+2800',
    name: 'Braille Pattern Blank',
    desc: 'Best for WhatsApp, Instagram, Telegram & TikTok'
  },
  hangul: {
    char: '\u3164',
    code: 'U+3164',
    name: 'Hangul Filler',
    desc: 'Best for Free Fire, PUBG, Discord & Roblox Nicknames'
  },
  halfwidth_hangul: {
    char: '\uFFA0',
    code: 'U+FFA0',
    name: 'Halfwidth Hangul Filler',
    desc: 'Best when your invisible name is already taken'
  },
  zwsp: {
    char: '\u200B',
    code: 'U+200B',
    name: 'Zero Width Space',
    desc: '0-pixel stealth space for watermarking & split breaks'
  },
  nbsp: {
    char: '\u00A0',
    code: 'U+00A0',
    name: 'Non-Breaking Space',
    desc: 'Web layouts & preventing text line wraps'
  }
};

// 24 Master Unicode Whitespace & Filler Directory
const MASTER_UNICODE_CHARACTERS = [
  { glyph: '⠀', code: 'U+2800', name: 'Braille Pattern Blank', html: '&#10240;', hex: '0x2800', alt: 'Alt+10240', char: '\u2800', bestFor: 'WhatsApp, Instagram & TikTok empty message bubbles' },
  { glyph: 'ㅤ', code: 'U+3164', name: 'Hangul Filler', html: '&#12644;', hex: '0x3164', alt: 'Alt+12644', char: '\u3164', bestFor: 'Free Fire, PUBG, Discord & Roblox invisible names' },
  { glyph: 'ﾠ', code: 'U+FFA0', name: 'Halfwidth Hangul Filler', html: '&#65440;', hex: '0xFFA0', alt: 'Alt+65440', char: '\uFFA0', bestFor: 'Duplicate name bypass (when U+3164 is already taken)' },
  { glyph: 'ᅠ', code: 'U+1160', name: 'Hangul Jungseong Filler', html: '&#4448;', hex: '0x1160', alt: 'Alt+4448', char: '\u1160', bestFor: 'Gaming backup vowel filler' },
  { glyph: '​', code: 'U+200B', name: 'Zero Width Space (ZWSP)', html: '&#8203;', hex: '0x200B', alt: 'Alt+8203', char: '\u200B', bestFor: 'Stealth 0px separation & invisible tracking markers' },
  { glyph: ' ', code: 'U+00A0', name: 'No-Break Space (NBSP)', html: '&#160;', hex: '0x00A0', alt: 'Alt+0160', char: '\u00A0', bestFor: 'Web layouts, typography, preventing word breaks' },
  { glyph: ' ', code: 'U+0020', name: 'Standard Space', html: '&#32;', hex: '0x0020', alt: 'Alt+32', char: ' ', bestFor: 'Normal spacebar (auto-trimmed by chat apps)' },
  { glyph: ' ', code: 'U+2000', name: 'En Quad', html: '&#8192;', hex: '0x2000', alt: 'Alt+8192', char: '\u2000', bestFor: 'Fixed 1/2 em typographical indentation' },
  { glyph: ' ', code: 'U+2001', name: 'Em Quad', html: '&#8193;', hex: '0x2001', alt: 'Alt+8193', char: '\u2001', bestFor: 'Fixed 1 em full typographical space' },
  { glyph: ' ', code: 'U+2002', name: 'En Space', html: '&#8194;', hex: '0x2002', alt: 'Alt+8194', char: '\u2002', bestFor: 'Typography en width space' },
  { glyph: ' ', code: 'U+2003', name: 'Em Space', html: '&#8195;', hex: '0x2003', alt: 'Alt+8195', char: '\u2003', bestFor: 'Full em width paragraph indent' },
  { glyph: ' ', code: 'U+2004', name: 'Three-Per-Em Space', html: '&#8196;', hex: '0x2004', alt: 'Alt+8196', char: '\u2004', bestFor: '1/3 of an em typography space' },
  { glyph: ' ', code: 'U+2005', name: 'Four-Per-Em Space', html: '&#8197;', hex: '0x2005', alt: 'Alt+8197', char: '\u2005', bestFor: '1/4 of an em typography space' },
  { glyph: ' ', code: 'U+2006', name: 'Six-Per-Em Space', html: '&#8198;', hex: '0x2006', alt: 'Alt+8198', char: '\u2006', bestFor: '1/6 of an em typography space' },
  { glyph: ' ', code: 'U+2007', name: 'Figure Space', html: '&#8199;', hex: '0x2007', alt: 'Alt+8199', char: '\u2007', bestFor: 'Same width as tabular numbers in financial tables' },
  { glyph: ' ', code: 'U+2008', name: 'Punctuation Space', html: '&#8200;', hex: '0x2008', alt: 'Alt+8200', char: '\u2008', bestFor: 'Equal to period / comma punctuation width' },
  { glyph: ' ', code: 'U+2009', name: 'Thin Space', html: '&#8201;', hex: '0x2009', alt: 'Alt+8201', char: '\u2009', bestFor: 'Math formulas and narrow word gaps' },
  { glyph: ' ', code: 'U+200A', name: 'Hair Space', html: '&#8202;', hex: '0x200A', alt: 'Alt+8202', char: '\u200A', bestFor: 'Extremely thin micro-space for letter kerning' },
  { glyph: ' ', code: 'U+202F', name: 'Narrow No-Break Space', html: '&#8239;', hex: '0x202F', alt: 'Alt+8239', char: '\u202F', bestFor: 'French punctuation & non-breaking units' },
  { glyph: ' ', code: 'U+205F', name: 'Medium Mathematical Space', html: '&#8287;', hex: '0x205F', alt: 'Alt+8287', char: '\u205F', bestFor: 'Mathematical formula typesetting' },
  { glyph: '　', code: 'U+3000', name: 'Ideographic Space', html: '&#12288;', hex: '0x3000', alt: 'Alt+12288', char: '\u3000', bestFor: 'Full-width CJK East Asian character spacing' },
  { glyph: '﻿', code: 'U+FEFF', name: 'Zero Width No-Break (BOM)', html: '&#65279;', hex: '0xFEFF', alt: 'Alt+65279', char: '\uFEFF', bestFor: 'Byte Order Mark & zero-width non-breaking' },
  { glyph: '‎', code: 'U+200E', name: 'Left-To-Right Mark (LRM)', html: '&#8206;', hex: '0x200E', alt: 'Alt+8206', char: '\u200E', bestFor: 'Bi-directional LTR text anchor' },
  { glyph: '‏', code: 'U+200F', name: 'Right-To-Left Mark (RLM)', html: '&#8207;', hex: '0x200F', alt: 'Alt+8207', char: '\u200F', bestFor: 'Bi-directional Arabic / Hebrew anchor' },
  { glyph: '­', code: 'U+00AD', name: 'Soft Hyphen (SHY)', html: '&#173;', hex: '0x00AD', alt: 'Alt+0173', char: '\u00AD', bestFor: 'Invisible hyphen that breaks at line ends' }
];

export default function BlankText({ locale = 'en', ui }: BlankTextProps) {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'generator' | 'detector'>('generator');

  // Generator State
  const [selectedMode, setSelectedMode] = useState<string>('braille');
  const [spacesPerLine, setSpacesPerLine] = useState<number>(1);
  const [numLines, setNumLines] = useState<number>(1);
  const [is2DMode, setIs2DMode] = useState<boolean>(false);
  const [gamerNameInput, setGamerNameInput] = useState<string>('');
  const [manualSelectRef, setManualSelectRef] = useState<HTMLInputElement | null>(null);

  // Testing Sandbox State
  const [testSandboxText, setTestSandboxText] = useState<string>('');

  // Detector State
  const [detectorInput, setDetectorInput] = useState<string>('');

  // Copy feedback state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Quick preset chips
  const PRESET_COUNTS = [1, 3, 5, 10, 50, 100];

  // Generate blank text output
  const generatedText = useMemo(() => {
    const char = CHAR_MAP[selectedMode]?.char || '\u2800';
    const singleLine = char.repeat(Math.max(1, Math.min(spacesPerLine, 500)));
    const linesCount = is2DMode ? Math.max(1, Math.min(numLines, 500)) : 1;
    return Array(linesCount).fill(singleLine).join('\n');
  }, [selectedMode, spacesPerLine, numLines, is2DMode]);

  // Swapped gamer nickname output (replaces normal space with Hangul Filler U+3164)
  const swappedGamerName = useMemo(() => {
    if (!gamerNameInput) return '';
    return gamerNameInput.replace(/ /g, '\u3164');
  }, [gamerNameInput]);

  // Real-time detector analysis
  const detectorStats = useMemo(() => {
    if (!detectorInput) {
      return { totalHidden: 0, items: [], cleaned: '' };
    }

    const hiddenPattern = /[\u200B-\u200D\uFEFF\u2800\u3164\uFFA0\u1160\u00A0\u2000-\u200A\u202F\u205F\u3000\u200E\u200F\u00AD]/g;
    const matches = detectorInput.match(hiddenPattern) || [];

    const charCounts: Record<string, number> = {};
    for (const ch of matches) {
      const hex = 'U+' + ch.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
      charCounts[hex] = (charCounts[hex] || 0) + 1;
    }

    const items = Object.entries(charCounts).map(([code, count]) => {
      const match = MASTER_UNICODE_CHARACTERS.find(u => u.code === code);
      return {
        code,
        name: match?.name || 'Invisible Character',
        count
      };
    });

    const cleaned = detectorInput.replace(hiddenPattern, '');

    return {
      totalHidden: matches.length,
      items,
      cleaned
    };
  }, [detectorInput]);

  // Copy utility with feedback
  const handleCopyText = useCallback(async (textToCopy: string, key = 'main') => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      }
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = textToCopy;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  }, []);

  // WhatsApp 1-tap share
  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(generatedText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Telegram 1-tap share
  const handleTelegramShare = () => {
    const url = `https://t.me/share/url?url=&text=${encodeURIComponent(generatedText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Native Web Share Sheet
  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Blank Text',
          text: generatedText
        });
      } catch {
        // User dismissed
      }
    } else {
      handleCopyText(generatedText, 'main');
    }
  };

  // Download .txt
  const handleDownload = () => {
    const blob = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blank-text-${spacesPerLine}spaces.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Manual Select All
  const handleManualSelectAll = () => {
    if (manualSelectRef) {
      manualSelectRef.focus();
      manualSelectRef.select();
      handleCopyText(CHAR_MAP[selectedMode]?.char || '\u2800', 'manual');
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Tab Navigation: Generator vs Detector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm transition-all ${
              activeTab === 'generator'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Blank Text Generator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('detector')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm transition-all ${
              activeTab === 'detector'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Detector & Cleaner</span>
          </button>
        </div>

        {/* Anti-Ban Guarantee Trust Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Anti-Ban Tested & Unicode Certified</span>
        </div>
      </div>

      {activeTab === 'generator' ? (
        /* ================= TAB 1: BLANK TEXT GENERATOR ================= */
        <div className="space-y-6">
          {/* 4 Persona Hero Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Gaming Card */}
            <div
              onClick={() => setSelectedMode('hangul')}
              className={`cursor-pointer p-4 rounded-3xl border transition-all ${
                selectedMode === 'hangul'
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
                  <Gamepad2 className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                  U+3164
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Gaming Nicknames</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Free Fire, PUBG, Discord, Roblox</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMode('hangul');
                  handleCopyText('\u3164', 'hangul');
                }}
                className="mt-3 w-full py-1.5 px-3 text-xs font-bold rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:opacity-90 flex items-center justify-center gap-1.5"
              >
                {copiedKey === 'hangul' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'hangul' ? 'Copied!' : 'Copy Hangul'}</span>
              </button>
            </div>

            {/* WhatsApp & Social Card */}
            <div
              onClick={() => setSelectedMode('braille')}
              className={`cursor-pointer p-4 rounded-3xl border transition-all ${
                selectedMode === 'braille'
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                  U+2800
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">WhatsApp & Social</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Empty messages, Instagram bio gaps</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMode('braille');
                  handleCopyText('\u2800', 'braille');
                }}
                className="mt-3 w-full py-1.5 px-3 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center gap-1.5"
              >
                {copiedKey === 'braille' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'braille' ? 'Copied!' : 'Copy Braille'}</span>
              </button>
            </div>

            {/* Zero-Width Space Card */}
            <div
              onClick={() => setSelectedMode('zwsp')}
              className={`cursor-pointer p-4 rounded-3xl border transition-all ${
                selectedMode === 'zwsp'
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                  U+200B
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Zero Width (0px)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Stealth split breaks & tracking marks</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMode('zwsp');
                  handleCopyText('\u200B', 'zwsp');
                }}
                className="mt-3 w-full py-1.5 px-3 text-xs font-bold rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:opacity-90 flex items-center justify-center gap-1.5"
              >
                {copiedKey === 'zwsp' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'zwsp' ? 'Copied!' : 'Copy ZWSP'}</span>
              </button>
            </div>

            {/* Name Already Taken Method Card */}
            <div
              onClick={() => setSelectedMode('halfwidth_hangul')}
              className={`cursor-pointer p-4 rounded-3xl border transition-all ${
                selectedMode === 'halfwidth_hangul'
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400">
                  <Code className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                  U+FFA0
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Duplicate Name Method</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Alternative character when invisible name is taken</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMode('halfwidth_hangul');
                  handleCopyText('\uFFA0', 'halfwidth_hangul');
                }}
                className="mt-3 w-full py-1.5 px-3 text-xs font-bold rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:opacity-90 flex items-center justify-center gap-1.5"
              >
                {copiedKey === 'halfwidth_hangul' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'halfwidth_hangul' ? 'Copied!' : 'Copy U+FFA0'}</span>
              </button>
            </div>
          </div>

          {/* Above the Fold: Desktop 12-Column Responsive Workspace */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-6 items-start">
            {/* Left Column: Generator Controls (5 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-600" />
                    <span>Generator Configuration</span>
                  </label>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-medium font-mono">
                    {CHAR_MAP[selectedMode]?.code}
                  </span>
                </div>

                {/* Character Mode Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    Selected Unicode Character
                  </label>
                  <select
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="braille">Braille Pattern Blank (U+2800) – WhatsApp & Social</option>
                    <option value="hangul">Hangul Filler (U+3164) – Free Fire & Gaming</option>
                    <option value="halfwidth_hangul">Halfwidth Hangul Filler (U+FFA0) – Duplicate Bypass</option>
                    <option value="zwsp">Zero Width Space (U+200B) – 0px Stealth</option>
                    <option value="nbsp">Non-Breaking Space (U+00A0) – Web Layouts</option>
                  </select>
                  <p className="text-xs text-slate-400 mt-1.5 italic">
                    {CHAR_MAP[selectedMode]?.desc}
                  </p>
                </div>

                {/* Quick Preset Chips */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Quick Quantity Presets
                    </label>
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                      {spacesPerLine} {spacesPerLine === 1 ? 'Space' : 'Spaces'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_COUNTS.map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setSpacesPerLine(cnt)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          spacesPerLine === cnt
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {cnt}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stepper Controls */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSpacesPerLine(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold flex items-center justify-center text-base"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={spacesPerLine}
                    onChange={(e) => setSpacesPerLine(Math.max(1, Math.min(500, parseInt(e.target.value) || 1)))}
                    className="flex-1 p-2.5 text-center rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setSpacesPerLine(prev => Math.min(500, prev + 1))}
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold flex items-center justify-center text-base"
                  >
                    +
                  </button>
                </div>

                {/* 2D Spaces × Lines Toggle (PlainTextConverter Innovation) */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        2D Matrix: Spaces × Lines
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Create vertical scrolling blank bubbles for WhatsApp
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIs2DMode(!is2DMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        is2DMode ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          is2DMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {is2DMode && (
                    <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-400">Number of Vertical Lines:</span>
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{numLines} Lines</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={100}
                        value={numLines}
                        onChange={(e) => setNumLines(parseInt(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                    </div>
                  )}
                </div>

                {/* Primary Action Button (Min 56px touch target) */}
                <button
                  type="button"
                  onClick={() => handleCopyText(generatedText, 'main')}
                  className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {copiedKey === 'main' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  <span>{copiedKey === 'main' ? 'Copied to Clipboard!' : 'Copy Blank Text (1-Click)'}</span>
                </button>

                {/* Direct 1-Tap Messenger Sharing */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="py-2.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-bold text-xs hover:bg-emerald-100 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleTelegramShare}
                    className="py-2.5 px-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-400 font-bold text-xs hover:bg-sky-100 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Telegram</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Gamer Name Swapper & Manual Fallback (6 cols) */}
            <div className="lg:col-span-6 space-y-4 mt-6 lg:mt-0">
              {/* Gamer Name Space Swapper (font-generator.com innovation) */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4 text-purple-600" />
                    <span>Gamer Name Space Swapper</span>
                  </label>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-medium">
                    Anti-Space Bypass
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Game says <em>&quot;No spaces allowed in nickname&quot;</em>? Type your name below and we swap spaces for invisible Hangul letters:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={gamerNameInput}
                    onChange={(e) => setGamerNameInput(e.target.value)}
                    placeholder="e.g. Shadow Killer"
                    className="flex-1 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                  />
                  <button
                    type="button"
                    disabled={!swappedGamerName}
                    onClick={() => handleCopyText(swappedGamerName, 'gamer')}
                    className="px-4 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    {copiedKey === 'gamer' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedKey === 'gamer' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                {swappedGamerName && (
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 text-xs font-mono text-purple-800 dark:text-purple-300 flex items-center justify-between">
                    <span>Result: {swappedGamerName}</span>
                    <span className="text-[11px] opacity-70">U+3164 injected</span>
                  </div>
                )}
              </div>

              {/* Manual Selection Fallback Container */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-slate-500" />
                    <span>Manual Selection Area (Clipboard Fallback)</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleManualSelectAll}
                    className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    Select All
                  </button>
                </div>
                <div className="relative">
                  <input
                    ref={(el) => setManualSelectRef(el)}
                    readOnly
                    value={CHAR_MAP[selectedMode]?.char || '\u2800'}
                    onClick={handleManualSelectAll}
                    className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-700 text-center font-mono text-lg text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute inset-y-0 left-4 flex items-center text-xs text-slate-400 font-mono pointer-events-none">
                    [
                  </div>
                  <div className="absolute inset-y-0 right-4 flex items-center text-xs text-slate-400 font-mono pointer-events-none">
                    ]
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 text-center">
                  Click inside the brackets or tap &quot;Select All&quot; if your browser blocks automatic clipboard permissions.
                </p>
              </div>

              {/* Live Test Sandbox Textarea */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Live Testing Sandbox (Paste Here to Test)</span>
                  </label>
                  {testSandboxText && (
                    <button
                      type="button"
                      onClick={() => setTestSandboxText('')}
                      className="text-xs text-rose-500 font-medium hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>
                <textarea
                  value={testSandboxText}
                  onChange={(e) => setTestSandboxText(e.target.value)}
                  placeholder="Paste your copied invisible text here to verify..."
                  rows={3}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span>Length: {testSandboxText.length} characters</span>
                  <span>{testSandboxText.length > 0 ? '✅ Verified in Memory' : 'Ready for test'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ================= TAB 2: DETECTOR & CLEANER ================= */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                <span>Zero-Width & Invisible Character Scanner</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Paste any suspect text to detect hidden tracking watermarks, zero-width spaces, or Hangul fillers.
              </p>
            </div>
            {detectorInput && (
              <button
                type="button"
                onClick={() => setDetectorInput('')}
                className="text-xs text-rose-500 font-semibold hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Input</span>
              </button>
            )}
          </div>

          <textarea
            value={detectorInput}
            onChange={(e) => setDetectorInput(e.target.value)}
            placeholder="Paste text here to inspect and clean hidden invisible characters..."
            rows={6}
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Scanner Analysis Output */}
          {detectorInput && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Scan Results:
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    detectorStats.totalHidden > 0
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                      : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {detectorStats.totalHidden > 0
                    ? `⚠️ Found ${detectorStats.totalHidden} Hidden Characters`
                    : '✅ Clean Text (0 Hidden Characters)'}
                </span>
              </div>

              {detectorStats.items.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {detectorStats.items.map((item) => (
                    <div
                      key={item.code}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5 shadow-xs"
                    >
                      <span className="font-mono text-rose-500 font-bold">{item.code}</span>
                      <span>{item.name}</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold">
                        ×{item.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons for Cleaning */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleCopyText(detectorStats.cleaned, 'cleaned')}
                  disabled={detectorStats.totalHidden === 0}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  {copiedKey === 'cleaned' ? <Check className="w-4 h-4" /> : <Eraser className="w-4 h-4" />}
                  <span>{copiedKey === 'cleaned' ? 'Cleaned Text Copied!' : 'Clean & Copy Clean Text'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= MASTER 24-ROW UNICODE REFERENCE TABLE ================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-600" />
              <span>Master Unicode Whitespace & Invisible Character Directory</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Complete reference with Code Points, HTML Entities, Windows Alt-Codes, and recommended use cases.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-3">Character</th>
                <th className="py-3 px-3">Unicode</th>
                <th className="py-3 px-3">Name</th>
                <th className="py-3 px-3">HTML Entity</th>
                <th className="py-3 px-3">Windows Alt-Code</th>
                <th className="py-3 px-3">Best For / Recommended Use</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {MASTER_UNICODE_CHARACTERS.map((charItem) => (
                <tr key={charItem.code} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-center bg-slate-50/50 dark:bg-slate-950/50 rounded-lg">
                    [{charItem.glyph}]
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {charItem.code}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {charItem.name}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500 dark:text-slate-400">
                    {charItem.html}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-purple-600 dark:text-purple-400 font-semibold">
                    {charItem.alt}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400 max-w-xs">
                    {charItem.bestFor}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleCopyText(charItem.char, charItem.code)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 font-bold text-[11px] transition-colors"
                    >
                      {copiedKey === charItem.code ? 'Copied!' : 'Copy'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= DEVELOPER INTEGRATION SNIPPETS ================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-500" />
          <span>Developer Integration Snippets</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Drop-in code snippets to embed invisible characters in JavaScript, Python, and HTML:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs space-y-1">
            <span className="text-slate-500 font-bold block">// JavaScript</span>
            <span className="text-blue-400 block">const hangul = &quot;\u3164&quot;;</span>
            <span className="text-emerald-400 block">const braille = &quot;\u2800&quot;;</span>
            <span className="text-purple-400 block">const zwsp = &quot;\u200B&quot;;</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs space-y-1">
            <span className="text-slate-500 font-bold block"># Python</span>
            <span className="text-blue-400 block">hangul = &quot;\u3164&quot;</span>
            <span className="text-emerald-400 block">braille = &quot;\u2800&quot;</span>
            <span className="text-purple-400 block">zwsp = &quot;\u200b&quot;</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs space-y-1">
            <span className="text-slate-500 font-bold block">&lt;!-- HTML Entities --&gt;</span>
            <span className="text-blue-400 block">&amp;#12644; &lt;!-- Hangul --&gt;</span>
            <span className="text-emerald-400 block">&amp;#10240; &lt;!-- Braille --&gt;</span>
            <span className="text-purple-400 block">&amp;#8203; &lt;!-- ZWSP --&gt;</span>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <MobileStickyActionBar
        content={generatedText}
        onShare={handleNativeShare}
        onClear={() => {
          setSpacesPerLine(1);
          setGamerNameInput('');
          setTestSandboxText('');
        }}
        countLabel={`${spacesPerLine} Space${spacesPerLine > 1 ? 's' : ''}`}
      />
    </div>
  );
}
