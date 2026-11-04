import BlankText from './BlankText';
import React from 'react';
import dynamic from 'next/dynamic';

/**
 * AnyOnlineTools - Central Tool Component Registry
 * 
 * Maps tool slugs to dynamic client React components with SSR enabled.
 * Enables ultra-scalable dynamic routing: add 10,000+ tools without creating
 * 10,000 individual page folders in Next.js App Router!
 */
export const TOOL_REGISTRY: Record<string, React.ComponentType<any>> = {
  'blank-text': BlankText,
  'text-repeater': dynamic(() => import('./TextRepeater'), {
    ssr: true,
  }),
  'blur-text': dynamic(() => import('./BlurText'), {
    ssr: true,
  }),
  'stylish-text-generator': dynamic(() => import('./StylishTextGenerator'), {
    ssr: true,
  }),
  // New tools register here:
  // 'word-counter': dynamic(() => import('./WordCounter'), { ssr: true }),
};

export function getToolComponent(slug: string): React.ComponentType<any> | null {
  return TOOL_REGISTRY[slug] || null;
}
