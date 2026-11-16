import type { Metadata } from 'next';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { MenuArt } from '../../components/menu-art';
import { cafe } from '../../content/cafe';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Events, catering and questions for ${cafe.name}.`,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return (
    <>
      <header className="wrap page-head">
        <p className="eyebrow">Contact</p>
        <h1 className="page-head__title">Say hello, <em>we’ll put the kettle on</em></h1>
        <p className="lede">
          Planning a study group, a small event or a catering order? Have a question about the menu? Send us a
          note and someone from the café will reply — usually within a day.
        </p>
      </header>

      <div className="wrap section section--tight contact">
        <section className="contact__form" aria-label="Enquiry form">
          {hosted ? (
            <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={cafe.email} />
          ) : (
            <div className="contact-card">
              <MenuArt art="mug" color="#b9a3d6" size={84} />
              <h2 className="contact-card__title">Write to us directly</h2>
              <p>
                Email is the best way to reach us. Tell us what you’re planning, the date and roughly how many people,
                and we’ll get back to you with ideas and prices.
              </p>
              <p><a className="button" href={`mailto:${cafe.email}?subject=${encodeURIComponent('Hello from the website')}`}>Email {cafe.name}</a></p>
            </div>
          )}
        </section>

        <aside className="contact__aside" aria-labelledby="direct-title">
          <h2 id="direct-title" className="subhead">Email</h2>
          <p className="contact__email"><a className="text-link" href={`mailto:${cafe.email}`}>{cafe.email}</a></p>
          <p className="contact__copy"><CopyEmail email={cafe.email} /></p>

          {cafe.phone ? (
            <>
              <h2 className="subhead">Phone</h2>
              <p><a className="text-link" href={`tel:${cafe.phone.replace(/[^\d+]/g, '')}`}>{cafe.phone}</a></p>
            </>
          ) : null}

          <h2 className="subhead">Useful to include</h2>
          <ul className="checklist">
            <li>The date and time you have in mind</li>
            <li>How many people are coming</li>
            <li>Any dietary needs or allergies</li>
          </ul>
        </aside>
      </div>
    </>
  );
}
