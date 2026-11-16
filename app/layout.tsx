import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import '@fontsource-variable/fraunces/soft.css';
import '@fontsource-variable/fraunces/soft-italic.css';
import '@fontsource-variable/nunito';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { cafe } from '../content/cafe';
import { site } from '../lib/site';
import './tailwind.input.css';

// Absolute URLs only when the deployed URL is known at build time. Never fall back to localhost.
const socialImage = site.url ? [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: `${cafe.name} — ${cafe.tagline}` }] : undefined;
const description = site.description || cafe.introduction;

export const metadata: Metadata = {
  title: { default: `${cafe.name} — ${cafe.tagline}`, template: `%s — ${cafe.name}` },
  description,
  applicationName: site.name,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${cafe.name} — ${cafe.tagline}`,
    description,
    ...(site.url ? { url: `${site.url}/` } : {}),
    images: socialImage,
  },
  twitter: { card: socialImage ? 'summary_large_image' : 'summary' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf1e6' },
    { media: '(prefers-color-scheme: dark)', color: '#181325' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><ThemeScript /></head>
      <body>
        <ThemeProvider>
          <a className="absolute -top-16 left-4 z-[200] rounded-ui bg-ink px-4 py-2.5 font-bold text-bg no-underline focus:top-4" href="#main">Skip to content</a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
