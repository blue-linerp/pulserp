import Link from 'next/link';
import { ArrowUp, Star, Users } from 'lucide-react';
import { requireUser } from '@/lib/auth';
import { getServerStatuses, type ServerStatus } from '@/lib/fivem';
import { getSettings } from '@/lib/settings';

export default async function DashboardPage() {
  const user = await requireUser();
  const settings = getSettings();
  const servers = await getServerStatuses(settings.server.maxPlayers);
  const priority = user.subscriptionTier ? `${user.subscriptionTier} Whitelist` : 'TWE Whitelist';
  return (
    <main className="px-5 py-20">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-[#181818] p-10 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
          <h1 className="font-['Oswald',sans-serif] text-[44px] uppercase leading-none text-white">Welcome,</h1>
          <div className="font-['Oswald',sans-serif] text-[44px] uppercase leading-none text-[var(--red-primary)]">{user.username}</div>

          <div className="mt-10 flex items-center gap-5 rounded-2xl border border-white/10 bg-white/10 px-6 py-5">
            <Star className="h-12 w-12 shrink-0 text-white/45" />
            <div>
              <div className="text-xs font-medium text-white/35">Current Priority</div>
              <div className="mt-1 text-base font-black text-white">{priority}</div>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/subscriptions" className="inline-flex items-center gap-2 rounded-md border border-[var(--red-primary)] bg-[var(--red-primary)]/55 px-5 py-2 text-sm font-black text-white transition hover:bg-[var(--red-primary)]"><ArrowUp size={15} /> Upgrade Subscription</Link>
            <Link href="/support" className="rounded-md border border-white/25 bg-transparent px-5 py-2 text-sm font-black text-white transition hover:border-[var(--red-primary)] hover:text-[var(--red-primary)]">Missing a subscription?</Link>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#181818] p-10 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
          <h2 className="text-2xl font-black text-white">Current Server Status</h2>
          <div className="mt-9 grid gap-6">
            {servers.map((server) => <DashboardServerCard key={server.key} server={server} maxPlayers={settings.server.maxPlayers} />)}
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardServerCard({ server, maxPlayers }: { server: ServerStatus; maxPlayers: number }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-[var(--red-primary)] bg-[rgba(255,26,26,0.08)] px-16 py-10 shadow-[0_0_24px_rgba(255,26,26,0.14),inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:bg-[rgba(255,26,26,0.12)]">
      <span className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[var(--red-primary)] shadow-[0_0_18px_rgba(255,26,26,0.85)]" />
      <div className="text-sm font-black uppercase text-[var(--red-primary)]">{server.online ? 'Online' : 'Offline'}</div>
      <h3 className="mt-3 text-3xl font-black text-white">{server.name}</h3>
      <div className="mt-4 flex items-center gap-3 text-white">
        <Users size={18} />
        <div>
          <div className="text-xs text-white/55">Players:</div>
          <div className="text-sm font-bold text-white">{server.players}/{maxPlayers}</div>
        </div>
      </div>
      <a href={`/queue?server=${encodeURIComponent(server.key)}`} className="mt-5 inline-flex rounded-md border border-white/30 bg-black/15 px-4 py-2 text-sm font-bold text-white transition hover:border-[var(--red-primary)] hover:bg-[var(--red-primary)]">Join Queue</a>
    </article>
  );
}

