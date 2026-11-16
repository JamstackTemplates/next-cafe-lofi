import { cafe, formatAddress, groupedHours, publicLinks } from '../content/cafe';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

const heading = 'mb-3 font-mono text-[.78rem] font-semibold tracking-[.14em] text-footer-soft uppercase';
const footerLink = 'text-footer-accent font-bold underline decoration-footer-accent/40 underline-offset-[.2em] hover:decoration-footer-accent';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer relative mt-12 bg-footer text-footer-ink">
      <svg className="absolute inset-x-0 bottom-full h-12 w-full fill-footer print:hidden" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 60V38H0V14H36V38H80V6H132V38H150V10H196V38H230V6H276V38H302V10H324V38H368V10H408V38H434V30H456V38H474V10H520V38H546V6H598V38H642V18H664V38H682V14H728V38H762V14H802V38H820V22H866V38H892V18H914V38H948V10H970V38H988V18H1034V38H1078V30H1130V38H1164V34H1200V38H1200V60Z" />
      </svg>
      <div className="wrap grid gap-x-12 gap-y-8 pt-14 pb-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display font-soft text-[2rem] font-bold text-footer-accent italic">{cafe.name}</p>
          <p className="mb-4 font-mono text-[.8rem] tracking-[.12em] text-footer-soft">{cafe.tagline}</p>
          <address className="leading-[1.8] text-footer-ink not-italic">
            {formatAddress()}<br />
            <a className={footerLink} href={`mailto:${cafe.email}`}>{cafe.email}</a>
            {cafe.phone ? <><br /><a className={footerLink} href={`tel:${cafe.phone.replace(/[^\d+]/g, '')}`}>{cafe.phone}</a></> : null}
          </address>
        </div>
        <div>
          <h2 className={heading}>Hours</h2>
          <ul className="text-[.95rem]">
            {groupedHours().map(group => (
              <li key={group.label} className="flex justify-between gap-4 border-b border-dashed border-white/15 py-2">
                <span>{group.label}</span><span className="font-mono text-[.88rem]">{group.hours}</span>
              </li>
            ))}
          </ul>
          <TimeZoneNote className="text-footer-muted" />
        </div>
        <div>
          <h2 className={heading}>Around here</h2>
          <ul className="grid gap-2 font-bold [&_a]:no-underline [&_a:hover]:text-footer-accent [&_a:hover]:underline">
            <li><SiteLink href="/menu/">Menu</SiteLink></li>
            <li><SiteLink href="/#find-us">Find us</SiteLink></li>
            <li><SiteLink href="/#faq">FAQs</SiteLink></li>
            <li><SiteLink href="/contact/">Events &amp; catering</SiteLink></li>
            {publicLinks.map(link => <li key={link.url}><a href={link.url} rel="me noopener">{link.label}</a></li>)}
          </ul>
        </div>
      </div>
      <p className="wrap flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-white/12 pt-5 pb-8 text-[.88rem] text-footer-muted">
        <span>© {year} {cafe.name} · brewed slowly, with care</span>
        <span title="Made with love by jamstacks.net">with <span role="img" aria-label="love">❤️</span> <a className="no-underline hover:text-footer-accent hover:underline" href="https://jamstacks.net">jamstacks.net</a></span>
      </p>
    </footer>
  );
}
