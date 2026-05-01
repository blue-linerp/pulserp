import Link from 'next/link';

type Props = { large?: boolean; logoUrl?: string; siteName?: string; tagline?: string };

export function Logo({ large = false, logoUrl, siteName = 'Pulse', tagline = 'ROLEPLAY' }: Props) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className={`${large ? 'h-14 w-14' : 'h-10 w-10'} relative grid place-items-center overflow-hidden rounded bg-[var(--bg-tertiary)]`}>
        {logoUrl ? (
          <img src={logoUrl} alt={`${siteName} logo`} className="h-full w-full object-cover" />
        ) : (
          <svg viewBox="0 0 64 64" className="h-3/4 w-3/4 text-[var(--red-primary)]" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 36h8l5-15 9 30 7-22h11" />
            <path d="M20 12h18c10 0 16 6 16 14s-6 14-16 14H26" />
          </svg>
        )}
      </div>
      <div className="leading-none">
        <div className={`${large ? 'text-4xl' : 'text-2xl'} pulse-heading text-white`}>{siteName}</div>
        <div className="font-mono text-[10px] tracking-[0.35em] text-[var(--red-primary)]">{tagline}</div>
      </div>
    </Link>
  );
}
