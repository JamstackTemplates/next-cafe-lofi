import type { Metadata } from 'next';
import { MenuArt } from '../components/menu-art';
import { SiteLink } from '../components/site-link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="wrap page-head not-found" aria-labelledby="not-found-title">
      <MenuArt art="cup" color="#5b3a29" size={96} />
      <p className="eyebrow">404</p>
      <h1 id="not-found-title" className="page-head__title">This page wandered off <em>for a coffee</em></h1>
      <p className="lede">The link may be out of date, or the page may have moved. These might help:</p>
      <ul className="link-list">
        <li><SiteLink href="/" className="text-link">Home</SiteLink></li>
        <li><SiteLink href="/menu/" className="text-link">Menu</SiteLink></li>
        <li><SiteLink href="/#find-us" className="text-link">Hours &amp; directions</SiteLink></li>
        <li><SiteLink href="/contact/" className="text-link">Contact</SiteLink></li>
      </ul>
    </section>
  );
}
