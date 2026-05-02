/**
 * app/api/profile/characters/route.ts
 *
 * Next.js App Router API route.
 * Runs server-side – the API secret never reaches the browser.
 *
 * GET /api/profile/characters
 *
 * Required .env.local additions:
 *   FIVEM_API_URL=http://YOUR_SERVER_IP:30120
 *   FIVEM_CHARACTERS_SECRET=your-long-random-secret   ← must match server.cfg
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // adjust path if your authOptions live elsewhere

// ── Config ────────────────────────────────────────────────────────────────────
const FIVEM_API_URL = process.env.FIVEM_API_URL ?? '';
const SECRET        = process.env.FIVEM_CHARACTERS_SECRET ?? '';

// ── Convert Steam64 ID → Steam hex (e.g. "steam:110000103f4a2b1") ─────────────
function toSteamHex(steam64: string): string {
  return `steam:${BigInt(steam64).toString(16)}`;
}

// ── Handler ───────────────────────────────────────────────────────────────────
export async function GET() {
  // 1. Must be authenticated via NextAuth (Steam)
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // 2. NextAuth Steam provider stores the Steam64 ID in session.user.id
  //    (or sometimes session.user.name — check your authOptions callbacks)
  const steam64 = (session.user as { id?: string }).id ?? '';
  if (!steam64) {
    return NextResponse.json({ error: 'Steam ID not found in session' }, { status: 400 });
  }

  const steamHex = toSteamHex(steam64);

  // 3. Validate env
  if (!FIVEM_API_URL || !SECRET) {
    console.error('[pulse-characters] FIVEM_API_URL or FIVEM_CHARACTERS_SECRET is not set.');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  // 4. Call FiveM HTTP endpoint
  const url = new URL('/pulse-characters/characters', FIVEM_API_URL);
  url.searchParams.set('steam', steamHex);
  url.searchParams.set('token', SECRET);

  try {
    const fivemRes = await fetch(url.toString(), {
      method : 'GET',
      headers: { Accept: 'application/json' },
      // Next.js 14+ fetch is cached by default; opt out so we always get live data
      cache  : 'no-store',
    });

    const data = await fivemRes.json();

    if (!fivemRes.ok) {
      return NextResponse.json(
        { error: data?.error ?? 'FiveM API error' },
        { status: fivemRes.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('[pulse-characters] fetch error:', err);
    return NextResponse.json({ error: 'Could not reach game server' }, { status: 503 });
  }
}
