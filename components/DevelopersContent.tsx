'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Code, 
  Terminal, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Copy, 
  Check, 
  ArrowRight,
  Database,
  FileCode,
  Cpu
} from 'lucide-react';

interface FormatInfo {
  ext: string;
  name: string;
  category: string;
  mime: string;
  useCase: string;
}

const POPULAR_FORMATS: FormatInfo[] = [
  { ext: 'PDF', name: 'Portable Document Format', category: 'Document', mime: 'application/pdf', useCase: 'Cross-platform fixed-layout contracts, reports, and books' },
  { ext: 'DOCX', name: 'Microsoft Word OpenXML', category: 'Document', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', useCase: 'Editable word processing documents and templates' },
  { ext: 'WEBP', name: 'WebP Modern Image', category: 'Image', mime: 'image/webp', useCase: 'High-efficiency lossless and lossy web images developed by Google' },
  { ext: 'HEIC', name: 'High Efficiency Image Container', category: 'Image', mime: 'image/heic', useCase: 'Modern Apple iOS and mobile photography storage' },
  { ext: 'PNG', name: 'Portable Network Graphics', category: 'Image', mime: 'image/png', useCase: 'Lossless graphics with alpha transparency support' },
  { ext: 'SVG', name: 'Scalable Vector Graphics', category: 'Vector', mime: 'image/svg+xml', useCase: 'Resolution-independent XML vector icons, logos, and charts' },
  { ext: 'JSON', name: 'JavaScript Object Notation', category: 'Data', mime: 'application/json', useCase: 'Universal lightweight data interchange for web APIs' },
  { ext: 'CSV', name: 'Comma-Separated Values', category: 'Data', mime: 'text/csv', useCase: 'Tabular data exchange between databases and spreadsheets' },
  { ext: 'MP3', name: 'MPEG-1 Audio Layer III', category: 'Audio', mime: 'audio/mpeg', useCase: 'Ubiquitous compressed audio for music, podcasts, and speech' },
  { ext: 'WAV', name: 'Waveform Audio File Format', category: 'Audio', mime: 'audio/wav', useCase: 'Uncompressed high-fidelity studio recording audio' },
  { ext: 'MP4', name: 'MPEG-4 Part 14 Video', category: 'Video', mime: 'video/mp4', useCase: 'Universal digital multimedia container for web and mobile streaming' },
  { ext: 'ZIP', name: 'ZIP Compressed Archive', category: 'Archive', mime: 'application/zip', useCase: 'Lossless multi-file bundling and directory compression' }
];

export default function DevelopersContent() {
  const [activeTab, setActiveTab] = useState<'js' | 'pipeline' | 'node' | 'python' | 'curl'>('js');
  const [copied, setCopied] = useState(false);
  const [searchExt, setSearchExt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Document', 'Image', 'Vector', 'Data', 'Audio', 'Video', 'Archive'];

  const codeSnippets = {
    js: `// Zero-upload In-Browser Client-Side Image Transformation
// Runs 100% locally on device canvas with zero network calls
async function convertImageClientSide(file, targetFormat = 'image/webp', quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => resolve(blob), targetFormat, quality);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}`,
    pipeline: `// In-Browser Client-Side DAG Pipeline (Zero-Upload Architecture)
// Chains Ingest -> WebAssembly Transformation -> Local Export in browser memory
class ClientConversionPipeline {
  constructor() {
    this.tasks = [];
  }

  // Step 1: Local Ingestion (FileReader / ArrayBuffer)
  addSource(file) {
    this.tasks.push(async () => {
      const buffer = await file.arrayBuffer();
      return { data: buffer, name: file.name, type: file.type };
    });
    return this;
  }

  // Step 2: In-Memory WebAssembly Transform (0 Server Bytes)
  addTransform(transformFn) {
    this.tasks.push(async (prev) => await transformFn(prev));
    return this;
  }

  // Step 3: Local Export (Blob & FileSystem API)
  addExport(targetMimeType) {
    this.tasks.push(async (prev) => {
      const blob = new Blob([prev.data], { type: targetMimeType });
      return { blob, downloadUrl: URL.createObjectURL(blob), size: blob.size };
    });
    return this;
  }

  // Execute Pipeline (100% In-Memory Sandbox)
  async execute() {
    let result = null;
    for (const task of this.tasks) {
      result = await task(result);
    }
    return result;
  }
}`,
    node: `// Local Headless Node.js Utility
// Format and validate structured JSON payloads without third-party APIs
const fs = require('fs');
const path = require('path');

function formatJsonLocally(sourcePath, destPath, indent = 2) {
  try {
    const rawData = fs.readFileSync(path.resolve(sourcePath), 'utf-8');
    const parsed = JSON.parse(rawData);
    const formatted = JSON.stringify(parsed, null, indent);
    fs.writeFileSync(path.resolve(destPath), formatted, 'utf-8');
    console.log('✅ File formatted successfully with zero network latency.');
  } catch (err) {
    console.error('❌ Formatting failed:', err.message);
  }
}`,
    python: `# Python Local Data Pipeline
# Format, validate, and minify datasets with zero cloud token consumption
import json
import sys

def optimize_dataset(input_file: str, output_file: str, minify: bool = False) -> None:
    with open(input_file, 'r', encoding='utf-8') as f:
        payload = json.load(f)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        if minify:
            json.dump(payload, f, separators=(',', ':'), ensure_ascii=False)
        else:
            json.dump(payload, f, indent=2, ensure_ascii=False)
            
    print(f"✅ Processed {input_file} -> {output_file} locally.")

if __name__ == '__main__':
    optimize_dataset('data.json', 'data.min.json', minify=True)`,
    curl: `# Local Headless Automation (No External API Key Required)
# Validate and format production JSON payloads via standard terminal tools
cat payload.json | jq '.' > formatted_payload.json

# Extract pure text from local documents using open CLI utilities
# (Zero files sent to remote conversion servers)
pdftotext contract.pdf contract_extracted.txt`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredFormats = POPULAR_FORMATS.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const query = searchExt.toLowerCase().trim();
    if (!query) return matchesCat;
    return matchesCat && (
      item.ext.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.mime.toLowerCase().includes(query) ||
      item.useCase.toLowerCase().includes(query)
    );
  });

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <span>💻 Open Developer Integration Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Built for Developers Who Value Speed & Privacy
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Skip expensive per-minute API subscriptions, rate limits, and network latency. Discover open recipes and client-side WebAssembly architectures.
          </p>
        </div>

        {/* 4 Pillars for Developers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="mb-4">
              <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Zero API Subscriptions</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No monthly plans, no credit card forms, and no metered conversion minutes. True open utility.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="mb-4">
              <Cpu className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Microsecond Edge Speed</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              WebAssembly execution directly in browser memory bypasses network upload hops and cloud server queues.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="mb-4">
              <ShieldCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Zero-Trust Privacy</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Zero bytes leave the client environment. 100% compliant with HIPAA, GDPR, and enterprise confidentiality.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="mb-4">
              <Layers className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">300+ Supported Formats</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Complete support across Documents, Images, Vector graphics, Audio, Video, and structured Data formats.
            </p>
          </div>
        </div>

        {/* Interactive Code Recipes Studio */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              Drop-In Code Recipes for Your Tech Stack
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Clean, local execution examples you can adapt directly into front-end apps or back-end pipelines.
            </p>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
            {/* Tabs Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('js')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'js'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  JavaScript / WASM (Browser)
                </button>
                <button
                  onClick={() => setActiveTab('pipeline')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'pipeline'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  DAG Pipeline (Browser)
                </button>
                <button
                  onClick={() => setActiveTab('node')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'node'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Node.js / TypeScript
                </button>
                <button
                  onClick={() => setActiveTab('python')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'python'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Python Pipeline
                </button>
                <button
                  onClick={() => setActiveTab('curl')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'curl'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  CLI / Terminal
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all mt-2 sm:mt-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-6 overflow-x-auto text-xs sm:text-sm font-mono text-emerald-400 bg-slate-900/90 leading-relaxed">
              <pre>{codeSnippets[activeTab]}</pre>
            </div>
          </div>
        </div>

        {/* Supported Formats Explorer */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              Universal Supported Formats Matrix
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Explore format specifications, MIME types, and conversion targets across our platform.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="max-w-xl mx-auto mb-8 space-y-4">
            <input
              type="text"
              value={searchExt}
              onChange={(e) => setSearchExt(e.target.value)}
              placeholder="Search formats or extensions (e.g. PDF, WEBP, HEIC, JSON, SVG)..."
              className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl shadow-xs text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Formats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredFormats.map((fmt, idx) => (
              <div
                key={idx}
                className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-black font-mono text-blue-600 dark:text-blue-400">
                      .{fmt.ext}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                      {fmt.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{fmt.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-snug">{fmt.useCase}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-400 dark:text-slate-500 truncate">
                  {fmt.mime}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action for Developers */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Need a Custom In-Browser Tool or Converter?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6">
              AnyOnlineTools is continuously expanding its open utility directory based on developer feedback. If your engineering team needs a specialized client-side encoder, formatter, or parser, let us know!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors"
              >
                Submit Feature Request
              </Link>
              <Link
                href="/guide"
                className="px-5 py-2.5 bg-blue-800/80 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-blue-700 transition-colors border border-blue-700"
              >
                Read User&apos;s Guide
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
