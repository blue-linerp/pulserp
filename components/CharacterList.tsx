/**
 * components/CharacterList.tsx
 * Client component — fetches from /api/profile/characters and renders cards.
 */

'use client';

import { useEffect, useState } from 'react';
import CharacterCard, { type Character } from './CharacterCard';

type ApiResponse = { success: boolean; characters: Character[]; count: number };
type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty' }
  | { status: 'ok'; data: ApiResponse };

export default function CharacterList() {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/profile/characters', { cache: 'no-store' })
      .then(async (res) => {
        if (cancelled) return;
        const data = await res.json().catch(() => ({})) as Partial<ApiResponse> & { error?: string };
        if (!res.ok) {
          setState({ status: 'error', message: data.error ?? 'Failed to load characters.' });
          return;
        }
        if (!data.characters || data.characters.length === 0) {
          setState({ status: 'empty' });
        } else {
          setState({ status: 'ok', data: data as ApiResponse });
        }
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', message: 'Could not connect to the game server.' });
      });
    return () => { cancelled = true; };
  }, []);

  if (state.status === 'loading') {
    return (
      <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
        <span className="inline-block h-3 w-3 animate-spin rounded-full border border-[var(--text-muted)] border-t-[var(--red-primary)]" />
        Loading characters…
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <p className="font-mono text-xs text-[var(--red-primary)]">{state.message}</p>
    );
  }

  if (state.status === 'empty') {
    return (
      <p className="font-mono text-xs text-[var(--text-muted)]">
        No characters found — create one in-game!
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {state.data.characters.map((char) => (
        <CharacterCard key={char.id} char={char} />
      ))}
    </div>
  );
}
