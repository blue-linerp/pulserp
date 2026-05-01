import { ArrowRight, RadioTower } from 'lucide-react';
import type { SiteSettings } from '@/lib/settings';

export function AnnouncementBanner({ settings }: { settings: SiteSettings }) {
  if (!settings.announcement.enabled) return <div className="h-[150px]" />;
  const { title, body, ctaLabel, ctaUrl } = settings.announcement;
  return (
    <>
      <div className="h-[248px]" />
      <div className="fixed left-0 right-0 top-[146px] z-[90] px-5">
      <div className="relative mx-auto flex max-w-[1440px] overflow-hidden rounded-xl border border-[var(--border)] bg-[rgba(16,16,16,0.94)] shadow-[0_14px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="w-1.5 bg-[var(--red-primary)]" />
        <div className="flex min-h-[74px] flex-1 flex-col items-start justify-between gap-4 px-5 py-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--red-primary)]/15 text-[var(--red-primary)]"><RadioTower size={19} /></span>
            <div>
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.22em] text-[var(--red-primary)]">{title}</div>
              <div className="mt-1 text-sm font-semibold text-white/85">{body}</div>
            </div>
          </div>
          {ctaLabel && <a href={ctaUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-wide text-white transition hover:border-[var(--red-primary)] hover:bg-[var(--red-primary)]">{ctaLabel}<ArrowRight size={14} /></a>}
        </div>
      </div>
      </div>
    </>
  );
}
