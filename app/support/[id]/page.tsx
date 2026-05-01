import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SupportTicketChat } from '@/components/SupportTicketChat';
import { requireUser } from '@/lib/auth';
import { getSupportTicket } from '@/lib/support-tickets';

export const dynamic = 'force-dynamic';

export default async function SupportTicketPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const ticket = getSupportTicket(id);
  if (!ticket || ticket.steamId !== user.steamId) notFound();
  return (
    <main className="px-5 py-20">
      <div className="pulse-panel mx-auto max-w-[1440px] rounded-2xl p-8">
        <Link href="/support" className="font-mono text-xs uppercase text-[var(--text-secondary)] hover:text-white">← Back to Tickets</Link>
        <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">{ticket.title}</h1>
            <p className="mt-2 font-mono text-xs uppercase text-[var(--text-muted)]">{ticket.server} / {ticket.category}</p>
          </div>
          <span className="rounded-full bg-green-500/15 px-3 py-1 font-mono text-xs uppercase text-green-300">{ticket.status}</span>
        </div>
        <div className="mt-8"><SupportTicketChat initialTicket={ticket} /></div>
      </div>
    </main>
  );
}
