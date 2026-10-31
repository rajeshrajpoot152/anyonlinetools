'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight, 
  ArrowLeft,
  HelpCircle,
  Bug,
  Sparkles,
  ShieldCheck,
  Building2,
  MessageSquare
} from 'lucide-react';
import { siteConfig } from '../../lib/site-config';
import { TOOLS } from '../../lib/tools-data';

export default function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [affectedTool, setAffectedTool] = useState('');
  const [message, setMessage] = useState('');

  const subjectOptions = [
    { id: 'bug', label: 'Report a problem or bug', icon: Bug },
    { id: 'feature', label: 'Suggest a new tool or feature', icon: Sparkles },
    { id: 'privacy', label: 'Clarify doubts about privacy & client-side processing', icon: ShieldCheck },
    { id: 'business', label: 'Business, enterprise or offline deployment', icon: Building2 },
    { id: 'general', label: 'General question or feedback', icon: MessageSquare },
  ];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject) {
      setErrorMessage('Please fill in your name, email, and choose a general subject to continue.');
      return;
    }
    setErrorMessage(null);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorMessage('Please enter your message or details.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const fullMessage = `
[Category: ${subject.toUpperCase()}]
${affectedTool ? `[Tool: ${affectedTool}]` : ''}

${message.trim()}
    `.trim();

    try {
      // First try Next.js API route
      let response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject,
          tool: affectedTool || undefined,
          message: fullMessage,
        }),
      });

      // If on static PHP host (cPanel/Apache) where Next.js API is 404/405, fallback to contact.php
      if (response.status === 404 || response.status === 405) {
        response = await fetch('/api/contact.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            subject: subject,
            tool: affectedTool || undefined,
            message: fullMessage,
          }),
        });
      }

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setSubject('');
        setAffectedTool('');
        setMessage('');
        setStep(1);
      } else {
        const errorText = result?.message || 'Failed to send message. Please try again or email us directly.';
        setErrorMessage(errorText);
      }
    } catch (err: any) {
      setErrorMessage(
        `Unable to reach the mail server. Please send an email directly to ${siteConfig.supportEmail}.`
      );
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholderText = () => {
    switch (subject) {
      case 'bug':
        return 'Please describe what happened, steps to reproduce the issue, and what you expected to see...';
      case 'feature':
        return 'What tool or feature would you like us to build? Describe how it would work and how it helps you...';
      case 'privacy':
        return 'What questions do you have about our client-side processing, zero data storage, or file handling?';
      case 'business':
        return 'Tell us about your organization, team size, and any offline PWA or custom deployment needs...';
      default:
        return 'How can we help? Share your thoughts, feedback, or suggestions...';
    }
  };

  return (
    <main className="flex-1 w-full max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-800 dark:text-slate-200">
      <div className="text-center mb-10">
        <Mail className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Contact Us
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          Contact us to report a problem, clarify any doubts about AnyOnlineTools, suggest new tools, or just find out more.
        </p>

        {/* Professional Support Email Badge */}
        <div className="inline-flex items-center space-x-2 mt-4 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Mail className="w-4 h-4 text-blue-500" />
          <span>Official Support:</span>
          <a href={`mailto:${siteConfig.supportEmail}`} className="text-blue-600 hover:underline">
            {siteConfig.supportEmail}
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
        {/* Step Progress Indicator */}
        {!submitted && (
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 mb-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step === 1 ? 'bg-blue-600 text-white' : 'bg-emerald-500 text-white'
              }`}>
                {step === 1 ? '1' : '✓'}
              </span>
              <span className={step === 1 ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}>
                General Subject & Info
              </span>
            </div>
            <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center space-x-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step === 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}>
                2
              </span>
              <span className={step === 2 ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}>
                Message Details
              </span>
            </div>
          </div>
        )}

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              Thank you for reaching out to {siteConfig.siteName}. Our engineering team has received your ticket and will reply within 24–48 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
              }}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : step === 1 ? (
          /* STEP 1: Identification & General Subject */
          <form onSubmit={handleNextStep} className="space-y-6">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start space-x-3 text-rose-700 dark:text-rose-300 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{errorMessage}</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Your Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                General Subject
              </label>
              <select
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
              >
                <option value="" disabled>Choose a subject...</option>
                {subjectOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* STEP 2: Contextual Details & Submission */
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start space-x-3 text-rose-700 dark:text-rose-300 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Selected Subject Pill */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="text-slate-400">Subject:</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {subjectOptions.find(o => o.id === subject)?.label || subject}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Change
              </button>
            </div>

            {/* Conditional Field: Affected Tool selector if reporting a bug */}
            {subject === 'bug' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Which tool has a problem? (Optional)
                </label>
                <select
                  value={affectedTool}
                  onChange={(e) => setAffectedTool(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
                >
                  <option value="">General website / Navigation issue</option>
                  {TOOLS.map((t) => (
                    <option key={t.slug} value={t.name}>
                      {t.name} ({t.categoryLabel})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Your Message / Details
              </label>
              <textarea
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={getPlaceholderText()}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y transition-colors"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Ticket...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
