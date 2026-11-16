import { cafe, formatAddress } from '../content/cafe';
import { mapEmbedUrl } from '../lib/maps';

/**
 * Google Maps embed for the café's address. Lazy-loaded, so pages only contact Google when
 * the map scrolls into view. Dark mode softens the map with a CSS filter (see .map in globals.css).
 */
export function GoogleMap({ className = '' }: { className?: string }) {
  return (
    <div className={`map ${className}`}>
      <iframe
        src={mapEmbedUrl(formatAddress())}
        title={`Map showing ${cafe.name} at ${formatAddress()}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
