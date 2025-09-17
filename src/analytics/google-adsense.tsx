'use client';

import Script from 'next/script';

/**
 * Google AdSense
 *
 * https://www.google.com/adsense/
 * Auto ads component for Google AdSense
 */
export default function GoogleAdSense() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
  if (!adsenseId) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
