import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { listUserSupportTickets } from '@/lib/support-tickets';

export const dynamic = 'force-dynamic';

export default async function SupportPage() {
  const user = await requireUser();
  const tickets = listUserSupportTickets(user.steamId);
  return <main className="px-5 py-20"><div className="pulse-panel mx-auto max-w-[1440px] rounded-2xl p-8"><div className="flex items-center justify-between gap-4"><h1 className="pulse-heading text-6xl text-[var(--red-primary)]">Support Tickets</h1><Link href="/support/new" className="pulse-button bg-[var(--red-primary)] px-5 py-3 text-white">New</Link></div><div className="mt-8 overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="font-mono uppercase text-[var(--text-muted)]"><tr><th className="p-4">Category</th><th>Title</th><th>Status</th><th>Last Updated</th></tr></thead><tbody>{tickets.map((ticket)=><tr key={ticket.id} className="border-t border-[var(--border)] text-[var(--text-secondary)] hover:border-l-4 hover:border-l-[var(--red-primary)] hover:bg-white/5"><td className="p-4">{ticket.category}</td><td><Link href={`/support/${ticket.id}`} className="font-bold text-white hover:text-[var(--red-primary)]">{ticket.title}</Link></td><td><span className="rounded-full bg-green-500/15 px-3 py-1 text-green-300">{ticket.status}</span></td><td className="font-mono">{new Date(ticket.updatedAt).toLocaleString()}</td></tr>)}</tbody></table>{tickets.length === 0 && <div className="py-12 text-center text-sm text-[var(--text-secondary)]">No support tickets yet.</div>}</div></div></main>;
}
