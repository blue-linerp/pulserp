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
import { requireUser } from '@/lib/auth';

const FIVEM_API_URL = process.env.FIVEM_API_URL ?? '';
const SECRET        = process.env.FIVEM_CHARACTERS_SECRET ?? '';

export async function GET() {
  // requireUser() redirects if not logged in, so we're guaranteed an authed user here
  const user = await requireUser();

  // steamIdentifier is already the "steam:hex" format Mythic uses (e.g. "steam:110000103f4a2b1")
  const steamHex = user.steamIdentifier;

  if (!FIVEM_API_URL || !SECRET) {
    console.error('[pulse-characters] Missing FIVEM_API_URL or FIVEM_CHARACTERS_SECRET in .env.local');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const url = new URL('/pulse-characters/characters', FIVEM_API_URL);
  url.searchParams.set('steam', steamHex);
  url.searchParams.set('token', SECRET);

  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
      cache: 'no-store', // always live data
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
