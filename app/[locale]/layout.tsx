import React from 'react';
import { i18n } from '../../i18n-config';
import { TOOLS } from '../../lib/tools-data';

export async function generateStaticParams() {
  const params: { locale: string }[] = i18n.locales.map((locale) => ({ locale }));
  for (const tool of TOOLS) {
    params.push({ locale: tool.slug });
  }
  return params;
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return <>{children}</>;
}
