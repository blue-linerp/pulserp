/**
 * components/CharacterCard.tsx
 * Styled to match Pulse RP's existing design tokens:
 *   pulse-panel, pulse-heading, font-mono, var(--red-primary), etc.
 */

'use client';

import { Shield, Clock, Phone, Briefcase, Calendar, Hash } from 'lucide-react';

export interface Character {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  bio: string;
  job: string;
  cash: number;
  playtime: number;   // hours
  isDead: boolean;
  inJail: boolean;
  jailTime: number;
  licenses: string[];
  lastPlayed: number;
  createdAt: number;
}

function formatDate(unix: number) {
  if (!unix) return '—';
  return new Date(unix * 1000).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

function formatPlaytime(hours: number) {
  if (hours < 1)   return '< 1 hr';
  if (hours === 1) return '1 hr';
  return `${hours} hrs`;
}

function initials(first: string, last: string) {
  return `${first[0] ?? '?'}${last[0] ?? '?'}`.toUpperCase();
}

export default function CharacterCard({ char }: { char: Character }) {
  const statusColor = char.isDead
    ? 'border-[var(--red-primary)] text-[var(--red-primary)] bg-[rgba(255,26,26,0.10)]'
    : char.inJail
    ? 'border-[#d29922] text-[#d29922] bg-[rgba(210,153,34,0.10)]'
    : 'border-[#3fb950] text-[#3fb950] bg-[rgba(63,185,80,0.10)]';

  const statusLabel = char.isDead
    ? 'Deceased'
    : char.inJail
    ? `In Jail · ${char.jailTime}m`
    : 'Active';

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden transition-all duration-200 hover:border-[var(--red-primary)] hover:shadow-[0_0_20px_rgba(255,26,26,0.08)]">

      {/* Header */}
      <div className="flex items-center gap-4 border-b border-[var(--border)] bg-[var(--bg-tertiary)] px-5 py-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[var(--red-primary)] bg-[rgba(255,26,26,0.10)] font-mono text-sm font-bold text-[var(--red-primary)]">
          {initials(char.firstName, char.lastName)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-sm font-bold text-white">
            {char.firstName} {char.lastName}
          </p>
          <p className="truncate font-mono text-xs text-[var(--text-muted)]">{char.job}</p>
        </div>
        <span className={`shrink-0 rounded-full border px-3 py-1 font-mono text-xs font-bold ${statusColor}`}>
          {statusLabel}
        </span>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-px bg-[var(--border)]">
        {[
          { icon: <Calendar size={11} />, label: 'Date of Birth', value: char.dob },
          { icon: <Shield size={11} />,   label: 'Gender',         value: char.gender },
          { icon: <Phone size={11} />,    label: 'Phone',          value: char.phone || '—' },
          { icon: <Clock size={11} />,    label: 'Playtime',       value: formatPlaytime(char.playtime) },
          { icon: <Briefcase size={11} />,label: 'Cash',           value: `$${char.cash.toLocaleString()}` },
          { icon: <Hash size={11} />,     label: 'Char ID',        value: `#${char.id}` },
        ].map(({ icon, label, value }) => (
          <div key={label} className="bg-[var(--bg-secondary)] px-4 py-3">
            <div className="flex items-center gap-1 font-mono text-[10px] uppercase text-[var(--text-muted)]">
              {icon}{label}
            </div>
            <div className="mt-1 truncate font-mono text-xs text-white">{value}</div>
          </div>
        ))}
      </div>

      {/* Bio */}
      {char.bio && (
        <div className="border-t border-[var(--border)] px-5 py-3">
          <p className="font-mono text-xs italic text-[var(--text-secondary)] line-clamp-2">{char.bio}</p>
        </div>
      )}

      {/* Licenses */}
      {char.licenses.length > 0 && (
        <div className="border-t border-[var(--border)] px-5 py-3">
          <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">Licenses</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {char.licenses.map((l) => (
              <span key={l} className="rounded border border-[var(--border)] bg-[var(--bg-tertiary)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]">
                {l}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer dates */}
      <div className="flex justify-between border-t border-[var(--border)] bg-[var(--bg-tertiary)] px-5 py-2.5">
        <span className="font-mono text-[10px] text-[var(--text-muted)]">
          Created {formatDate(char.createdAt)}
        </span>
        <span className="font-mono text-[10px] text-[var(--text-muted)]">
          Last played {formatDate(char.lastPlayed)}
        </span>
      </div>
    </div>
  );
}
