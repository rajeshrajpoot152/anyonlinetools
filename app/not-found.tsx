import React from 'react';
import NotFoundContent from '../components/NotFoundContent';

export const metadata = {
  title: '404 - Page Not Found | AnyOnlineTools | 100% Client-Side',
  description: 'The requested page could not be found. Explore our free, fast, 100% client-side online utilities. No upload, zero server data.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <NotFoundContent />
    </main>
  );
}
