'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Star,
  Search,
  Sliders,
  Grid,
  List,
  RotateCcw,
  Share2,
  Download,
  Dices,
  Flame,
  Shield,
  Heart,
  Crown,
  Gamepad2,
  Feather,
  Skull,
  Eye,
  Type,
  ArrowRight,
  X
} from 'lucide-react';
import Link from 'next/link';

export interface StylishTextGeneratorProps {
  locale?: string;
  ui?: Record<string, any>;
}

// ---------------------------------------------------------------------------
// UNICODE TRANSFORMATION MAPS & LOGIC
// ---------------------------------------------------------------------------

const ASCII_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ASCII_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const ASCII_DIGITS = '0123456789';

function createCharMap(upperTarget: string[], lowerTarget: string[], digitTarget?: string[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    if (upperTarget[i]) map[ASCII_UPPER[i]] = upperTarget[i];
    if (lowerTarget[i]) map[ASCII_LOWER[i]] = lowerTarget[i];
  }
  if (digitTarget) {
    for (let i = 0; i < 10; i++) {
      if (digitTarget[i]) map[ASCII_DIGITS[i]] = digitTarget[i];
    }
  }
  return map;
}

// 1. Mathematical Sans Bold
const SANS_BOLD_MAP = createCharMap(
  ['𝗔','𝗕','𝗖','𝗗','𝗘','𝗙','𝗚','𝗛','𝗜','𝗝','𝗞','𝗟','𝗠','𝗡','𝗢','𝗣','𝗤','𝗥','𝗦','𝗧','𝗨','𝗩','𝗪','𝗫','𝗬','𝗭'],
  ['𝗮','𝗯','𝗰','𝗱','𝗲','𝗳','𝗴','𝗵','𝗶','𝗷','𝗸','𝗹','𝗺','𝗻','𝗼','𝗽','𝗾','𝗿','𝘀','𝘁','𝘂','𝘃','𝘄','𝘅','𝘆','𝘇'],
  ['𝟬','𝟭','𝟮','𝟯','𝟰','𝟱','𝟲','𝟳','𝟴','𝟵']
);

// 2. Serif Bold
const SERIF_BOLD_MAP = createCharMap(
  ['𝐀','𝐁','𝐂','𝐃','𝐄','𝐅','𝐆','𝐇','𝐈','𝐉','𝐊','𝐋','𝐌','𝐍','𝐎','𝐏','𝐐','𝐑','𝐒','𝐓','𝐔','𝐕','𝐖','𝐗','𝐘','𝐙'],
  ['𝐚','𝐛','𝐜','𝐝','𝐞','𝐟','𝐠','𝐡','𝐢','𝐣','𝐤','𝐥','𝐦','𝐧','𝐨','𝐩','𝐪','𝐫','𝐬','𝐭','𝐮','𝐯','𝐰','𝐱','𝐲','𝐳'],
  ['𝟎','𝟏','𝟐','𝟑','𝟒','𝟓','𝟔','𝟕','𝟖','𝟗']
);

// 3. Sans-Serif Normal
const SANS_NORMAL_MAP = createCharMap(
  ['𝖠','𝖡','𝖢','𝖣','𝖤','𝖥','𝖦','𝖧','𝖨','𝖩','𝖪','𝖫','𝖬','𝖭','𝖮','𝖯','𝖰','𝖱','𝖲','𝖳','𝖴','𝖵','𝖶','𝖷','𝖸','𝖹'],
  ['𝖺','𝖻','𝖼','𝖽','𝖾','𝖿','𝗀','𝗁','𝗂','𝗃','𝗄','𝗅','𝗆','𝗇','𝗈','𝗉','𝗊','𝗋','𝗌','𝗍','𝗎','𝗏','𝗐','𝗑','𝗒','𝗓'],
  ['𝟢','𝟣','𝟤','𝟥','𝟦','𝟧','𝟨','𝟩','𝟪','𝟫']
);

// 4. Mathematical Italic
const SANS_ITALIC_MAP = createCharMap(
  ['𝘈','𝘉','𝘊','𝘋','𝘌','𝘍','𝘎','𝘏','𝘐','𝘑','𝘒','𝘓','𝘔','𝘕','𝘖','𝘗','𝘘','𝘙','𝘚','𝘛','𝘜','𝘝','𝘞','𝘟','𝘠','𝘡'],
  ['𝘢','𝘣','𝘤','𝘥','𝘦','𝘧','𝘨','𝘩','𝘪','𝘫','𝘬','𝘭','𝘮','𝘯','𝘰','𝘱','𝘲','𝘳','𝘴','𝘵','𝘶','𝘷','𝘸','𝘹','𝘺','𝘻']
);

// 5. Sans Bold Italic
const SANS_BOLD_ITALIC_MAP = createCharMap(
  ['𝘼','𝘽','𝘾','𝘿','𝙀','𝙁','𝙂','𝙃','𝙄','𝙅','𝙆','𝙇','𝙈','𝙉','𝙊','𝙋','𝙌','𝙍','𝙎','𝙏','𝙐','𝙑','𝙒','𝙓','𝙔','𝙕'],
  ['𝙖','𝙗','𝙘','𝙙','𝙚','𝙛','𝙜','𝙝','𝙞','𝙟','𝙠','𝙡','𝙢','𝙣','𝙤','𝙥','𝙦','𝙧','𝙨','𝙩','𝙪','𝙫','𝙬','𝙭','𝙮','𝙯']
);

// 6. Script / Cursive Normal
const SCRIPT_NORMAL_MAP = createCharMap(
  ['𝒜','𝐵','𝒞','𝒟','𝐸','𝐹','𝒢','𝐻','𝐼','𝒥','𝒦','𝐿','𝑀','𝒩','𝒪','𝒫','𝒬','𝑅','𝒮','𝒯','𝒰','𝒱','𝒲','𝒳','𝒴','𝒵'],
  ['𝒶','𝒷','𝒸','𝒹','𝑒','𝒻','𝑔','𝒽','𝒾','𝒿','𝓀','𝓁','𝓂','𝓃','𝑜','𝓅','𝓆','𝓇','𝓈','𝓉','𝓊','𝓋','𝓌','𝓍','𝓎','𝓏']
);

// 7. Bold Script / Calligraphy
const SCRIPT_BOLD_MAP = createCharMap(
  ['𝓐','𝓑','𝓒','𝓓','𝓔','𝓕','𝓖','𝓗','𝓘','𝓙','𝓚','𝓛','𝓜','𝓝','𝓞','𝓟','𝓠','𝓡','𝓢','𝓣','𝓤','𝓥','𝓦','𝓧','𝓨','𝓩'],
  ['𝓪','𝓫','𝓬','𝓭','𝓮','𝓯','𝓰','𝓱','𝓲','𝓳','𝓴','𝓵','𝓶','𝓷','𝓸','𝓹','𝓦','𝓻','𝓼','𝓽','𝓾','𝓿','𝔀','𝔁','𝔂','𝔃']
);

// 8. Gothic / Fraktur Normal
const GOTHIC_MAP = createCharMap(
  ['𝔄','𝔅','ℭ','𝔇','𝔈','𝔉','𝔊','ℌ','ℑ','𝔍','𝔎','𝔏','𝔐','𝔑','𝔒','𝔓','𝔔','ℜ','𝔖','𝔗','𝔘','𝔙','𝔚','𝔛','𝔜','ℨ'],
  ['𝔞','𝔟','𝔠','𝔡','𝔢','𝔣','𝔤','𝔥','𝔦','𝔧','𝔨','𝔩','𝔪','𝔫','𝔬','𝔭','𝔮','𝔯','𝔰','𝔱','𝔲','𝔳','𝔴','𝔵','𝔶','𝔩']
);

// 9. Bold Gothic / Dark Fraktur
const GOTHIC_BOLD_MAP = createCharMap(
  ['𝕬','𝕭','𝕮','𝕯','𝕰','𝕱','𝕲','𝕳','𝕴','𝕵','𝕶','𝕷','𝕸','𝕹','𝕺','𝕻','𝕼','𝕽','𝕾','𝕿','𝖀','𝖁','𝖂','𝖃','𝖄','𝖅'],
  ['𝖆','𝖇','𝖈','𝖉','𝖊','𝖋','𝖌','𝖍','𝖎','𝖏','𝖐','𝖑','𝖒','𝖓','𝖔','𝖕','𝖖','𝖗','𝖘','𝖙','𝖚','𝖛','𝖜','𝖝','𝖞','𝖟']
);

// 10. Double-Struck / Blackboard Bold
const DOUBLE_STRUCK_MAP = createCharMap(
  ['𝔸','𝔹','ℂ','𝔻','𝔼','𝔽','𝔾','ℍ','𝕀','𝕁','𝕂','𝕃','𝕄','ℕ','𝕆','ℙ','ℚ','ℝ','𝕊','𝕋','𝕌','𝕍','𝕎','𝕏','𝕐','ℤ'],
  ['𝕒','𝕓','𝕔','𝕕','𝕖','𝕗','𝕘','𝕙','𝕚','𝕛','𝕜','𝕝','𝕞','𝕟','𝕠','𝕡','𝕢','𝕣','𝕤','𝕥','𝕦','𝕧','𝕨','𝕩','𝕪','𝕫'],
  ['𝟘','𝟙','𝟚','𝟛','𝟜','𝟝','𝟞','𝟟','𝟠','𝟡']
);

// 11. Small Capitals
const SMALL_CAPS_MAP = createCharMap(
  ['ᴀ','ʙ','ᴄ','ᴅ','ᴇ','ꜰ','ɢ','ʜ','ɪ','ᴊ','ᴋ','ʟ','ᴍ','ɴ','ᴏ','ᴘ','ǫ','ʀ','ꜱ','ᴛ','ᴜ','ᴠ','ᴡ','x','ʏ','ᴢ'],
  ['ᴀ','ʙ','ᴄ','ᴅ','ᴇ','ꜰ','ɢ','ʜ','ɪ','ᴊ','ᴋ','ʟ','ᴍ','ɴ','ᴏ','ᴘ','ǫ','ʀ','ꜱ','ᴛ','ᴜ','ᴠ','ᴡ','x','ʏ','ᴢ']
);

// 12. Circled / Bubble
const CIRCLED_MAP = createCharMap(
  ['Ⓐ','Ⓑ','Ⓒ','Ⓓ','Ⓔ','Ⓕ','Ⓖ','Ⓗ','Ⓘ','Ⓙ','Ⓚ','Ⓛ','Ⓜ','Ⓝ','Ⓞ','Ⓟ','Ⓠ','Ⓡ','Ⓢ','Ⓣ','Ⓤ','Ⓥ','Ⓦ','Ⓧ','Ⓨ','Ⓩ'],
  ['ⓐ','ⓑ','ⓒ','ⓓ','ⓔ','ⓕ','ⓖ','ⓗ','ⓘ','ⓙ','ⓚ','ⓛ','ⓜ','ⓝ','ⓞ','ⓟ','ⓠ','ⓡ','ⓢ','ⓣ','ⓤ','ⓥ','ⓦ','ⓧ','ⓨ','ⓩ'],
  ['⓪','①','②','③','④','⑤','⑥','⑦','⑧','⑨']
);

// 13. Negative Circled / Black Bubble
const BLACK_BUBBLE_MAP = createCharMap(
  ['🅐','🅑','🅒','🅓','🅔','🅕','🅖','🅗','🅘','🅙','🅚','🅛','🅜','🅝','🅞','🅟','🅠','🅡','🅢','🅣','🅤','🅥','🅦','🅧','🅨','🅩'],
  ['🅐','🅑','🅒','🅓','🅔','🅕','🅖','🅗','🅘','🅙','🅚','🅛','🅜','🅝','🅞','🅟','🅠','🅡','🅢','🅣','🅤','🅥','🅦','🅧','🅨','🅩'],
  ['⓿','➊','➋','➌','➍','➎','➏','➐','➑','➒']
);

// 14. Squared / Boxed
const SQUARED_MAP = createCharMap(
  ['🄰','🄱','🄲','🄳','🄴','🄵','🄶','🄷','🄸','🄹','🄺','🄻','🄼','🄽','🄾','🄿','🅀','🅁','🅂','🅃','🅄','🅅','🅆','🅇','🅈','🅉'],
  ['🄰','🄱','🄲','🄳','🄴','🄵','🄶','🄷','🄸','🄹','🄺','🄻','🄼','🄽','🄾','🄿','🅀','🅁','🅂','🅃','🅄','🅅','🅆','🅇','🅈','🅉']
);

// 15. Negative Squared / Black Boxed
const BLACK_SQUARED_MAP = createCharMap(
  ['🅰','🅱','🅲','🅳','🅴','🅵','🅶','🅷','🅸','🅹','🅺','🅻','🅼','🅽','🅾','🅿','🆀','🆁','🆂','🆃','🆄','🆅','🆆','🆇','🆈','🆉'],
  ['🅰','🅱','🅲','🅳','🅴','🅵','🅶','🅷','🅸','🅹','🅺','🅻','🅼','🅽','🅾','🅿','🆀','🆁','🆂','🆃','🆄','🆅','🆆','🆇','🆈','🆉']
);

// 16. Monospace / Typewriter
const MONOSPACE_MAP = createCharMap(
  ['𝙰','𝙱','𝙲','𝙳','𝙴','𝙵','𝙶','𝙷','𝙸','𝙹','𝙺','𝙻','𝙼','𝙽','𝙾','𝙿','𝚀','𝚁','𝚂','𝚃','𝚄','𝚅','𝚆','𝚇','𝚈','𝚉'],
  ['𝚊','𝚋','𝚌','𝚍','𝚎','𝚏','𝚐','𝚑','𝚒','𝚓','𝚔','𝚕','𝚖','𝚗','𝚘','𝚙','𝚚','𝚛','𝚜','𝚝','𝚞','𝚟','𝚠','𝚡','𝚢','𝚣'],
  ['𝟶','𝟷','𝟸','𝟹','𝟺','𝟻','𝟼','𝟽','𝟾','𝟿']
);

// 17. Vaporwave / Fullwidth
const FULLWIDTH_MAP = createCharMap(
  ['Ａ','Ｂ','Ｃ','Ｄ','Ｅ','Ｆ','Ｇ','Ｈ','Ｉ','Ｊ','Ｋ','Ｌ','Ｍ','Ｎ','Ｏ','Ｐ','Ｑ','Ｒ','Ｓ','Ｔ','Ｕ','Ｖ','Ｗ','Ｘ','Ｙ','Ｚ'],
  ['ａ','ｂ','ｃ','ｄ','ｅ','ｆ','ｇ','ｈ','ｉ','ｊ','ｋ','ｌ','ｍ','ｎ','ｏ','ｐ','ｑ','ｒ','ｓ','ｔ','ｕ','ｖ','ｗ','ｘ','ｙ','ｚ'],
  ['０','１','２','３','４','５','６','７','８','９']
);

// 18. Tiny / Superscript
const SUPERSCRIPT_MAP: Record<string, string> = {
  a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ⁱ', j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ',
  n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', r: 'ʳ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ',
  A: 'ᴬ', B: 'ᴮ', D: 'ᴰ', E: 'ᴱ', G: 'ᴳ', H: 'ᴴ', I: 'ᴵ', J: 'ᴶ', K: 'ᴷ', L: 'ᴸ', M: 'ᴹ', N: 'ᴺ', O: 'ᴼ',
  P: 'ᴾ', R: 'ᴿ', T: 'ᵀ', U: 'ᵁ', V: 'ⱽ', W: 'ᵂ',
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
};

// 19. Inverted / Upside Down Map
const UPSIDE_DOWN_MAP: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ',
  n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  A: '∀', B: '𐐒', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I', J: 'ſ', K: 'ʞ', L: '˥', M: 'W',
  N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ', S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
  '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6',
  '?': '¿', '!': '¡', '.': '˙', ',': '\'', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{'
};

// 20. Leet Speak
const LEET_MAP: Record<string, string> = {
  a: '4', b: '8', e: '3', g: '9', i: '1', l: '1', o: '0', s: '5', t: '7', z: '2',
  A: '4', B: '8', E: '3', G: '9', I: '1', L: '1', O: '0', S: '5', T: '7', Z: '2'
};

function mapChars(text: string, map: Record<string, string>): string {
  let result = '';
  for (const ch of text) {
    result += map[ch] || ch;
  }
  return result;
}

function applyCombining(text: string, combiningChar: string): string {
  let result = '';
  for (const ch of text) {
    result += ch + combiningChar;
  }
  return result;
}

function generateZalgo(text: string): string {
  const ZALGO_UP = ['̍','̎','̄','̅','̿','̑','̆','̐','͒','͗','͑','̇','̈','̊','͂','̓','̈́','͊','͋','͌','̃','̂','̌','͐'];
  const ZALGO_MID = ['̕','̛','̀','́','͘','̡','̢','̧','̨','̴','̵','̶','͜','͝'];
  const ZALGO_DOWN = ['̖','̗','̘','̙','̜','̝','̞','̟','̠','̤','̥','̦','̩','̪','̫','̬','̭','̮','̯','̰','̱','̲','̳'];

  let result = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    result += ch;
    if (ch === ' ') continue;
    // Add 1-2 upper, 1 mid, 1 down mark for stable readability without crashing browser
    result += ZALGO_UP[i % ZALGO_UP.length];
    result += ZALGO_MID[(i + 2) % ZALGO_MID.length];
    result += ZALGO_DOWN[(i + 4) % ZALGO_DOWN.length];
  }
  return result;
}

// ---------------------------------------------------------------------------
// STYLE DEFINITIONS
// ---------------------------------------------------------------------------

export interface FontStyleItem {
  id: string;
  name: string;
  category: 'popular' | 'gaming' | 'cursive' | 'gothic' | 'cute' | 'vip_bio' | 'glitch' | 'other';
  safe: boolean; // 100% universal rendering safe
  badge?: string;
  transform: (text: string) => string;
}

export const FONT_STYLES: FontStyleItem[] = [
  // Top Popular Styles
  {
    id: 'sans-bold',
    name: 'Mathematical Sans Bold',
    category: 'popular',
    safe: true,
    badge: 'Popular',
    transform: (t) => mapChars(t, SANS_BOLD_MAP)
  },
  {
    id: 'serif-bold',
    name: 'Serif Classic Bold',
    category: 'popular',
    safe: true,
    badge: 'Classic',
    transform: (t) => mapChars(t, SERIF_BOLD_MAP)
  },
  {
    id: 'script-bold',
    name: 'Bold Script / Calligraphy',
    category: 'cursive',
    safe: true,
    badge: 'Trending',
    transform: (t) => mapChars(t, SCRIPT_BOLD_MAP)
  },
  {
    id: 'gothic-bold',
    name: 'Dark Gothic / Fraktur Bold',
    category: 'gothic',
    safe: true,
    badge: 'Heavy',
    transform: (t) => mapChars(t, GOTHIC_BOLD_MAP)
  },
  {
    id: 'small-caps',
    name: 'Small Capitals (Tiny Bio)',
    category: 'cute',
    safe: true,
    badge: 'Bio Top',
    transform: (t) => mapChars(t, SMALL_CAPS_MAP)
  },
  {
    id: 'circled',
    name: 'Bubble / Circled Text',
    category: 'cute',
    safe: true,
    transform: (t) => mapChars(t, CIRCLED_MAP)
  },
  {
    id: 'black-bubble',
    name: 'Negative Black Bubble',
    category: 'popular',
    safe: true,
    badge: 'Aesthetic',
    transform: (t) => mapChars(t, BLACK_BUBBLE_MAP)
  },
  {
    id: 'double-struck',
    name: 'Blackboard / Double Struck',
    category: 'popular',
    safe: true,
    transform: (t) => mapChars(t, DOUBLE_STRUCK_MAP)
  },
  {
    id: 'sans-italic',
    name: 'Italic Clean Sans',
    category: 'cursive',
    safe: true,
    transform: (t) => mapChars(t, SANS_ITALIC_MAP)
  },
  {
    id: 'bold-italic',
    name: 'Sans Bold Italic',
    category: 'popular',
    safe: true,
    transform: (t) => mapChars(t, SANS_BOLD_ITALIC_MAP)
  },
  {
    id: 'script-normal',
    name: 'Cursive Handwriting',
    category: 'cursive',
    safe: true,
    transform: (t) => mapChars(t, SCRIPT_NORMAL_MAP)
  },
  {
    id: 'gothic-normal',
    name: 'Old English / Fraktur',
    category: 'gothic',
    safe: true,
    transform: (t) => mapChars(t, GOTHIC_MAP)
  },
  {
    id: 'squared',
    name: 'Squared / Boxed Letters',
    category: 'other',
    safe: true,
    transform: (t) => mapChars(t, SQUARED_MAP)
  },
  {
    id: 'black-squared',
    name: 'Negative Black Squared',
    category: 'gaming',
    safe: true,
    transform: (t) => mapChars(t, BLACK_SQUARED_MAP)
  },
  {
    id: 'monospace',
    name: 'Monospace / Code Font',
    category: 'other',
    safe: true,
    transform: (t) => mapChars(t, MONOSPACE_MAP)
  },
  {
    id: 'vaporwave',
    name: 'Vaporwave / Fullwidth',
    category: 'cute',
    safe: true,
    badge: 'Wide',
    transform: (t) => mapChars(t, FULLWIDTH_MAP)
  },
  {
    id: 'superscript',
    name: 'Superscript / Tiny Text',
    category: 'cute',
    safe: true,
    transform: (t) => mapChars(t, SUPERSCRIPT_MAP)
  },
  {
    id: 'upside-down',
    name: 'Inverted / Upside Down',
    category: 'gaming',
    safe: true,
    transform: (t) => {
      const reversed = t.split('').reverse().join('');
      return mapChars(reversed, UPSIDE_DOWN_MAP);
    }
  },
  {
    id: 'strikethrough',
    name: 'Strikethrough Stroke',
    category: 'glitch',
    safe: true,
    transform: (t) => applyCombining(t, '\u0336')
  },
  {
    id: 'underline-single',
    name: 'Underline Single',
    category: 'other',
    safe: true,
    transform: (t) => applyCombining(t, '\u0332')
  },
  {
    id: 'underline-double',
    name: 'Underline Double Line',
    category: 'other',
    safe: true,
    transform: (t) => applyCombining(t, '\u0333')
  },
  {
    id: 'cross-slashed',
    name: 'Cross / Slashed Overlay',
    category: 'glitch',
    safe: true,
    transform: (t) => applyCombining(t, '\u0338')
  },
  {
    id: 'wavy-underline',
    name: 'Wavy Tilde Underline',
    category: 'cute',
    safe: true,
    transform: (t) => applyCombining(t, '\u0330')
  },
  {
    id: 'spaced',
    name: 'Aesthetic Spaced Words',
    category: 'cute',
    safe: true,
    transform: (t) => t.split('').join(' ')
  },
  {
    id: 'zalgo',
    name: 'Zalgo Glitch / Cursed',
    category: 'glitch',
    safe: false,
    badge: 'Glitch',
    transform: (t) => generateZalgo(t)
  },
  {
    id: 'leet-1337',
    name: 'Leet Speak (1337 H4ck3r)',
    category: 'gaming',
    safe: true,
    transform: (t) => mapChars(t, LEET_MAP)
  },

  // GAMING & FREE FIRE / BATTLE ROYALE PRESETS
  {
    id: 'ff-boss-crown',
    name: 'Free Fire Boss Crown (亗)',
    category: 'gaming',
    safe: true,
    badge: 'Free Fire',
    transform: (t) => `亗 ${mapChars(t, SANS_BOLD_MAP)} 亗`
  },
  {
    id: 'ff-dragon-wings',
    name: 'Dragon Wings IGN (꧁༺ ༻꧂)',
    category: 'gaming',
    safe: true,
    badge: 'IGN Top',
    transform: (t) => `꧁༺${mapChars(t, SANS_BOLD_MAP)}༻꧂`
  },
  {
    id: 'ff-dead-killer',
    name: 'Dead Killer Clan Brackets',
    category: 'gaming',
    safe: true,
    transform: (t) => `★彡[${mapChars(t, SMALL_CAPS_MAP)}]彡★`
  },
  {
    id: 'ff-swords-clan',
    name: 'Esports Crossed Swords',
    category: 'gaming',
    safe: true,
    transform: (t) => `⚔️ ${mapChars(t, SANS_BOLD_MAP)} ⚔️`
  },
  {
    id: 'ff-lightning-squad',
    name: 'Lightning Bolt Squad',
    category: 'gaming',
    safe: true,
    transform: (t) => `⚡ ${mapChars(t, SANS_BOLD_MAP)} ⚡`
  },
  {
    id: 'ff-ninja-brackets',
    name: 'Anime Japanese Brackets',
    category: 'gaming',
    safe: true,
    transform: (t) => `『${mapChars(t, SANS_BOLD_MAP)}』`
  },

  // FACEBOOK VIP BIO & BARCODE SUITE
  {
    id: 'fb-vip-barcode',
    name: 'Facebook VIP Barcode Verified',
    category: 'vip_bio',
    safe: true,
    badge: 'Facebook VIP',
    transform: (t) => `█║▌│█│║▌ VIP Account Verified █║▌│█│║▌\n★ ${t} ★`
  },
  {
    id: 'fb-attitude-king',
    name: 'Attitude King Royal Crown',
    category: 'vip_bio',
    safe: true,
    badge: 'Attitude',
    transform: (t) => `♚ Attitude King ♚\n★ ${mapChars(t, SANS_BOLD_MAP)} ★`
  },
  {
    id: 'fb-attitude-queen',
    name: 'Attitude Queen Royal Tiara',
    category: 'vip_bio',
    safe: true,
    badge: 'Attitude',
    transform: (t) => `♛ Attitude Queen ♛\n★ ${mapChars(t, SCRIPT_BOLD_MAP)} ★`
  },

  // CUTE, ROMANTIC & AESTHETIC DECORATORS
  {
    id: 'cute-hearts',
    name: 'Sweet Love Hearts (♡)',
    category: 'cute',
    safe: true,
    badge: 'Love',
    transform: (t) => `♡ ${mapChars(t, SCRIPT_BOLD_MAP)} ♡`
  },
  {
    id: 'cute-ribbon-blossom',
    name: 'Pink Cherry Blossom & Ribbon',
    category: 'cute',
    safe: true,
    badge: 'Aesthetic',
    transform: (t) => `🌸 🎀 ${mapChars(t, SCRIPT_BOLD_MAP)} 🎀 🌸`
  },
  {
    id: 'cute-sparkle-stars',
    name: 'Sparkle Starlight (✧･ﾟ:*)',
    category: 'cute',
    safe: true,
    transform: (t) => `✧･ﾟ: *✧ ${t} ✧*:･ﾟ✧`
  },
  {
    id: 'cute-music-vibes',
    name: 'Acoustic Music Notes',
    category: 'cute',
    safe: true,
    transform: (t) => `🎵 ${mapChars(t, SANS_BOLD_MAP)} 🎶`
  },
  {
    id: 'cute-kaomoji-hug',
    name: 'Happy Kaomoji Hugs (づ｡◕‿‿◕｡)づ',
    category: 'cute',
    safe: true,
    transform: (t) => `(づ｡◕‿‿◕｡)づ ${t}`
  },
  {
    id: 'cute-shrug-status',
    name: 'Shrug Status ¯\\_(ツ)_/¯',
    category: 'cute',
    safe: true,
    transform: (t) => `${mapChars(t, SANS_BOLD_MAP)} ¯\\_(ツ)_/¯`
  }
];

// VIRAL RANDOM PRESETS
const VIRAL_PRESETS = [
  'Gamer Pro 亗',
  'Aesthetic Vibes',
  'Stay Wild',
  'Attitude King',
  'Official VIP Account',
  'Love Yourself ❤️',
  'Free Fire Champion',
  'Instagram Model'
];

export default function StylishTextGenerator({ locale = 'en' }: StylishTextGeneratorProps) {
  const [inputText, setInputText] = useState<string>('Gamer King');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(18);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load Favorites from LocalStorage on Mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('aot_stylish_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // LocalStorage access restricted or unavailable
    }
  }, []);

  // Sync Favorites to LocalStorage
  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter(item => item !== id);
      } else {
        updated = [...prev, id];
      }
      try {
        localStorage.setItem('aot_stylish_favorites', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  // 1-Click Copy Handler
  const handleCopy = useCallback(async (styledText: string, id: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(styledText);
        setCopiedId(id);
        setToastMessage('Copied to clipboard!');
        setTimeout(() => {
          setCopiedId(null);
          setToastMessage(null);
        }, 2000);
      }
    } catch {
      // Fallback
      setToastMessage('Failed to copy');
      setTimeout(() => setToastMessage(null), 1500);
    }
  }, []);

  // 1-Tap Native WhatsApp Share
  const handleWhatsAppShare = (styledText: string) => {
    const url = `whatsapp://send?text=${encodeURIComponent(styledText)}`;
    window.open(url, '_blank');
  };

  // Randomize Dice Preset
  const handleRandomize = () => {
    const random = VIRAL_PRESETS[Math.floor(Math.random() * VIRAL_PRESETS.length)];
    setInputText(random);
  };

  // Download All as .txt
  const handleDownloadTxt = () => {
    const lines = filteredStyles.map(s => `${s.name}:\n${s.transform(inputText || 'Your Text')}\n`).join('\n---\n\n');
    const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `stylish-text-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filtered Styles Memo
  const filteredStyles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return FONT_STYLES.filter(style => {
      // Category filter
      if (activeCategory === 'favorites') {
        if (!favorites.includes(style.id)) return false;
      } else if (activeCategory !== 'all') {
        if (style.category !== activeCategory) return false;
      }

      // Search filter
      if (q) {
        const matchesName = style.name.toLowerCase().includes(q);
        const matchesCat = style.category.toLowerCase().includes(q);
        return matchesName || matchesCat;
      }

      return true;
    });
  }, [activeCategory, searchQuery, favorites]);

  const CATEGORY_TABS = [
    { id: 'all', label: 'All Styles', icon: Sparkles, count: FONT_STYLES.length },
    { id: 'popular', label: 'Popular', icon: Flame, count: FONT_STYLES.filter(s => s.category === 'popular').length },
    { id: 'gaming', label: 'Gaming & Free Fire', icon: Gamepad2, count: FONT_STYLES.filter(s => s.category === 'gaming').length },
    { id: 'cursive', label: 'Cursive & Script', icon: Feather, count: FONT_STYLES.filter(s => s.category === 'cursive').length },
    { id: 'gothic', label: 'Gothic & Fraktur', icon: Skull, count: FONT_STYLES.filter(s => s.category === 'gothic').length },
    { id: 'cute', label: 'Cute & Hearts', icon: Heart, count: FONT_STYLES.filter(s => s.category === 'cute').length },
    { id: 'vip_bio', label: 'Facebook VIP Bio', icon: Crown, count: FONT_STYLES.filter(s => s.category === 'vip_bio').length },
    { id: 'glitch', label: 'Glitch & Zalgo', icon: Eye, count: FONT_STYLES.filter(s => s.category === 'glitch').length },
    { id: 'favorites', label: `Starred (${favorites.length})`, icon: Star, count: favorites.length }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      
      {/* 1. Category Silo Cross-Link Recommendation Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 border border-blue-200/60 dark:border-blue-900/40 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-[10px]">
            ⚡
          </span>
          <span className="font-semibold">Text Tools Silo:</span>
          <span className="text-slate-600 dark:text-slate-400">
            Want to multiply your styled font 10,000 times?
          </span>
        </div>
        <Link
          href={`/${locale !== 'en' ? `${locale}/` : ''}text-repeater/`}
          className="inline-flex items-center space-x-1.5 font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <span>Open Text Repeater</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 2. Top Interactive Sticky-Friendly Input Workspace */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-5 sm:p-7 space-y-5">
        
        {/* Workspace Title & Quick Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                Type Your Text Below
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Instantly converts into 100+ Unicode fonts and gamer presets
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleRandomize}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
              title="Generate random viral text"
              aria-label="Generate random text"
            >
              <Dices className="w-4 h-4 text-purple-500" />
              <span>Random</span>
            </button>

            <button
              type="button"
              onClick={() => setInputText('')}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all active:scale-95"
              title="Clear input text"
              aria-label="Clear input text"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Main Text Input Field */}
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your text here (e.g. your name, bio, quote, or Free Fire clan)..."
            rows={2}
            className="w-full text-base sm:text-lg font-medium p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-y"
          />
          {inputText && (
            <button
              type="button"
              onClick={() => setInputText('')}
              className="absolute right-3 top-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="Clear text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Font Controls Toolbar: Search, Size Slider, View Toggle, Export */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          
          {/* Live Search Filter */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 40+ styles (e.g. cursive, bold, wings)..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Interactive Font Size Slider & Buttons */}
          <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-slate-500 font-medium flex items-center space-x-1">
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Size:</span>
            </span>
            <button
              type="button"
              onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
              className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/40"
              title="Decrease font size"
            >
              -
            </button>
            <span className="font-mono font-semibold text-slate-700 dark:text-slate-300 min-w-[32px] text-center">
              {fontSize}px
            </span>
            <button
              type="button"
              onClick={() => setFontSize(prev => Math.min(36, prev + 2))}
              className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/40"
              title="Increase font size"
            >
              +
            </button>
          </div>

          {/* View Mode & Download All */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title="Grid view (2 columns)"
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title="List view (1 column)"
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleDownloadTxt}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              title="Download all generated styles as .txt"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export .txt</span>
            </button>
          </div>

        </div>

      </div>

      {/* 3. Category Filter Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORY_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`shrink-0 inline-flex items-center space-x-2 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all active:scale-95 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Font Cards Grid & List Workspace */}
      {filteredStyles.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No font styles match your search
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try clearing the search query or selecting a different category tab.
          </p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          className={`grid gap-4 ${
            viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {filteredStyles.map(style => {
            const transformed = style.transform(inputText || 'Your Text');
            const isFav = favorites.includes(style.id);
            const isCopied = copiedId === style.id;

            return (
              <div
                key={style.id}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all flex flex-col justify-between space-y-3"
              >
                {/* Card Header: Style Name, Badge & Star */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">
                      {style.name}
                    </span>
                    {style.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/40 dark:border-blue-800/40">
                        {style.badge}
                      </span>
                    )}
                  </div>

                  {/* Favorite Star Button */}
                  <button
                    type="button"
                    onClick={() => toggleFavorite(style.id)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-amber-400 dark:text-slate-600 dark:hover:text-amber-400 transition-colors"
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        isFav ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Rendered Text Preview Body */}
                <div
                  className="font-normal text-slate-900 dark:text-slate-100 break-words leading-relaxed select-all py-1 min-h-[44px] flex items-center"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {transformed}
                </div>

                {/* Card Footer: 1-Click Copy & Direct WhatsApp Share */}
                <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <button
                    type="button"
                    onClick={() => handleWhatsAppShare(transformed)}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors active:scale-95"
                    title="Share directly to WhatsApp"
                    aria-label="Share directly to WhatsApp"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(transformed, style.id)}
                    className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-xs ${
                      isCopied
                        ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                    }`}
                    title="Copy to clipboard"
                    aria-label="Copy to clipboard"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Floating Checkmark Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-bold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
