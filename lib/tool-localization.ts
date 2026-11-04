import { getToolBySlug, ToolInfo } from './tools-data';

// Statically import tool translations
import textRepeaterTranslations from './translations/text-repeater.json';
import blurTextTranslations from './translations/blur-text.json';
import stylishTextGeneratorTranslations from './translations/stylish-text-generator.json';
import blankTextTranslations from './translations/blank-text.json';

const TRANSLATION_REGISTRY: Record<string, Record<string, any>> = {
  'text-repeater': textRepeaterTranslations,
  'blur-text': blurTextTranslations,
  'stylish-text-generator': stylishTextGeneratorTranslations,
  'blank-text': blankTextTranslations,
};

export interface LocalizedHowToStep {
  step: number;
  title: string;
  desc: string;
}

export interface LocalizedFAQItem {
  q: string;
  a: string;
}

export interface LocalizedUseCase {
  title: string;
  desc: string;
  tag?: string;
  icon?: string;
}

export interface LocalizedComparisonRow {
  feature: string;
  us: string;
  traditional: string;
}

export interface LocalizedComparisonTable {
  title?: string;
  subtitle?: string;
  ourLabel?: string;
  traditionalLabel?: string;
  rows: LocalizedComparisonRow[];
}

export interface LocalizedFeatureCard {
  title: string;
  desc: string;
  icon?: string;
}

export interface LocalizedUIStrings {
  inputLabel?: string;
  inputPlaceholder?: string;
  quickFill?: string;
  repetitionLabel?: string;
  separatorLabel?: string;
  separators?: Record<string, string>;
  customSeparatorPlaceholder?: string;
  lineNumbers?: string;
  outputLabel?: string;
  outputPlaceholder?: string;
  copyButton?: string;
  copiedToast?: string;
  downloadButton?: string;
  clearButton?: string;
  backToAll?: string;
  quickStart?: string;
  howToUseTitle?: string;
  faqBadge?: string;
  faqTitle?: string;
  badgeText?: string;
}

export interface LocalizedToolContent {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  icon: string;
  badge: string;
  statusBadge: string;
  trustBadge: string;
  seoTitle: string;
  seoDesc: string;
  keywords: string[];
  heading: string;
  subheading: string;
  howToUse: LocalizedHowToStep[];
  faqs: LocalizedFAQItem[];
  features: LocalizedFeatureCard[];
  useCases?: LocalizedUseCase[];
  comparisonTable?: LocalizedComparisonTable;
  ui: LocalizedUIStrings;
}

/**
 * Retrieve fully localized tool content for any given slug and locale.
 * Merges base metadata from lib/tools.json with localized translation dictionaries.
 * Falls back safely to English ('en') if a locale key is missing.
 */
export function getLocalizedTool(slug: string, locale: string = 'en'): LocalizedToolContent | null {
  const baseTool = getToolBySlug(slug);
  if (!baseTool) return null;

  const toolTranslations = TRANSLATION_REGISTRY[slug] || {};
  const currentLangData = toolTranslations[locale] || toolTranslations['en'] || {};
  const fallbackEnData = toolTranslations['en'] || {};

  const statusBadge = baseTool.badge || 'Trending';
  const trustBadge = currentLangData.trustBadge || currentLangData.badge || '100% Free · Client-Side Private · No Upload';

  return {
    slug: baseTool.slug,
    name: currentLangData.name || baseTool.name,
    category: baseTool.category,
    categoryLabel: baseTool.categoryLabel,
    icon: baseTool.icon,
    badge: statusBadge,
    statusBadge,
    trustBadge,
    seoTitle: currentLangData.seoTitle || baseTool.seoTitle || `${baseTool.name} Online`,
    seoDesc: currentLangData.seoDesc || baseTool.seoDesc || baseTool.description,
    keywords: (currentLangData.keywords && currentLangData.keywords.length > 0)
      ? currentLangData.keywords
      : baseTool.keywords,
    heading: currentLangData.heading || currentLangData.name || baseTool.name,
    subheading: currentLangData.subheading || baseTool.description,
    howToUse: (currentLangData.howToUse && currentLangData.howToUse.length > 0)
      ? currentLangData.howToUse
      : (baseTool.howToUse || []),
    faqs: (currentLangData.faqs && currentLangData.faqs.length > 0)
      ? currentLangData.faqs
      : (baseTool.faqs || []),
    features: currentLangData.features || fallbackEnData.features || [],
    useCases: (currentLangData.useCases && currentLangData.useCases.length > 0)
      ? currentLangData.useCases
      : (fallbackEnData.useCases || baseTool.useCases || []),
    comparisonTable: currentLangData.comparisonTable || fallbackEnData.comparisonTable || baseTool.comparisonTable,
    ui: {
      ...(fallbackEnData.ui || {}),
      ...(currentLangData.ui || {}),
    },
  };
}

/**
 * Check if a tool has genuine, verified translations for a specific locale (not falling back to English).
 * Used by SEO metadata and sitemap generators to prevent thin-content duplicate indexing penalties.
 */
export function isToolTranslated(slug: string, locale: string): boolean {
  if (locale === 'en') return true;
  const toolTranslations = TRANSLATION_REGISTRY[slug] || {};
  const langData = toolTranslations[locale];
  if (!langData) return false;
  return Boolean(
    langData.name &&
    langData.seoTitle &&
    langData.howToUse &&
    langData.howToUse.length > 0 &&
    langData.faqs &&
    langData.faqs.length > 0
  );
}

