export interface FAQItem {
  q: string;
  a: string;
}

export const FAQS: FAQItem[] = [
  {
    q: 'What is AnyOnlineTools and what does it offer?',
    a: 'AnyOnlineTools (anyonlinetools.com) is a free, fast, and privacy-focused online utility platform. We offer everyday developer tools, text & writing utilities, cryptographic and security tools, and mathematical converters designed to help professionals, developers, students, and writers accomplish tasks quickly without software installation.'
  },
  {
    q: 'Are tools on AnyOnlineTools completely free to use?',
    a: 'Yes, 100% free! Every tool on AnyOnlineTools is accessible without registration, subscriptions, hidden fees, or daily usage caps.'
  },
  {
    q: 'Do you keep a copy of my processed files or data?',
    a: 'Absolutely not. All file operations, formatting, calculations, and conversions take place 100% inside your web browser sandbox (client-side). Your files, passwords, code, and text are never uploaded to our servers, stored in any database, or reviewed by anyone.'
  },
  {
    q: 'Why is AnyOnlineTools faster than traditional online conversion tools?',
    a: 'Traditional online tools upload your files to remote cloud servers where they wait in processing queues before being converted and downloaded. AnyOnlineTools executes all calculations, image processing, and code transformations locally inside your browser using WebAssembly and your device\'s multi-core CPU. There are zero server queues, zero upload wait times, and zero server lag—even during peak global traffic hours.'
  },
  {
    q: 'Do I need an account or email confirmation to use the tools?',
    a: 'No! AnyOnlineTools requires zero registration, no account creation, no passwords, and no email verification steps. There are no confirmation delays, spam folder checks, or daily task limits. You can open any tool and finish your work immediately.'
  },
  {
    q: 'Are confidential company files and proprietary code safe to process?',
    a: 'Yes, 100%. Because execution is strictly client-side, sensitive business documents, financial records, proprietary source code, and employee data never leave your local device or travel over the internet. This zero-trust architecture ensures complete confidentiality and satisfies strict enterprise data governance standards (GDPR, HIPAA, and internal NDAs).'
  },
  {
    q: 'What are the system requirements to use AnyOnlineTools?',
    a: 'AnyOnlineTools has no special software requirements. It runs smoothly on any modern standards-compliant web browser—including Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, and Brave—across Windows, macOS, Linux, ChromeOS, iOS, iPadOS, and Android without requiring any plugins or installations.'
  },
  {
    q: 'Can I use AnyOnlineTools on mobile devices and tablets?',
    a: 'Yes! The entire website is fully responsive and optimized for smartphones, tablets, laptops, and ultra-wide desktop screens. You can also install it as a Progressive Web App (PWA) for one-tap home screen access.'
  },
  {
    q: 'Do the tools work offline?',
    a: 'Yes. Once a tool page is loaded in your browser, the computation runs locally with JavaScript and WebAssembly. Many tools function completely offline even if you temporarily lose internet connectivity.'
  },
  {
    q: 'How frequently are new tools added to AnyOnlineTools?',
    a: 'Our engineering team regularly updates and expands the utility directory based on community feedback. If there is a specific online tool or converter you would like to see, reach out to us anytime via our Contact page.'
  }
];
