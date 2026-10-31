export const i18n = {
  defaultLocale: 'en',
  locales: [
    'en', // English (en) - Global base & North America / UK / India
    'es', // Español (es) - Spanish (Latin America & Spain)
    'pt', // Português (pt) - Portuguese (Brazil & Portugal)
    'id', // Bahasa Indonesia (id) - Indonesian
    'ar', // Arabic (ar) - Middle East & North Africa (RTL)
    'fr', // Français (fr) - French (France & Francophone)
    'de', // Deutsch (de) - German (DACH region)
    'ja', // 日本語 (ja) - Japanese (Japan)
    'ru', // Русский (ru) - Russian (Eastern Europe & CIS)
    'tr', // Türkçe (tr) - Turkish (Turkey)
    'vi', // Tiếng Việt (vi) - Vietnamese (Vietnam)
    'th', // ภาษาไทย (th) - Thai (Thailand)
    'it', // Italiano (it) - Italian (Italy)
    'ko', // 한국어 (ko) - Korean (South Korea)
    'pl', // Polski (pl) - Polish (Poland)
    'nl', // Nederlands (nl) - Dutch (Netherlands & Belgium)
    'sv', // Svenska (sv) - Swedish (Sweden & Nordics)
    'zh-cn', // 中文 (简体) (zh-cn) - Simplified Chinese
    'zh-tw', // 中文 (繁體) (zh-tw) - Traditional Chinese
    'bg', // Български (bg) - Bulgarian (Bulgaria)
    'ca', // Català (ca) - Catalan (Catalonia & Spain)
    'el', // Ελληνικά (el) - Greek (Greece & Cyprus)
    'hi', // हिन्दी (hi) - Hindi (India - Major Traffic Anchor)
    'ms', // Bahasa Melayu (ms) - Malay (Malaysia & Southeast Asia)
    'uk', // Українська (uk) - Ukrainian (Ukraine)
    'sw', // Kiswahili (sw) - Swahili (East Africa)
  ],
} as const;

export type Locale = (typeof i18n)['locales'][number];
