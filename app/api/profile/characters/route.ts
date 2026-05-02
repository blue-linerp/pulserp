import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    return NextResponse.json({ user: user ? 'found' : 'null', steamId: user?.steamId ?? 'none' });
  } catch (err) {
    return NextResponse.json({ error: 'threw', message: String(err) });
  }
}
