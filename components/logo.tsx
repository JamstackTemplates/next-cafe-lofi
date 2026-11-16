/** Small steaming-cup mark used beside the café name. Decorative. */
export function Logo() {
  return (
    <svg className="logo" viewBox="0 0 40 40" width="34" height="34" aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="19" fill="var(--accent-soft)" />
      <path d="M11 18h15v5a7 7 0 0 1-7 7h-1a7 7 0 0 1-7-7z" fill="var(--accent)" />
      <path d="M26 19.5h1.5a2.8 2.8 0 0 1 0 5.6H25.6" fill="none" stroke="var(--accent)" strokeWidth="2.2" />
      <path className="logo__steam" d="M15.5 14c-1.6-1.6 1.6-2.6 0-4.6M20.5 14c-1.6-1.6 1.6-2.6 0-4.6" fill="none" stroke="var(--accent-2)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
