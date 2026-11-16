import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { GoogleMap } from '../components/google-map';
import { HeroScene } from '../components/hero-scene';
import { Icon } from '../components/icons';
import { MenuArt } from '../components/menu-art';
import { NowSpinning } from '../components/now-spinning';
import { OpenBadge } from '../components/open-badge';
import { SiteLink } from '../components/site-link';
import { TimeZoneNote } from '../components/time-zone-note';
import { cafe, formatAddress, groupedHours } from '../content/cafe';
import { allItems, featuredItems, formatPrice, startingPrice } from '../content/menu';
import { mapDirectionsUrl, mapSearchUrl } from '../lib/maps';
import { absoluteUrl, menuAnchor } from '../lib/paths';
import { cafeStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

const BADGES = { signature: 'Signature', seasonal: 'Seasonal', new: 'New' } as const;

// Repeated text styles, kept here so every section matches.
const sectionTitle = 'mt-2 text-[clamp(2rem,4.4vw,3.1rem)]';
const lede = 'max-w-(--measure) text-[clamp(1.08rem,1.6vw,1.22rem)] text-muted';
const panel = 'card rounded-panel p-[clamp(1.5rem,3.5vw,2.5rem)] shadow-card';

export default function HomePage() {
  const ticker = [...featuredItems.map(item => item.name), 'rainy windows', 'fresh bakes', 'records on', 'stay a while'];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(cafeStructuredData()) }} />

      <section className="overflow-hidden pt-[clamp(2rem,5vw,4rem)] pb-[clamp(2.5rem,5vw,4rem)]" aria-labelledby="hero-title">
        <div className="wrap grid items-center gap-[clamp(1.5rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">
          <div>
            <OpenBadge />
            <h1 id="hero-title" className="my-5 grid gap-3.5">
              <span className="hero-name pb-[.08em] text-[clamp(3.4rem,8.4vw,6.6rem)] leading-[.92] font-bold tracking-[-.035em] italic">{cafe.name}</span>
              <span className="font-mono text-[clamp(.82rem,1.3vw,.95rem)] font-medium tracking-[.16em] text-muted lowercase">{cafe.tagline}</span>
            </h1>
            <p className="max-w-lg text-[clamp(1.1rem,1.7vw,1.28rem)]">{cafe.introduction}</p>
            <p className="mt-7 flex flex-wrap gap-3.5">
              <SiteLink href="/menu/" className="button">Browse the menu <Icon name="arrow" width={18} height={18} /></SiteLink>
              <a href="#find-us" className="button button-ghost">Plan a visit</a>
            </p>
            <p className="mt-6 text-[.95rem] text-muted">
              <a href="#find-us" className="inline-flex items-center gap-2 border-b-[1.5px] border-dashed border-line no-underline hover:border-accent hover:text-ink">
                <Icon name="pin" width={18} height={18} className="flex-none text-accent" />{formatAddress()}
              </a>
            </p>
          </div>
          <div className="hero-glow relative mx-auto w-full max-w-xl lg:max-w-none print:hidden">
            <HeroScene />
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y-[1.5px] border-dashed border-line bg-surface-2 py-3.5 font-display font-soft text-xl text-muted italic print:hidden" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map(copy => (
            <span key={copy} className="flex">
              {ticker.map(word => (
                <span key={word} className="inline-flex items-center gap-6 pr-6 whitespace-nowrap">
                  {word}<Icon name="sparkle" width={14} height={14} className="text-accent" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section id="find-us" className="wrap grid gap-6 pt-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]" aria-labelledby="find-us-title">
        <div className={panel}>
          <p className="eyebrow">Find us</p>
          <h2 id="find-us-title" className="mt-3.5 flex items-start gap-2 text-[clamp(1.7rem,3.2vw,2.4rem)]">
            <Icon name="pin" width={22} height={22} className="mt-1.5 flex-none text-accent" />
            <span>
              {cafe.address.street}
              <span className="mt-1 block font-sans text-[1.05rem] font-semibold tracking-normal text-muted">
                {cafe.address.locality}, {cafe.address.region} {cafe.address.postalCode}
              </span>
            </span>
          </h2>
          {cafe.address.note ? <p className="mt-2 text-[.95rem] text-muted">{cafe.address.note}</p> : null}
          <p className="mt-5 mb-1 flex flex-wrap gap-3">
            <a className="button" href={mapDirectionsUrl(formatAddress())} rel="noopener">Get directions <Icon name="arrow" width={18} height={18} /></a>
            <a className="button button-ghost" href={mapSearchUrl(formatAddress())} rel="noopener">Open in Google Maps</a>
          </p>
          {cafe.directions.length ? (
            <ul className="mt-4 grid list-disc gap-1.5 pl-[1.1rem] text-[.95rem] text-muted marker:text-accent">
              {cafe.directions.map(line => <li key={line}>{line}</li>)}
            </ul>
          ) : null}
          {cafe.notice ? (
            <p className="my-4 flex items-start gap-2 rounded-ui bg-accent-2-soft px-4 py-3 text-[.96rem] font-semibold">
              <Icon name="sparkle" width={16} height={16} className="mt-1 flex-none text-accent-2" />{cafe.notice}
            </p>
          ) : null}
          <h3 className="mt-6 flex items-center gap-2 text-lg"><Icon name="clock" width={18} height={18} className="text-accent" />Opening hours</h3>
          <ul className="mt-2.5 mb-1">
            {groupedHours().map(group => (
              <li key={group.label} className="flex justify-between gap-4 border-b border-dashed border-line py-2">
                <span>{group.label}</span><span className="font-mono text-[.95rem]">{group.hours}</span>
              </li>
            ))}
          </ul>
          <TimeZoneNote />
        </div>
        <GoogleMap className="min-h-96" />
      </section>

      <section className="wrap section-y" aria-labelledby="favourites-title">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <p className="eyebrow">From the counter</p>
            <h2 id="favourites-title" className={sectionTitle}>House favourites</h2>
          </div>
          <SiteLink href="/menu/" className="text-link">Full menu · {allItems.length} items</SiteLink>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map(item => (
            <li key={item.id} style={{ '--fav-tint': item.color } as CSSProperties}>
              <SiteLink href={menuAnchor(item.id)}
                className="card relative flex h-full flex-col gap-1.5 px-5 pt-5 pb-[1.4rem] no-underline shadow-card transition duration-200 [background:radial-gradient(14rem_9rem_at_50%_0%,color-mix(in_srgb,var(--fav-tint)_32%,transparent),transparent_70%),var(--surface)] hover:-translate-y-1 hover:-rotate-[.4deg] hover:border-[color-mix(in_srgb,var(--fav-tint)_60%,var(--line))] hover:shadow-lift">
                {item.badge ? <span className={`sticker sticker-${item.badge} absolute top-4 right-4 rotate-[4deg]`}>{BADGES[item.badge]}</span> : null}
                <MenuArt art={item.art} color={item.color} size={112} className="mt-2 mb-4 self-center" />
                <span className="font-display font-soft text-[1.3rem] leading-tight font-semibold">{item.name}</span>
                <span className="flex-1 text-[.95rem] text-muted">{item.description}</span>
                <span className="mt-2 font-mono font-semibold text-accent">{typeof item.price === 'number' ? '' : 'from '}{formatPrice(startingPrice(item))}</span>
              </SiteLink>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-y border-y border-line bg-band" aria-labelledby="space-title">
        <div className="wrap grid items-start gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div>
            <p className="eyebrow">The space</p>
            <h2 id="space-title" className={sectionTitle}>A slow place in a fast town</h2>
            {cafe.story.map(paragraph => <p key={paragraph} className={`mt-5 ${lede}`}>{paragraph}</p>)}
            <ul className="mt-9 grid gap-x-6 gap-y-[1.1rem] sm:grid-cols-2">
              {cafe.amenities.map(amenity => (
                <li key={amenity.title} className="group flex items-start gap-3.5">
                  <span className="card grid size-11 flex-none -rotate-3 place-items-center rounded-[14px] text-accent-2 group-even:rotate-3 group-even:text-accent">
                    <Icon name={amenity.icon} />
                  </span>
                  <span>
                    <strong className="block font-extrabold">{amenity.title}</strong>
                    <span className="block text-[.95rem] leading-normal text-muted">{amenity.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <NowSpinning />
        </div>
      </section>

      <section className="wrap py-[clamp(2rem,5vw,3.5rem)]" aria-labelledby="events-title">
        <div className={`${panel} relative grid grid-cols-[auto_1fr] items-center gap-x-8 gap-y-4 overflow-hidden lg:grid-cols-[auto_1fr_auto]
          [background:radial-gradient(24rem_16rem_at_100%_0%,color-mix(in_srgb,var(--accent-2)_30%,transparent),transparent_70%),radial-gradient(20rem_14rem_at_0%_100%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_70%),var(--surface)]`}>
          <MenuArt art="teapot" color="#e0b96a" size={84} className="-rotate-[8deg]" />
          <div>
            <h2 id="events-title" className="mb-1.5 text-[clamp(1.7rem,3vw,2.3rem)]">Study groups, events &amp; catering</h2>
            <p className="text-muted">Book the back room for your book club, order a box of cardamom buns for the office, or just say hello.</p>
          </div>
          <p className="col-span-full lg:col-span-1"><SiteLink href="/contact/" className="button">Send us a note</SiteLink></p>
        </div>
      </section>

      {cafe.faqs.length ? (
        <section id="faq" className="wrap section-y -scroll-mt-16" aria-labelledby="faq-title">
          <p className="eyebrow">FAQs</p>
          <h2 id="faq-title" className={sectionTitle}>Good to know</h2>
          <div className="mt-6 grid max-w-[52rem] gap-3">
            {cafe.faqs.map(faq => (
              <details key={faq.question} className="faq card">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-[1.05rem] font-extrabold">{faq.question}</summary>
                <p className="max-w-(--measure) px-5 pb-5 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-muted">
            Something else? <SiteLink href="/contact/" className="text-link">Send us a note</SiteLink>
            {cafe.phone ? <> or call <a className="text-link" href={`tel:${cafe.phone.replace(/[^\d+]/g, '')}`}>{cafe.phone}</a></> : null}.
          </p>
        </section>
      ) : null}
    </>
  );
}
