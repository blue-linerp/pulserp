/**
 * components/CharacterCard.tsx
 *
 * A single character card. Receives one sanitised character object
 * (as returned by the FiveM API) and renders it.
 */

'use client';

import React from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────
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
  lastPlayed: number; // unix timestamp
  createdAt: number;  // unix timestamp
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(unix: number): string {
  if (!unix) return 'Unknown';
  return new Date(unix * 1000).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

function formatPlaytime(hours: number): string {
  if (hours < 1)   return '< 1 hour';
  if (hours === 1) return '1 hour';
  return `${hours} hours`;
}

function initials(first: string, last: string): string {
  return `${first[0] ?? '?'}${last[0] ?? '?'}`.toUpperCase();
}

// ── StatusBadge ───────────────────────────────────────────────────────────────
function StatusBadge({ isDead, inJail, jailTime }: Pick<Character, 'isDead' | 'inJail' | 'jailTime'>) {
  if (isDead)  return <span className="pc-badge pc-badge--dead">Deceased</span>;
  if (inJail)  return <span className="pc-badge pc-badge--jail">In Jail ({jailTime}m)</span>;
  return <span className="pc-badge pc-badge--alive">Active</span>;
}

// ── CharacterCard ─────────────────────────────────────────────────────────────
export default function CharacterCard({ char }: { char: Character }) {
  return (
    <div className="pc-card">
      {/* Header */}
      <div className="pc-card__header">
        <div className="pc-avatar">{initials(char.firstName, char.lastName)}</div>
        <div className="pc-card__title">
          <h3>{char.firstName} {char.lastName}</h3>
          <p className="pc-job">{char.job}</p>
          <div className="pc-badges">
            <StatusBadge isDead={char.isDead} inJail={char.inJail} jailTime={char.jailTime} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="pc-card__body">
        <div className="pc-info-grid">
          {[
            ['Date of Birth', char.dob],
            ['Gender',        char.gender],
            ['Phone',         char.phone || '—'],
            ['Cash',          `$${char.cash.toLocaleString()}`],
            ['Playtime',      formatPlaytime(char.playtime)],
            ['Last Played',   formatDate(char.lastPlayed)],
            ['Created',       formatDate(char.createdAt)],
            ['Char ID',       `#${char.id}`],
          ].map(([label, value]) => (
            <div className="pc-info-item" key={label}>
              <span className="pc-label">{label}</span>
              <span className="pc-value">{value}</span>
            </div>
          ))}
        </div>

        {char.bio && (
          <div className="pc-bio">
            <p>{char.bio}</p>
          </div>
        )}

        <div className="pc-licenses">
          <span className="pc-label">Licenses</span>
          <ul>
            {char.licenses.length > 0
              ? char.licenses.map(l => <li key={l}>{l}</li>)
              : <li>None</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
