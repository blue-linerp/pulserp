import { Users } from 'lucide-react';
import type { ServerStatus as ServerStatusType } from '@/lib/fivem';

export function StatusPill({ server, maxPlayers }: { server: ServerStatusType; maxPlayers?: number }) {
  const displayMax = maxPlayers ?? server.max;
  return (
    <div className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-2 font-mono text-xs text-[var(--text-secondary)]">
      <span className={server.online ? 'status-dot' : 'red-dot'} />
      <span className="text-white">{server.name}:</span>
      <span>{server.players}/{displayMax}</span>
    </div>
  );
}

export function ServerStatusBar({ servers, maxPlayers }: { servers: ServerStatusType[]; maxPlayers?: number }) {
  return <div className="flex flex-wrap justify-center gap-3">{servers.map((server) => <StatusPill key={server.key} server={server} maxPlayers={maxPlayers} />)}</div>;
}

export function ServerCard({ server, joinHref = `/queue?server=${encodeURIComponent(server.key)}`, maxPlayers }: { server: ServerStatusType; joinHref?: string; maxPlayers?: number }) {
  const displayMax = maxPlayers ?? server.max;
  return (
    <div className="pulse-panel rounded-xl p-5 hover:border-[var(--red-primary)] hover:shadow-[0_0_20px_rgba(255,26,26,0.1)]">
      <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase">
        <span className={server.online ? 'text-[var(--online-green)]' : 'text-[var(--red-primary)]'}>{server.online ? 'Online' : 'Offline'}</span>
        <span className={server.online ? 'status-dot' : 'red-dot'} />
      </div>
      <h3 className="pulse-heading text-3xl text-white">{server.name}</h3>
      <div className="mt-4 flex items-center gap-2 font-mono text-[var(--text-secondary)]"><Users size={16} /> {server.players}/{displayMax}</div>
      <a href={joinHref} className="pulse-button mt-5 w-full border border-white/40 px-4 py-3 text-sm text-white hover:border-[var(--red-primary)] hover:bg-[var(--red-primary)]">Join Queue</a>
    </div>
  );
}
