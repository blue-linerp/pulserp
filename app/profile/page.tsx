import Link from 'next/link';
import { Star } from 'lucide-react';
import { requireUser } from '@/lib/auth';
import { DiscordLink } from '@/components/DiscordLink';
import { getPriorityTier } from '@/lib/user-priorities';

const priorityLabels = {
  none: 'No Queue Priority',
  silver: 'Silver Queue Priority',
  gold: 'Gold Queue Priority',
  crimson: 'Crimson Queue Priority'
} as const;

const priorityStyles = {
  none: 'border-[var(--border)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)]',
  silver: 'border-[#c0c0c0] bg-[#c0c0c0]/10 text-[#d8d8d8]',
  gold: 'border-[var(--gold)] bg-[rgba(245,197,24,0.08)] text-[var(--gold)]',
  crimson: 'border-[var(--red-primary)] bg-[rgba(255,26,26,0.10)] text-[var(--red-primary)]'
} as const;

export default async function ProfilePage() {
  const user = await requireUser();
  const priorityTier = getPriorityTier(user.steamId);
  const hasPriority = priorityTier !== 'none';
  const fields: { label: string; value: React.ReactNode }[] = [
    { label: 'Last Login', value: user.lastLogin },
    { label: 'Total Hours Played', value: 'Unknown' },
    { label: 'Linked Steam Account', value: `${user.steamId} / ${user.steamIdentifier}` },
    { label: 'Linked Discord Account', value: <DiscordLink discord={user.discord} /> },
    { label: 'Your Characters', value: 'Coming Soon' }
  ];
  return (
    <main className="px-5 py-20">
      <div className="pulse-panel mx-auto max-w-4xl rounded-2xl p-10">
        <div className="flex items-center gap-5">
          <img src={user.avatar} alt="Steam avatar" className="h-16 w-16 rounded-full border-2 border-[var(--red-primary)] bg-[var(--bg-tertiary)]" />
          <h1 className="pulse-heading text-6xl">{user.username}</h1>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="space-y-5">
            {fields.map((field) => (
              <div key={field.label}>
                <div className="font-mono text-xs uppercase text-[var(--text-muted)]">{field.label}</div>
                <div className="mt-2 font-mono text-sm text-white">{field.value}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="font-mono text-xs uppercase text-[var(--text-muted)]">Queue Priority</div>
            <div className="mt-4">
              <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${priorityStyles[priorityTier]}`}>
                <Star size={14} />{priorityLabels[priorityTier]}
              </span>
              {hasPriority && <p className="mt-3 text-sm text-[var(--text-secondary)]">Your {priorityLabels[priorityTier]} is active and will sync with the Priority Queue automatically.</p>}
              {!hasPriority && <p className="mt-3 text-sm text-[var(--text-secondary)]">You do not currently have Silver, Gold, or Crimson queue priority.</p>}
            </div>
            <Link href="/subscriptions" className="pulse-button mt-8 w-full border border-[var(--red-primary)] px-5 py-3 text-[var(--red-primary)] hover:bg-[var(--red-primary)] hover:text-white">Upgrade Subscription</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
