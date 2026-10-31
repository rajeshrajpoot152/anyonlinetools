import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  GraduationCap, 
  BookOpen, 
  Code, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Laptop, 
  Zap, 
  Globe 
} from 'lucide-react';
import { siteConfig } from '../../lib/site-config';
import { TOOLS, getLocalizedToolHref } from '../../lib/tools-data';

export const metadata: Metadata = {
  title: 'AnyOnlineTools for Education – Free Student & Academic Productivity Suite',
  description: '100% free, private web utilities for students, teachers, and researchers. Word counters, JSON formatters, calculators, and converters with zero registration.',
  alternates: {
    canonical: `${siteConfig.domain}/education/`,
  },
  openGraph: {
    title: 'AnyOnlineTools for Education – Free Student Productivity Suite',
    description: 'Empowering students and teachers with fast, private in-browser tools. No signups, no paywalls, 100% free forever.',
    url: `${siteConfig.domain}/education/`,
    images: ['/og-image.png']
  }
};

export default function EducationPage() {
  const writingSlugs = ['word-counter', 'case-converter', 'text-diff-checker', 'remove-duplicate-lines', 'lorem-ipsum-generator', 'text-repeater'];
  const stemSlugs = ['percentage-calculator', 'json-formatter', 'unit-converter', 'base64-converter', 'hash-generator', 'url-encoder-decoder'];
  const visualSlugs = ['qr-code-generator', 'blur-image', 'blur-text', 'short-words'];

  const writingTools = TOOLS.filter(t => writingSlugs.includes(t.slug));
  const stemTools = TOOLS.filter(t => stemSlugs.includes(t.slug));
  const visualTools = TOOLS.filter(t => visualSlugs.includes(t.slug));

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-800 dark:text-slate-200">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <GraduationCap className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4 mx-auto" />
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-3 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>100% Free Forever · No 1-Year Trial Traps · No Signup Required</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Academic &amp; Student{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
            Productivity Suite
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Streamlining study, research, and classroom workflows with blistering-fast, 100% private in-browser utilities. Tailored for students writing theses, teachers grading assignments, and researchers handling data.
        </p>
      </div>

      {/* Trust Badges Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 max-w-4xl mx-auto">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3">
          <ShieldCheck className="w-6 h-6 text-emerald-500 flex-shrink-0" />
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">FERPA &amp; COPPA Safe</div>
            <div className="text-[11px] text-slate-500">Zero student data collection or tracking</div>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3">
          <Laptop className="w-6 h-6 text-blue-500 flex-shrink-0" />
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Chromebook &amp; Lab Ready</div>
            <div className="text-[11px] text-slate-500">Sub-second loads on school hardware</div>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3">
          <Zap className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">100% Client-Side RAM</div>
            <div className="text-[11px] text-slate-500">Theses &amp; research never leak to servers</div>
          </div>
        </div>
      </div>

      {/* Curated Toolkit 1: Writing & Humanities */}
      <section className="mb-14">
        <div className="flex items-center space-x-3 mb-6">
          <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Writing, Essay &amp; Thesis Suite
            </h2>
            <p className="text-xs text-slate-500">Essential tools for literature students, researchers, and academic writers.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {writingTools.map((tool) => (
            <Link
              key={tool.slug}
              href={getLocalizedToolHref(tool, 'en')}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <span className="block">
                <span className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </span>
                  {tool.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold">
                      {tool.badge}
                    </span>
                  )}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 block">
                  {tool.shortDesc}
                </span>
              </span>
              <span className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>Launch Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Curated Toolkit 2: STEM & Computer Science */}
      <section className="mb-14">
        <div className="flex items-center space-x-3 mb-6">
          <Code className="w-8 h-8 text-violet-600 dark:text-violet-400 flex-shrink-0" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              STEM, Mathematics &amp; Coding Suite
            </h2>
            <p className="text-xs text-slate-500">Calculators, formatters, and cryptographic tools for engineering and science coursework.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stemTools.map((tool) => (
            <Link
              key={tool.slug}
              href={getLocalizedToolHref(tool, 'en')}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-600 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <span className="block">
                <span className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {tool.name}
                  </span>
                  {tool.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 font-semibold">
                      {tool.badge}
                    </span>
                  )}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 block">
                  {tool.shortDesc}
                </span>
              </span>
              <span className="inline-flex items-center space-x-1 text-xs font-bold text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform">
                <span>Launch Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Curated Toolkit 3: Visual & Project Presentation */}
      <section className="mb-16">
        <div className="flex items-center space-x-3 mb-6">
          <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Presentation &amp; Study Visuals Suite
            </h2>
            <p className="text-xs text-slate-500">QR code generation and privacy masking for study groups and classroom presentations.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {visualTools.map((tool) => (
            <Link
              key={tool.slug}
              href={getLocalizedToolHref(tool, 'en')}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <span className="block">
                <span className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {tool.name}
                  </span>
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 block">
                  {tool.shortDesc}
                </span>
              </span>
              <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Launch Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Classroom Whitelisting Guide */}
      <section className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 rounded-3xl border border-indigo-900/40 shadow-xl mb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            For Educators &amp; School IT Departments
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 mb-4 tracking-tight">
            Effortless Classroom Deployment With Zero Bureaucracy
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            Teachers, professors, and school district IT administrators can add AnyOnlineTools to approved software lists instantly. Because our utilities require no logins, collect zero student data, and execute completely client-side, your institution incurs zero vendor compliance liability.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-bold">
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No Contract Required</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No Student Email Needed</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Chromebook Optimized</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
