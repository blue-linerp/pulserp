import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ApplicationForm } from '@/components/ApplicationForm';
import { applicationTypes } from '@/lib/data';
import { requireUser } from '@/lib/auth';
import { getApplicationDefinition, listApplicationDefinitions } from '@/lib/application-definitions';

export const dynamic = 'force-dynamic';

export default async function ApplicationsPage({ searchParams }: { searchParams: Promise<{ dept?: string }> }) {
  await requireUser();
  const params = await searchParams;
  const dept = params.dept;
  const definitions = listApplicationDefinitions().filter((definition) => definition.enabled);
  const app = dept ? getApplicationDefinition(dept) : null;

  if (app) {
    return (
      <main className="px-5 py-24">
        <Link href="/applications" className="mx-auto mb-6 flex max-w-[1440px] items-center gap-2 font-mono text-xs uppercase text-[var(--text-secondary)] hover:text-white"><ArrowLeft size={14} /> Back to Applications</Link>
        <ApplicationForm definition={app} />
      </main>
    );
  }

  const rows = [{ name: 'FiveM Allowlist Application', date: '2026-04-28', status: 'Pending' }];
  return (
    <main className="px-5 py-24">
      <div className="mx-auto max-w-[1440px] rounded-2xl border border-white/15 bg-[#181818] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
        <h1 className="pulse-heading text-6xl text-[var(--red-primary)]">Applications</h1>
        {dept && !app && <p className="mt-4 rounded-lg border border-[var(--red-primary)]/40 bg-[rgba(255,26,26,.1)] px-4 py-3 text-sm text-[var(--red-primary)]">Unknown department &quot;{dept}&quot;. Pick an application below.</p>}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {definitions.map((item, index) => {
            const fallback = applicationTypes.find((type) => type.slug === item.slug) || applicationTypes[0];
            const Icon = fallback.icon;
            return (
            <article key={item.slug} className={`relative min-h-[215px] overflow-hidden rounded-2xl border border-white/15 bg-[#242424] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-[var(--red-primary)] ${index === 2 || item.paid ? 'md:col-span-2' : ''} ${index === 3 ? 'md:col-span-1' : ''}`}>
              <Icon className="absolute -bottom-10 right-8 h-44 w-44 text-white opacity-[0.06]" />
              <div className="relative max-w-xl">
                <h2 className="text-2xl font-black text-white">{item.title}</h2>
                <p className="mt-8 text-sm font-semibold leading-6 text-white">{item.description}</p>
                <Link href={`/applications?dept=${item.slug}`} className="mt-8 inline-flex rounded-full border border-white/15 bg-black/20 px-4 py-2 text-xs font-black text-white transition hover:border-[var(--red-primary)] hover:bg-[var(--red-primary)] hover:text-white">Apply Now!</Link>
              </div>
            </article>
          )})}
        </div>
        <section className="mt-12 hidden">
          <h2 className="text-2xl font-bold text-white">Your Applications</h2>
          <div className="pulse-panel mt-4 overflow-x-auto rounded-xl">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="font-mono uppercase text-[var(--text-muted)]"><tr><th className="p-4">Application Name</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>{rows.map((row) => <tr key={row.name} className="border-t border-[var(--border)] text-[var(--text-secondary)]"><td className="p-4 text-white">{row.name}</td><td className="font-mono">{row.date}</td><td><span className="rounded-full bg-amber-500/15 px-3 py-1 text-amber-300">{row.status}</span></td><td><button className="rounded border border-white/20 px-3 py-1 text-white">Edit</button></td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

