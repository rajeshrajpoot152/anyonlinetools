'use client';

import React, { useState, useMemo } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  Copy, 
  Check, 
  AlertTriangle, 
  Share2, 
  Crown, 
  Flame, 
  Shield, 
  Zap, 
  Dices, 
  Ghost,
  Swords,
  Heart,
  HelpCircle,
  Hash
} from 'lucide-react';
import MobileStickyActionBar from '../ui/MobileStickyActionBar';

// Character maps for instant Unicode styling
const ALPHABET_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const ALPHABET_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const STYLES_MAP = {
  smallCaps: {
    name: 'Small Caps',
    lower: 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ',
    upper: 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ',
  },
  cursive: {
    name: 'Cursive / Script',
    lower: '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃',
    upper: '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩',
  },
  gothic: {
    name: 'Gothic / Old English',
    lower: '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟',
    upper: '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅',
  },
  boldSans: {
    name: 'Bold Clean',
    lower: '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇',
    upper: '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭',
  },
  doubleStruck: {
    name: 'Double Struck',
    lower: '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫',
    upper: '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ',
  },
  bubble: {
    name: 'Circled Bubble',
    lower: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ',
    upper: 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ',
  }
};

const GAME_MODES = [
  { id: 'FREE_FIRE', name: 'Free Fire (Player)', limit: 12, desc: '12-Character strict limit to prevent wasting 390 Diamonds or a Name Change Card.' },
  { id: 'BGMI', name: 'BGMI / PUBG', limit: 14, desc: '14-Character clan roster limit for BGMI and PUBG Mobile.' },
  { id: 'PET', name: 'FF Pet / Companion', limit: 8, desc: '8-Character strict limit for Beaston, Falco, Mr. Waggor, Robo.' },
];

// Clickable Symbol Keyboard Palette (like Font-Generator.com)
const SYMBOL_PALETTE = [
  '꧁', '꧂', '亗', '×͜×', '⚡︎', '♛', '☠', '☬', '༒', '⚔️', '☂', 
  '★', '☆', '✿', '࿐', '᭄', '︻╦╤─', '『', '』', '【', '】', '《', 
  '》', '†', '‡', '•', '°', 'ø', '々', 'ツ', '™', '✓', 'Ⓥ'
];

const FF_COLORS = [
  { name: 'Golden (V-Badge)', hex: 'FFD700', bg: '#f59e0b' },
  { name: 'Garena Red', hex: 'FF0000', bg: '#ef4444' },
  { name: 'Neon Green', hex: '00FF00', bg: '#22c55e' },
  { name: 'Electric Yellow', hex: 'FFFF00', bg: '#eab308' },
  { name: 'Cyan / Sky', hex: '00FFFF', bg: '#06b6d4' },
  { name: 'Deep Blue', hex: '0000FF', bg: '#3b82f6' },
  { name: 'Hot Pink', hex: 'FF00FF', bg: '#ec4899' },
  { name: 'Pure White', hex: 'FFFFFF', bg: '#ffffff' },
];

const PRESET_CATEGORIES = [
  { id: 'all', label: 'All Dynamic Styles' },
  { id: 'vip', label: '👑 VIP & Wings' },
  { id: 'boss', label: '⚡ Attitude & Boss' },
  { id: 'badboy', label: '☠ Bad Boy & Demon' },
  { id: 'duo', label: '❤️ Duo & Matching' },
  { id: 'clan', label: '🛡️ Clan & Guild' },
];

// Top Curated Viral Names (like FFNick & Nickfinder)
const TOP_CURATED_NAMES = [
  { name: 'Bad Boy Smile', styled: '×͜× ㅤB A D B O Y 亗', cat: 'Boy Attitude' },
  { name: 'Raistar Legend', styled: '꧁༒☬RAISTAR☬༒꧂', cat: 'Pro Player' },
  { name: 'Boss Crown', styled: '亗 ᴮᴼˢˢ 亗', cat: 'Boss' },
  { name: 'V-Badge VIP', styled: 'Ⓥ ꧁༺NINJA༻꧂', cat: 'VIP' },
  { name: 'Umbrella Mafia', styled: '☂ ᵞᵀ ᭄ M A F I A', cat: 'Clan Tag' },
  { name: 'Rolex King', styled: '♛ 𝐑𝐎𝐋𝐄𝐗 ♛', cat: 'Attitude' },
  { name: 'Demon Headshot', styled: 'ヘッドショット • 😈', cat: 'One-Tap' },
  { name: 'Sniper God', styled: '︻╦╤─ Ⓥ G O D', cat: 'Sniper' },
  { name: 'Alone Boy', styled: '『ᴀʟᴏɴᴇ』• ʙᴏʏツ', cat: 'Boy Attitude' },
  { name: 'Deadly Joker', styled: '🤡 ᴊ ᴏ ᴋ ᴇ ʀ 亗', cat: 'Attitude' },
  { name: 'Heart Stealer Duo', styled: '꧁༺ ᎻᎬᏒ ᏦᎥᏁᎶ ༻꧂', cat: 'Duo' },
  { name: 'Queen Duo', styled: '꧁༺ ᎻᎥᏕ ᎤᏌᎬᎬᏁ ༻꧂', cat: 'Duo' },
  { name: 'Toxic King', styled: '☠︎ T O X I C ☠︎', cat: 'Attitude' },
  { name: 'Ghost Rider', styled: '👻 G H O S T ࿐', cat: 'Pro Player' },
  { name: 'India Clan Boss', styled: '༄ᶦᶰᵈ᭄✿G O D࿐', cat: 'Clan Tag' },
  { name: 'White444 Style', styled: '⚡︎ W H I T E ⚡︎', cat: 'Pro Player' },
];

const RANDOM_NICK_PRESETS = [
  'RASTAR', 'NINJA', 'KILLER', 'ROLEX', 'WHITE444', 'MAFIA', 'LEGEND', 'BADBOY', 'SHADOW', 'SNIPER', 'TITAN', 'DEMON'
];

interface NicknameCard {
  id: string;
  category: string;
  name: string;
  styled: string;
}

export default function FreeFireNicknameStyle() {
  const [inputText, setInputText] = useState('RASTAR');
  const [selectedGameMode, setSelectedGameMode] = useState('FREE_FIRE');
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'generator' | 'curated' | 'space'>('generator');

  // Bio Signature Builder State
  const [bioText, setBioText] = useState('OFFICIAL PROFILE');
  const [selectedHex, setSelectedHex] = useState('FFD700');
  const [isBold, setIsBold] = useState(true);
  const [isCenter, setIsCenter] = useState(true);
  const [isItalic, setIsItalic] = useState(false);

  // Helper to apply font transform
  const transformText = (text: string, styleKey: keyof typeof STYLES_MAP): string => {
    const style = STYLES_MAP[styleKey];
    return text.split('').map(char => {
      const lowerIdx = ALPHABET_LOWER.indexOf(char);
      if (lowerIdx !== -1) return style.lower[lowerIdx] || char;
      const upperIdx = ALPHABET_UPPER.indexOf(char);
      if (upperIdx !== -1) return style.upper[upperIdx] || char;
      return char;
    }).join('');
  };

  const activeMode = GAME_MODES.find(m => m.id === selectedGameMode) || GAME_MODES[0];
  const charLength = inputText.length;
  const isOverLimit = charLength > activeMode.limit;
  const isNearLimit = charLength === activeMode.limit;

  // Insert helper (Clickable Palette, V-Badge, Invisible Space, etc.)
  const handleInsert = (symbol: string) => {
    setInputText(prev => prev + symbol);
  };

  // Randomize preset
  const handleRandomize = () => {
    const randomName = RANDOM_NICK_PRESETS[Math.floor(Math.random() * RANDOM_NICK_PRESETS.length)];
    setInputText(randomName);
  };

  // Generate Nicknames
  const generatedNicknames: NicknameCard[] = useMemo(() => {
    const raw = inputText.trim() || 'NINJA';
    const sc = transformText(raw, 'smallCaps');
    const cur = transformText(raw, 'cursive');
    const got = transformText(raw, 'gothic');
    const bs = transformText(raw, 'boldSans');
    const ds = transformText(raw, 'doubleStruck');

    const list: NicknameCard[] = [
      // VIP & Wings
      { id: 'vip-1', category: 'vip', name: 'Classic Wings', styled: `꧁༺${sc}༻꧂` },
      { id: 'vip-2', category: 'vip', name: 'Golden V-Badge Wings', styled: `Ⓥ ꧁༺${raw}༻꧂` },
      { id: 'vip-3', category: 'vip', name: 'Crown King', styled: `亗 ${bs} 亗` },
      { id: 'vip-4', category: 'vip', name: 'Raistar Legend', styled: `꧁༒☬${cur}☬༒꧂` },
      { id: 'vip-5', category: 'vip', name: 'Double Cross', styled: `⚔️ ༒ ${sc} ༒ ⚔️` },
      { id: 'vip-6', category: 'vip', name: 'Royal Knight', styled: `༺₦¢༻ ${bs}` },
      { id: 'vip-7', category: 'vip', name: 'Phoenix Flare', styled: `꧁༒☬${raw}☬༒꧂` },

      // Boss & Attitude
      { id: 'boss-1', category: 'boss', name: 'Lightning Boss', styled: `⚡︎ ᴮᴼˢˢ ⚡︎ ${sc}` },
      { id: 'boss-2', category: 'boss', name: 'Rolex Crown', styled: `♛ 𝐑𝐎𝐋𝐄𝐗 ♛ ${raw}` },
      { id: 'boss-3', category: 'boss', name: 'Umbrella Style', styled: `☂ ᵞᵀ ᭄ ${bs}` },
      { id: 'boss-4', category: 'boss', name: 'Pro Killer', styled: `Ⓥ ×͜× ${sc}` },
      { id: 'boss-5', category: 'boss', name: 'God Level', styled: `༺Leͥgeͣnͫd༻ ${raw}` },
      { id: 'boss-6', category: 'boss', name: 'Attitude King', styled: `★ ᏦᎥᏁᎶ ★ ${sc}` },
      { id: 'boss-7', category: 'boss', name: 'Sniper Hunter', styled: `︻╦╤─ ${bs}` },

      // Bad Boy & Demon
      { id: 'bb-1', category: 'badboy', name: 'Alone Boy Smile', styled: `×͜×ㅤ${sc} 亗` },
      { id: 'bb-2', category: 'badboy', name: 'Shark Bad Boy', styled: `『sʜʀᴋ』•${raw}ツ` },
      { id: 'bb-3', category: 'badboy', name: 'Death Skull', styled: `☠ ☬ ${got} ☬ ☠` },
      { id: 'bb-4', category: 'badboy', name: 'Dark Demon', styled: `😈 𝕯𝖊𝖒𝖔𝖓 😈 ${sc}` },
      { id: 'bb-5', category: 'badboy', name: 'One Shot God', styled: `ヘッドショット • ${raw}` },
      { id: 'bb-6', category: 'badboy', name: 'Mafia Leader', styled: `『Mᴀғɪᴀ』• ${bs}` },
      { id: 'bb-7', category: 'badboy', name: 'Toxic Joker', styled: `🤡 ${ds} 亗` },

      // Duo & Matching
      { id: 'duo-1', category: 'duo', name: 'Her King Duo', styled: `꧁༺ ᎻᎬᏒ ᏦᎥᏁᎶ ༻꧂` },
      { id: 'duo-2', category: 'duo', name: 'His Queen Duo', styled: `꧁༺ ᎻᎥᏕ ᎤᏌᎬᎬᏁ ༻꧂` },
      { id: 'duo-3', category: 'duo', name: 'Heart Beats', styled: `❤️ ${cur} ❤️` },
      { id: 'duo-4', category: 'duo', name: 'Soulmate Pair', styled: `∞ ѕσυℓ • ${raw}` },
      { id: 'duo-5', category: 'duo', name: 'Romeo Juliet', styled: `💘 ${sc} 💘` },

      // Clan & Guild
      { id: 'clan-1', category: 'clan', name: 'Guild Bracket 1', styled: `『GLD』ㅤ${sc}` },
      { id: 'clan-2', category: 'clan', name: 'Spaced Esports Tag', styled: `[ABC]ㅤ${raw}` },
      { id: 'clan-3', category: 'clan', name: 'Team RRQ Style', styled: `RRQ • ${bs} 亗` },
      { id: 'clan-4', category: 'clan', name: 'EVOS Esports', styled: `EVOS ϟ ${sc}` },
      { id: 'clan-5', category: 'clan', name: 'Star Squad', styled: `☆ ᭄ ${cur} ࿐` },
      { id: 'clan-6', category: 'clan', name: 'India Clan Tag', styled: `༄ᶦᶰᵈ᭄✿${raw}࿐` },
    ];

    return list;
  }, [inputText]);

  // Filtered list
  const filteredNicknames = useMemo(() => {
    if (activeCategory === 'all') return generatedNicknames;
    return generatedNicknames.filter(item => item.category === activeCategory);
  }, [generatedNicknames, activeCategory]);

  // Clipboard copy utility
  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
      
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('aot-toast', {
            detail: { message: 'Copied to Clipboard! Ready to paste in Free Fire ✅' }
          })
        );
      }
    }
  };

  // WhatsApp Share utility
  const handleWhatsAppShare = (text: string) => {
    const url = `https://wa.me/?text=${encodeURIComponent(`Check out my new Free Fire nickname style: ${text}\nGenerated via AnyOnlineTools: https://anyonlinetools.com/free-fire-nickname-style/`)}`;
    window.open(url, '_blank');
  };

  // Generated Bio Code
  const generatedBioCode = `${isBold ? '[b]' : ''}${isItalic ? '[i]' : ''}${isCenter ? '[c]' : ''}[${selectedHex}]${bioText}`;

  return (
    <div className="space-y-10">
      
      {/* Top Navigation Tabs (Generator vs Top 100 Viral vs Invisible Space Callout) */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('generator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'generator'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Interactive Generator</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('curated')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'curated'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Crown className="w-4 h-4 text-amber-400" />
          <span>Top Viral FF Names</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('space')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'space'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Hash className="w-4 h-4" />
          <span>Invisible Space (U+3164)</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* 1. NICKNAME GENERATOR TAB */}
      {/* ============================================================== */}
      {activeTab === 'generator' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
          
          {/* Game Mode Selector Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                Select Game Mode & Character Ceiling:
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {activeMode.desc}
              </span>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
              {GAME_MODES.map(mode => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setSelectedGameMode(mode.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedGameMode === mode.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {mode.name} ({mode.limit} Chars)
                </button>
              ))}
            </div>
          </div>

          {/* Input Box & Live Character Counter */}
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter nickname (e.g. RASTAR, BOSS, KILLER)..."
                maxLength={30}
                className={`w-full text-base sm:text-lg font-semibold py-4 pl-4 pr-32 rounded-2xl bg-slate-50 dark:bg-slate-950 border transition-all focus:outline-none focus:ring-2 ${
                  isOverLimit
                    ? 'border-red-500 text-red-600 dark:text-red-400 focus:ring-red-500'
                    : isNearLimit
                    ? 'border-amber-500 text-slate-900 dark:text-white focus:ring-amber-500'
                    : 'border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-blue-500'
                }`}
              />
              
              {/* Right Input Tools (Dice Randomizer + Live Counter) */}
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomize}
                  title="Randomize Nickname Idea"
                  className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
                >
                  <Dices className="w-4 h-4" />
                </button>
                <span className={`text-xs font-mono font-bold px-2 py-1 rounded-lg ${
                  isOverLimit
                    ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
                    : isNearLimit
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                    : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                }`}>
                  {charLength}/{activeMode.limit}
                </span>
              </div>
            </div>

            {/* 390 Diamonds Safe Guard Warning Banner */}
            {isOverLimit && (
              <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-start gap-2.5 text-xs text-red-700 dark:text-red-300">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Exceeds {activeMode.name} Limit ({activeMode.limit} Chars)! </span>
                  Free Fire will cut off or reject names longer than {activeMode.limit} characters. Shorten your input to prevent wasting 390 Diamonds or a Name Change Card.
                </div>
              </div>
            )}

            {/* Clickable Free Fire Symbol Palette (Inspired by Font-Generator.com) */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Gamepad2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Clickable Free Fire Symbol Palette (Tap to Insert):</span>
                </span>
                <button
                  type="button"
                  onClick={() => setInputText('')}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear Input
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80">
                {SYMBOL_PALETTE.map((sym, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleInsert(sym)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-95 shadow-2xs"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick 1-Tap Inserts */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 mr-1">
                ⚡ Quick Inserts:
              </span>
              <button
                type="button"
                onClick={() => handleInsert('Ⓥ ')}
                className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold flex items-center gap-1 transition-all"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>+ V-Badge (Ⓥ)</span>
              </button>
              <button
                type="button"
                onClick={() => handleInsert('ㅤ')}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1 transition-all"
                title="Hangul Filler U+3164 Invisible Space"
              >
                <span>+ FF Space (U+3164)</span>
              </button>
              <button
                type="button"
                onClick={() => handleInsert('亗 ')}
                className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold transition-all"
              >
                + Boss Crown (亗)
              </button>
              <button
                type="button"
                onClick={() => handleInsert('⚡︎ ')}
                className="px-2.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold transition-all"
              >
                + Lightning (⚡︎)
              </button>
            </div>
          </div>

          {/* Category Filter Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-2 scrollbar-none border-t border-slate-100 dark:border-slate-800">
            {PRESET_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Generated Nicknames Cards Grid with Individual Length Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {filteredNicknames.map((item) => {
              const isCopied = copiedKey === item.id;
              const itemLength = item.styled.length;
              const isItemSafe = itemLength <= activeMode.limit;

              return (
                <div
                  key={item.id}
                  className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-blue-400 dark:hover:border-blue-500 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      {item.name}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      isItemSafe
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50'
                        : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/50'
                    }`}>
                      {itemLength}/{activeMode.limit} chars
                    </span>
                  </div>

                  {/* Nickname Output Text */}
                  <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white break-words select-all min-h-[32px] flex items-center">
                    {item.styled}
                  </div>

                  {/* Card Action Bar: Copy & WhatsApp Share */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                    <button
                      type="button"
                      onClick={() => handleWhatsAppShare(item.styled)}
                      className="p-2 rounded-xl text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                      title="Share with Free Fire Clan on WhatsApp"
                      aria-label="Share on WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopy(item.styled, item.id)}
                      className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isCopied
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. TOP CURATED VIRAL NAMES TAB (Like FFNick & Nickfinder) */}
      {/* ============================================================== */}
      {activeTab === 'curated' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Crown className="w-6 h-6 text-amber-500" />
              <span>Top Curated Free Fire Viral Names (Ready-Made)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Top trending names used by Grandmaster players, esports streamers, and top guild leaders. Click any card to copy instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {TOP_CURATED_NAMES.map((preset, index) => {
              const isCopied = copiedKey === `preset-${index}`;
              return (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-amber-400 transition-all"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span>{preset.cat}</span>
                    <span className="font-mono text-amber-500">#{index + 1}</span>
                  </div>

                  <div className="text-base font-bold text-slate-900 dark:text-white font-mono select-all">
                    {preset.styled}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                    <button
                      type="button"
                      onClick={() => handleWhatsAppShare(preset.styled)}
                      className="text-emerald-600 dark:text-emerald-400 hover:underline text-xs flex items-center gap-1"
                    >
                      <Share2 className="w-3 h-3" /> Share
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopy(preset.styled, `preset-${index}`)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                        isCopied ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. DEDICATED INVISIBLE SPACE (U+3164) CALLOUT BOX */}
      {/* ============================================================== */}
      {activeTab === 'space' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <Hash className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Free Fire Invisible Space Character (Hangul Filler U+3164)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Normal keyboard spaces are rejected or deleted by Free Fire. Use the special Unicode Hangul Filler <code className="text-blue-500">U+3164</code> to insert blank spaces between words or create a completely invisible nickname.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Single Invisible Space Character (U+3164):
              </span>
              <div className="font-mono text-sm bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                [ㅤ] &lt;-- Blank Character Ready to Copy
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopy('ㅤ', 'space-char')}
              className={`px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-md ${
                copiedKey === 'space-char'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {copiedKey === 'space-char' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedKey === 'space-char' ? 'Invisible Space Copied!' : 'Copy Invisible Space'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-400 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">1. Clan Tag Spacing</span>
              Paste between your clan tag and player name: e.g. <code className="font-mono text-blue-500">『GLD』ㅤRASTAR</code>.
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">2. Spaced Letters</span>
              Create an aesthetic spaced name like <code className="font-mono text-blue-500">BㅤOㅤSㅤS</code>.
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">3. Fully Invisible Name</span>
              Paste 3 to 4 invisible space characters to make your name completely blank in the match killfeed!
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. FF BIO & SIGNATURE COLOR CODE BUILDER */}
      {/* ============================================================== */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <span>Free Fire Bio & Profile Color Signature Builder</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Generate hex-colored BBCode tags like <code className="text-amber-500">[b][c][FFFF00]Ⓥ</code> to display a glowing colored signature in your Free Fire profile bio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Signature / Bio Text:
              </label>
              <input
                type="text"
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                maxLength={45}
                placeholder="Enter text (e.g. OFFICIAL PROFILE, HEADSHOT KING)..."
                className="w-full text-sm font-semibold p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Formatting Modifiers */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                BBCode Modifiers:
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setIsBold(!isBold)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isBold
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  [b] Bold
                </button>
                <button
                  type="button"
                  onClick={() => setIsCenter(!isCenter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isCenter
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  [c] Centered
                </button>
                <button
                  type="button"
                  onClick={() => setIsItalic(!isItalic)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isItalic
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  [i] Italic
                </button>
                <button
                  type="button"
                  onClick={() => setBioText(prev => prev + ' Ⓥ')}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold transition-all"
                >
                  + Add Ⓥ Badge
                </button>
              </div>
            </div>

            {/* Color Palette Chips */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Select Free Fire Hex Color:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {FF_COLORS.map(color => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => setSelectedHex(color.hex)}
                    style={{ backgroundColor: color.bg }}
                    className={`w-9 h-9 rounded-full border-2 transition-transform ${
                      selectedHex === color.hex
                        ? 'border-blue-600 dark:border-white scale-110 shadow-md ring-2 ring-blue-500/30'
                        : 'border-slate-300 dark:border-slate-700 hover:scale-105'
                    }`}
                    title={color.name}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Right Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
                In-Game Signature Live Preview:
              </span>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[120px] flex items-center justify-center text-center shadow-inner">
                <span
                  style={{
                    color: `#${selectedHex}`,
                    fontWeight: isBold ? 'bold' : 'normal',
                    fontStyle: isItalic ? 'italic' : 'normal',
                    textAlign: isCenter ? 'center' : 'left'
                  }}
                  className="text-lg sm:text-xl tracking-wider font-mono drop-shadow-md break-words"
                >
                  {isCenter && bioText ? ` ${bioText} ` : bioText || 'Preview Text'}
                </span>
              </div>
            </div>

            {/* Generated Code & 1-Click Copy */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Copy Code to Paste in FF Bio / Signature:
              </span>
              <div className="flex items-center justify-between gap-2">
                <code className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 truncate max-w-[70%]">
                  {generatedBioCode}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy(generatedBioCode, 'bio')}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  {copiedKey === 'bio' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'bio' ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Nominative Fair Use Disclaimer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed italic">
            <strong>Disclaimer:</strong> AnyOnlineTools is not affiliated with, endorsed, or sponsored by Garena. Free Fire and Garena are registered trademarks of Garena International. This is an independent, 100% free web utility created strictly for gamers to generate aesthetic Unicode text, clan spacers, and profile formatting.
          </p>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <MobileStickyActionBar
        content={inputText ? generatedNicknames[0]?.styled : ''}
        countLabel={`${charLength}/${activeMode.limit} chars`}
      />
    </div>
  );
}
