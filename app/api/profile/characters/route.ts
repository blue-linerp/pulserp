/**
 * app/api/profile/characters/route.ts
 *
 * Fetches the current user's characters from the FiveM server.
 * Uses requireUser() — the same auth as your profile page —
 * so only the logged-in user can ever see their own characters.
 *
 * Add to .env.local:
 *   FIVEM_API_URL=http://YOUR_SERVER_IP:30120
 *   FIVEM_CHARACTERS_SECRET=your-long-random-secret
 */

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

const FIVEM_API_URL = process.env.FIVEM_API_URL ?? '';
const SECRET        = process.env.FIVEM_CHARACTERS_SECRET ?? '';

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const steamHex = user.steamIdentifier;

  if (!FIVEM_API_URL || !SECRET) {
    console.error('[pulse-characters] Missing FIVEM_API_URL or FIVEM_CHARACTERS_SECRET');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const url = new URL('/pulse-characters/characters', FIVEM_API_URL);
  url.searchParams.set('steam', steamHex);
  url.searchParams.set('token', SECRET);

  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data?.error ?? 'FiveM API error' }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('[pulse-characters] Could not reach FiveM server:', err);
    return NextResponse.json({ error: 'Could not reach game server' }, { status: 503 });
  }
}
