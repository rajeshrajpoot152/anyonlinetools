import toolsCatalog from './tools.json';

export interface ToolHowToStep {
  step: number;
  title: string;
  desc: string;
}

export interface ToolFaqItem {
  q: string;
  a: string;
}

export interface ToolUseCase {
  title: string;
  desc: string;
  tag?: string;
  icon?: string;
}

export interface ToolComparisonRow {
  feature: string;
  us: string;
  traditional: string;
}

export interface ToolComparisonTable {
  title?: string;
  subtitle?: string;
  ourLabel?: string;
  traditionalLabel?: string;
  rows: ToolComparisonRow[];
}

export interface ToolInfo {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  shortDesc: string;
  href?: string;
  icon: string;
  badge?: string;
  seoTitle: string;
  seoDesc: string;
  keywords: string[];
  howToUse?: ToolHowToStep[];
  faqs?: ToolFaqItem[];
  useCases?: ToolUseCase[];
  comparisonTable?: ToolComparisonTable;
}

export const TOOL_CATEGORIES = [
  { id: 'all', label: 'All Tools', icon: 'Sparkles' },
  { id: 'text', label: 'Text Utilities', icon: 'Repeat' },
  { id: 'developer', label: 'Developer Tools', icon: 'Code' },
  { id: 'security', label: 'Privacy & Security', icon: 'ShieldCheck' },
  { id: 'calculator', label: 'Calculators', icon: 'Calculator' },
] as const;

export const TOOLS: ToolInfo[] = toolsCatalog as ToolInfo[];

export function getToolBySlug(slug: string): ToolInfo | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getLocalizedToolHref(tool: ToolInfo, locale: string = 'en'): string {
  const lang = locale && locale.trim() !== '' ? locale : 'en';
  if (lang === 'en') {
    return `/${tool.slug}/`;
  }
  return `/${lang}/${tool.slug}/`;
}
