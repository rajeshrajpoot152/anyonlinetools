import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Zap, Lock, Heart, Award, CheckCircle, Wrench, Globe, Sparkles, Users } from 'lucide-react';
import { siteConfig } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'About AnyOnlineTools – Our Story, Team & Privacy Mission',
  description: 'Learn how AnyOnlineTools was created by a passionate team to provide 100% free, client-side, and private web utilities for developers, writers, and students worldwide.',
  alternates: {
    canonical: `${siteConfig.domain}/about/`,
  },
  openGraph: {
    title: 'About AnyOnlineTools – Our Story & Mission',
    description: 'Learn how AnyOnlineTools was created to provide 100% free, private web tools without data harvesting.',
    url: `${siteConfig.domain}/about/`,
    images: ['/og-image.png']
  }
};

export default function AboutPage() {
  return (
    <main className="flex-1 w-full max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-800 dark:text-slate-200">
      <div className="text-center mb-12">
        <Wrench className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About AnyOnlineTools & Our Story
        </h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Dedicated to delivering fast, accessible, and completely private online utilities for developers, content creators, researchers, and students across 26 global languages.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed">
        {/* Our Story: From Personal Frustration to Global Mission */}
        <section className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center">
            <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2.5" />
            Our Story: Born from Firsthand Frustration
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Managing everyday digital tasks should be effortless. From firsthand experience as software developers, writers, and students, we know that dealing with bloated software, forced account registrations, intrusive ad pop-ups, and slow servers can be exhausting.
          </p>
          <blockquote className="p-4 my-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border-l-4 border-blue-600 text-blue-950 dark:text-blue-200 font-medium italic">
            &ldquo;Wouldn&apos;t it be better if your time was well spent creating and living instead of stressing over online tools and paywalls?&rdquo;
          </blockquote>
          <p className="text-slate-600 dark:text-slate-300">
            AnyOnlineTools began with a simple personal conviction: essential daily utilities should be instantaneous, 100% free, and completely private. What started as a personal collection of client-side scripts to avoid uploading private documents and text to unknown cloud servers has grown into an international platform supporting <strong>26 global languages</strong>.
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Being able to help millions of people around the world streamline their workflows without worrying about their privacy makes each one of us feel truly privileged.
          </p>
        </section>

        {/* The Team: A Passionate Few */}
        <section className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center">
            <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-2.5" />
            The Team: A Passionate Few for Millions Worldwide
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            We are few, yet a passionate few who truly enjoy creating solutions to help millions of people around the world with their daily digital tasks.
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            You showed us that everyday web frustrations are worth solving with care. That is why our lean team of developers, UI designers, and privacy advocates works tirelessly to craft high-performance in-browser tools that execute locally with zero latency and zero data retention.
          </p>
        </section>

        {/* Core Philosophy */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <ShieldCheck className="w-5 h-5 text-emerald-500 mr-2" />
            Our Core Philosophy: 100% Client-Side Privacy
          </h2>
          <p>
            Too many modern online utility websites upload your text, passwords, JSON payloads, or code snippets to remote backends. At <strong>AnyOnlineTools</strong>, we operate on a strict privacy-by-design architecture:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white flex items-center mb-1">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-1.5" />
                Local In-Browser Execution
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Calculations, text formatting, cryptographic hashing, and QR generation run completely within your browser memory.
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white flex items-center mb-1">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-1.5" />
                Zero Server Data Storage
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                We maintain zero databases containing user inputs. Your confidential documents and passwords never touch our servers.
              </div>
            </div>
          </div>
        </section>

        {/* Speed & Simplicity */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <Zap className="w-5 h-5 text-amber-500 mr-2" />
            Speed & Zero-Friction Experience
          </h2>
          <p>
            We believe online utilities should be frictionless. You should never have to create an account, verify an email address, solve Captchas, or navigate through intrusive pop-ups just to format a piece of JSON or count words in an article.
          </p>
          <p>
            Every tool on AnyOnlineTools is built with high-performance modern web standards, meaning sub-second response times and immediate feedback as you type.
          </p>
        </section>

        {/* Open & Accessible across 26 Languages */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <Globe className="w-5 h-5 text-blue-500 mr-2" />
            Always Free & Accessible Across 26 Languages
          </h2>
          <p>
            Our tools are available to anyone in the world with a web connection, completely free of charge. Whether you are a software engineer debugging API payloads, a copywriter polishing an essay, or a student solving percentage problems, AnyOnlineTools is built for you.
          </p>
        </section>
      </div>
    </main>
  );
}
