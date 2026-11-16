import type { Metadata } from 'next';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { MenuArt } from '../../components/menu-art';
import { PageHead } from '../../components/page-head';
import { cafe } from '../../content/cafe';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Events, catering and questions for ${cafe.name}.`,
  alternates: { canonical: absoluteUrl('/contact/') },
};

const subhead = 'mb-1 text-[1.3rem]';

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return (
    <>
      <PageHead eyebrow="Contact" title={<>Say hello, <em>we’ll put the kettle on</em></>}>
        <p>
          Planning a study group, a small event or a catering order? Have a question about the menu? Send us a
          note and someone from the café will reply — usually within a day.
        </p>
      </PageHead>

      <div className="wrap grid items-start gap-[clamp(1.5rem,5vw,4rem)] pt-[clamp(2rem,5vw,3.5rem)] pb-(--space-section) lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <section className="print:hidden" aria-label="Enquiry form">
          {hosted ? (
            <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={cafe.email} />
          ) : (
            <div className="card grid justify-items-start gap-[1.1rem] rounded-panel p-[clamp(1.5rem,4vw,2.75rem)] shadow-card">
              <MenuArt art="mug" color="#b9a3d6" size={84} />
              <h2 className="text-[clamp(1.7rem,3vw,2.2rem)]">Write to us directly</h2>
              <p className="max-w-[34rem] text-muted">
                Email is the best way to reach us. Tell us what you’re planning, the date and roughly how many people,
                and we’ll get back to you with ideas and prices.
              </p>
              <p><a className="button" href={`mailto:${cafe.email}?subject=${encodeURIComponent('Hello from the website')}`}>Email {cafe.name}</a></p>
            </div>
          )}
        </section>

        <aside className="grid gap-1.5 pt-1" aria-labelledby="direct-title">
          <h2 id="direct-title" className={subhead}>Email</h2>
          <p className="font-display font-soft text-[1.35rem] wrap-anywhere"><a className="text-link" href={`mailto:${cafe.email}`}>{cafe.email}</a></p>
          <p className="flex min-h-px flex-wrap items-center gap-x-4 gap-y-2"><CopyEmail email={cafe.email} /></p>

          {cafe.phone ? (
            <>
              <h2 className={`mt-4 ${subhead}`}>Phone</h2>
              <p><a className="text-link" href={`tel:${cafe.phone.replace(/[^\d+]/g, '')}`}>{cafe.phone}</a></p>
            </>
          ) : null}

          <h2 className={`mt-4 ${subhead}`}>Useful to include</h2>
          <ul className="grid gap-2 text-muted">
            {['The date and time you have in mind', 'How many people are coming', 'Any dietary needs or allergies'].map(tip => (
              <li key={tip} className="relative pl-6 before:absolute before:top-0.5 before:left-0 before:text-[.85rem] before:text-accent before:content-['✦']">{tip}</li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
