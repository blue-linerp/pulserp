'use client';

import { Gamepad2, LogOut, Menu, UserRound, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import type { SiteSettings } from '@/lib/settings';

type SessionUser = { steamId: string; username: string; avatar: string; isAdmin?: boolean };

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/subscriptions', label: 'Subscriptions' },
  { href: '/applications', label: 'Applications' },
  { href: '/support', label: 'Support' }
];

export function Navbar({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/auth/me', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => { if (!cancelled) setUser(data.user); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!accountRef.current?.contains(event.target as Node)) setAccountOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setAccountOpen(false);
    router.push('/');
    router.refresh();
  }
  const visibleLinks = links.filter((link) => link.href !== '/subscriptions' || settings.subscriptions.enabled);
  const nav = visibleLinks.map((link) => {
    const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
    return <Link key={link.href} href={link.href} className={`px-1 font-['Outfit',sans-serif] text-[18px] font-semibold transition ${active ? 'text-white' : 'text-white/65 hover:text-white'}`}>{link.label}</Link>;
  });

  return (
    <header className="fixed left-0 right-0 top-5 z-[100] flex justify-center px-4">
      <nav className="flex h-[106.73px] w-full max-w-[1440px] items-center justify-between gap-8 rounded-xl border border-white/10 bg-[rgba(24,24,24,0.96)] px-7 shadow-[0_12px_45px_rgba(0,0,0,0.65)] backdrop-blur-xl">
        <Logo logoUrl={settings.branding.logoUrl} siteName={settings.branding.siteName} tagline={settings.branding.tagline} />
        <div className="hidden items-center gap-9 lg:flex">{nav}</div>
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/queue" className="flex h-10 w-[124.53px] items-center justify-center rounded-md bg-[#2c2c2c] font-['Outfit',sans-serif] text-[14px] font-semibold text-white shadow-inner shadow-black/40 transition hover:bg-[var(--red-primary)]">Join Queue</Link>
          <Link href="https://store.pulse-rp.com/" className="flex h-10 w-[124.53px] items-center justify-center rounded-md bg-[#ff0000] font-['Outfit',sans-serif] text-[14px] font-semibold text-white shadow-inner shadow-black/40 transition hover:bg-[var(--red-primary)]">Official Store</Link>
          {user ? (
            <div className="relative" ref={accountRef}>
              <button onClick={() => setAccountOpen((value) => !value)} aria-label="Account menu" className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-[var(--red-primary)] bg-[var(--bg-tertiary)] transition hover:shadow-[0_0_12px_rgba(255,26,26,0.45)]">
                {user.avatar ? <img src={user.avatar} alt={user.username} className="h-full w-full object-cover" /> : <UserRound size={18} className="text-white" />}
              </button>
              {accountOpen && (
                <div className="absolute left-1/2 mt-3 w-[224px] -translate-x-1/2 overflow-hidden rounded-lg border border-white/20 bg-[#080808] shadow-[0_18px_40px_rgba(0,0,0,0.55)]">
                  <div className="px-5 py-2 text-[14px] font-bold text-white">{user.username}</div>
                  <Link href="/profile" onClick={() => setAccountOpen(false)} className="block px-5 py-1 text-[14px] font-normal text-white transition hover:text-[var(--red-primary)]">My Profile</Link>
                  {user.isAdmin && <Link href="/admin" onClick={() => setAccountOpen(false)} className="block px-5 py-1 text-[14px] font-normal text-white transition hover:text-[var(--red-primary)]">Admin</Link>}
                  <button onClick={logout} className="block w-full border-t border-white/20 px-5 py-2 text-left text-[14px] font-normal text-white transition hover:bg-white/5 hover:text-[var(--red-primary)]">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" aria-label="Login with Steam" className="grid h-10 w-10 place-items-center rounded-full bg-[var(--red-primary)] text-white transition hover:bg-[#cc1414]"><Gamepad2 size={18} /></Link>
          )}
        </div>
        <button className="text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </nav>
      {open && (
        <div className="absolute left-4 right-4 top-20 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5 lg:hidden">
          <div className="flex flex-col gap-4">{nav}</div>
          <Link href="/queue" className="pulse-button mt-4 block bg-[var(--bg-tertiary)] px-4 py-3 text-center text-white">Join Queue</Link>
          {user ? (
            <>
              <Link href="/profile" className="pulse-button mt-3 block border border-[var(--border)] px-4 py-3 text-center text-white">My Profile ({user.username})</Link>
              <button onClick={logout} className="pulse-button mt-3 block w-full bg-[var(--red-primary)] px-4 py-3 text-center text-white">Logout</button>
            </>
          ) : (
            <Link href="/login" className="pulse-button mt-3 block bg-[var(--red-primary)] px-4 py-3 text-center text-white">Login with Steam</Link>
          )}
        </div>
      )}
    </header>
  );
}
