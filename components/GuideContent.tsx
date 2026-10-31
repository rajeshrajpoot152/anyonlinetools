'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface GuideItem {
  id: string;
  category: 'Organize' | 'Optimize' | 'Edit' | 'Convert To' | 'Convert From' | 'Security' | 'Shortcuts';
  title: string;
  icon: string;
  summary: string;
  steps: string[];
  features: string[];
  proTip: string;
}

const GUIDES: GuideItem[] = [
  // Organize
  {
    id: 'merge-pdf',
    category: 'Organize',
    title: 'Merge Multiple Documents',
    icon: '📑',
    summary: 'Combine two or more documents or reports into one seamless, unified file.',
    steps: [
      'Select files from your device or drag and drop them straight into the canvas.',
      'Rearrange the page or file thumbnails manually, or use the automatic A-Z / Z-A sort buttons.',
      'Click "Merge" to combine documents locally in browser memory and download instantly.'
    ],
    features: ['Unlimited files', 'Preserve original quality', 'Works with password-protected files'],
    proTip: 'You can combine files with different orientations; our renderer automatically aligns page dimensions.'
  },
  {
    id: 'split-pdf',
    category: 'Organize',
    title: 'Split Documents by Range',
    icon: '✂️',
    summary: 'Divide a large document into independent files or extract individual pages.',
    steps: [
      'Drop your document into the split workspace.',
      'Define custom page ranges (e.g. 1-4, 7, 10-15) or select "Split into individual pages".',
      'Download your target sections as separate files or bundled in a single ZIP folder.'
    ],
    features: ['Custom page ranges', 'Batch extraction', 'Zero server wait time'],
    proTip: 'Use comma-separated ranges to extract multiple non-adjacent chapters in one click.'
  },
  {
    id: 'remove-pages',
    category: 'Organize',
    title: 'Remove Unwanted Pages',
    icon: '🗑️',
    summary: 'Delete blank pages, covers, or confidential slides before sharing.',
    steps: [
      'Upload your document to generate a visual thumbnail grid of all pages.',
      'Click any thumbnail to flag it for deletion (a red cross indicator will appear).',
      'Click "Apply & Download" to generate a clean document without the selected pages.'
    ],
    features: ['Visual thumbnail preview', 'Multi-select deletion', 'Instant memory rendering'],
    proTip: 'Accidentally marked a page? Click it again to unflag before applying changes.'
  },
  {
    id: 'extract-pages',
    category: 'Organize',
    title: 'Extract Specific Pages',
    icon: '📦',
    summary: 'Pull key pages or tables out of large manuals and save them independently.',
    steps: [
      'Load your file into the extraction studio.',
      'Click on the specific pages you need to extract from the thumbnail board.',
      'Choose whether to combine all extracted pages into a single new document or download each as a ZIP.'
    ],
    features: ['Thumbnail multi-select', 'ZIP or unified output', '100% private extraction'],
    proTip: 'Hold Shift on your keyboard to select a large block of pages instantly.'
  },
  {
    id: 'organize-reorder',
    category: 'Organize',
    title: 'Rearrange & Rotate Pages',
    icon: '🔄',
    summary: 'Freely drag-and-drop pages to restructure reports and fix upside-down scans.',
    steps: [
      'Upload your document to enter the interactive organizing board.',
      'Drag and drop any page thumbnail to move it to its new location.',
      'Hover over any page to rotate it 90° clockwise or counter-clockwise as needed.',
      'Download the re-sequenced file in seconds.'
    ],
    features: ['Drag-and-drop ordering', '90°/180° rotation', 'Alphabetical sort tools'],
    proTip: 'Use the "Rotate All" button in the toolbar to correct an entire batch of upside-down scanned pages.'
  },

  // Optimize
  {
    id: 'compress-pdf',
    category: 'Optimize',
    title: 'Compress & Reduce File Size',
    icon: '🗜️',
    summary: 'Shrink bulky documents for quick email attachments and strict portal limits.',
    steps: [
      'Drag your document or batch of files into the compression engine.',
      'Select your desired optimization tier: Recommended (balanced), Extreme (max reduction), or Lossless.',
      'Click "Compress" to downsample raster imagery and strip redundant metadata locally.',
      'Review your exact percentage size reduction and download the lightweight file.'
    ],
    features: ['Up to 85% size reduction', 'Lossless compression options', 'Real-time telemetry'],
    proTip: 'Our client-side WebAssembly compressor runs locally, meaning 500MB files compress without slow internet uploads.'
  },

  // Edit & Annotate
  {
    id: 'edit-pdf',
    category: 'Edit',
    title: 'Edit Text, Images & Shapes',
    icon: '✏️',
    summary: 'Annotate, draw, insert shapes, and add custom typography over existing pages.',
    steps: [
      'Load your document into the full-screen browser canvas editor.',
      'Navigate to the target page and select Text, Shape (rectangles, circles, arrows), or Image from the top toolbar.',
      'Click and drag to position elements; customize color, font size, border thickness, and opacity in the property bar.',
      'Click "Export Document" to bake your edits permanently into the output.'
    ],
    features: ['Vector shape tools', 'Custom typography overlay', 'Hand pan & magnifying zoom'],
    proTip: 'Switch to the Hand tool (H key) to pan effortlessly across high-resolution blueprints and maps.'
  },
  {
    id: 'page-numbers',
    category: 'Edit',
    title: 'Add Bates Page Numbers',
    icon: '🔢',
    summary: 'Stamp professional, sequential page numbering across all or selected pages.',
    steps: [
      'Open your file in the Bates numbering utility.',
      'Choose numbering scope: All pages, facing pages only, or a custom page interval.',
      'Configure position (Top/Bottom, Left/Center/Right), font family, font size, and numbering format (e.g. "Page 1 of 24").',
      'Click "Stamp & Download" to receive your numbered publication.'
    ],
    features: ['Custom typography & color', 'Facing page margins', 'Prefix/suffix formatting'],
    proTip: 'You can exclude cover pages by setting the starting count from page 2 onward.'
  },
  {
    id: 'watermark',
    category: 'Edit',
    title: 'Stamp Custom Watermark',
    icon: '🛡️',
    summary: 'Apply copyright text or transparent corporate logo badges across all pages.',
    steps: [
      'Upload the file you wish to protect or brand.',
      'Select Text Watermark (e.g., "CONFIDENTIAL", "DRAFT") or upload a transparent PNG logo image.',
      'Fine-tune the rotation angle (e.g. 45° diagonal), opacity slider (10% to 100%), and page layer position (over/under content).',
      'Download your watermarked document with indelible protection.'
    ],
    features: ['Text & image stamps', 'Opacity control', '45° diagonal presets'],
    proTip: 'Set opacity between 15% and 25% for high readability while retaining anti-tamper security.'
  },
  {
    id: 'repair-pdf',
    category: 'Edit',
    title: 'Salvage Damaged & Corrupt Files',
    icon: '🩹',
    summary: 'Recover text, streams, and pages from corrupt files that fail to open in Acrobat.',
    steps: [
      'Drop your damaged or broken document into the recovery scanner.',
      'Our WebAssembly parser analyzes the file tree to rebuild broken cross-reference (XREF) tables and reconstruct readable streams.',
      'Download the repaired file and verify content integrity.'
    ],
    features: ['XREF table reconstruction', 'Stream recovery', 'No remote upload needed'],
    proTip: 'If a PDF won’t open due to an interrupted download, this tool often salvages all undamaged internal pages.'
  },

  // Convert To
  {
    id: 'jpg-to-pdf',
    category: 'Convert To',
    title: 'JPG / PNG / WebP to Document',
    icon: '🖼️',
    summary: 'Transform photos, receipts, and scans into professional, standardized documents.',
    steps: [
      'Select one or multiple images from your device or drag them into the canvas.',
      'Configure page orientation (Portrait vs Landscape) and page margins (None, Small, or Large).',
      'Toggle "Combine all into one file" or download separate single-page documents.',
      'Click "Generate" to compile into a crisp document ready for print or sharing.'
    ],
    features: ['Batch image compilation', 'Auto orientation detection', 'Custom margin control'],
    proTip: 'Choose "No Margin" if you are converting full-bleed photos or scanned contract pages.'
  },
  {
    id: 'word-to-pdf',
    category: 'Convert To',
    title: 'Word (DOCX) to Document',
    icon: '📝',
    summary: 'Lock in formatting, typography, and margins by converting Word files to PDF.',
    steps: [
      'Select your .docx or .doc file from your computer or cloud folder.',
      'Click "Convert" to render headings, tables, bullet points, and embedded graphics into fixed layout.',
      'Download your pristine document with 100% font fidelity.'
    ],
    features: ['Preserves typography', 'Table & list layout fidelity', 'Zero software installs'],
    proTip: 'Converting to PDF before sending ensures recruiters and clients see identical formatting regardless of their device.'
  },
  {
    id: 'excel-to-pdf',
    category: 'Convert To',
    title: 'Excel (XLSX) to Document',
    icon: '📊',
    summary: 'Turn spreadsheets, financial variance models, and data tables into printable documents.',
    steps: [
      'Drop your .xlsx or .xls workbook into the converter.',
      'The engine automatically fits sheets to page boundaries and preserves gridlines, cell styling, and formulas.',
      'Download the publication-ready spreadsheet report.'
    ],
    features: ['Auto page-fit', 'Preserves borders & formatting', 'Multi-sheet support'],
    proTip: 'Set orientation to Landscape for wide financial sheets with more than 8 columns.'
  },
  {
    id: 'powerpoint-to-pdf',
    category: 'Convert To',
    title: 'PowerPoint (PPTX) to Document',
    icon: '📽️',
    summary: 'Convert presentation decks into fixed-layout slide documents for handouts and reviews.',
    steps: [
      'Upload your .pptx presentation.',
      'Each slide is rendered cleanly into a consecutive full-width page.',
      'Download the deck as a non-editable document suitable for executive reviews.'
    ],
    features: ['Slide-to-page 1:1 mapping', 'Preserves vector shapes', 'No PowerPoint license needed'],
    proTip: 'Handout-ready PDFs are much lighter than raw PPTX decks and cannot be accidentally edited by recipients.'
  },
  {
    id: 'html-to-pdf',
    category: 'Convert To',
    title: 'HTML & Webpages to Document',
    icon: '🌐',
    summary: 'Archive live web pages, articles, and documentation into clean, printable files.',
    steps: [
      'Enter the URL or paste raw HTML code into the converter field.',
      'Review the live responsive preview and set paper size (A4, Letter) and page margins.',
      'Click "Convert" to render the webpage layout and download the snapshot.'
    ],
    features: ['CSS print stylesheet support', 'Responsive preview', 'High-res image capture'],
    proTip: 'Great for archiving web receipts, legal notices, and technical documentation with active links intact.'
  },

  // Convert From
  {
    id: 'pdf-to-jpg',
    category: 'Convert From',
    title: 'Document to JPG / PNG Images',
    icon: '🎨',
    summary: 'Turn document pages into high-resolution images or extract embedded photos.',
    steps: [
      'Select your document and upload it to the rasterization studio.',
      'Choose between: "Convert every page into an image" or "Extract only embedded pictures".',
      'Select image format (JPG, PNG, WebP) and render resolution (72, 150, or 300 DPI).',
      'Download the images individually or packaged as a ZIP archive.'
    ],
    features: ['Up to 300 DPI print quality', 'ZIP extraction', 'Pure image asset isolation'],
    proTip: 'Select PNG format if your pages contain fine diagrams or code blocks to avoid JPEG compression artifacts.'
  },
  {
    id: 'pdf-to-word',
    category: 'Convert From',
    title: 'Document to Editable Word (DOCX)',
    icon: '📄',
    summary: 'Reconstruct static documents into fully editable Microsoft Word documents.',
    steps: [
      'Drop your document into the document reconstruction engine.',
      'Our layout engine parses text blocks, tables, headers, and images to generate native Word paragraphs.',
      'Download your editable .docx file and edit directly in Word, Google Docs, or LibreOffice.'
    ],
    features: ['Paragraph reconstruction', 'Table structure preservation', 'Zero upload wait'],
    proTip: 'If your document is a scanned image, ensure client-side OCR is enabled to convert image pixels into editable text.'
  },

  // Security
  {
    id: 'protect-pdf',
    category: 'Security',
    title: 'Encrypt with AES-256 Password',
    icon: '🔒',
    summary: 'Lock documents with military-grade encryption to prevent unauthorized viewing.',
    steps: [
      'Upload the file you wish to secure.',
      'Enter a strong passphrase in the encryption box.',
      'Optionally configure permission restrictions (disable printing, prevent text copy/paste).',
      'Click "Encrypt & Download" to receive an impenetrable, password-protected file.'
    ],
    features: ['256-bit AES encryption', 'Permission flags', 'Zero server storage of passwords'],
    proTip: 'Our client-side architecture never transmits your password over the web; encryption executes entirely in local RAM.'
  },
  {
    id: 'unlock-pdf',
    category: 'Security',
    title: 'Unlock & Remove Password',
    icon: '🔓',
    summary: 'Strip encryption and passwords from documents you own for unrestricted access.',
    steps: [
      'Upload your password-protected file.',
      'Enter the document password once when prompted by your browser.',
      'The engine decrypts the internal streams and exports a permanently unlocked version.',
      'Download the clean file for seamless sharing.'
    ],
    features: ['Instant local decryption', 'No password logging', 'Batch unlocking support'],
    proTip: 'Passwords are never recorded in our system or stored in your browser cache.'
  },
  {
    id: 'pdf-to-pdfa',
    category: 'Security',
    title: 'Convert to PDF/A for Archiving',
    icon: '🏛️',
    summary: 'Standardize documents to ISO 19005 standards for 30+ year long-term archival preservation.',
    steps: [
      'Upload any standard document into the PDF/A compliance converter.',
      'Select your archiving target: PDF/A-1b or PDF/A-2b.',
      'The engine embeds all referenced fonts, flattens device-dependent color spaces, and injects XMP metadata.',
      'Download the ISO-compliant archive document.'
    ],
    features: ['ISO 19005 compliance', 'Embedded color profiles & fonts', 'Institutional standard'],
    proTip: 'Government agencies, courts, and universities often mandate PDF/A format for official document submissions.'
  },
  {
    id: 'sign-pdf',
    category: 'Security',
    title: 'Sign Documents & Create Audit Trail',
    icon: '✍️',
    summary: 'Add legally verifiable digital signatures with cryptographic timestamps.',
    steps: [
      'Open your document in the Digital Signature Studio.',
      'Create your signature: draw on screen with finger or stylus, type with decorative typography, or upload an image stamp.',
      'Drag and place your signature, date field, and initials onto signature lines.',
      'Click "Sign & Export" to download the finalized document with embedded SHA-256 integrity hash.'
    ],
    features: ['Touch/mouse drawing', 'Typographic signatures', 'Cryptographic hash audit trail'],
    proTip: 'Download the accompanying Audit Trail certificate as verifiable proof of execution for legal contracts.'
  },

  // Shortcuts
  {
    id: 'shortcuts-multi-select',
    category: 'Shortcuts',
    title: 'Power User Keyboard & Mouse Shortcuts',
    icon: '⚡',
    summary: 'Accelerate your workflow with professional file selection and batch control tricks.',
    steps: [
      'Multi-select non-consecutive files: Hold Ctrl (or Cmd on Mac) while clicking files.',
      'Batch-select contiguous files: Click the first file, hold Shift, and click the last file in the folder.',
      'Drag & Drop anywhere: Drop files anywhere onto the browser window without needing to target specific buttons.',
      'Quick Pan: Hold Spacebar or select the Hand tool to pan smoothly across oversized blueprints.'
    ],
    features: ['Ctrl / Cmd multi-select', 'Shift range select', 'Full viewport dropzone'],
    proTip: 'You can paste images straight from your clipboard into the browser canvas using Ctrl+V (or Cmd+V)!'
  },
  {
    id: 'cloud-local-sync',
    category: 'Shortcuts',
    title: 'Work from Google Drive & Dropbox Privately',
    icon: '☁️',
    summary: 'Edit cloud documents without granting full-account OAuth access tokens to third parties.',
    steps: [
      'Install your provider’s native desktop sync client (Google Drive, OneDrive, Dropbox, or iCloud).',
      'When clicking "Select Files", navigate directly to your local synced cloud directory in your OS file dialog.',
      'Process your files 100% locally in AnyOnlineTools.',
      'Save the output file straight back to your synced cloud folder.'
    ],
    features: ['Zero third-party OAuth tokens', 'Local file speed', 'Zero credential exposure'],
    proTip: 'This local sync method protects your entire cloud account from third-party vendor breaches and API compromises.'
  }
];

export default function GuideContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Organize', 'Optimize', 'Edit', 'Convert To', 'Convert From', 'Security', 'Shortcuts'];

  const filteredGuides = useMemo(() => {
    return GUIDES.filter(guide => {
      const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesQuery =
        guide.title.toLowerCase().includes(query) ||
        guide.summary.toLowerCase().includes(query) ||
        guide.steps.some(step => step.toLowerCase().includes(query)) ||
        guide.features.some(feat => feat.toLowerCase().includes(query)) ||
        guide.proTip.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <span>📖 Master Documentation & Manual</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Universal Document Operations Guide
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Step-by-step instructions for organizing, optimizing, editing, converting, and securing documents 100% locally in your browser with zero limits and zero server uploads.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="mb-10 space-y-5">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools, operations, or how-to steps (e.g. merge, compress, watermark, word, sign)..."
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400"
            />
            <span className="absolute left-4 top-3.5 text-slate-400 text-xl">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Guides Grid */}
        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredGuides.map((guide) => (
              <div
                key={guide.id}
                id={guide.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">
                      {guide.icon}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {guide.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
                    {guide.summary}
                  </p>

                  {/* Step-by-Step Flow */}
                  <div className="space-y-3 mb-6 bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Step-by-Step Instructions:
                    </h3>
                    <ol className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {guide.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-snug">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Feature Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {guide.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-medium"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pro Tip Callout */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
                  <div className="flex items-start space-x-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="text-amber-500 flex-shrink-0">💡</span>
                    <span>
                      <strong className="text-slate-700 dark:text-slate-300 font-semibold">Pro Tip: </strong>
                      {guide.proTip}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <span className="text-4xl mb-3 block">🔎</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No matching guides found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Try searching with different keywords like &quot;merge&quot;, &quot;compress&quot;, &quot;word&quot;, or &quot;sign&quot;.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Global Security & Architecture Callout */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-400/30">
              <span>🛡️ Zero-Trust Client-Side Guarantee</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Why AnyOnlineTools Never Asks for Cloud Passwords or Uploads
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6">
              Traditional online utility sites require uploading your private documents to remote cloud servers, subject you to queue delays, and even ask for your cloud storage passwords. AnyOnlineTools changes the paradigm: all operations compile and execute 100% inside your browser using WebAssembly. Your files never touch our servers, never leave your device, and are stored for exactly 0 seconds.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/privacy"
                className="px-5 py-2.5 bg-white text-blue-900 rounded-xl font-bold text-xs sm:text-sm hover:bg-blue-50 transition-colors"
              >
                Read Privacy Charter
              </Link>
              <Link
                href="/business"
                className="px-5 py-2.5 bg-blue-800/80 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-blue-700 transition-colors border border-blue-700"
              >
                Enterprise Zero-Trust Details
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
