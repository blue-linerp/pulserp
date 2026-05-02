/**
 * components/CharacterList.tsx
 *
 * Client component — fetches /api/profile/characters and renders the grid.
 * Drop this inside your profile page server component.
 *
 * Usage:
 *   import CharacterList from '@/components/CharacterList';
 *   // inside your profile page JSX:
 *   <CharacterList />
 */

'use client';

import React, { useEffect, useState } from 'react';
import CharacterCard, { type Character } from './CharacterCard';

// ── Types ─────────────────────────────────────────────────────────────────────
type ApiResponse = {
  success: boolean;
  characters: Character[];
  count: number;
  steam: string;
};

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty' }
  | { status: 'ok'; data: ApiResponse };

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconAlert = () => (
  <svg viewBox="0 0 24 24" width={40} height={40} fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" width={40} height={40} fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// ── CharacterList ─────────────────────────────────────────────────────────────
export default function CharacterList() {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    fetch('/api/profile/characters', {
      credentials: 'include',
      headers: { Accept: 'application/json' },
    })
      .then(async (res) => {
        if (cancelled) return;

        if (res.status === 401) {
          setState({ status: 'error', message: 'You must be logged in to view characters.' });
          return;
        }
        if (!res.ok) {
          const body = await res.json().catch(() => ({})) as { error?: string };
          setState({ status: 'error', message: body.error ?? 'Failed to load characters.' });
          return;
        }

        const data = (await res.json()) as ApiResponse;

        if (!data.characters || data.characters.length === 0) {
          setState({ status: 'empty' });
        } else {
          setState({ status: 'ok', data });
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('[pulse-characters]', err);
          setState({ status: 'error', message: 'Could not connect to the server. Please try again later.' });
        }
      });

    return () => { cancelled = true; };
  }, []);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (state.status === 'loading') {
    return (
      <div className="pc-state">
        <div className="pc-spinner" />
        <p>Loading characters…</p>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (state.status === 'error') {
    return (
      <div className="pc-state pc-state--error">
        <IconAlert />
        <p>{state.message}</p>
      </div>
    );
  }

  // ── Empty ──────────────────────────────────────────────────────────────────
  if (state.status === 'empty') {
    return (
      <div className="pc-state">
        <IconUsers />
        <p>No characters found. Create one in-game!</p>
      </div>
    );
  }

  // ── Characters grid ────────────────────────────────────────────────────────
  const { data } = state;
  return (
    <div id="pulse-characters-root">
      <div className="pc-header">
        <h2>My Characters</h2>
        <span className="pc-count">
          {data.count} Character{data.count !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="pc-grid">
        {data.characters.map((char) => (
          <CharacterCard key={char.id} char={char} />
        ))}
      </div>
    </div>
  );
}
