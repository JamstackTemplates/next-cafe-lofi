import { cafe, formatAddress, groupedHours, publicLinks } from '../content/cafe';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <svg className="site-footer__skyline" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 60V38H0V14H36V38H80V6H132V38H150V10H196V38H230V6H276V38H302V10H324V38H368V10H408V38H434V30H456V38H474V10H520V38H546V6H598V38H642V18H664V38H682V14H728V38H762V14H802V38H820V22H866V38H892V18H914V38H948V10H970V38H988V18H1034V38H1078V30H1130V38H1164V34H1200V38H1200V60Z" />
      </svg>
      <div className="wrap site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">{cafe.name}</p>
          <p className="site-footer__tagline">{cafe.tagline}</p>
          <address className="site-footer__address">
            {formatAddress()}<br />
            <a className="text-link" href={`mailto:${cafe.email}`}>{cafe.email}</a>
            {cafe.phone ? <><br /><a className="text-link" href={`tel:${cafe.phone.replace(/[^\d+]/g, '')}`}>{cafe.phone}</a></> : null}
          </address>
        </div>
        <div>
          <h2 className="site-footer__heading">Hours</h2>
          <ul className="site-footer__hours">
            {groupedHours().map(group => <li key={group.label}><span>{group.label}</span><span>{group.hours}</span></li>)}
          </ul>
          <TimeZoneNote className="tz-note site-footer__tz" />
        </div>
        <div>
          <h2 className="site-footer__heading">Around here</h2>
          <ul className="site-footer__links">
            <li><SiteLink href="/menu/">Menu</SiteLink></li>
            <li><SiteLink href="/#find-us">Find us</SiteLink></li>
            <li><SiteLink href="/#faq">FAQs</SiteLink></li>
            <li><SiteLink href="/contact/">Events &amp; catering</SiteLink></li>
            {publicLinks.map(link => <li key={link.url}><a href={link.url} rel="me noopener">{link.label}</a></li>)}
          </ul>
        </div>
      </div>
      <p className="wrap site-footer__meta">
        <span>© {year} {cafe.name} · brewed slowly, with care</span>
        <span className="credit">Made with <a href="https://jamstacks.net">Jamstacks</a> · Static website. Dynamic components.</span>
      </p>
    </footer>
  );
}
