import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete('pulse_discord_id');
  response.cookies.delete('pulse_discord_name');
  return response;
}
