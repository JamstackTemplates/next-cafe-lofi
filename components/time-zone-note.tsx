import { site } from '../lib/site';
import { timeZoneLabel } from '../lib/time-zone';

/** "Times shown in Pacific Time" — so visitors elsewhere don't read the hours as their own local time. */
export function TimeZoneNote({ className = 'tz-note' }: { className?: string }) {
  const label = timeZoneLabel(site.timeZone);
  return label ? <p className={className}>Times shown in {label}</p> : null;
}
