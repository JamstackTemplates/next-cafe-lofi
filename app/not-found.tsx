import type { Metadata } from 'next';
import { MenuArt } from '../components/menu-art';
import { PageHead } from '../components/page-head';
import { SiteLink } from '../components/site-link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="pb-(--space-section)" aria-labelledby="not-found-title">
      <PageHead id="not-found-title" eyebrow="404" title={<>This page wandered off <em>for a coffee</em></>}
        before={<MenuArt art="cup" color="#5b3a29" size={96} className="mb-2" />}>
        <p>The link may be out of date, or the page may have moved. These might help:</p>
      </PageHead>
      <ul className="wrap flex flex-wrap gap-x-6 gap-y-3 text-[1.1rem]">
        <li><SiteLink href="/" className="text-link">Home</SiteLink></li>
        <li><SiteLink href="/menu/" className="text-link">Menu</SiteLink></li>
        <li><SiteLink href="/#find-us" className="text-link">Hours &amp; directions</SiteLink></li>
        <li><SiteLink href="/contact/" className="text-link">Contact</SiteLink></li>
      </ul>
    </section>
  );
}
