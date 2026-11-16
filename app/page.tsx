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

export default function HomePage() {
  const ticker = [...featuredItems.map(item => item.name), 'rainy windows', 'fresh bakes', 'records on', 'stay a while'];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(cafeStructuredData()) }} />

      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero__inner">
          <div className="hero__copy">
            <OpenBadge />
            <h1 id="hero-title" className="hero__title">
              <span className="hero__name">{cafe.name}</span>
              <span className="hero__tagline">{cafe.tagline}</span>
            </h1>
            <p className="hero__intro">{cafe.introduction}</p>
            <p className="hero__actions">
              <SiteLink href="/menu/" className="button">Browse the menu <Icon name="arrow" width={18} height={18} /></SiteLink>
              <a href="#find-us" className="button button--ghost">Plan a visit</a>
            </p>
            <p className="hero__where"><a href="#find-us"><Icon name="pin" width={18} height={18} />{formatAddress()}</a></p>
          </div>
          <div className="hero__art">
            <HeroScene />
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[0, 1].map(copy => (
            <span key={copy} className="ticker__group">
              {ticker.map(word => <span key={word}>{word}<Icon name="sparkle" width={14} height={14} /></span>)}
            </span>
          ))}
        </div>
      </div>

      <section id="find-us" className="wrap find-us" aria-labelledby="find-us-title">
        <div className="find-us__card">
          <p className="eyebrow">Find us</p>
          <h2 id="find-us-title" className="find-us__address">
            <Icon name="pin" width={22} height={22} />
            <span>{cafe.address.street}<span className="find-us__locality">{cafe.address.locality}, {cafe.address.region} {cafe.address.postalCode}</span></span>
          </h2>
          {cafe.address.note ? <p className="find-us__note">{cafe.address.note}</p> : null}
          <p className="find-us__actions">
            <a className="button" href={mapDirectionsUrl(formatAddress())} rel="noopener">Get directions <Icon name="arrow" width={18} height={18} /></a>
            <a className="button button--ghost" href={mapSearchUrl(formatAddress())} rel="noopener">Open in Google Maps</a>
          </p>
          {cafe.directions.length ? (
            <ul className="directions">
              {cafe.directions.map(line => <li key={line}>{line}</li>)}
            </ul>
          ) : null}
          {cafe.notice ? <p className="notice"><Icon name="sparkle" width={16} height={16} />{cafe.notice}</p> : null}
          <h3 className="find-us__hours-title"><Icon name="clock" width={18} height={18} />Opening hours</h3>
          <ul className="visit-card__hours">
            {groupedHours().map(group => <li key={group.label}><span>{group.label}</span><span>{group.hours}</span></li>)}
          </ul>
          <TimeZoneNote />
        </div>
        <GoogleMap className="find-us__map" />
      </section>

      <section className="wrap section" aria-labelledby="favourites-title">
        <div className="section__head">
          <div>
            <p className="eyebrow">From the counter</p>
            <h2 id="favourites-title" className="section__title">House favourites</h2>
          </div>
          <SiteLink href="/menu/" className="text-link">Full menu · {allItems.length} items</SiteLink>
        </div>
        <ul className="favourites">
          {featuredItems.map(item => (
            <li key={item.id} className="fav" style={{ '--fav-tint': item.color } as CSSProperties}>
              <SiteLink href={menuAnchor(item.id)} className="fav__link">
                {item.badge ? <span className={`sticker sticker--${item.badge} fav__sticker`}>{BADGES[item.badge]}</span> : null}
                <MenuArt art={item.art} color={item.color} size={112} className="fav__art" />
                <span className="fav__name">{item.name}</span>
                <span className="fav__desc">{item.description}</span>
                <span className="fav__price">{typeof item.price === 'number' ? '' : 'from '}{formatPrice(startingPrice(item))}</span>
              </SiteLink>
            </li>
          ))}
        </ul>
      </section>

      <section className="section section--band" aria-labelledby="space-title">
        <div className="wrap space">
          <div className="space__story">
            <p className="eyebrow">The space</p>
            <h2 id="space-title" className="section__title">A slow place in a fast town</h2>
            {cafe.story.map(paragraph => <p key={paragraph} className="lede">{paragraph}</p>)}
            <ul className="amenities">
              {cafe.amenities.map(amenity => (
                <li key={amenity.title} className="amenity">
                  <span className="amenity__icon"><Icon name={amenity.icon} /></span>
                  <span><strong>{amenity.title}</strong><span>{amenity.detail}</span></span>
                </li>
              ))}
            </ul>
          </div>
          <NowSpinning />
        </div>
      </section>

      <section className="wrap section section--tight" aria-labelledby="events-title">
        <div className="cta-card cta-card--wide">
          <MenuArt art="teapot" color="#e0b96a" size={84} className="cta-card__art" />
          <div>
            <h2 id="events-title" className="cta-card__title">Study groups, events &amp; catering</h2>
            <p>Book the back room for your book club, order a box of cardamom buns for the office, or just say hello.</p>
          </div>
          <p><SiteLink href="/contact/" className="button">Send us a note</SiteLink></p>
        </div>
      </section>

      {cafe.faqs.length ? (
        <section id="faq" className="wrap section faq-section" aria-labelledby="faq-title">
          <p className="eyebrow">FAQs</p>
          <h2 id="faq-title" className="section__title">Good to know</h2>
          <div className="faqs">
            {cafe.faqs.map(faq => (
              <details key={faq.question} className="faq">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          <p className="faq-more">
            Something else? <SiteLink href="/contact/" className="text-link">Send us a note</SiteLink>
            {cafe.phone ? <> or call <a className="text-link" href={`tel:${cafe.phone.replace(/[^\d+]/g, '')}`}>{cafe.phone}</a></> : null}.
          </p>
        </section>
      ) : null}
    </>
  );
}
