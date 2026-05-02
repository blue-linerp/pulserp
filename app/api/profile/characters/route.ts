import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

const FIVEM_API_URL = process.env.FIVEM_API_URL ?? '';
const SECRET        = process.env.FIVEM_CHARACTERS_SECRET ?? '';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const steamHex = `steam:${BigInt(user.steamId).toString(16)}`;

  return NextResponse.json({
    steamHex,
    hasFivemUrl: !!FIVEM_API_URL,
    hasSecret: !!SECRET,
    fivemUrl: FIVEM_API_URL,
  });
}
