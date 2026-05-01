import { redirect } from 'next/navigation';
import { getCurrentUser } from './auth';

function adminSteamIds() {
  return (process.env.ADMIN_STEAM_IDS || '').split(',').map((id) => id.trim()).filter(Boolean);
}

export async function isAdmin() {
  const user = await getCurrentUser();
  if (!user) return false;
  const ids = adminSteamIds();
  if (ids.length === 0) return true;
  return ids.includes(user.steamId);
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  const ids = adminSteamIds();
  if (ids.length === 0) return user;
  if (!ids.includes(user.steamId)) redirect('/');
  return user;
}
